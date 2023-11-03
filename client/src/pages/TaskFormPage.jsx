import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate,useParams } from "react-router-dom";

import { toast } from "react-hot-toast";

export function TaskFormPage() {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) =>{
      if (params.id) {
        await updateTask(params.id, data)
        toast.success('Tarea Actualizada!')
      } else {
        await createTask(data);
        toast.success('Tarea creada!')
      }
      navigate('/tasks');
    })

    useEffect(() => {
      async function loadTask() {
        if (params.id) {
          const {data} = await getTask(params.id)
          setValue('title', data.title)
          setValue('description', data.description)
        }
      }
      loadTask();
    }, []);

    return (
      <div>
        
        <form onSubmit={onSubmit}>
          <input type="text" placeholder='title' {...register('title', {required: true})}/>
          {errors.title && <span>Este campo es requerido</span>}
          <textarea rows="5" placeholder="Description" {...register('description', {required: true})}></textarea>
          {errors.description && <span>Este campo es requerido</span>}
          <button>Save</button>
        </form>

        {params.id && <button onClick={async()=>{
          const accepted = window.confirm('are you sure?')
          if (accepted) {
            await deleteTask(params.id)
            navigate('/tasks')
            toast.success('Tarea Eliminada!')
          }
        }}>Delete</button>}

      </div>
    )
  }
  