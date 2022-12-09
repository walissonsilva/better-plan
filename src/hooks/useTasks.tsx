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
  loadTasks(): void
}

const TasksContext = createContext({} as TasksContextData)

interface TasksProviderProps {
  children: React.ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState({} as ITasks)

  function loadTasks() {
    const tasksOnStorage = localStorage.getItem('@better-plan/tasks')
    if (tasksOnStorage) {
      setTasks(JSON.parse(tasksOnStorage))
    }
  }

  function addTask(title: string, date: Date) {
    const stringDate = getISODate(date)

    const newTasks = {
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
    }

    setTasks(newTasks)
    localStorage.setItem('@better-plan/tasks', JSON.stringify(newTasks))
  }

  function updateTasks(tasks: ITasks) {
    setTasks(tasks)
    localStorage.setItem('@better-plan/tasks', JSON.stringify(tasks))
  }

  function removeTask(date: Date, taskId: number) {
    const newTasks = {
      ...tasks,
      [getISODate(date)]: tasks[getISODate(date)].filter(
        task => task.id !== taskId
      )
    }
    setTasks(newTasks)

    localStorage.setItem('@better-plan/tasks', JSON.stringify(newTasks))
  }

  function updateTaskStatus(date: Date, taskId: number) {
    const newTasks = {
      ...tasks,
      [getISODate(date)]: tasks[getISODate(date)].map(task => ({
        ...task,
        isDone: task.id === taskId ? !task.isDone : task.isDone
      }))
    }
    setTasks(newTasks)

    localStorage.setItem('@better-plan/tasks', JSON.stringify(newTasks))
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTasks,
        removeTask,
        updateTaskStatus,
        loadTasks
      }}
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
