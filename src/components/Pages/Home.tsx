import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { format, addDays, isToday } from 'date-fns'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { Droppable } from '../DragNDrop/Droppable'

export const HomePage: React.FC = () => {
  const today = new Date()
  const [dateOnFocus, setDateOnFocus] = useState(today)

  function addDayToDateOnFocus(addition: 1 | -1) {
    setDateOnFocus(addDays(dateOnFocus, addition))
  }

  function renderDayDroppable(date: Date) {
    return (
      <Droppable
        key={date.getTime()}
        title={format(date, 'eeee')}
        isToday={isToday(date)}
        subtitle={format(date, 'dd/MM/yy')}
        items={[
          { id: 'task-1', title: 'terminar' },
          { id: 'task-2', title: 'dormir' }
        ]}
        droppableId={String(date.getTime())}
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
      <section className="flex gap-1 w-full items-end">
        <DragDropContext onDragEnd={() => {}}>
          {Array.from({ length: 5 }).map((_, idx) =>
            renderDayDroppable(addDays(dateOnFocus, idx - 2))
          )}
        </DragDropContext>
      </section>
    </main>
  )
}
