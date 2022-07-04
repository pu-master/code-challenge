type User = {
  firstName: string;
  lastName: string;
  country: string;
  documents: string[];
}

/**
 * Returns a mocked user data.
 * @returns User[]
 */
function getMockData(): User[] {
  return [
    {
      firstName: 'John',
      lastName: 'Doe',
      country: 'United States',
      documents: [
        'Offer.pdf',
        'Employment.pdf',
        'Assignment.pdf',
        'Other1.pdf',
        'Other2.pdf',
      ],
    },
    {
      firstName: 'Jane',
      lastName: 'Roe',
      country: 'United Kingdom',
      documents: [
        'NDA.pdf',
        'Insurance.pdf',
        'Very very long named document.pdf',
      ],
    },
    {
      firstName: 'Salman',
      lastName: 'Khan',
      country: 'India',
      documents: [
        'Contract.pdf',
        'Benefits.pdf',
      ],
    },
  ]
}

export default getMockData

export type {
  User,
}
