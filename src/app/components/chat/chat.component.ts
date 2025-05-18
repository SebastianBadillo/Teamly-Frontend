import { ChatService } from './../../services/chat.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ChatComponent implements OnInit {
  messageInput: string = '';
  userId: string = "";
  messageList: any[] = [];
  ChatService: ChatService = inject(ChatService);
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.ChatService.initConnectionSocket();
    console.log("userId", this.userId);
    this.ChatService.joinRoom("ABC");
    this.listenerMessage();
  }

  sendMessage() {
    this.ChatService.sendmessage("ABC", { message: this.messageInput, user: this.userId });
    this.messageInput = '';
  }
  listenerMessage() {
    this.ChatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any) => {
        return {
          ...item,
          messageSide: item.user === this.userId ? 'sender' : 'receiver'
        }

      })
    });
  }

}
