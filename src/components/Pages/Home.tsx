import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from '../DragNDrop/Droppable'

export const HomePage: React.FC = () => {
  return (
    <main className="max-w-7xl p-4 lg:p-8 mx-auto">
      <section className="flex gap-1 w-full">
        <DragDropContext onDragEnd={() => {}}>
          <Droppable
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
            title="Wednesday"
            subtitle="07/12/2022"
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
          />
        </DragDropContext>
      </section>
    </main>
  )
}
