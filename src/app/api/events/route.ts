import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Get all events
export async function GET(request: NextRequest) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// Create event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase.from('events').insert([body]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
