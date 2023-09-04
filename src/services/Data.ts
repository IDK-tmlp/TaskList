import { PostTask, Task, UpdatedTask } from "../interfaces/taskInterface";

export default class Data {
  static url = "http://localhost:3001/taskList";
  static async loadData() {
    return fetch(this.url)
      .then((response) => {
        //console.log('Response : ', response);
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("Error dans loadData : ", error);
      });
  }
  static async addTask(data: PostTask) {
    return fetch("http://localhost:3001/taskList", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(function (res) {
        console.log(res);
        return res.json();
      })
      .then(function (data) {
        console.log(data);
		return data
      })
      .catch(function (res) {
        console.log(res);
      });
  }
  static async deleteTask(id: number) {
    fetch("http://localhost:3001/taskList/" + id, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
  }
  static async updateTask(id: number, data:UpdatedTask) {
    fetch("http://localhost:3001/taskList/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
  }
}
