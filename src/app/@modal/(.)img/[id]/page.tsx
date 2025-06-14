import { getImage } from "ayyra/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);

  return (
    <div>
      <img src={image.url} className="w-96" />
    </div>
  );
}

// export default function PhotoModal({
//   params: { id: photoId },
// }: {
//   params: { id: string };
// }) {
//   return <div>{photoId}</div>;
// }
