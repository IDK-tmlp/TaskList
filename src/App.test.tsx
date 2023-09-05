import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { switchTask } from './utils/utils';
import { Task } from './interfaces/taskInterface';

// test('renders learn react link', () => {
// 	render(<App />);
// 	const linkElement = screen.getByText(/learn react/i);
// 	expect(linkElement).toBeInTheDocument();
// });

const t1:Task = {
	"description": "Sports",
	"done": false,
	"order": 1,
	"id": 1
}
const t2:Task = {
	"description": "Sieste",
	"done": false,
	"order": 3,
	"id": 2
}
const t3:Task = {
	"description": "Comer",
	"done": false,
	"order": -3,
	"id": 2
}
const taskList:Task[] = [ {...t1}, {...t2}, {...t3} ];

test('La fonction onTaskUp echange deux tasks', () => {
	
	const tlswitched:Task[] = switchTask(taskList[1], taskList, true); 
	console.log(tlswitched);
	expect(tlswitched[0].order).toBe(1);
	expect(tlswitched[1].order).toBe(2);
});
test('La fonction onTaskDown echange deux tasks', () => {
	const tlswitched:Task[] = switchTask(taskList[0], taskList, false);
	// console.log(tlswitched);
	expect(tlswitched[0].order).toBe(1);
	expect(tlswitched[1].order).toBe(2);
});
