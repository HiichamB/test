import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: any
  constructor(public fb: FormBuilder) {
    this.registerForm = fb.group({
      image: new FormControl(),
      nom: new FormControl('', [
        Validators.required,

        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z \u0600-\u06FF]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),

      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
      ]),
      adresse: new FormControl('', [
        Validators.required,

        Validators.minLength(10),
      ]),
      pays: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ville: new FormControl('', [
        Validators.required,

        Validators.minLength(3),
      ]),

      dateNaissance: new FormControl('', [Validators.required]),
      diplome: new FormControl('', []),
      universite: new FormControl('', []),
      specialisation: new FormControl('', []),
      statut: new FormControl('', []),
      secteur: new FormControl('', []),
      employeur: new FormControl('', []),

      profession: new FormControl('', []),
      domaine: new FormControl('', []),
      experience: new FormControl('', []),
    })
  }

  ngOnInit(): void {}
  sendRegister() {
    if (this.registerForm.valid) {
      console.log('Success!', this.registerForm.value)
      this.registerForm.reset()
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
