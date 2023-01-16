
/**
 * Class where all the stage-management is being done
 */

export const state = () => ({
    counter: 0,
    authToken: '',
    accessToken: '',
    idToken: '',
    cookie: '',
    loggedIn: false,
    patients: [],
    selectedPatient: ''
})


export const mutation = {
    /**
     * Method saves all patients fetched from the database
     * element by element
     * @param state the loaded patients
     * @param payloadBundle the bundle of patients fetched in the SearchPatient.vue component
     */
    savePatients(state, payloadBundle) {
        if (payloadBundle === 'none') {
            state.patients = [];
        } else {
            let data = [];
            for (let i = 0; i < payloadBundle.entry.length; i++) {
                data[i] = payloadBundle.entry[i].resource;
                state.patients.push(data[i])
            }
        }
    },

    deleteSavedPatients(state){
        state.patients=[];
    },

    setSelectedPatient(state, patient) {
        state.selectedPatient = patient;
        },
    setLoggedIn(state, payload) {
        state.loggedIn = payload;
    }
}

export const getters = {
    getLoggedIn: state => {
        return state.loggedIn;
    },
    getAllPatients: state => {
        return state.patients;
    },
    getSelectedPatient: state => {
        return state.selectedPatient;
    },
}

