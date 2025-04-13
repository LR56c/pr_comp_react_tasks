import { firebase } from "../../../firebase"
import type { Task }                   from "../domain/task"
import { getFunctions, httpsCallable } from "@firebase/functions"
import type { TaskRepository } from "../domain/tasks_repository"

export class FirebaseFunctionsTasksData implements TaskRepository {
  async create( task: Task ): Promise<boolean> {
    return false
  }

  async delete( task: Task ): Promise<boolean> {
    try {
      const functions     = getFunctions( firebase )
      const removeMessage = httpsCallable( functions, "removeMessage" )
      await removeMessage( { name: task.name, id: task.id } )
      return true
    }
    catch ( e ) {
      return false
    }
  }

  async getAll(): Promise<Task[]> {
    return []
  }

}
