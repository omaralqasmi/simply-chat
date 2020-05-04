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

export default {
  name: "App",

  data: () => ({
  })
};
</script>
