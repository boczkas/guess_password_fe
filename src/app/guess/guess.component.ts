import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Password } from 'src/app/start/start.component';

declare interface GuessForm {
  guess: FormControl<string>;
}

declare interface GuessPasswordForm {
  passwordGuess: FormControl<string>;
}

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent {

  @Input() currentGuess = '';
  @Output() startAgain = new EventEmitter<void>();

  successfullyGuessed = false;
  
  readonly guessForm: FormGroup<GuessForm>;
  readonly passwordGuess: FormGroup<GuessPasswordForm>

  constructor(
    nfb: NonNullableFormBuilder,
    private http: HttpClient) {
      this.guessForm = nfb.group<GuessForm>({
        guess: nfb.control('')
      });
      this.passwordGuess = nfb.group<GuessPasswordForm>({
        passwordGuess: nfb.control('')
      });
    }

  getCurrentGuessArray(): string[] {
    return this.currentGuess.split('');
  }

  sendLetter() {
    this.http.post<Password>('http://localhost:8080/guess', this.guessForm.controls.guess.value)
      .subscribe((response: Password) => {
        console.log("Response from localhost:8080/guess");
        console.log(response);
        this.currentGuess = response.text;
      });
  }

  sendPassword() {
    console.log("this.passwordGuess.controls.passwordGuess.value");
    console.log(this.passwordGuess.controls.passwordGuess.value);
    this.http.post<boolean>('http://localhost:8080/guess/password',
      this.passwordGuess.controls.passwordGuess.value)
      .subscribe((response: boolean) => {
        console.log("Response from localhost:8080/guess/password");
        console.log(response);
        this.successfullyGuessed = response;
      });
  }

  onceAgain() {
    this.startAgain.emit();
  }
}
