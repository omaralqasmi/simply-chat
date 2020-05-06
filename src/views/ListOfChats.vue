<template>
  <div>
    <v-container>
      <v-list subheader>
        <v-subheader>Select a conversation to start chatting</v-subheader>
        <div v-for="conversation in conversations" :key="conversation.id">
          <v-list-item @click="selectChat(conversation.id)">
            <v-list-item-avatar>
              <v-img :src="conversation.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="conversation.name"></v-list-item-title>
              <v-list-item-subtitle
                v-text="conversation.lastmsg"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
      <v-btn
        class="mx-2 floating-btn"
        fab
        dark
        color="purple accent-1"
        @click="newMessage"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import UserModel from "@/model/User.js";
import ChatModel from "@/model/Chat.js";
import { db } from "@/firebase/init.js";

export default {
  name: "ListOfChats",
    props: {
    appHUD: null
  },

  created() {},
  mounted() {
    this.appHUD.loadingTxt = "Loading, please wait.."
    this.appHUD.loading = true

    this.getChats();
  },
  methods: {
    newMessage() {
      this.$router.push({
        name: "ListOfContacts"
      });
    },
    selectChat(id) {
      console.log(id);
      UserModel.assignSelectedToID(id);
      this.$router.push({
        name: "Chat"
      });
    },
    getChats() {
      ChatModel.removeAllChats();
      ChatModel.removeAllConversations();
      db.collection("chats")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            const newChat = new ChatModel();
            newChat.id = doc.id;
            newChat.senderid = doc.data().senderid;
            newChat.receiverid = doc.data().receiverid;
            newChat.text = doc.data().text;
            newChat.date = doc.data().date;
            newChat.save();
          });
          this.chats = ChatModel.fetchAll();
          this.chats = this.chats.filter(chat => {
            if (
              chat.senderid == UserModel.getSelectedUserID() ||
              chat.receiverid == UserModel.getSelectedUserID()
            )
              return chat;
          });
          ChatModel.replace(this.chats);
          this.conversations = ChatModel.getConversations(
            UserModel.getSelectedUserID(),
            this.users
          )
    this.appHUD.loading = false

        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  },
  data() {
    return {
      chats: [],
      users: UserModel.fetchAll(),
      conversations: []
    };
  }
};
</script>

<style lang="scss" scoped>
.floating-btn {
  position: fixed;
  right: 20px;
  bottom: 40px;
}
</style>
