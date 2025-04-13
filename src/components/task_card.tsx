import { type  FC }                      from "react"
import { MdDeleteOutline }               from "react-icons/md"
import type { Task }                     from "../modules/domain/task"
import { FcHighPriority, FcLowPriority } from "react-icons/fc"

interface TaskCardProps {
  task: Task
  onDelete: ( project: Task ) => void
}

const formatDate = ( date: string ) => {
  let options: Intl.DateTimeFormatOptions = {
    day : "numeric", month: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  }

  const validDate = new Date( date )
  return validDate.toLocaleDateString( "es-ES", options )
}

export const TaskCard: FC<TaskCardProps> = ( { task, onDelete } ) => {
  return (
    <div
      className="flex flex-col border border-slate-200 rounded-xl p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          { task.prioritize === "high" ? (
            <FcHighPriority/>
          ) : null }
          { task.prioritize === "low" ? (
            <FcLowPriority/>
          ) : null }
          <span className="text-lg font-bold">{ task.name }</span>
        </div>
        <button onClick={ () => onDelete( task ) }
                className="cursor-pointer flex items-center justify-center bg-red-300 rounded p-1 w-8 h-8">
          <MdDeleteOutline className="text-white"/>
        </button>
      </div>
      <span className="text-slate-400">Creado: { formatDate(
        task.createdAt ) }</span>
      <span className="text-slate-400">Fecha limite: { formatDate(
        task.limitDate ) }</span>
    </div>
  )
}
