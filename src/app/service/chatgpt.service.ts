import { Injectable } from '@angular/core';
import { filter, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Configuration, OpenAIApi } from 'openai';
import { OpenaiService } from "./openaiService";

declare var $:any;//Bootstrap-To work with JQuery
const headers = new HttpHeaders().set('Content-type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private APIKEY!: string;
  private openai!: OpenAIApi;
  
  constructor(private http: HttpClient, private openaiService: OpenaiService) { 
    this.initializeOpenAI();
  }



  private initializeOpenAI() {
    this.openaiService.getOpenAI().subscribe(apiKey => {
      this.APIKEY = apiKey.key;
      this.setupOpenAIInstance();
    });
  }

  private setupOpenAIInstance() {
    const configuration = new Configuration({
      apiKey: this.APIKEY
    });

    this.openai = new OpenAIApi(configuration);
  }

  getDataFromOpenAI(text: string){
    

    const urlOpenAI = `https://api.openai.com/v1/engines/text-davinci-002/completions`;

    const requestBody = {
      prompt: text,
      max_tokens: 256,
      temperature: 0.7
    };
    const requestOptions = {
      headers: headers.set('Authorization', `Bearer ${this.APIKEY}`),
    };

    this.http.post(urlOpenAI, requestBody, requestOptions).pipe(
      filter(resp => !!resp),
      map((resp: any) => resp.choices[0].text)
    ).subscribe(data => {
      $('.response').append(`
      <ul class="list-group mb-2 response-item">
        <li class="list-group-item text-dark">${data}</li><br>
      </ul>
    `);
    $('.response .list-group-item').last().css({
      'list-style': 'none',
      'margin-top': '20px',
      'margin-bottom': '20px',
      'border': '1px solid transparent',
    });
    });
  }
}
