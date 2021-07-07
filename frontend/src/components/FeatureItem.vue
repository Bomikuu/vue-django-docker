<template>
	<v-card class="mx-auto my-2" data-test="feature-item" min-height="300">
		<v-card-title class="text-capitalize">
			{{ feature.feature_title }}</v-card-title
		>

		<v-card-text>
			<div>
				{{ getDescription() }}
			</div>
		</v-card-text>

		<v-divider class="mx-4"></v-divider>

		<v-card-text>
			<v-chip-group
				v-model="selection"
				active-class="deep-purple accent-4 white--text"
				column
			>
				<v-chip class="text-capitalize">{{ feature.feature_type }} </v-chip>
			</v-chip-group>
		</v-card-text>

		<v-card-actions class="mt-auto">
			<v-btn icon @click="handleEditFeature">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>

			<v-btn icon @click="deleteFeature">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
	props: {
		feature: {
			default: () => {},
			type: Object,
		},
	},

	data() {
		return {
			selection: null,
		};
	},

	methods: {
		...mapActions(["openFeatureModal", "deletePrinciple"]),
		handleEditFeature() {
			this.$store.commit("setSelectedFeature", Object.assign({}, this.feature));
			this.openFeatureModal();
		},
		deleteFeature() {
			this.$root.$emit("openDialog", {
				title: `Remove this Feature`,
				message: `Are you sure you want to delete this feature?`,
				type: "warning",
				submitFunction: () => {
					this.deletePrinciple(this.feature.id);
					this.$root.$emit("showSnackbar", {
						show: true,
						message: `Feature has been removed.`,
					});
				},
			});
		},

		getDescription() {
			const description = this.feature.feature_description || "";
			return description.length > 300
				? `${description.substring(0, 300)}...`
				: description;
		},
	},
};
</script>

<style></style>
