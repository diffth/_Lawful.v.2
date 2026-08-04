import React, { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'lawful.consult'
const Ctx = createContext(null)

export function ConsultProvider({ children }) {
  const [summary, setSummary] = useState('')
  const [field, setField] = useState('')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw)
        setSummary(v.summary || '')
        setField(v.field || '')
      }
    } catch { /* 저장소 접근 불가 시 무시 */ }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ summary, field }))
    } catch { /* 저장소 접근 불가 시 무시 */ }
  }, [summary, field])

  return (
    <Ctx.Provider value={{ summary, setSummary, field, setField }}>
      {children}
    </Ctx.Provider>
  )
}

export function useConsult() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useConsult must be used inside ConsultProvider')
  return v
}
