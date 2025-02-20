import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks.models';  
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { MatListModule } from '@angular/material/list'
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-tasks-page',
  imports: [CommonModule, MatIconModule,  
    FormsModule, 
    MatCheckboxModule,
    MatListModule , 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatTableModule, 
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;
  
  newTask: Task = { id: '', title: '', description: '', completed: false, creationDate: new Date() };
  displayedColumns: string[] = ['title', 'description', 'date', 'completed', 'actions'];  // Definir las columnas que quieres mostrar

  constructor(private taskService: TaskService, private router: Router ){}

  ngOnInit() {
    this.getTasks();
  
  }
  getTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data.map((task: any) => ({
        ...task,
        editing: false 
      }));

     //console.log(this.tasks);  
    });
  }
  addTask() {
    if (!this.newTask.title || !this.newTask.description) return;

    this.newTask.creationDate = new Date();

    this.taskService.createTask(this.newTask).subscribe(
        (task) => {
            this.tasks.push(task);
            this.newTask = { id: '', title: '', description: '', completed: false, creationDate: new Date() };

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Tarea creada",
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
            window.location.reload();
        });
          
        },
        (error) => {
            // Manejar el error en caso de que la solicitud falle
            console.error('Error al crear la tarea:', error);
            alert('Hubo un error al crear la tarea. Por favor, inténtalo de nuevo.');
        }
    );
}
  
updateTask(task: Task) {
  if (!task) return; 

  const index = this.tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    this.tasks[index] = { ...task, editing: false };
    this.saveTaskToBackend(task);
  }
}
editTask(task: Task) {
  this.editingTask = { ...task }; 
}
saveTaskToBackend(task: Task) {
  this.taskService.updateTask(task).subscribe(() => {
   
  });
}

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  Regresar(event: Event){
    this.router.navigate(['/home']);
  }

  toggleEdit(task: Task) {
    if (task.editing) {
      this.updateTask(task); 
    }
    task.editing = !task.editing;
  }
}
