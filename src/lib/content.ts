import { getCollection, getEntry, render } from 'astro:content';
import type { CollectionEntry, CollectionKey } from 'astro:content';

/**
 * Load the single entry of a one-file collection (a section, site.yaml, …) and
 * fail the build with a readable message if the file is missing.
 */
export async function loadSingle<C extends CollectionKey>(collection: C, id: string): Promise<CollectionEntry<C>> {
  const entry = await getEntry(collection, id);
  if (!entry) {
    throw new Error(`Content "${id}" in collection "${collection}" is missing. Check src/content/ and src/data/.`);
  }
  return entry as CollectionEntry<C>;
}

export const getSite = async () => (await loadSingle('site', 'site')).data;

export const getDemo = async () => (await loadSingle('demo', 'demo')).data;

export const getBenchmarks = async () => (await loadSingle('benchmarks', 'benchmarks')).data;

/** A section's frontmatter plus its rendered Markdown body. */
export async function getSection<C extends CollectionKey>(
  collection: C,
  id: string,
): Promise<{ data: CollectionEntry<C>['data']; Content: Awaited<ReturnType<typeof render>>['Content'] }> {
  const entry = await loadSingle(collection, id);
  const { Content } = await render(entry);
  return { data: entry.data, Content };
}

export async function getTeam() {
  const people = await getCollection('people');
  return people.map((person) => person.data).sort((a, b) => a.order - b.order);
}
