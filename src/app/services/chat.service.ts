import { ChatMessage } from './../models/chat-message';
import { Injectable, OnInit } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {
  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  constructor() {
  }
  ngOnInit(): void {
  }

  initConnectionSocket() {
    const url = 'http://localhost:3000/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

  }
  joinRoom(roomId: string) {
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessages = this.messageSubject.getValue();
        currentMessages.push(messageContent);
        this.messageSubject.next(currentMessages);
      })
    })
  }
  sendmessage(roomId: string, ChatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(ChatMessage));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
