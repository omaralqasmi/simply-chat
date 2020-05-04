<template>
  <div>
    <v-container>
      <div v-for="msg in messages" :key="msg.senderid">
        <div v-if="msg.senderid == from">
          <div class="senderbubble blue">{{ msg.text }}</div>
          <div>{{ msg.date }}</div>
        </div>
        <div v-else>
          <div class="receiverbubble grey">{{ msg.text }}</div>
          <div>{{ msg.date }}</div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import ChatModel from "@/model/Chat.js";
// import { db } from "@/firebase/init.js";

export default {
  name: "Chat",
  created(){

  },
  mounted(){

  },
  methods: {

  },

  data (){
    return {
      from: this.$attrs.from,
      to: this.$attrs.to,
      messages: ChatModel.fetchAll()
    }
  }
}
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
