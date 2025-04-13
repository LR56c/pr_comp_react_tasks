import { useState }  from "react"
import axios         from "axios"
import {
  FirebaseFirestoreTasksData
}                    from "../modules/infrastructure/firebase_firestore_tasks_data"
import {
  FirebaseFunctionsTasksData
}                    from "../modules/infrastructure/firebase_functions_tasks_data"
import type { Task } from "../modules/domain/task"

export function useTasks() {
  const firestoreRepo     = new FirebaseFirestoreTasksData()
  const functionsRepo     = new FirebaseFunctionsTasksData()
  const [tasks, setTasks] = useState<Task[]>( [] )
  const addTask           = async ( name: string,
    limit: string ) => {
    const randomNumber = Math.floor( Math.random() * 200 )
    const jsonResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${ randomNumber }` )
    if ( jsonResponse.status !== 200 ) {
      return false
    }
    const json             = jsonResponse.data
    const id               = json.id.toString()
    const clamp: number    = Math.max( 1, Math.min( json.userId, 100 ) )
    const randomPrioritize = clamp > 50 ? "high" : "low"
    const task: Task       = {
      id,
      name,
      createdAt : new Date().toISOString(),
      limitDate : new Date( limit ).toISOString(),
      prioritize: randomPrioritize
    }

    return await firestoreRepo.create( task )
  }

  const getTasks = async () => {
    const tasks = await firestoreRepo.getAll()
    setTasks( tasks )
  }

  const removeTask = async ( task: Task ) => {
    const result = await functionsRepo.delete( task )
    // const result = await firestoreRepo.delete( task )
    if ( result ) {
      setTasks( tasks.filter( p => p.id !== task.id ) )
    }
  }

  return { tasks, addTask, getTasks, removeTask }
}
