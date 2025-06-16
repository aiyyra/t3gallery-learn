import { getImage } from "ayyra/server/queries";
import FullPageImageView from "ayyra/components/full-image-page";

export default async function PhotoPage({
  params,
}: {
  params: { id: string };
}) {
  const photoId = (await params).id;
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return <FullPageImageView id={idAsNumber} />;
}
