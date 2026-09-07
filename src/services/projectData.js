import { projects, tasks } from './mockData';

export const STORAGE_KEY = 'projektinhallinta.v1';
export const STATUSES = {
  odottaa: 'Odottaa',
  työn_alla: 'Työn alla',
  valmis: 'Valmis',
};
export const initialData = () => ({
  projects: projects.map((p) => ({ ...p })),
  tasks: tasks.map((t) => ({ ...t })),
});
export const nextId = (items) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

export function readData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { data: initialData(), error: '' };
    const data = JSON.parse(raw);
    const validIds = (items) =>
      items.every((item) => Number.isSafeInteger(item.id) && item.id > 0) &&
      new Set(items.map((item) => item.id)).size === items.length;
    if (
      !Array.isArray(data.projects) ||
      !Array.isArray(data.tasks) ||
      !validIds(data.projects) ||
      !validIds(data.tasks) ||
      !data.projects.every(
        (p) => typeof p.name === 'string' && typeof p.description === 'string',
      ) ||
      !data.tasks.every(
        (t) =>
          typeof t.title === 'string' &&
          Object.hasOwn(STATUSES, t.status) &&
          data.projects.some((p) => p.id === t.projectId),
      )
    ) {
      throw new Error('Invalid data');
    }
    return { data, error: '' };
  } catch {
    return {
      data: initialData(),
      error:
        'Tallennettuja tietoja ei voitu lukea. Esimerkkidata on käytössä. Selaintallennus jatkuu, kun palautat esimerkkidatan.',
    };
  }
}
