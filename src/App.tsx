import "./App.css"
import { useState }  from "react"
import { TasksList } from "./components/tasks_list"
import { AddTask }   from "./components/add_task"

function App() {
  const [addProjectEnabled, setAddProjectEnabled] = useState( false )
  return (
    <>
      <div className="h-dvh flex gap-4 p-4">
        <TasksList></TasksList>
        <div className="w-full gap-4 flex flex-col items-center">
          <button onClick={ () => setAddProjectEnabled( !addProjectEnabled ) }
                  className="bg-green-300 font-medium rounded py-3 px-6 cursor-pointer">Agregar
            Tarea
          </button>
          { addProjectEnabled ? (
            <AddTask></AddTask>
          ) : null }
        </div>
      </div>
    </>
  )
}

export default App
