import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import type { AppData } from '../types'
import { generateMockData } from '../data/mockData'

interface DataContextType {
  data: AppData
  updateData: (newData: AppData) => void
  refreshData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

function loadData(): AppData {
  const stored = localStorage.getItem('luxcondo_data')
  if (stored) return JSON.parse(stored)
  const data = generateMockData()
  localStorage.setItem('luxcondo_data', JSON.stringify(data))
  return data
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData)

  const updateData = useCallback((newData: AppData) => {
    setData(newData)
    localStorage.setItem('luxcondo_data', JSON.stringify(newData))
  }, [])

  const refreshData = useCallback(() => {
    setData(loadData())
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('luxcondo_data')
    if (!stored) {
      const data = generateMockData()
      localStorage.setItem('luxcondo_data', JSON.stringify(data))
      setData(data)
    }
  }, [])

  return (
    <DataContext.Provider value={{ data, updateData, refreshData }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
