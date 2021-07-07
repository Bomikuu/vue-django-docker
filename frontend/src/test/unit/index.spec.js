import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import IndexPage from "@/views/Home.vue";

const fakeFeatureList = [
	{
		id: 1,
		feature_title:
			"Customer satisfaction through early and continuous software delivery",
		feature_description:
			"Customers are happier when they receive working software at regular intervals, rather than waiting extended periods of time between releases.",
		image: "",
		type: "Principle",
	},
	{
		id: 2,
		feature_title:
			"Accommodate changing requirements throughout the development process",
		feature_description:
			"Customers are happier when they receive working software at regular intervals, rather than waiting extended periods of time between releases.",
		image: "",
		type: "Principle",
	},
	{
		id: 3,
		feature_title: "Frequent delivery of working software ",
		feature_description:
			"Customers are happier when they receive working software at regular intervals, rather than waiting extended periods of time between releases.",
		image: "",
		type: "Principle",
	},
];

// Following lines tell Jest to mock any call to `axios.get`
// and to return `fakePostList` instead
jest.mock("axios", () => ({
	get: jest.fn(() => fakeFeatureList),
}));

describe("Home Component Testing", () => {
	test("loads Features when button is clicked", async () => {
		const wrapper = mount(IndexPage);

		// Let's assert that we've called axios.get the right amount of times and
		// with the right parameters.
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith("/api/features");

		// Wait until the DOM updates.
		await flushPromises();

		// Finally, we make sure we've rendered the content from the API.
		const features = wrapper.findAll('[data-test="feature-item"]');

		expect(features).toHaveLength(3);
		expect(features[0].text()).toContain(
			"Customer satisfaction through early and continuous software delivery"
		);
		expect(features[1].text()).toContain(
			"Accommodate changing requirements throughout the development process"
		);
	});
});
