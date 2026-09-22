// Schemas for every editable content file. If a file under src/content/ or
// src/data/ has a missing field, a misspelled field name, or a malformed link,
// `npm run build` stops and names the file and the field.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';

const href = z
  .string()
  .refine((value) => /^(https:\/\/|mailto:|\/)/.test(value), {
    message: 'Links must start with https://, mailto: or / (for example /#benchmarks)',
  });

const link = z.strictObject({
  label: z.string().min(1),
  href,
});

/** One Markdown file, validated against its own schema. */
const markdownFile = (folder: string, name: string) =>
  glob({ pattern: `${name}.md`, base: `./src/content/${folder}` });

const titled = z.strictObject({ title: z.string(), body: z.string() });

/** A YAML or JSON file that holds a single object rather than a list of entries. */
const singleEntry = (path: string, id: string, parse: (text: string) => unknown) =>
  file(path, {
    parser: (text) => ({ [id]: parse(text) as Record<string, unknown> }),
  });

const site = defineCollection({
  loader: singleEntry('src/content/site.yaml', 'site', parseYaml),
  schema: z.strictObject({
    name: z.string(),
    byline: z.string(),
    description: z.string().max(170),
    url: z.url(),
    email: z.union([z.email(), z.literal('')]),
    links: z.strictObject({
      docs: z.url(),
      github: z.url(),
      docsRepo: z.url(),
    }),
    nav: z.array(link).min(1),
    footer: z.array(
      z.strictObject({
        title: z.string(),
        links: z.array(link).min(1),
      }),
    ),
  }),
});

const hero = defineCollection({
  loader: markdownFile('home', 'hero'),
  schema: z.strictObject({
    title: z.string(),
    actions: z.array(link).min(1).max(2),
  }),
});

const problem = defineCollection({
  loader: markdownFile('home', 'problem'),
  schema: z.strictObject({
    title: z.string(),
    factors: z.array(titled).min(1),
    closing: z.string().optional(),
  }),
});

const howItWorks = defineCollection({
  loader: markdownFile('home', 'how-it-works'),
  schema: z.strictObject({
    title: z.string(),
    steps: z
      .array(
        z.strictObject({
          title: z.string(),
          role: z.string().optional(),
          body: z.string(),
          outputs: z.array(z.string()).optional(),
        }),
      )
      .min(2),
    link: link.optional(),
  }),
});

const interfaces = defineCollection({
  loader: markdownFile('home', 'interfaces'),
  schema: z.strictObject({
    title: z.string(),
    items: z
      .array(
        z.strictObject({
          name: z.string(),
          summary: z.string(),
          examplesLabel: z.string().default('How learners ask'),
          examples: z.array(z.string()).min(1),
          note: z.string().optional(),
          link,
        }),
      )
      .min(1),
  }),
});

const benchmarksSummary = defineCollection({
  loader: markdownFile('home', 'benchmarks'),
  schema: z.strictObject({
    title: z.string(),
    testLabel: z.string(),
    measureLabel: z.string(),
    methodLabel: z.string(),
    link,
  }),
});

const homeInvolved = defineCollection({
  loader: markdownFile('home', 'get-involved'),
  schema: z.strictObject({
    title: z.string(),
    actions: z.array(link).min(1).max(2),
  }),
});

const benchmarksPage = defineCollection({
  loader: markdownFile('benchmarks', 'page'),
  schema: z.strictObject({
    title: z.string(),
    scope: z.strictObject({
      title: z.string(),
      items: z
        .array(
          z.strictObject({
            name: z.string(),
            body: z.string(),
            groups: z
              .array(z.strictObject({ label: z.string(), examples: z.array(z.string()).min(1) }))
              .optional(),
            parts: z.array(z.string()).optional(),
            note: z.string().optional(),
          }),
        )
        .min(1),
    }),
    questions: z.strictObject({
      title: z.string(),
      body: z.string(),
      kinds: z.array(z.string()).min(1),
    }),
    criteria: z.strictObject({ title: z.string(), items: z.array(titled).min(1) }),
    methods: z.strictObject({ title: z.string(), items: z.array(titled).min(1) }),
    results: z.strictObject({
      title: z.string(),
      body: z.string(),
      chartTitle: z.string(),
      publishTitle: z.string(),
      publishes: z.array(titled).min(1),
    }),
    deliverables: z.strictObject({ title: z.string(), items: z.array(titled).min(1) }),
    docsLink: link.optional(),
  }),
});

