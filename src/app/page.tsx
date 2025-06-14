import { db } from "ayyra/server/db";
import Link from "next/link";
import { ostring } from "zod";

const mockUrls = [
  "https://j1t56ymklc.ufs.sh/f/8K4uFAPRvfejGuGAPqbEcyZ47Bsm3YUxtk8g6nuKlVjWQPCb",
  "https://j1t56ymklc.ufs.sh/f/8K4uFAPRvfejB87OrAwdjD0k8S49sx1hHcUlE6MaTFO7fQBn",
  "https://j1t56ymklc.ufs.sh/f/8K4uFAPRvfejr29yLKB7HydUiVcMnPfskj2RWBmDJ9AQwOh0",
  "https://j1t56ymklc.ufs.sh/f/8K4uFAPRvfejqiULWx0bZCI5efow8SJQM1WA7X4phUFDLPvm",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

const posts = await db.query.posts.findMany();
console.log("Posts from DB:", posts);

export default async function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, , ...mockImages]
          .filter((image) => image !== undefined)
          .map((image, index) => (
            <div key={image.id + "-" + index} className="w-48">
              <img src={image.url} />
            </div>
          ))}
      </div>
      Hello (Gallery in progress)
    </main>
  );
}
