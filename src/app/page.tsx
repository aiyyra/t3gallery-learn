import { ModifierFlags } from "typescript";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "ayyra/server/queries";
import Image from "next/image";
import Link from "next/link";
import { imageOptimizer } from "next/dist/server/image-optimizer";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[...images, ...images, ...images, ...images]
        .filter((image) => image !== undefined)
        .map((image) => (
          <div key={image.id} className="flex h-48 w-48 flex-col">
            <Link href={`/img/${image.id}`} passHref>
              <Image
                src={image.url}
                width={192}
                height={192}
                style={{ objectFit: "contain" }}
                alt={image.name}
              />
            </Link>
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
