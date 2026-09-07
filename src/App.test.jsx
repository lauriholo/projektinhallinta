import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {
  initialData,
  nextId,
  readData,
  STORAGE_KEY,
} from './services/projectData';

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, '', '/');
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});
afterEach(() => vi.restoreAllMocks());
function navigate(hash) {
  act(() => {
    window.history.replaceState(null, '', hash);
    window.dispatchEvent(new Event('hashchange'));
  });
}
function addTask(title) {
  fireEvent.click(screen.getByRole('button', { name: '+ Lisää uusi tehtävä' }));
  fireEvent.change(screen.getByLabelText('Tehtävä'), {
    target: { value: title },
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Tallenna', exact: true }),
  );
}

test('creates and edits a project, validates names, restores modal focus', () => {
  render(<App />);
  const trigger = screen.getByRole('button', { name: '+ Luo uusi projekti' });
  trigger.focus();
  fireEvent.click(trigger);
  expect(screen.getByLabelText('Projektin nimi')).toHaveFocus();
  fireEvent.change(screen.getByLabelText('Projektin nimi'), {
    target: { value: '   ' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Tallenna projekti' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Anna projektin nimi');
  fireEvent.change(screen.getByLabelText('Projektin nimi'), {
    target: { value: ' Uusi projekti ' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Tallenna projekti' }));
  expect(trigger).toHaveFocus();
  const link = screen.getByRole('link', { name: /Uusi projekti/ });
  navigate(link.getAttribute('href'));
  fireEvent.click(screen.getByRole('button', { name: 'Muokkaa projektia' }));
  fireEvent.change(screen.getByLabelText('Projektin nimi'), {
    target: { value: 'Muokattu projekti' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Tallenna projekti' }));
  expect(
    screen.getByRole('heading', { name: 'Muokattu projekti' }),
  ).toBeInTheDocument();
});

test('creates, edits, filters and deletes tasks after all tasks have been removed', () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...initialData(), tasks: [] }),
  );
  navigate('#/projects/1');
  render(<App />);
  addTask('Ensimmäinen');
  addTask('Toinen');
  fireEvent.click(
    screen.getByRole('button', { name: 'Muokkaa tehtävää: Ensimmäinen' }),
  );
  fireEvent.change(screen.getByLabelText('Tehtävä'), {
    target: { value: 'Valmis tehtävä' },
  });
  fireEvent.change(screen.getByLabelText('Tila'), {
    target: { value: 'valmis' },
  });
  fireEvent.change(screen.getByLabelText('Vastuuhenkilö'), {
    target: { value: '1' },
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Tallenna', exact: true }),
  );
  fireEvent.change(screen.getByLabelText('Suodata tilan mukaan'), {
    target: { value: 'valmis' },
  });
  expect(screen.queryByText('Toinen')).not.toBeInTheDocument();
  expect(screen.getByText('Valmis tehtävä')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Suodata vastuuhenkilön mukaan'), {
    target: { value: '2' },
  });
  expect(
    screen.getByText('Hakuehdoilla ei löytynyt tehtäviä.'),
  ).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Suodata vastuuhenkilön mukaan'), {
    target: { value: '' },
  });
  fireEvent.change(screen.getByLabelText('Suodata tilan mukaan'), {
    target: { value: '' },
  });
  fireEvent.change(screen.getByLabelText('Hae tehtäviä'), {
    target: { value: 'toinen' },
  });
  expect(screen.queryByText('Valmis tehtävä')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Hae tehtäviä'), {
    target: { value: '' },
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Poista tehtävä: Valmis tehtävä' }),
  );
  expect(screen.getByText('Toinen')).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole('button', { name: 'Poista tehtävä: Toinen' }),
  );
  addTask('Uusi alku');
  expect(screen.getByText('Uusi alku')).toBeInTheDocument();
  expect(nextId([])).toBe(1);
});

test('persists changes and supports archiving, restoration and reset', () => {
  navigate('#/projects/1');
  const view = render(<App />);
  addTask('Tallennettu');
  view.unmount();
  render(<App />);
  expect(screen.getByText('Tallennettu')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Arkistoi projekti' }));
  navigate('#/');
  expect(
    screen.queryByRole('link', { name: /Projektinhallintasovellus/ }),
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Näytä arkistoidut projektit'));
  expect(
    screen.getByRole('link', { name: /Projektinhallintasovellus/ }),
  ).toBeInTheDocument();
  navigate('#/projects/1');
  fireEvent.click(screen.getByRole('button', { name: 'Palauta aktiiviseksi' }));
  expect(screen.queryByText('Arkistoitu projekti')).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole('button', { name: 'Palauta esimerkkidata' }),
  );
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).tasks).toEqual(
    initialData().tasks,
  );
});

test('dialog traps focus and closes with Escape', () => {
  render(<App />);
  const trigger = screen.getByRole('button', { name: '+ Luo uusi projekti' });
  trigger.focus();
  fireEvent.click(trigger);
  userEvent.tab({ shift: true });
  expect(
    within(screen.getByRole('dialog')).getByRole('button', {
      name: 'Tallenna projekti',
    }),
  ).toHaveFocus();
  userEvent.tab();
  expect(screen.getByLabelText('Projektin nimi')).toHaveFocus();
  fireEvent.keyDown(document.activeElement, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test('preserves corrupt storage and reports write failures', () => {
  localStorage.setItem(STORAGE_KEY, 'broken');
  const view = render(<App />);
  expect(screen.getByRole('alert')).toHaveTextContent('ei voitu lukea');
  expect(localStorage.getItem(STORAGE_KEY)).toBe('broken');
  view.unmount();
  localStorage.clear();
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('quota');
  });
  render(<App />);
  expect(screen.getByRole('alert')).toHaveTextContent('ei voitu tallentaa');
});

test('rejects duplicate IDs and handles missing projects', () => {
  const data = initialData();
  data.tasks.push(data.tasks[0]);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  expect(readData().error).not.toBe('');
  localStorage.clear();
  navigate('#/projects/999');
  render(<App />);
  expect(screen.getByText('Projektia ei löytynyt.')).toBeInTheDocument();
  navigate('#/');
  expect(
    screen.getByRole('heading', { name: 'Projektit' }),
  ).toBeInTheDocument();
});
