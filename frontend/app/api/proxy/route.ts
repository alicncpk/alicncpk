import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint parameter" }, { status: 400 });
  }

  const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
  const apiKey = process.env.BACKEND_API_KEY || "fallback_secret_api_key_123";

  try {
    const res = await fetch(`${backendUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: `Server returned non-JSON response: ${text.substring(0, 300)}` };
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Backend proxy fetch error:", err);
    return NextResponse.json({ error: `Backend unreachable: ${err.message}` }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint parameter" }, { status: 400 });
  }

  const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
  const apiKey = process.env.BACKEND_API_KEY || "fallback_secret_api_key_123";

  try {
    const body = await request.json().catch(() => ({}));
    
    const res = await fetch(`${backendUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: `Server returned non-JSON response: ${text.substring(0, 300)}` };
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Backend proxy post error:", err);
    return NextResponse.json({ error: `Backend unreachable: ${err.message}` }, { status: 502 });
  }
}
