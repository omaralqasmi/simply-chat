<template>
  <div class="home">
    <v-container>
      <v-list subheader>
        <v-subheader>Select a user to start chatting</v-subheader>
        <v-list-item
          v-for="user in listOfUsers"
          :key="user.id"
          @click="selectChat(user)"
        >
          <v-list-item-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import UsersModel from "@/model/UsersModel.js";

export default {
  name: "UserSelection",
  methods: {
    selectChat (user){
      console.log(user)
      this.$router.push({name : 'ListOfChats', params: { user: user}})
    }
  },
  data () {
    return {
      listOfUsers : UsersModel.data.users
    }
  }
};
</script>
