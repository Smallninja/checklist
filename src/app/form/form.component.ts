import { Component, OnInit } from '@angular/core';
import { TaskService } from "../task.service";

interface Tasks {
  title:string;
  isDone: boolean;
  _id: any;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  tasks: Tasks[];
  title:string;

  constructor(private taskService:TaskService) { 
    this.taskService.getTasks().subscribe( tasks => {
      this.tasks = tasks;
    });
  }

  addTask(event){
    event.preventDefault();

    let newTask = {
      title: this.title,
      isDone: false
    }

    this.taskService.addTask(newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.title = "";
        })
  }

  deleteTask(id){
    let tasks = this.tasks;
    this.taskService.deleteTask(id).subscribe(data =>{
        if(data.n === 1 ){
            for(let i = 0; i < tasks.length; i++ ){
                if(tasks[i]._id === id){
                  tasks.splice(i, 1);
                }
            }
        }
    })
  }

  updateStatus(task){
      let _task = {
        _id: task._id,
        title: task.title,
        isDone: !task.isDone
      }

      this.taskService.updateStatus(_task).subscribe(data => {
        task.isDone = !task.isDone;
      })
  }



  ngOnInit() {
  }

}
