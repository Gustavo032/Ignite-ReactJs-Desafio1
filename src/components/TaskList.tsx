import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    // verificando se o valor(titulo) do input é vazio e cancelando a execução do codigo se for true
    if(!newTaskTitle) return;

    // a task criada
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }    

    // callback pegando o valor antigo da task e adicionando o valor atual
    setTasks(oldState => [...oldState, newTask]);

    // retornando o valor(titulo) do input pro padrão(vazio)
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // alterando o valor do "isComplete" do objeto task 
    const newTasksSituation = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete 
    } : task)

    // adicionando a modificação às tasks
    setTasks(newTasksSituation)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
   
    // filtrando e deixando só as tasks com o id diferente
    const filteredTasks = tasks.filter(task => task.id !== id)

    // adicionando a modificação
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}