<template>
  <div>
    <v-container>
      <div class="messages">
        <div v-for="msg in messages" :key="msg.id">
          <div v-if="msg.senderid == from">
            <div class="senderbubble white--text light-blue lighten-2 px-4 py-4 ml-12">
              {{ msg.text }}
            </div>
            <div class="caption grey--text text-right">
              {{ msg.date | moment("from") }}
            </div>
          </div>
          <div v-else>
            <div class="receiverbubble grey lighten-2 px-4 py-4 mr-12">
              {{ msg.text }}
            </div>
            <div class="caption grey--text text-left">
              {{ msg.date | moment("from") }}
            </div>
          </div>
        </div>
      </div>
      <div class="sendtext">
        <v-sheet elevation="5" class="pb-4 px-5">
          <v-container>
            <v-form
              lazy-validation
              v-model="Valid"
              ref="Form"
              v-if="showTextBox"
              @submit.prevent="submitNewMsg"
              @keypress.prevent="submitNewMsg"
            >
              <v-text-field
                label="Message"
                type="Text"
                color="light-blue lighten-2"
                :min="0"
                :counter="50"
                v-model="Field_1"
                :rules="Rule_1"
                :append-outer-icon="
                  Valid == true && Field_1.length > 0 ? 'mdi-send' : ''
                "
                @click:append-outer="submitNewMsg"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
import UserModel from "@/model/User.js";
import ChatModel from "@/model/Chat.js";
import { db } from "@/firebase/init.js";

export default {
  name: "Chat",
  created() {},
  mounted() {
    this.from = UserModel.getSelectedUserID();
    this.to = UserModel.getSelectedToID();

    this.messages = this.messages.filter(msg => {
      return (
        (msg.senderid == this.from && msg.receiverid == this.to) ||
        (msg.senderid == this.to && msg.receiverid == this.from)
      )
    })
    this.messages = this.messages.sort((a, b) => new Date(a.date) - new Date(b.date))
  },

  props: {
    appHUD: null
  },

  methods: {
    submitNewMsg() {
      console.log("new msg");
      this.showTextBox = false;
      this.appHUD.loadingTxt = "Sending...";
      this.appHUD.loading = true;
      // Add a new document with a generated id.
      let docRef = db.collection("chats").doc();
      let data = {
        text: this.Field_1,
        senderid: this.from,
        receiverid: this.to,
        date: new Date().toUTCString(),
        id: docRef.id
      };
      this.Field_1 = "";
      this.Valid = true;

      db.collection("chats")
        .doc(docRef.id)
        .set(data)
        .then(() => {
          console.log("saved");
          this.appHUD.loading = false;
          this.appHUD.snackbar = true;
          this.appHUD.snackbarTxt = "Sent !";
          this.messages.push(data);
          this.showTextBox = true;
        });
    }
  },

  data() {
    return {
      showTextBox: true,
      from: UserModel.getSelectedUserID(),
      to: UserModel.getSelectedToID(),
      messages: ChatModel.fetchAll(),
      Valid: true,
      Field_1: "",
      Rule_1: [
        v => !!v || "Message is required",
        v => v.length <= 50 || "Max 50 characters"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.sendtext {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
}
.senderbubble {
  border-radius: 30px 30px 0px 30px;
}
.receiverbubble {
  border-radius: 30px 30px 30px 0px;
}
.messages {
  position: relative;
  top: 20px;
  margin-top: 20px;
  bottom: 130px;
  margin-bottom: 130px;
}
// userid ->
//         chats ->
//                 userid ->
//                     messages ->
//                         id
//                         date
//                         message
//                         from : userid
</style>
