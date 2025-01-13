import { mount } from '@vue/test-utils';
import ListTable from '@/components/ListTable.vue';
import { describe, it, expect } from 'vitest';

describe('ListTable', () => {
  it('renders table with headers and rows', () => {
    const headers = [{ value: 'ID', width: 20 }, { value: 'Name' }];
    const rows = [
      { id: 1, Name: 'Category 1' },
      { id: 2, Name: 'Category 2' },
    ];

    const wrapper = mount(ListTable, {
      props: {
        headers,
        rows,
      },
    });

    headers.forEach((header, index) => {
      const headers = wrapper.find('thead').findAll('th');

      expect(headers[index].attributes('width')).toContain(header.width);
      expect(headers[index].text()).toContain(header.value);
    });

    rows.forEach((row, index) => {
      const tableRows = wrapper.find('tbody').findAll('tr');
      const fields = tableRows[index].findAll('td');

      expect(fields[0].text()).toContain(rows[index].id);
      expect(fields[1].text()).toContain(rows[index].Name);
    });
  });
});
