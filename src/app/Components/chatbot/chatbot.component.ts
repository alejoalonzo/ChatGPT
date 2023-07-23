
import { Component, OnInit } from '@angular/core';
import { ChatgptService } from '../../service/chatgpt.service';
import { OpenaiService } from '../../service/openaiService';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  message!:string;

    constructor(
      private chatgptSvc: ChatgptService,
      private openaiService: OpenaiService
      // private reCaptchaV3Service: ReCaptchaV3Service
    ) { }

    sendMessage(){
        this.chatgptSvc.getDataFromOpenAI(this.message);
        this.message = '';
    }
    clearMessage(){
      location.reload();
    }
    ngOnInit(): void {
      this.openaiService.getOpenAI().subscribe(apiKey => {
        console.log('');
      });
    }
  }

