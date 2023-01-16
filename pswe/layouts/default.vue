<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped 
      color="#2C2C2C"
    >
      <v-list nav >
        <HealthApp
          title="Bilirubin-Chart"
          src="https://res.cloudinary.com/hwfihgbjm/image/upload/v1619815686/production/ralgab5wye1bw2gvmsky.png"
          url="https://bilirubin.interopion.com/launch.html?iss=https%3A%2F%2F090a6056-fbf8-4f52-a38c-fddd25d03eef.ma.bw-cloud-instance.org"
          />
          <HealthApp
          title="Bilirubin-Chart"
          src="https://res.cloudinary.com/hwfihgbjm/image/upload/v1619815686/production/ralgab5wye1bw2gvmsky.png"
          url="https://bilirubin.interopion.com/launch.html?iss=https%3A%2F%2F090a6056-fbf8-4f52-a38c-fddd25d03eef.ma.bw-cloud-instance.org"
          />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
      color="#2C2C2C"
    >

      <v-btn plain @click.stop="showForm=true">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-btn>
      <SearchPatient v-model="showForm" />
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar color="blue" size="42"><span class="white--text text-h5">MM</span></v-avatar>
          </v-btn>
        </template>
        <v-list>ç
         <v-list-item @click="login">
          <v-list-item-title>Sign In</v-list-item-title>
         </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main color="#3f51b5">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SearchPatient from '@/components/SearchPatient_old'
import HealthApp from '@/components/HealthApp'
export default {
  methods: {
    async login () {
      try {
        const response = await this.$auth.loginWith('keycloak')
        // eslint-disable-next-line
        console.log(response)
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }
    }
  },
  components: { 
    HealthApp,
    SearchPatient
  },
  name: 'DefaultLayout',
  data () {
    return {
      showForm: false,
      drawer: false,
      fixed: false,
      
      title: 'Select Patient'
    }
  }
}
</script>
