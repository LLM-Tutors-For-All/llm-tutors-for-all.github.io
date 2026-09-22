// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The site is the GitHub Pages organization site, so it is served from the
// domain root with no `base`. The MkDocs documentation is a separate project
// site served at /Documentation/ — never create a page with that path here.
export default defineConfig({
  site: 'https://llm-tutors-for-all.github.io',
  integrations: [sitemap()],
  // One page, so inlining its CSS saves a render-blocking request.
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  // UC Berkeley's brand typefaces (brand.berkeley.edu/visual-identity/typography),
  // plus Source Code Pro, the Source Serif family's monospace. Fonts are
  // downloaded at build time and served from this site, so visitors never make
  // a request to Google.
  fonts: [
    {
      // Headlines
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['600 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        experimental: {
          variableAxis: { opsz: [['14', '32']] },
        },
      },
    },
    {
      // Reading text
      provider: fontProviders.google(),
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Times New Roman', 'serif'],
    },
    {
      // Controls, labels and numbers
      provider: fontProviders.google(),
      name: 'Barlow Condensed',
      cssVariable: '--font-barlow',
      weights: [500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial Narrow', 'sans-serif'],
    },
    {
      // Code and terminal output
      provider: fontProviders.google(),
      name: 'Source Code Pro',
      cssVariable: '--font-source-code',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
