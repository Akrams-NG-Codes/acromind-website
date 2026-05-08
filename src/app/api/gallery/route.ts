import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Get all gallery items
export async function GET(request: NextRequest) {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// Create gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase.from('gallery').insert([body]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
