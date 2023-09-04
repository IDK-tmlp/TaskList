export interface PostTask {
	description:string,
	done:boolean,
	order:number
}

export interface Task extends PostTask{
	id:number,
}

export interface UpdatedTask {
	description?:string,
	done?:boolean,
	order?:number
}
