import { format } from 'date-fns'
import { Draggable, Droppable as DroppableDND } from 'react-beautiful-dnd'
import { ITask } from '../../types/ITask'
import { FiPlus } from 'react-icons/fi'
import { useTasks } from '../../hooks/useTasks'

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  ...draggableStyle
})

const getListStyle = (isDraggingOver: any) => ({})

interface DroppableProps {
  dayOfWeek: string
  date: Date
  items: ITask[]
  droppableId: string
  isToday?: boolean
}

export function Droppable({
  items,
  droppableId,
  dayOfWeek,
  date,
  isToday
}: DroppableProps) {
  const { addTask } = useTasks()

  function handleAddNewTask() {
    const title = prompt('Qual é o nome da tarefa?') || ''
    addTask(title, date)
  }

  return (
    <div className="bg-white flex-1">
      <div
        className={`${
          isToday
            ? 'bg-indigo-700 text-white border-[1px] border-indigo-700'
            : 'border-[1px] border-gray-500 bg-gray-300 text-black'
        }  px-8 py-3 rounded-t-lg flex justify-between items-center`}
      >
        <div>
          <h2 className="text-xl font-semibold mb-2">{dayOfWeek}</h2>
          <h3
            className={`text-sm ${isToday ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {format(date, 'dd LLL yyyy')}
          </h3>
        </div>

        <button
          className={`rounded-full p-2 ${
            isToday ? 'bg-indigo-400' : 'bg-gray-200'
          } hover:brightness-125 transition-all`}
          onClick={handleAddNewTask}
        >
          <FiPlus color="black" />
        </button>
      </div>

      <DroppableDND droppableId={droppableId} isDropDisabled={false}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className="flex flex-col gap-1"
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={String(item.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    className=" border-b-gray-300 border-b-[1px] px-1 py-2"
                    onClick={() => alert('Opa')}
                  >
                    <span className="text-base">{`${item.title}`}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </DroppableDND>
    </div>
  )
}
