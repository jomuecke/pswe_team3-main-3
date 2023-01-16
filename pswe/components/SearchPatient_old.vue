<template>
  <v-dialog v-model="show" max-width="1400px">
    <template>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :sort-by="['lastname']"
        :search="search"

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
          <v-btn color="primary" class="mr-2" @click="submit">
            Bestätigen
          </v-btn>

          <v-spacer></v-spacer>
        </template>
      </v-data-table>
      <v-alert dense outlined v-show="noPatientSelected" type="error">
        Bitte wählen Sie einen Patienten aus um fortzufahren
      </v-alert>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      noPatientSelected: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "Nachname",
          align: "start",
          sortable: true,
          value: "name[0].family",
        },
        { text: "Vorname", value: "name[0].given[0]" },
        { text: "Geburtsdatum", value: "birthDate" },
        { text: "Stadt", value: "valueAddress[0].city" },
        { text: "Bezirk", value: "valueAddress[0].state" },
        { text: "Land", value: "valueAddress[0].country" },
      ],
      
    };
  },
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
