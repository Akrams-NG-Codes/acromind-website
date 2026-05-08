import GalleryForm from '@/components/GalleryForm'

export default function EditGalleryPage({ params }: { params: { id: string } }) {
  return <GalleryForm id={params.id} />
}
