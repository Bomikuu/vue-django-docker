<template>
	<v-dialog
		v-model="isFeatureModalShown"
		@click:outside="closeDialog"
		transition="dialog-bottom-transition"
		max-width="600"
	>
		<v-card>
			<v-card-title>Feature/Values Form</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-form ref="form">
					<v-container>
						<v-row>
							<!--  -->
							<v-col lg="12" cols="12">
								<v-text-field
									v-model="currentFeature.feature_title"
									label="Feature Name"
									:rules="fieldRules.general"
									clearable
								></v-text-field>
							</v-col>
							<v-col lg="12" cols="12">
								<v-select
									v-model="currentFeature.feature_type"
									:items="['Principles', 'Values']"
									label="Feature Type"
									:rules="fieldRules.general"
								></v-select>
							</v-col>
							<v-col cols="12">
								<v-textarea
									v-model="currentFeature.feature_description"
									rows="2"
									row-height="15"
									label="Feature Description"
									value=""
									hint="Write Feature Description"
									:rules="fieldRules.general"
								></v-textarea>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="handleSubmit" text>Submit </v-btn>
				<v-btn @click="closeDialog" text>Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
	data() {
		return {
			formFields: [],
		};
	},

	computed: {
		currentFeature() {
			return this.$store.state.principle.currentPrinciple;
		},
		isFeatureModalShown() {
			return this.$store.state.showFeatureModal;
		},
		fieldRules() {
			return this.$store.state.fieldRules;
		},
	},

	async mounted() {},

	methods: {
		...mapActions([
			"openFeatureModal",
			"closeFeatureModal",
			"savePrinciple",
			"updatePrinciple",
		]),

		async handleSubmit() {
			const isValid = this.$refs.form.validate();

			if (isValid) {
				try {
					this.currentFeature.id
						? await this.updatePrinciple(this.currentFeature)
						: await this.savePrinciple(this.currentFeature);
				} catch (error) {
					console.error(error);
				} finally {
					const message = this.currentFeature.id
						? "User information has been updated!"
						: "User has been added!";
					this.$root.$emit("showSnackbar", {
						show: true,
						message: message,
					});
					this.closeDialog();
				}
			}
		},

		closeDialog() {
			this.closeFeatureModal();
		},
	},
};
</script>

<style lang="scss">
.product-preview-img {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
	height: 200px;
	border-radius: 100%;
	border: 2px solid rgba(0, 0, 0, 0.125);

	img {
		width: 200px;
		height: 200px;
		border-radius: 100%;
		object-fit: cover;
	}

	.upload-remove {
		display: none;
		position: absolute;
		margin: auto auto;
		font-size: 0.75em;
		display: none;
	}

	&:hover {
		img {
			opacity: 0.5;
		}
		.upload-remove {
			display: block;
			opacity: 1;
		}
	}
}
</style>
