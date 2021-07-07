import principleApi from "@/api/principle.js";
import Vue from "vue";

export default {
	state: () => ({
		getPrinciples: [],
		currentPrinciple: {},
	}),

	getters: {
		//getPrinciple: (state) => state.getPrinciples,
	},

	mutations: {
		setPrinciples(state, principles) {
			state.getPrinciples = principles;
		},

		updatePrinciples(state, principle) {
			const indexOfItem = state.getPrinciples.findIndex((item) => {
				return principle.id === item.id;
			});
			Vue.set(state.getPrinciples, indexOfItem, principle);
		},

		addPrinciple(state, value) {
			state.getPrinciples.unshift(value);
		},
		setSelectedFeature(state, feature) {
			state.currentPrinciple = feature;
		},
	},

	actions: {
		async getAllPrinciples({ commit }) {
			try {
				const result = await principleApi.getAllPrinciples();

				commit("setPrinciples", result.data);
			} catch (error) {
				console.error(error);
			}
		},

		async savePrinciple({ commit }, principle) {
			try {
				const response = await principleApi.savePrinciple(principle);
				commit("addPrinciple", response.data);
			} catch (error) {
				console.error(error);
			}
		},

		async deletePrinciple({ state }, id) {
			await principleApi.deletePrincipleById(id);

			const indexOfItem = state.getPrinciples.findIndex((item) => {
				return item.id === id;
			});

			state.getPrinciples.splice(indexOfItem, 1);
		},

		async updatePrinciple({ commit }, principle) {
			const { id } = principle;
			try {
				const result = await principleApi.updatePrinciple(id, principle);

				if (result) {
					commit("updatePrinciples", principle);
				}
			} catch (error) {
				console.error(error);
			}
		},
	},
};
