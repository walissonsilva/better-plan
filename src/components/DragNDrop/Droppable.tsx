import { Draggable, Droppable as DroppableDND } from 'react-beautiful-dnd'

const grid = 8

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // userSelect: 'none',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,
  // background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle
})

const getListStyle = (isDraggingOver: any) => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  // padding: grid,
  // width: 250
})

interface DroppableProps {
  title: string
  subtitle: string
  items: {
    id: string
    title: string
  }[]
  droppableId: string
}

export function Droppable({
  items,
  droppableId,
  title,
  subtitle
}: DroppableProps) {
  return (
    <div className="bg-white flex-1">
      <div className="bg-gray-700 text-white px-1 py-3 text-center rounded-t-lg">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <h3 className="text-sm text-gray-300">{subtitle}</h3>
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
              <Draggable key={item.id} draggableId={item.id} index={index}>
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
                  >
                    <span className="text-base">{`Item: ${item.title}`}</span>
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
