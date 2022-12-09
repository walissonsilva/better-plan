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
  removeTask(date: Date, taskId: number): void
  updateTaskStatus(date: Date, taskId: number): void
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

  function removeTask(date: Date, taskId: number) {
    setTasks({
      ...tasks,
      [getISODate(date)]: tasks[getISODate(date)].filter(
        task => task.id !== taskId
      )
    })
  }

  function updateTaskStatus(date: Date, taskId: number) {
    setTasks({
      ...tasks,
      [getISODate(date)]: tasks[getISODate(date)].map(task => ({
        ...task,
        isDone: task.id === taskId ? !task.isDone : task.isDone
      }))
    })
  }

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTasks, removeTask, updateTaskStatus }}
    >
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
