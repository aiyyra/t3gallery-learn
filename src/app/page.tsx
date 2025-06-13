import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, , ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
      Hello (Gallery in progress)
    </main>
  );
}
