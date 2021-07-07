<template>
	<v-card class="mx-auto my-4" elevation="0" max-width="1400" min-height="1000">
		<v-container>
			<v-row>
				<v-text-field
					class="my-8"
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>

				<v-spacer></v-spacer>
				<v-col cols="auto" class="text-right">
					<v-select
						v-model="selectedFilter"
						:items="['All', 'Principles', 'Values']"
						append-icon="mdi-filter-variant"
						chips
					>
					</v-select>
				</v-col>
			</v-row>

			<v-row v-if="isFeatureNotEmpty">
				<v-col
					lg="4"
					md="6"
					sm="12"
					cols="12"
					v-for="(item, index) in getFeatureList"
					:key="`principle-item-${index}`"
				>
					<feature-item :feature="item"></feature-item>
				</v-col>
			</v-row>
			<v-row
				v-else-if="isOnSearchMode"
				class="d-flex flex-column justify-center align-center mt-8"
			>
				<h2>
					<v-chip color="primary"> {{ search }}</v-chip> does not exist!
				</h2>
				<span class="my-4">
					Please try to search again, or clear the search filter.</span
				>
				<v-btn @click="search = ''">Clear Filter</v-btn>
			</v-row>

			<v-row v-else class="d-flex flex-column justify-center align-center mt-8">
				<h2>The Current List is Empty!</h2>
				<span class="my-4"
					>Please add Values/Features for the Agile Manifesto</span
				>
				<v-btn @click="$store.dispatch('openFeatureModal')">Add Feature</v-btn>
			</v-row>
		</v-container>
		<feature-form v-if="isFeatureModalShown"></feature-form>
		<snackbar-alert></snackbar-alert>
		<alert-dialog></alert-dialog>
		<v-fab-transition>
			<v-btn
				@click="$store.dispatch('openFeatureModal')"
				color="primary"
				dark
				large
				fixed
				bottom
				right
				fab
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
	</v-card>
</template>

<script>
import FeatureItem from "@/components/FeatureItem.vue";
import FeatureForm from "@/components/FeatureForm.vue";
import SnackbarAlert from "@/components/SnackbarAlert.vue";
import AlertDialog from "@/components/Dialog.vue";

export default {
	name: "Home",

	components: {
		FeatureItem,
		FeatureForm,
		SnackbarAlert,
		AlertDialog,
	},

	data() {
		return {
			search: "",
			selectedFilter: "All",
			featuresList: [],
		};
	},

	computed: {
		isFeatureModalShown() {
			return this.$store.state.showFeatureModal;
		},
		getFeatures() {
			return this.$store.state.principle.getPrinciples;
		},
		getFeatureList: {
			get: function () {
				return this.selectedFilter === "All"
					? this.featuresList
					: this.featuresList.filter(
							(feature) => feature.feature_type === this.selectedFilter
					  );
			},
			set: function (newValue) {
				console.log(newValue);
				this.featuresList = newValue;
			},
		},
		isFeatureNotEmpty() {
			return this.getFeatureList.length !== 0;
		},
		isOnSearchMode() {
			return this.search.length !== 0;
		},
	},

	watch: {
		search() {
			this.getFeatureList = this.getFeatures.filter((feature) => {
				return feature.feature_title
					.toLowerCase()
					.includes(this.search.toLowerCase());
			});
		},
	},

	async mounted() {
		await this.$store.dispatch("getAllPrinciples");
		this.featuresList = this.getFeatures;
	},
};
</script>
