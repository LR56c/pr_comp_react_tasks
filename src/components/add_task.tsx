import { type FC, useState }  from "react"
import { useValidation } from "react-simple-form-validator"
import { useTasks }      from "../hooks/use_tasks"

const parseRuleMessage      = ( rule: string ) => {
  switch ( rule ) {
    case "required":
      return "Este campo es obligatorio"
    case "date":
      return "El campo debe ser una fecha válida"
    default:
      return ""
  }
}
export const AddTask: FC = () => {
  const [name, setName]           = useState( "" )
  const [date, setDate]           = useState( "" )
  const [isTouched, setIsTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const tasks                      = useTasks()

  const { isFormValid, getFailedRulesInField } = useValidation( {
    fieldsRules: {
      name       : { required: true },
      date: { required: true, date: true }
    },
    state      : { name, date }
  } )

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()
    if(!isTouched){
      setIsTouched(true)
    }
    if ( !isFormValid ) {
      return
    }
    setIsLoading( true )
    const result = await tasks.addTask( name, date )
    setIsLoading( false )
    if(!result){
      alert("Error al crear la tarea. Intente nuevamente")
      return
    }
    alert( "Tarea creada exitosamente!" )
    setName( "" )
    setDate( "" )
    setIsTouched(false)
  }

  return (
    <form className="flex flex-col gap-4 w-full max-w-lg"
          onSubmit={ handleSubmit }>
      <div className="flex flex-col">
        <label htmlFor="name"
               className="block mb-2 text-sm font-medium text-gray-900">Tarea:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={ name }
          onChange={ ( e ) => {
            setName( e.target.value )
            setIsTouched(true)
          } }
        />
        { isTouched ? getFailedRulesInField( "name" ).map( ( error, index ) => (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                key={ index }>{ parseRuleMessage( error ) }</span>
        ) ) : null }
      </div>
      <div className="flex flex-col">
        <label htmlFor="fecha"
               className="block mb-2 text-sm font-medium text-gray-900">Fecha limite (formato: año-mes-dia)</label>
        <input
          type="text"
          name="fecha"
          id="fecha"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={ date }
          onChange={ ( e ) => {
            setDate( e.target.value )
            setIsTouched(true)
          }}
        />
        { isTouched ? getFailedRulesInField( "date" ).map( ( error, index ) => (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                key={ index }>{ parseRuleMessage( error ) }</span>
        ) ) : null}
      </div>
      <button disabled={isLoading} className="bg-slate-300 font-medium rounded py-3 px-6 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-50"
              type="submit">Enviar
      </button>
    </form>
  )
}
