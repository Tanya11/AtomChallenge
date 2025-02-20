import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule, FormControl, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormGroupDirective, NgForm } from "@angular/forms";
import { NgIf } from "@angular/common";
import { UserServiceService} from "../../services/user.service.service";
import { User } from "../../models/tasks.models"
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}

@Component({
    selector: "app-example-page",
    standalone: true,
    imports: [
        MatButton,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        NgIf
    ],
    templateUrl: "./example-page.component.html",
    styleUrl: "./example-page.component.scss"
})
export class ExamplePageComponent {
    user: any
   
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
    constructor(private userService: UserServiceService, private router: Router) {}
    matcher = new MyErrorStateMatcher();

    ingresar(event: Event) {
        event.preventDefault();
    
        const email = this.emailFormControl.value ?? '';
    
        if (email.trim()) {
          this.userService.getUserByEmail(email).subscribe({
            next: (data) => {
              this.router.navigate(['/tasks']);
            },
            error: (error) => {
              
              if (error.status === 404) {
                Swal.fire({
                  title: 'Usuario no encontrado',
                  text: '¿Deseas crear una cuenta con este correo?',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'Sí, crear cuenta',
                  cancelButtonText: 'No'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.userService.createUser(email).subscribe({
                      next: () => this.router.navigate(['/tasks']),
                      error: () => Swal.fire('Error', 'No se pudo crear el usuario', 'error'),
                    });
                  }
                });
              } else {
                Swal.fire('Error', 'No se pudo verificar el usuario', 'error');
              }
            }
          });
          
      }
    }
}
