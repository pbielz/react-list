// import { Header } from "./components/header";
// import {Aluno} from "./components/aluno";
// import { Footer } from "./components/footer";
import {useState, useEffect, useRef, useMemo, useCallback} from 'react'


export default function App(){

  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender =useRef(true)
const [input, setInput] = useState("");
const [tasks, setTasks] = useState<string[]>([])

const[ editTask, setEditTask] = useState({
  enabled:false,
  task:''
})

const [teste, setTest] = useState(false);

useEffect(() => {
const tarefaSalvas = localStorage.getItem("@pedroreact")

if(tarefaSalvas){
  setTasks(JSON.parse(tarefaSalvas));
}
}, [])

useEffect(() => {
  if(firstRender.current)
  {
    firstRender.current= false;
    return;
  }
  localStorage.setItem("@pedroreact", JSON.stringify(tasks) )

}, [tasks]);


const handleRegister = useCallback(() => {
if(!input){
  alert("Preencha o nome da sua tarefa!")
  return;
}
if(editTask.enabled){
  handleSaveEdit();
  return;
}

setTasks(tarefas => [...tarefas, input])
setInput("")
},[input,tasks])



function handleSaveEdit(){
  const findIndexTask = tasks.findIndex(task => task ===editTask.task)
const allTasks = [...tasks];

allTasks[findIndexTask] = input;
setTasks(allTasks);

setEditTask({
  enabled: false,
  task:''
})
setInput("")
localStorage.setItem("@pedroreact", JSON.stringify(allTasks) )

}

 function handleDelete(item: string){
  const removeTask = tasks.filter(task => task !== item)
setTasks(removeTask)
localStorage.setItem("@pedroreact", JSON.stringify(removeTask) )

}

function handleEdit(item:string){

  inputRef.current?.focus();
setInput(item)
setEditTask({
  enabled: true,
  task: item
})
}

const totalTarefas = useMemo(()=> {
return tasks.length
},[tasks])
//----------------------------------------- -----------------------------------
  return(
    <div> 
      <button onClick={ () => setTest(true)}>Clicar</button>
<h1>Lista de tarefas</h1>
<input 
placeholder='Digite o nome da tarefa'
value={input}
onChange={(e) => setInput(e.target.value)}
ref={inputRef}
/>
<button onClick={handleRegister}>
  {editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}
</button>

<hr/>
<strong>Você tem {totalTarefas} tarefas!</strong>
<br/><br/>
{tasks.map((item, index) => (
  <section key={item}>
    <span>{item }</span>
        <button onClick={() => handleEdit(item)}>Editar</button>
    <button onClick={() => handleDelete(item)}>Excluir</button>
  </section>
))}

    </div>
  )


}

