import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import TaskContainer from './components/taskContainer';
import Data from './services/Data';
import { PostTask, Task } from './interfaces/taskInterface';

function App() {
	const [taskList, setTaskList] = useState<Task[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(()=>{
		//To launch jsonserver : json-server --watch db.json --port 3001
		//Fonction annonyme immédiate
		(async ()=>{
			const data: Task[] = await Data.loadData();
			setTaskList(data)
		})()
	}, [])
	
	const handleTaskDone = (taskId:number) => {
		const modifiedTaskList = taskList.map(task => {
			task.id === taskId && (task.done = !task.done);
			Data.updateTask(task.id, {done : task.done})
			return task;
		})
		setTaskList(taskList => modifiedTaskList);
	}
	const handleTaskDelete = (taskId:number) => {
		Data.deleteTask(taskId);
		const modifiedTaskList = taskList.filter(task => task.id !== taskId)
		setTaskList(taskList => modifiedTaskList)
	}
	const handleNewTask =  async (e:React.MouseEvent) => {
		e.preventDefault();
		if (inputRef.current) {
			const text:string = inputRef.current.value;
			const order:number = [...taskList].sort((a, b) => b.order - a.order)[0].order +1;
			const postTask : PostTask = {"description": text, done: false,"order": order}
			const newTask: Task = await Data.addTask(postTask);
			const copyTaskList = [...taskList, newTask]
			setTaskList(copyTaskList);
			inputRef.current.value = "";
		}
	}
	const onTaskUp = (task:Task) => {
		const copyTaskList:Task[] = [...taskList].sort((a, b) => a.order - b.order);
		copyTaskList[copyTaskList.indexOf(task)-1].order ++;
		copyTaskList[copyTaskList.indexOf(task)].order--;
		setTaskList(taskList => copyTaskList);
		const t = copyTaskList[copyTaskList.indexOf(task)-1]
		Data.updateTask(t.id, {order : t.order})
		const t2 = copyTaskList[copyTaskList.indexOf(task)]
		Data.updateTask(t.id, {order : t.order})
	}
	const onTaskDown = (task:Task) => {
		const copyTaskList:Task[] = [...taskList].sort((a, b) => a.order - b.order);
		copyTaskList[copyTaskList.indexOf(task)+1].order--;
		copyTaskList[copyTaskList.indexOf(task)].order++;
		setTaskList(taskList => copyTaskList);
		const t = copyTaskList[copyTaskList.indexOf(task)+1]
		Data.updateTask(t.id, {order : t.order})
		const t2 = copyTaskList[copyTaskList.indexOf(task)]
		Data.updateTask(t.id, {order : t.order})
	}

	return (
		<div style={{margin:"2%"}} >
			<form action="" method="get" className='gap-2 d-flex align-items-stretch justify-content-center'>
				<label htmlFor="taskDescription" className="form-label m-0 fs-4">Tache :</label>
				<input type="text" className='rounded border border-1 px-2' id='taskDescription' ref={inputRef} name='taskDescription' placeholder='nom de votre tâche'/>
				<input type='submit' className="btn btn-primary" onClick={(e)=>handleNewTask(e)} value="Ajouter" />
			</form>
			<hr />
			<h1 className='text-center m-4'>Listes de taches</h1>
			<section style={{width:"80%"}} className=' d-flex gap-2 flex-column m-auto'>
				{taskList.sort((a, b) => a.order - b.order).map((task:Task) =>  <TaskContainer key={task.id} task={task} onTaskDone={() => handleTaskDone(task.id)} onTaskDelete={() => handleTaskDelete(task.id)} onTaskUp={()=>onTaskUp(task)} onTaskDown={()=>onTaskDown(task)}/>)}
			</section>
		</div>
	);
}

export default App;
