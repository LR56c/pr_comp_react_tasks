import { type FC, useEffect, useState } from "react"
import { useTasks }                from "../hooks/use_tasks"
import type { Task }               from "../modules/domain/task"
import { TaskCard }                from "./task_card"

export const TasksList: FC = () => {
  const { tasks, getTasks, removeTask } = useTasks()

  const [isLoading, setIsLoading] = useState( true )
  useEffect( () => {
    const fetchData = async () => {
      try {
        await getTasks()
      }
      catch ( error ) {
        console.error( "Error fetching data:", error )
      }
      finally {
        setIsLoading( false )
      }
    }
    fetchData()
  }, [] )


  const handleDelete = async ( task: Task ) => {
    await removeTask( task )
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold mb-4">Tareas</h2>
        { !isLoading && tasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas pendientes</p>
        ) : null }
        { !isLoading && tasks.length > 0 ? (
          <>
            { tasks.map( ( task ) => (
              <TaskCard onDelete={ p => handleDelete( p ) }
                           key={ task.name }
                           task={ task }></TaskCard>
            ) ) }
          </>
        ) : null }
        { isLoading ? (
          <div className="flex justify-center items-center">Cargando...</div>
        ) : null }
      </div>
    </>
  )
}
