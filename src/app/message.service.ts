import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  constructor() {}

  messages: Array<string> = [];

  add(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages.length = 0;
  }
}
