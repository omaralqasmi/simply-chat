<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon large>mdi-chat</v-icon>
        <h2 class="mx-4">Simply Chat</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { db } from "./firebase/init.js";

export default {
  name: "App",
  methods: {
    getHead() {
      // GET HEAD
      db.collection("user-info")
        .doc("head")
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document! (head)");
          } else {
            console.log("Head data:", doc.data());
            this.gotHead = true;
            this.head = doc.data();
          }
        })
        .catch(err => {
          console.log("Error getting (head)", err);
        });
    }
  },

  data: () => ({})
};
</script>
