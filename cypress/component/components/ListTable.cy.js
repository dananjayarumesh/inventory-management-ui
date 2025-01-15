import { mount } from 'cypress/vue';
import ListTable from '../../../src/components/ListTable.vue';

describe('ListTable', () => {
  const headers = [
    { value: 'Name', width: 40 },
    { value: 'Age', width: 20 },
    { value: 'Location', width: 40 },
  ];

  const rows = [
    { id: 1, Name: 'John Doe', Age: 30, Location: 'New York' },
    { id: 2, Name: 'Jane Smith', Age: 25, Location: 'Los Angeles' },
  ];

  it('renders the table headers correctly', () => {
    mount(ListTable, {
      props: { headers, rows, loading: false },
    });

    headers.forEach((header) => {
      cy.get('thead th').contains(header.value).should('be.visible');
    });
  });

  it('renders the table rows correctly', () => {
    mount(ListTable, {
      props: { headers, rows, loading: false },
    });

    rows.forEach((row) => {
      Object.values(row).forEach((value) => {
        if (typeof value !== 'number') {
          cy.get('tbody td').contains(value).should('be.visible');
        }
      });
    });
  });

  it.skip('displays loading state when loading is true', () => {
    mount(ListTable, {
      props: { headers, rows, loading: true },
    });

    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length', 0);
  });

  it('renders tools slot correctly', () => {
    mount(ListTable, {
      props: { headers, rows, loading: false },
      slots: {
        tools: `<button class="btn-edit" @click="alert('Edit clicked')">Edit</button>`,
      },
    });

    cy.get('.btn-edit').should('be.visible').and('contain', 'Edit');
  });
});
