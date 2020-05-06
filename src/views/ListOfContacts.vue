<template>
  <div>
    <v-list subheader>
      <v-subheader>Select a contact to start conversation</v-subheader>
      <div v-for="contact in contacts" :key="contact.id">
        <v-list-item @click="selectChat(contact.id)">
          <v-list-item-avatar>
            <v-img :src="contact.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="contact.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
import UserModel from "@/model/User.js";

export default {
  name: "ListOfContacts",

  props: {
    appHUD: null
  },
mounted(){
  this.contacts = UserModel.fetchAll()
  this.contacts = this.contacts.filter(cont => {
    if (cont.id != UserModel.getSelectedUserID())
    return cont
  })
},
  methods: {
    selectChat(id) {
      console.log(id);
      UserModel.assignSelectedToID(id);
      this.$router.push({
        name: "Chat"
      });
    }
  },
  data() {
    return {
      from: this.$attrs.from,
      contacts: UserModel.fetchAll()
    };
  }
};
</script>

<style scoped></style>
