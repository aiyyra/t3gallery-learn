import { db } from "ayyra/server/db";
import { ModifierFlags } from "typescript";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {[...images, ...images, , ...images]
        .filter((image) => image !== undefined)
        .map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
            <div>{image.name}</div>
          </div>
        ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
