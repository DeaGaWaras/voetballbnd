import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

/* ================= GET PRODUCT BY ID ================= */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}

/* ================= DELETE PRODUCT ================= */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
