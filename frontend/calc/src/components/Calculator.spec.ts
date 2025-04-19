import { mount } from '@vue/test-utils'
import Calculator from '../components/Calculator.vue'
import { describe, it, expect, vi } from 'vitest'

describe('Calculator.vue', () => {
  it('renders calculator correctly', () => {
    const wrapper = mount(Calculator)
    expect(wrapper.find('.calculator').exists()).toBe(true)
  })

  it('updates expression when buttons are clicked', async () => {
    const wrapper = mount(Calculator)
    const btnA = wrapper.get('[data-test="btn-A"]')
    await btnA.trigger('click')
    expect(wrapper.text()).toContain('A')
  })

  it('clears expression and result', async () => {
    const wrapper = mount(Calculator)
    await wrapper.get('[data-test="btn-A"]').trigger('click')
    await wrapper.get('[data-test="btn-clear"]').trigger('click')
  
    expect(wrapper.find('.expression').text()).toBe('')
    expect(wrapper.find('.result').text()).toBe('')
  })

  it('handles DEL correctly', async () => {
    const wrapper = mount(Calculator)
    const btn1 = wrapper.get('[data-test="btn-1"]')
    const del = wrapper.get('[data-test="btn-del"]')
    await btn1.trigger('click')
    await btn1.trigger('click')
    await del.trigger('click')
    expect(wrapper.text()).toContain('1') // Should have one "1"
  })

  it('calculates expression on "=" click', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ result: '2' }),
    } as any)

    const wrapper = mount(Calculator)
    await wrapper.get('[data-test="btn-1"]').trigger('click')
    await wrapper.get('[data-test="btn-plus"]').trigger('click')
    await wrapper.get('[data-test="btn-1"]').trigger('click')
    await wrapper.get('[data-test="btn-equals"]').trigger('click')

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(wrapper.text()).toContain('2')
  })
})
