import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Global } from "./global";


@Injectable()
export class OpenaiService{
    public url: String;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    getOpenAI(): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url+'/openai-key',{headers:headers});
    }
}
