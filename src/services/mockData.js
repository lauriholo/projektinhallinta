export const users = [
  { id: 1, name: 'Lauri K.' },
  { id: 2, name: 'Anna M.' },
];

export const projects = [
  { id: 1, name: 'Projektinhallintasovellus', description: 'Demoversio projektinhallintatyökalusta.' },
  { id: 2, name: 'Verkkosivuston uudistus', description: 'Asiakkaan X verkkosivujen modernisointi.' },
];

export const tasks = [
  // Projektin 1 tehtävät
  { id: 1, projectId: 1, title: 'Käyttöliittymän suunnittelu', status: 'valmis', assigneeId: 1 },
  { id: 2, projectId: 1, title: 'Mock-datan luonti', status: 'työn_alla', assigneeId: 1 },
  { id: 3, projectId: 1, title: 'Dashboard-näkymän toteutus', status: 'odottaa', assigneeId: 2 },
  { id: 4, projectId: 1, title: 'Tehtävien hallintatoiminnallisuus', status: 'odottaa', assigneeId: 2 },

  // Projektin 2 tehtävät
  { id: 5, projectId: 2, title: 'Vaatimusmäärittely', status: 'valmis', assigneeId: 2 },
  { id: 6, projectId: 2, title: 'Ulkoasun suunnittelu', status: 'valmis', assigneeId: 1 },
  { id: 7, projectId: 2, title: 'Etusivun toteutus', status: 'työn_alla', assigneeId: 2 },
  { id: 8, projectId: 2, title: 'Tuotesivujen toteutus', status: 'odottaa', assigneeId: 1 },
  { id: 9, projectId: 2, title: 'Yhteydenottolomake', status: 'odottaa', assigneeId: 2 },
];
