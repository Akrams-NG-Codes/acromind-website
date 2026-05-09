import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('[Upload] No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('[Upload] Processing file:', file.name, 'Size:', file.size, 'Type:', file.type)

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const fileBuffer = await file.arrayBuffer()

    console.log('[Upload] Uploading to Supabase Storage:', fileName)

    const { data, error } = await supabase.storage
      .from('acromind-images')
      .upload(`uploads/${fileName}`, fileBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('[Upload] Supabase storage error:', error)
      return NextResponse.json(
        { error: `Storage error: ${error.message}` },
        { status: 500 }
      )
    }

    if (!data || !data.path) {
      console.error('[Upload] No path returned from Supabase')
      return NextResponse.json(
        { error: 'Upload successful but no path returned' },
        { status: 500 }
      )
    }

    console.log('[Upload] File uploaded successfully, path:', data.path)

    const {
      data: { publicUrl },
    } = supabase.storage.from('acromind-images').getPublicUrl(data.path)

    console.log('[Upload] Public URL generated:', publicUrl)

    if (!publicUrl) {
      console.error('[Upload] Failed to generate public URL')
      return NextResponse.json(
        { error: 'Failed to generate public URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: publicUrl, path: data.path }, { status: 201 })
  } catch (err) {
    console.error('[Upload] Unexpected error:', err)
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
