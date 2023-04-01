import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {

  verb = "";
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8080/password', { responseType: 'text' })
      .subscribe((data: string) => {
        this.verb = data;
      },
      );
  }

  getVerbArray(): string[] {
    return this.verb.split('');
  }
}
