import { Task } from "../interfaces/taskInterface";
import { BiSolidDownArrowAlt, BiSolidUpArrowAlt, BiSolidCheckCircle, BiTrash, BiSolidPencil } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

interface TaskContainerprops {
	task: Task,
	onTaskDone: () => void,
	onTaskDelete: () => void,
	onTaskUp: () => void,
	onTaskDown: () => void,
}

const TaskContainer = (props : TaskContainerprops) => {

	return (
		<section className="d-flex align-items-center justify-content-between border border-dark rounded-pill p-4">
			<h2 className="fs-4" style={props.task.done? {textDecorationLine:"line-through"} : {}}>{props.task.description}</h2>
			<div className="d-flex align-items-center gap-3">
				{props.task.done ?
					<GiCancel onClick={props.onTaskDone} color="red" size={40} role="button"/> :
					<BiSolidCheckCircle color="green" size={40} onClick={props.onTaskDone} role="button"/>
				}
				<BiSolidPencil onClick={()=>alert("Edit")} color="grey" size={40} role="button"/>
				<BiTrash onClick={props.onTaskDelete} color="red" size={40} role="button"/>
				<span style={{display:"flex", flexDirection: "column"}}>
					{props.task.order !== 1 && <BiSolidUpArrowAlt onClick={props.onTaskUp} size={40} role="button"/>}
					<BiSolidDownArrowAlt onClick={props.onTaskDown} size={40} role="button"/>
				</span>
			</div>
		</section>
	);
}

export default TaskContainer;