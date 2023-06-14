import { Loan } from './Loan';

export const LOAN_DATA: Loan[] = [
  {
    id: 1,
    client: {
      id: 1,
      name: 'John Doe',
    },
    game: {
      id: 1,
      title: 'Catan',
      age: 12,
      category: { id: 1, name: 'Categoría 1' },
      author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' },
    },
    startingDate: new Date(2023, 4, 22), // May 22, 2023
    endingDate: new Date(2023, 4, 25), // May 25, 2023
  },
  {
    id: 2,
    client: {
      id: 2,
      name: 'Jane Smith',
    },
    game: {
      id: 2,
      title: 'Monopoly',
      age: 14,
      category: { id: 2, name: 'Categoría 2' },
      author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' },
    },
    startingDate: new Date(2023, 4, 23), // May 23, 2023
    endingDate: new Date(2023, 4, 26), // May 26, 2023
  },
];
