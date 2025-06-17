import FullPageImageView from "ayyra/common/full-page-image";

export default async function PhotoPage({
  params,
}: {
  params: { id: string };
}) {
  const photoId = (await params).id;

  return <FullPageImageView photoId={photoId} />;
}
