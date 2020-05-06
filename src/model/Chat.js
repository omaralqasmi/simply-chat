var chats = [];
var conversations = [];

export default class Chat {
  constructor(id, senderid, text, date, receiverid) {
    this.id = id;
    this.senderid = senderid;
    this.receiverid = receiverid;
    this.text = text;
    this.date = date;
  }
  static replace(newChats) {
    chats = newChats;
  }
  save() {
    chats.push(this);
  }
  static fetchAll() {
    return chats;
  }
  static removeAllChats() {
    chats = [];
  }
  static removeAllConversations() {
    conversations = [];
  }
  static getConversations(selectedUserID, users) {
    chats = chats.sort((a, b) => new Date(a.date) - new Date(b.date))
    users.forEach(user => {
      chats.forEach(chat => {
        if (
          (chat.senderid == selectedUserID && chat.receiverid == user.id) ||
          (chat.senderid == user.id && chat.receiverid == selectedUserID)
        ) {
          user.lastmsg = chat.text;
          if (!conversations.includes(user)) {
            conversations.push(user);
          }
        }
      });
    });
    return conversations;
  }
}
