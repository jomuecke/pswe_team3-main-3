<template>
    <div id="app">

      <br>
      <v-app id="inspire">
        <v-card
            id="mainCard"
            class="overflow-y-auto"
            max-width="800"
            max-height="85vh"
        >
          <v-toolbar
              color="primary lighten-1"
              dark
          >
            <v-toolbar-title>Anwendungsauswahl</v-toolbar-title>
          </v-toolbar>
          <v-card-subtitle>
            <span class="text-h6">Patientendaten</span>
          </v-card-subtitle>
          <v-divider
              inset
          ></v-divider>
          <v-list
              v-for="(item) in getSelectedPatientV"
              :key="item.name[0].family"
          >
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-html="(item.name[0].family + ' '+ item.name[0].given[0])"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-calendar</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-html="item.birthDate"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                    v-html="(item.address[0].line[0]+', '+item.address[0].postalCode+' '+item.address[0].city + ', ' + item.address[0].state + ', ' + item.address[0].country)"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
  
          </v-list>
  

          <v-card-subtitle>
            <span class="text-h6">Anwendungen</span>
          </v-card-subtitle>
  
          <v-divider
              inset
          ></v-divider>
  
          <v-container fluid>
  
            <v-row dense>
              <v-col
                  v-for="card in cards"
                  :key="card.title"
                  :cols="card.flex"
              >
                <v-card>
                  <v-img
                      :src="card.src"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                  >
                    <v-card-title v-text="card.title"></v-card-title>
                  </v-img>
  
                  <v-card-subtitle v-text="card.description"></v-card-subtitle>
  
                  <v-card-actions>
                    <v-spacer></v-spacer>
  
                    <v-btn rounded color="primary lighten-1" dark v-on:click="goToLink(card.link)">
                      Auswählen
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-app>

    </div>
  </template>
  
  <script>
  
  
  export default {
    name: 'AppSelection',

    data() {
      return {
        /**
         * Every card represents one app that will be shown in the Frontend
         * To add an App, one just has to add a card and fill in the correct link
         */
        cards: [
          {
            title: 'Bilirubin-Chart',
            src: 'https://res.cloudinary.com/hwfihgbjm/image/upload/v1619815686/production/ralgab5wye1bw2gvmsky.png',
            flex: 6,
            description: "Diese Anwendung zeigt ein zeit basierten Risiko-Graphen.",
            link: "https://bilirubin.interopion.com/launch.html?iss=https%3A%2F%2F090a6056-fbf8-4f52-a38c-fddd25d03eef.ma.bw-cloud-instance.org" +
                "%2Ffhir-server%2Fapi%2Fv4&launch="
          },
          {
            title: 'Patienten-Infokarte',
            src: 'https://cdn.buttercms.com/2t8NWjiYRKm62m5PeKyL',
            flex: 6,
            description: "Übersicht über den ausgewählten Patienten und seine Medikationen.",
            link: "https://d09a51d0-e937-47e8-91ec-b47739a65878.ma.bw-cloud-instance.org/testwebapp/launch.html" +
                "?iss=https%3A%2F%2F090a6056-fbf8-4f52-a38c-fddd25d03eef.ma.bw-cloud-instance.org" +
                "%2Ffhir-server%2Fapi%2Fv4&launch="
          },
          {
            title: 'Schmerzmanager',
            src: 'https://www.pflege.de/infografiken/schmerzmanagement-small-770x350.webp',
            flex: 6,
            description: "Bietet Informationen, die für die Entscheidungsfindung bei der Behandlung der Schmerzen eines Patienten relevant sind.",
            link: ""
          },
          {
            title: 'Brustschmerz-Anwendung',
            src: 'https://www.heilpraxisnet.de/wp-content/uploads/2019/02/Brustschmerz-Frau-1-750x500.jpg',
            flex: 6,
            description: "Die Brustschmerz-App ruft ausgewählte Daten, die für eine Hauptbeschwerde relevant sind, ab und zeigt sie an.",
            link: ""
          },
  
        ],
      }
    },
  
    /**
     * This method adds the id of the selected patient to the base link
     * of the implemented application as URL-Parameter "launch="
     * If there is a patient selected, the method opens a new tab with
     * the selected application
     */
    methods: {
      goToLink(baseString) {
        if (baseString.isEmpty) {
          console.log("no link availible")
        } else {
          let newURL = baseString + this.getSelectedPatient[0].id;
          window.open(newURL);
        }
      },
    },
    computed: {
      getSelectedPatientV() {
        return this.$store.getters.getSelectedPatient;
      }
    }
  }
  </script>
  
  <style>
  #mainCard {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  </style>
  