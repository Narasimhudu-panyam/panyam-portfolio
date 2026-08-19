import { NextResponse } from 'next/server';
const USER = 'Narasimhudu-panyam';
export async function GET() {
  try { const [profile, repos] = await Promise.all([fetch(`https://api.github.com/users/${USER}`, { next: { revalidate: 3600 } }), fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=6`, { next: { revalidate: 3600 } })]);
    if (!profile.ok || !repos.ok) throw new Error('GitHub unavailable');
    return NextResponse.json({ profile: await profile.json(), repos: await repos.json() });
  } catch { return NextResponse.json({ profile: null, repos: [] }, { status: 200 }); }
}
