import Vue from "vue";
import Vuex from "vuex";
import principle from "./principle.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoading: false,
		showFeatureModal: false,
		fieldRules: {
			general: [(v) => !!v || "This field is required"],
			emailRequired: [
				(v) => !!v || "This field is required",
				(v) =>
					!v ||
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"E-mail must be valid",
			],
			select: [
				(v) => !!v || "This field is required",
				(v) => (!!v && v.length !== 0) || "This field is required",
			],
			numberOnly: [
				(v) => !!v || "This field is required",
				(v) => /^\d+(\.\d{1,2})?$/.test(v) || "Invalid quantity",
			],
		},
	},
	mutations: {
		toggleFeatureModal(state, value) {
			state.showFeatureModal = value;
		},
		toggleLoading(state, value) {
			state.isLoading = value;
		},
	},
	actions: {
		openFeatureModal({ commit }) {
			commit("toggleFeatureModal", true);
		},
		closeFeatureModal({ commit }) {
			commit("toggleFeatureModal", false);
			commit("setSelectedFeature", {});
		},
		showLoadingDialog({ commit }) {
			commit("toggleLoading", true);
		},
		hideLoadingDialog({ commit }) {
			commit("toggleLoading", false);
		},
	},
	modules: {
		principle,
	},
});
