import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import { Gauge } from 'src'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Container renders correctly', () => {
    render(<Gauge />, node, () => {
      expect(node.innerHTML).toContain('<div class="rag-container"')
    })
  })

  it('Gauge shows value', () => {
    render(<Gauge value={123456} />, node, () => {
      expect(node.innerHTML).toContain('123456')
    })
  })
})
