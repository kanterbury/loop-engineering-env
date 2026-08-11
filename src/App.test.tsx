import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('見出しが表示される', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Loop Engineering Env' }),
    ).toBeInTheDocument()
  })
})
