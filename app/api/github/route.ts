import { NextResponse } from 'next/server';

const USER = 'Narasimhudu-panyam';

export async function GET() {
  try {
    const headers = {
      'User-Agent': 'Narasimhudu-Portfolio-App',
      'Accept': 'application/vnd.github.v3+json',
    };

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=6`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileRes.ok) {
      throw new Error(`GitHub Profile API status: ${profileRes.status}`);
    }

    const profile = await profileRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];
    const profileStats = [profile.public_repos, profile.followers, profile.following];

    if (!profileStats.every((value) => typeof value === 'number')) {
      return NextResponse.json({ profile: null, repos: [], error: true });
    }

    return NextResponse.json({
      profile: {
        public_repos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
      },
      repos: Array.isArray(repos) ? repos : [],
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    // Return an unavailable state instead of placeholder profile statistics.
    return NextResponse.json({
      profile: null,
      repos: [],
      error: true,
    });
  }
}
