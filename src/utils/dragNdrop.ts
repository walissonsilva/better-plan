import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { ITasks } from '../hooks/useTasks'

function reorder(
  tasks: ITasks,
  droppableId: string,
  sourceIndex: number,
  destinationIndex: number
) {
  const result = Array.from(tasks[droppableId] ?? [])
  const [removed] = result.splice(sourceIndex, 1)
  result.splice(destinationIndex, 0, removed)

  return {
    ...tasks,
    [droppableId]: result
  }
}

const move = (
  tasks: ITasks,
  sourceId: string,
  destinationId: string,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = tasks[sourceId] ?? []
  const destClone = tasks[destinationId] ?? []
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  return {
    ...tasks,
    [sourceId]: sourceClone,
    [destinationId]: destClone
  }
}

export function onDragEnd(
  result: DropResult,
  tasks: ITasks,
  updateTasks: (tasks: ITasks) => void
) {
  const { source, destination } = result

  if (!destination) {
    return
  }

  if (source.droppableId === destination.droppableId) {
    const tasksReordered = reorder(
      tasks,
      source.droppableId,
      source.index,
      destination.index
    )

    updateTasks(tasksReordered)
  } else {
    console.log('move')
    const result = move(
      tasks,
      source.droppableId,
      destination.droppableId,
      source,
      destination
    )

    updateTasks(result)
  }
}
