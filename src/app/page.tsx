import { db } from "ayyra/server/db";
import { ModifierFlags } from "typescript";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
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
      Hello (Gallery in progress)
    </main>
  );
}
