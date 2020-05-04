<template>
  <div>
    <v-container>
      <v-list subheader>
        <v-subheader>Select a conversation to start chatting</v-subheader>
        <div v-for="(chat, index) in chats" :key="index">
          <div v-for="user in users" :key="user.id">
            <v-list-item v-if="user.id == chat.id" @click="selectChat(chat.id)">
              <v-list-item-avatar>
                <v-img :src="user.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="user.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import UserModel from "@/model/User.js";
import ChatModel from "@/model/Chat.js";
import { db } from "@/firebase/init.js";

export default {
  name: "ListOfChats",
  created(){

          ChatModel.removeAll()

  },
  mounted(){

      if (this.$attrs.user) {
        this.getChats()
      }
  },
  methods: {
    selectChat(id) {
      console.log(id)
      this.$router.push({ name: "Chat", params: { from: this.$attrs.user.id , to: id} })

    },
    getChats(){
      db.collection('users').doc(this.$attrs.user.id).collection('chats').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            const newChat = new ChatModel()
            newChat.id = doc.id
            newChat.senderid = doc.data().senderid
            newChat.text = doc.data().text
            newChat.date = doc.data().date
            newChat.save()
          })
          this.chats = ChatModel.fetchAll()
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
    },

  },
  data() {
    return {
      chats: ChatModel.fetchAll(),
      users: UserModel.fetchAll()
    };
  }
};
</script>

<style lang="scss" scoped>
// userid ->
//         chats ->
//                 userid ->
//                     messages ->
//                         id
//                         date
//                         message
//                         from : userid
</style>
