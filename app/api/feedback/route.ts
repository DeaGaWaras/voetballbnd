import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/* GET – untuk admin */
export async function GET() {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

/* POST – dari user */
export async function POST(req: Request) {
  const body = await req.json();

  // honeypot anti-spam
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  if (!body.message) {
    return NextResponse.json(
      { error: "Message required" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("feedbacks").insert({
    name: body.name || "Anonim",
    message: body.message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
