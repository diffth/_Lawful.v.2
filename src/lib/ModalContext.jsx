import React, { createContext, useCallback, useContext, useState } from 'react'

const Ctx = createContext(null)

export function ModalProvider({ children }) {
  const [key, setKey] = useState(null)
  const open = useCallback(k => setKey(k), [])
  const close = useCallback(() => setKey(null), [])
  return <Ctx.Provider value={{ key, open, close }}>{children}</Ctx.Provider>
}

export function useModal() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useModal must be used inside ModalProvider')
  return v
}
