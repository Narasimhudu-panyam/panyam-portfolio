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

    return NextResponse.json({
      profile: {
        public_repos: typeof profile.public_repos === 'number' ? profile.public_repos : 7,
        followers: typeof profile.followers === 'number' ? profile.followers : 0,
        following: typeof profile.following === 'number' ? profile.following : 0,
      },
      repos: Array.isArray(repos) ? repos : [],
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    // Graceful fallback values for profile & repos
    return NextResponse.json({
      profile: {
        public_repos: 7,
        followers: 0,
        following: 0,
      },
      repos: [],
    });
  }
}
