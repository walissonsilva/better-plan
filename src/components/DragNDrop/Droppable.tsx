import { format } from 'date-fns'
import { Draggable, Droppable as DroppableDND } from 'react-beautiful-dnd'
import { ITask } from '../../types/ITask'
import { FiPlus, FiTrash, FiTrash2 } from 'react-icons/fi'
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
  const { addTask, removeTask } = useTasks()

  function handleAddNewTask() {
    const title = prompt('Qual é o nome da tarefa?')

    if (title) addTask(title, date)
  }

  function handleRemoveTask(taskId: number) {
    const confirmation = confirm('Tem certeza que deseja remover a tarefa?')

    if (confirmation) removeTask(date, taskId)
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
            className="flex flex-col gap-1 min-h-[200px] mt-1"
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
                    className=" border-gray-300 border-[1px] rounded-md px-2 py-2 flex items-center justify-between"
                  >
                    <span className="text-base flex-1">{`${item.title}`}</span>
                    <button
                      className="pl-2 cursor-pointer hover:text-red-600 transition-colors"
                      onClick={() => handleRemoveTask(item.id)}
                    >
                      <FiTrash2 />
                    </button>
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
