<template>
  <div class="home">
    <v-container>
      <p class="mx-auto subtitle-1 text-center">Select your login account</p>
      <v-card
        class="mx-auto my-4"
        color="rgb(238, 238, 238)"
        max-width="400"
        v-for="user in listOfUsers"
        :key="user.id"
        @click="selectChat(user)"
      >
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                :src="user.image"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="user.name"></v-list-item-title>
            </v-list-item-content>

            <v-row
              align="center"
              justify="end"
            >
              <v-icon class="mr-1">mdi-arrow-right</v-icon>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import UserModel from "@/model/User.js";
import { db } from "@/firebase/init.js";

export default {
  name: "UserSelection",
  mounted() {
    this.getUsers()
  },
  methods: {
    selectChat(user) {
      console.log(user);
      this.$router.push({ name: "ListOfChats", params: { user: user } });
    },
    getUsers(){
          UserModel.removeAll()

      db.collection('users').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            const newUser = new UserModel()
            newUser.id = doc.id
            newUser.name = doc.data().name
            newUser.image = doc.data().image
            newUser.save()
            // this.listOfUsers.push({id: doc.id, name: doc.data().name, image: doc.data().image})
          })
          this.listOfUsers = UserModel.fetchAll()
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
    },
  },
  data() {
    return {
      listOfUsers: []
    }
  }
}

</script>
