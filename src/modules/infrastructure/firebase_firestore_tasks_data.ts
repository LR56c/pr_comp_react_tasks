import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc
}                         from "firebase/firestore"
import { firebase }       from "../../../firebase"
import type { TaskRepository } from "../domain/tasks_repository"
import type { Task } from "../domain/task"

export class FirebaseFirestoreTasksData implements TaskRepository {
  private readonly db

  constructor() {
    this.db = collection( getFirestore( firebase ), "tasks" )
  }

  async create( task: Task ): Promise<boolean> {
    try {
      const docRef = doc( this.db, `${ task.name }-${ task.id }` )
      await setDoc( docRef, task )
      return true
    }
    catch ( e ) {
      console.log( "Error creating task", e )
      return false
    }
  }

  async delete( task: Task ): Promise<boolean> {
    try {
      const docRef = doc( this.db, `${ task.name }-${ task.id }` )
      await deleteDoc( docRef )
      return true

    }
    catch ( e ) {
      console.log( "Error deleting task", e )
      return false
    }
  }

  async getAll(): Promise<Task[]> {
    try {

      const tasks: Task[] = []
      const query         = await getDocs( this.db )
      query.forEach( result => {
        tasks.push( result.data() as Task )
      } )
      return tasks
    }
    catch ( e ) {
      console.log( "Error getting tasks", e )
      return []
    }
  }

}
