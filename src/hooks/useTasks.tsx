import { createContext, useContext, useState } from 'react'
import { ITask } from '../types/ITask'
import { getISODate } from '../utils/dates'

export interface ITasks {
  [key: string]: ITask[]
}

interface TasksContextData {
  tasks: ITasks
  addTask(title: string, date: Date): void
  updateTasks(tasks: ITasks): void
}

const TasksContext = createContext({} as TasksContextData)

interface TasksProviderProps {
  children: React.ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState({} as ITasks)

  function addTask(title: string, date: Date) {
    const stringDate = getISODate(date)

    setTasks({
      ...tasks,
      [stringDate]: [
        ...(tasks[stringDate] ?? []),
        {
          id: new Date().getTime(),
          title,
          date: getISODate(date),
          isDone: false
        }
      ]
    })
  }

  function updateTasks(tasks: ITasks) {
    setTasks(tasks)
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (!context)
    throw new Error('useTasks must be used inside of a TasksProvider')

  return context
}