const research = defineCollection({
  loader: markdownFile('home', 'research'),
  schema: z.strictObject({
    title: z.string(),
    stages: z
      .array(
        z.strictObject({
          name: z.string(),
          current: z.boolean().default(false),
          items: z.array(z.string()).min(1),
        }),
      )
      .min(1),
  }),
});

const teamPage = defineCollection({
  loader: markdownFile('team', 'page'),
  schema: z.strictObject({
    title: z.string(),
    contactTitle: z.string(),
    emailTitle: z.string(),
    emailBody: z.string(),
    ways: z.array(z.strictObject({ title: z.string(), body: z.string(), link })),
  }),
});

const people = defineCollection({
  loader: file('src/content/team/people.yaml', {
    // Entries need an id; derive it from the name so editors don't have to.
    parser: (text) =>
      (parseYaml(text) as Array<Record<string, unknown>>).map((person, order) => ({
        ...person,
        id: String(person.name ?? `person-${order}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        order,
      })),
  }),
  schema: z.strictObject({
    id: z.string(),
    order: z.number(),
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    github: z.url().optional(),
    linkedin: z.url().optional(),
  }),
});

const demo = defineCollection({
  loader: singleEntry('src/content/demo.yaml', 'demo', parseYaml),
  schema: z.strictObject({
    caption: z.string(),
    surfaces: z
      .array(
        z.strictObject({
          id: z.string().regex(/^[a-z0-9-]+$/),
          label: z.string(),
          style: z.enum(['terminal', 'discord', 'slack']),
          question: z.string(),
          command: z.string().optional(),
          mention: z.string().optional(),
          botName: z.string().default('Data 8 Tutor'),
          answer: z.string(),
          illustrative: z.boolean().default(false),
          note: z.string().optional(),
        }),
      )
      .min(1),
  }),
});

const benchmarkValue = z.number().nonnegative().nullable();

const benchmarks = defineCollection({
  loader: singleEntry('src/data/benchmarks.json', 'benchmarks', JSON.parse),
  schema: z
    .strictObject({
      about: z.string().optional(),
      status: z.enum(['placeholder', 'preliminary', 'final']),
      note: z.string(),
      updated: z.string().nullable(),
      methodologyUrl: z.url().nullable(),
      groups: z.array(z.strictObject({ id: z.string(), label: z.string() })).min(1),
      series: z
        .array(z.strictObject({ id: z.string(), label: z.string() }))
        .min(1)
        .max(2),
      metrics: z
        .array(
          z.strictObject({
            id: z.string().regex(/^[a-z0-9-]+$/),
            label: z.string(),
            description: z.string(),
            better: z.enum(['lower', 'higher']),
            prefix: z.string().default(''),
            suffix: z.string().default(''),
            decimals: z.number().int().min(0).max(4).default(1),
            max: z.number().positive().optional(),
            values: z.record(z.string(), z.record(z.string(), benchmarkValue)),
          }),
        )
        .min(1),
    })
    .superRefine((data, ctx) => {
      const groupIds = data.groups.map((group) => group.id);
      const seriesIds = data.series.map((series) => series.id);
      for (const metric of data.metrics) {
        for (const groupId of Object.keys(metric.values)) {
          if (!groupIds.includes(groupId)) {
            ctx.addIssue({
              code: 'custom',
              path: ['metrics', metric.id, 'values', groupId],
              message: `"${groupId}" is not one of the groups: ${groupIds.join(', ')}`,
            });
          }
        }
        for (const groupId of groupIds) {
          for (const seriesId of seriesIds) {
            if (!(seriesId in (metric.values[groupId] ?? {}))) {
              ctx.addIssue({
                code: 'custom',
                path: ['metrics', metric.id, 'values', groupId, seriesId],
                message: `Missing value. Use null if "${seriesId}" has not been measured for "${groupId}" yet.`,
              });
            }
          }
        }
      }
    }),
});

export const collections = {
  site,
  // Home page sections (src/content/home/)
  hero,
  problem,
  howItWorks,
  interfaces,
  benchmarksSummary,
  research,
  homeInvolved,
  // Other pages
  benchmarksPage,
  teamPage,
  people,
  demo,
  benchmarks,
};
