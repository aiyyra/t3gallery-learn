import { Modal } from "./modal";
import FullPageImageView from "ayyra/common/full-page-image";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Modal>
      <FullPageImageView photoId={(await params).id} />
    </Modal>
  );
}
