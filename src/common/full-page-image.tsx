import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "ayyra/server/queries";
import { Button } from "../components/ui/button";
import { redirect } from "next/navigation";

export default async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);

  const uploaderInfo = (await clerkClient()).users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="flex-shrink object-contain" />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="p-2">
          <span>Uploaded By:</span>
          <span>{(await uploaderInfo).fullName}</span>
        </div>

        <div className="p-2">
          <span>Created On:</span>
          <span>{image.createdAt.toLocaleDateString()}</span>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(idAsNumber);
            }}
          >
            <Button
              variant={"destructive"}
              type="submit"
              className="cursor-pointer"
            >
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
