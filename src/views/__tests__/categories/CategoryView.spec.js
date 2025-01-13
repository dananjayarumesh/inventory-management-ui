import { mount, flushPromises } from '@vue/test-utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CategoryView from '@/views/categories/CategoryView.vue';
import { useCategoryStore } from '@/stores/category';
import { deleteCategory as processDeleteCategory } from '@/services/categoryService';
import TopMenu from '@/components/TopMenu.vue';
import ListTable from '@/components/ListTable.vue';
import CategoryAddView from '@/views/categories/CategoryAddView.vue';
import { createPinia } from 'pinia';

vi.mock('@/components/TopMenu.vue', () => ({
  default: {
    name: 'TopMenu',
    template: '<div>TopMenu</div>'
  }
}));

vi.mock('@/components/ListTable.vue', () => ({
  default: {
    name: 'ListTable',
    template: '<div>ListTable</div><slot name="tools" :rowId="1"></slot>',
    props: ['headers', 'rows', 'loading'],
    emits: ['delete'],
    methods: {
      triggerDelete(id) {
        this.$emit('delete', id);
      }
    }
  }
}));

vi.mock('@/views/categories/CategoryAddView.vue', () => ({
  default: {
    name: 'CategoryAddView',
    template: '<div>CategoryAddView</div>',
    props: ['show'],
    emits: ['closed']
  }
}));

vi.mock('@/services/categoryService', () => ({
  deleteCategory: vi.fn()
}));

vi.mock('@/stores/category', () => ({
  useCategoryStore: vi.fn()
}));

describe('CategoryView', () => {
  let categoryStoreMock;

  beforeEach(() => {
    const pinia = createPinia();
    categoryStoreMock = {
      load: vi.fn(),
      categories: { value: [{ id: 1, name: 'Test Category' }] }
    };
    useCategoryStore.mockReturnValue(categoryStoreMock);
    mount(CategoryView, {
      global: {
        plugins: [pinia]
      }
    });
  });

  it('should render the component and display categories', async () => {
    const wrapper = mount(CategoryView);

    await flushPromises();

    expect(wrapper.find('button').text()).toBe('Add Category');
    expect(wrapper.findComponent(ListTable).exists()).toBe(true);
    expect(wrapper.findComponent(TopMenu).exists()).toBe(true);
    expect(wrapper.findComponent(CategoryAddView).exists()).toBe(true);
    const categories = wrapper.vm.categories;
    expect(categories).toEqual([{ id: 1, name: 'Test Category' }]);
  });

  it('should call deleteCategory when delete button is clicked', async () => {
    const wrapper = mount(CategoryView);
    processDeleteCategory.mockResolvedValue();
    await flushPromises();

    wrapper.findAll('button')[2].trigger('click');
    expect(processDeleteCategory).toHaveBeenCalledWith(1);
    expect(categoryStoreMock.load).toHaveBeenCalled();
  });

  it('should show the add category popup when the button is clicked', async () => {
    const wrapper = mount(CategoryView);
    expect(wrapper.vm.showAddPopup).toBe(false);
    
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.showAddPopup).toBe(true);
  });

  it.skip('should handle errors during deleteCategory', async () => {
    processDeleteCategory.mockRejectedValue(new Error('Delete failed'));
    const wrapper = mount(CategoryView);
    await flushPromises();

    await wrapper.findComponent(ListTable).vm.triggerDelete(1);
    const logSpy = vi.spyOn(console, 'log');
    expect(logSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
