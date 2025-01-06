import { mount, flushPromises } from '@vue/test-utils';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import CategoryAddView from '@/views/categories/CategoryAddView.vue';
import { submitCategory } from '@/services/categoryService';
import { useCategoryStore } from '@/stores/category';
import AppModal from '@/components/AppModal.vue';

vi.mock('@/services/categoryService', () => ({
  submitCategory: vi.fn(),
}));

vi.mock('@/stores/category', () => ({
  useCategoryStore: vi.fn()
}));

vi.mock('@/components/AppModal.vue', () => ({
  default: {
    name: 'AppModal',
    template: '<div><slot name="content"></slot><slot name="footer"></slot></div>',
    props: ['show'],
    emits: ['closed'],
  },
}));

describe('CategoryAddView', () => {
  let categoryStoreMock;

  beforeEach(() => {
    categoryStoreMock = {
      load: vi.fn(),
    };
    useCategoryStore.mockReturnValue(categoryStoreMock);
  });

  it('should render modal and form', () => {
    const wrapper = mount(CategoryAddView, {
      props: {
        show: true,
      },
    });
    expect(wrapper.findComponent(AppModal).exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input#name').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('should close modal and reset form when "Cancel" is clicked', async () => {
    const wrapper = mount(CategoryAddView, {
      props: {
        show: true,
      },
    });
    wrapper.vm.nameError = 'test error';
    await wrapper.find('button[type="button"]').trigger('click');

    expect(wrapper.emitted().closed).toBeTruthy();
    expect(wrapper.vm.nameError).toBe('');
  });

  it('should submit category data when form is submitted successfully', async () => {
    const wrapper = mount(CategoryAddView, {
      props: {
        show: true,
      },
    });
    submitCategory.mockResolvedValueOnce();

    await wrapper.find('input#name').setValue('New Category');

    await wrapper.find('form').trigger('submit.prevent');

    await flushPromises();

    expect(submitCategory).toHaveBeenCalledWith('New Category');

    expect(categoryStoreMock.load).toHaveBeenCalled();
    expect(wrapper.emitted().closed).toBeTruthy();
  });

  it('should show error message if submitCategory fails', async () => {
    const wrapper = mount(CategoryAddView, {
      props: {
        show: true,
      },
    });
    submitCategory.mockRejectedValueOnce({
      response: {
        status: 422,
        data: {
          errors: {
            name: ['Name is required'],
          },
        },
      },
    });
    await wrapper.find('input#name').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(wrapper.find('.text-red-500').text()).toBe('Name is required');
  });

  it('should reset form after submission', async () => {
    const wrapper = mount(CategoryAddView, {
      props: {
        show: true,
      },
    });
    await wrapper.find('input#name').setValue('New Category');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(wrapper.vm.name).toBe('');
  });
});
