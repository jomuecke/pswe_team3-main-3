<template>
    <div>
      <h3>Login</h3>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-btn @click="login">
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
<script>

import FHIR from "fhirclient";

export default {
  name: 'Login',

  methods: {
    login() {
      console.log("kek")
      FHIR.oauth2.authorize({
        clientId: "test",
        scope: "patient/*.read",
        iss: "https://193.196.55.26:9443/fhir-server/api/v4",
        redirectUri: "/SearchPatients"
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>