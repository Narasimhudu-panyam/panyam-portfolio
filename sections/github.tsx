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
  const [data, setData] = useState<{ profile: Profile | null; repos: Repo[] }>({ profile: null, repos: [] });
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    fetch('/api/github')
      .then((r) => { if (!r.ok) throw new Error('GitHub request failed'); return r.json(); })
      .then((res) => {
        if (res?.profile) {
          setData(res);
          setLoadState('ready');
        } else {
          setLoadState('error');
        }
      })
      .catch(() => setLoadState('error'));
  }, []);

  const stats = data.profile ? [
    [data.profile.public_repos, 'Repositories'],
    [data.profile.followers, 'Followers'],
    [data.profile.following, 'Following'],
  ] : [];

  return (
    <section className="section">
      <Reveal>
        <div className="github-panel overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <p className="eyebrow">06 — Open source</p>
              <h2 className="section-title text-3xl sm:text-4xl">
                Building in public,<br />
                <span className="text-[#168DAB]">one commit at a time.</span>
              </h2>
              <a
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#168DAB]/25 px-4 py-2.5 text-sm font-semibold text-[#28566c] transition hover:bg-[#e9f7fb]"
                href="https://github.com/Narasimhudu-panyam"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> Follow on GitHub
              </a>
            </div>

            <div className="grid grid-cols-3 gap-5 self-end">
              {stats.map(([n, l]) => (
                <div key={l as string}>
                  <p className="text-2xl font-semibold text-[#18324A]">{n}</p>
                  <p className="mt-1 text-xs text-[#587184]">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {loadState === 'loading' && <p className="mt-8 text-sm text-[#587184]" role="status">Loading live GitHub repositories…</p>}
          {loadState === 'error' && <p className="mt-8 text-sm text-[#587184]" role="status">GitHub details are temporarily unavailable. Visit the profile for the latest work.</p>}
          {data.repos.length > 0 && (
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {data.repos.slice(0, 3).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-[#168DAB]/15 bg-white/75 p-5 transition hover:border-[#168DAB]/40 hover:bg-white"
                >
                  <div>
                    <p className="truncate text-sm font-semibold text-[#18324A] transition group-hover:text-[#168DAB]">
                      {repo.name}
                    </p>
                    <p className="mt-2.5 min-h-[3.75rem] text-sm leading-relaxed text-[#587184] line-clamp-3">
                      {repo.description || 'Open source project repository.'}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4 border-t border-[#168DAB]/10 pt-3 text-xs text-[#587184]">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-[#168DAB]" />
                      {repo.language || 'Code'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-[#E76F51]" />
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
