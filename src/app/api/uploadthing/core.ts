import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "ayyra/server/db";
import { images } from "ayyra/server/db/schema";
import { ratelimit } from "ayyra/server/ratelimit";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 20,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
    //   This code runs on your server before upload
      const user = await currentUser()
      // If you throw, the user will not be able to upload
      if (!user?.id) throw new UploadThingError("Unauthorized");

      const { success } = await ratelimit.limit(user.id);
      if(!success) throw new Error("Ratelimited")


      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(images).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId
      })

    //   !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
