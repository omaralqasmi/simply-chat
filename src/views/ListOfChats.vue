<template>
    <div>
        <v-container>
            <v-list subheader>
                <v-subheader>Select a conversation to start chatting</v-subheader>
                <div v-for="(chat, index) in chats" :key="index">
                    <div v-for="user in users" :key="user.id">
                        <v-list-item
                            v-if="user.id == chat.id"
                            @click="selectChat(chat.id)"
                        >
                            <v-list-item-avatar>
                                <v-img :src="user.avatar"></v-img>
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
import UsersModel from "@/model/UsersModel.js";

    export default {
        name: "ListOfChats",
        params: {
            user: null,
        },
        methods: {
            selectChat(id){
                console.log(id)
            },
        },
        data() {
            return {
                chats: [
                    {id: 'userid-1'},
                    {id: 'userid-2'},
                    {id: 'userid-5'},
                    {id: 'userid-8'},
                ],
                users: UsersModel.data.users
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
