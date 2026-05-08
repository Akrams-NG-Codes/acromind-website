import ProgramForm from '@/components/ProgramForm'

export default function EditProgramPage({ params }: { params: { id: string } }) {
  return <ProgramForm id={params.id} />
}
