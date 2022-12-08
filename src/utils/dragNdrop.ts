import { DropResult } from 'react-beautiful-dnd'
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
    // const result = move(
    //   getList(source.droppableId),
    //   getList(destination.droppableId),
    //   source,
    //   destination
    // );

    // const itemsUpdated = Object.keys(items).reduce(
    //   (itemsUpdated, droppableId: string) => ({
    //     ...itemsUpdated,
    //     [droppableId]: result[droppableId] ?? items[droppableId],
    //   }),
    //   {}
    // ) as IItem;

    // setItems(itemsUpdated);
  }
}
