import path from 'path'
import sharp from 'sharp'
import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

const browserFriendlyTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
const convertibleTypes = ['image/heic', 'image/heif']

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('[Upload] No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('[Upload] Processing file:', file.name, 'Size:', file.size, 'Type:', file.type)

    const extension = path.extname(file.name).toLowerCase()
    const safeName = path.basename(file.name, extension).replace(/\s+/g, '-')
    const originalBuffer = Buffer.from(await file.arrayBuffer())

    let uploadBuffer: Buffer = originalBuffer
    let uploadContentType = file.type || 'application/octet-stream'
    let uploadFileName = `${Date.now()}-${safeName}${extension}`

    const isConvertible = convertibleTypes.includes(uploadContentType) || ['.heic', '.heif'].includes(extension)
    if (isConvertible) {
      console.log('[Upload] Converting HEIC/HEIF to JPEG')
      uploadBuffer = await sharp(originalBuffer).jpeg({ quality: 90 }).toBuffer()
      uploadContentType = 'image/jpeg'
      uploadFileName = `${Date.now()}-${safeName}.jpeg`
    }

    const { data, error } = await supabase.storage
      .from('acromind-images')
      .upload(`uploads/${uploadFileName}`, uploadBuffer, {
        contentType: uploadContentType,
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
