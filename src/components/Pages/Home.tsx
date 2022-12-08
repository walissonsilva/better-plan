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

  return (
    <main className="p-4 lg:p-8">
      <div className="flex items-center justify-between py-4 mb-4">
        <button onClick={() => addDayToDateOnFocus(-1)}>
          <MdArrowBackIos />
        </button>
        <button onClick={() => addDayToDateOnFocus(1)}>
          <MdArrowForwardIos />
        </button>
      </div>
      <section className="flex gap-1 w-full items-end">
        <DragDropContext onDragEnd={() => {}}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Droppable
              key={addDays(dateOnFocus, idx - 2).getTime()}
              title={format(addDays(dateOnFocus, idx - 2), 'eeee')}
              isToday={isToday(addDays(dateOnFocus, idx - 2))}
              subtitle={format(addDays(dateOnFocus, idx - 2), 'dd/MM/yy')}
              items={[
                { id: 'task-1', title: 'terminar' },
                { id: 'task-2', title: 'dormir' }
              ]}
              droppableId={String(addDays(dateOnFocus, idx - 2).getTime())}
            />
          ))}
          {/* <Droppable
            title="Monday"
            subtitle="05/12/2022"
            items={[
              { id: 'task-1', title: 'terminar' },
              { id: 'task-2', title: 'dormir' }
            ]}
            droppableId="1"
          />
          <Droppable
            title="Tuesday"
            subtitle="06/12/2022"
            items={[
              { id: 'task-1', title: 'terminar' },
              { id: 'task-2', title: 'dormir' }
            ]}
            droppableId="1"
          />
          <Droppable
            title={format(dateOnFocus, 'eeee')}
            subtitle={format(dateOnFocus, 'dd/MM/yy')}
            items={[
              { id: 'task-1', title: 'terminar' },
              { id: 'task-2', title: 'dormir' }
            ]}
            droppableId="1"
          />
          <Droppable
            title="Thursday"
            subtitle="08/12/2022"
            items={[
              { id: 'task-1', title: 'terminar' },
              { id: 'task-2', title: 'dormir' }
            ]}
            droppableId="1"
          />
          <Droppable
            title="Friday"
            subtitle="09/12/2022"
            items={[
              { id: 'task-1', title: 'terminar' },
              { id: 'task-2', title: 'dormir' }
            ]}
            droppableId="1"
          /> */}
        </DragDropContext>
      </section>
    </main>
  )
}
