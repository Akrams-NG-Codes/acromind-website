import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileName = `${Date.now()}-${file.name}`
    const fileBuffer = await file.arrayBuffer()

    const { data, error } = await supabase.storage
      .from('acromind-images')
      .upload(`uploads/${fileName}`, fileBuffer, {
        contentType: file.type,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('acromind-images').getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
