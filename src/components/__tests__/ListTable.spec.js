import { mount } from '@vue/test-utils';
import ListTable from '@/components/ListTable.vue';
import { describe, it, expect } from 'vitest';

describe('ListTable', () => {
  it('renders table with headers and rows', () => {
    const headers = ['ID', 'Name'];
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

    headers.forEach(header => {
      expect(wrapper.text()).toContain(header);
    });

    rows.forEach(row => {
      expect(wrapper.text()).toContain(row.Name);
    });
  });

  it('emits edit event with row id when edit button is clicked', async () => {
    const headers = ['ID', 'Name'];
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

    await wrapper.findAll('button.bg-blue-500').at(0).trigger('click');
    expect(wrapper.emitted('edit')[0]).toEqual([1]);
  });

  it('emits delete event with row id when delete button is clicked', async () => {
    const headers = ['ID', 'Name'];
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

    await wrapper.findAll('button.bg-red-500').at(0).trigger('click');
    expect(wrapper.emitted('delete')[0]).toEqual([1]);
  });
});
