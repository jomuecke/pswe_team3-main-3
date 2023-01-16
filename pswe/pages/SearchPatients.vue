<template>
    <div>

      <v-container>
        <template>
  
          <v-data-table
              v-model="selected"
              :headers="headers"
              :sort-by="['lastname']"
              :search="search"
              :items="allPatients"
              :single-select="true"
              show-select
              class="elevation-1"
              fixed-header
              height="50vh"
  
          >
            <template v-slot:top>
              <v-card-title>
                Patientenauswahl
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Suche"
                    single-line
                    hide-details
                ></v-text-field>
              </v-card-title>
            </template>
  
            <template v-slot:footer.prepend align="right">
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  class="mr-2"
                  @click="submit"
              >
                Bestätigen
              </v-btn>
  
              <v-spacer></v-spacer>
  
            </template>
  
          </v-data-table>
          <v-alert
              dense
              outlined
              v-show="noPatientSelected"
              type="error"
          >
            Bitte wählen Sie einen Patienten aus um fortzufahren
          </v-alert>
  
        </template>
      </v-container>

    </div>
  </template>
  
  <script>
  import FHIR from 'fhirclient';
  
  
  export default {
    name: 'SearchPatients',

    data() {
      return {
        noPatientSelected: false,
        selected: [],
        search: '',
        headers: [
          {
            text: 'Nachname',
            align: 'start',
            sortable: true,
            value: "name[0].family",
          },
          {text: 'Vorname', value: "name[0].given[0]"},
          {text: 'Geburtsdatum', value: "birthDate"},
          {text: 'Stadt', value: "valueAddress[0].city"},
          {text: 'Bezirk', value: "valueAddress[0].state"},
          {text: 'Land', value: "valueAddress[0].country"},
        ],
        patients: this.allPatients
      }
    },
    methods: {
      /**
       * This is a method to fetch the patients saved in the database
       * The method will be called automatically when de component is mounted
       */

      getData() {
        if (this.allPatients.length === 0) {
          FHIR.oauth2.ready()
              .then(client => client.request("Patient", {
                pageLimit: 0, graph: false, resolveReferences: false, includeResponse: true, onPage(bundle) {
                  this.$store.commit('patients/savePatients', bundle);
                  this.$store.commit('patients/setLoggedIn', true);
                }
              }))
              .catch(console.error);
        }
        
      },
      /**
       * Load the AppSelection Screen for selected patient if there is a patient selected
       */
      submit() {
        if (this.selected.length !== 0) {
          this.noPatientSelected = false;
          this.$store.commit('patients/setSelectedPatient', this.selected);
          this.$store.$router.push('/AppSelection').catch(error => {
            console.log(error)
          });
        } else {
          this.noPatientSelected = true;
        }
      }
    },
    /**
     * Called right before the mounting begins
     * only fetches the Patients if they are not loaded yet
     */
    beforeMount() {
      this.getData();
    },
    computed: {
      allPatients() {
        return this.$store.state.patients;
      }
    },
  }
  </script>
  
 
  