import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Password {
  text: string,
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  started = false;
  hiddenPassword = '';

  constructor(private http: HttpClient,
    private router: Router) { }

  start() {
    this.http.get<Password>('http://localhost:8080/password')
      .subscribe((response: Password) => {
        console.log("Respone from localhost:8080/password:");
        console.log(response);
        this.started = true;
        this.hiddenPassword = response.text
      });
  }

  startAgain() {
    this.started = false;
  }
}
