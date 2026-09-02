'use client';

import { useEffect, useState } from 'react';
import { Github, GitFork, Star } from 'lucide-react';
import { Reveal } from '@/components/motion';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

type Profile = {
  public_repos: number;
  followers: number;
  following: number;
};

export function GitHub() {
  const [data, setData] = useState<{ profile: Profile; repos: Repo[] }>({
    profile: { public_repos: 7, followers: 0, following: 0 },
    repos: [],
  });

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((res) => {
        if (res?.profile) {
          setData(res);
        }
      })
      .catch(() => undefined);
  }, []);

  const stats = [
    [data.profile.public_repos, 'Repositories'],
    [data.profile.followers, 'Followers'],
    [data.profile.following, 'Following'],
  ];

  return (
    <section className="section">
      <Reveal>
        <div className="glass overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <p className="eyebrow">06 — Open source</p>
              <h2 className="section-title text-3xl sm:text-4xl">
                Building in public,<br />
                <span className="gradient-text">one commit at a time.</span>
              </h2>
              <a
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:bg-white/10"
                href="https://github.com/Narasimhudu-panyam"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> Follow on GitHub
              </a>
            </div>

            <div className="grid grid-cols-3 gap-7 self-end">
              {stats.map(([n, l]) => (
                <div key={l as string}>
                  <p className="text-2xl font-semibold text-white">{n}</p>
                  <p className="mt-1 text-xs text-slate-400">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {data.repos.length > 0 && (
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {data.repos.slice(0, 3).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-300/40 hover:bg-white/[0.03]"
                >
                  <div>
                    <p className="truncate text-sm font-semibold text-white transition group-hover:text-cyan-200">
                      {repo.name}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-400 line-clamp-3 min-h-[3.75rem]">
                      {repo.description || 'Open source project repository.'}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      {repo.language || 'Code'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-amber-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={13} className="text-slate-400" />
                      {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
