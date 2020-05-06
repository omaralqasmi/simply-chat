<template>
  <v-app>
    <v-app-bar app color="light-blue lighten-1" dark>
      <div class="d-flex align-center">
        <v-icon large @click="goHome">mdi-chat</v-icon>
        <h2 class="mx-4 font-weight-light">Simply Chat</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view :appHUD="appHUD" />
    </v-content>
    <!-- SNACKBAR -->
    <v-snackbar
      v-model="appHUD.snackbar"
      color="green darken-1"
      :timeout="1200"
    >
      {{ appHUD.snackbarTxt }}
      <v-btn color="white" text @click="appHUD.snackbar = false">
        <b>Close</b>
      </v-btn>
    </v-snackbar>
    <!-- LOADING DIALOG -->
    <v-dialog v-model="appHUD.loading" hide-overlay persistent width="300" dark>
      <v-card color="light-blue lighten-1" dark>
        <v-card-text>
          {{ appHUD.loadingTxt }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>

export default {
  name: "App",
  methods: {
    goHome(){
      this.$router.push({ name: "UserSelection" })
    }
  },

  data: () => ({
    appHUD: {
      loading: false,
      loadingTxt: "Loading",
      snackbar: false,
      snackbarTxt: "Sent!"
    }
  })
};
</script>
