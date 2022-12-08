import { addDays, format, isToday } from 'date-fns'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { useTasks } from '../../hooks/useTasks'
import { getISODate } from '../../utils/dates'
import { onDragEnd } from '../../utils/dragNdrop'
import { Droppable } from '../DragNDrop/Droppable'

export const HomePage: React.FC = () => {
  const today = new Date()
  const [dateOnFocus, setDateOnFocus] = useState(today)
  const { tasks, updateTasks } = useTasks()

  function addDayToDateOnFocus(addition: 1 | -1) {
    setDateOnFocus(addDays(dateOnFocus, addition))
  }

  function renderDayDroppable(date: Date) {
    return (
      <Droppable
        key={date.getTime()}
        isToday={isToday(date)}
        dayOfWeek={format(date, 'eeee')}
        date={date}
        items={tasks[getISODate(date)] ?? []}
        droppableId={getISODate(date)}
      />
    )
  }

  return (
    <main className="p-4 lg:p-8">
      <div className="flex items-center justify-between py-4 mb-4">
        <button onClick={() => addDayToDateOnFocus(-1)}>
          <MdArrowBackIos size={20} />
        </button>
        <button onClick={() => addDayToDateOnFocus(1)}>
          <MdArrowForwardIos size={20} />
        </button>
      </div>
      <section className="flex gap-1 w-full items-start">
        <DragDropContext
          onDragEnd={result => onDragEnd(result, tasks, updateTasks)}
        >
          {Array.from({ length: 5 }).map((_, idx) =>
            renderDayDroppable(addDays(dateOnFocus, idx - 2))
          )}
        </DragDropContext>
      </section>
    </main>
  )
}
