import axios from "axios";
const apiUrl = "api/features";

function getAllPrinciples() {
	return axios.get(apiUrl);
}

function updatePrinciple(id, updates) {
	return axios.put(`${apiUrl}/update/?id=${id}/`, updates, {
		headers: {
			"Content-type": "application/json",
		},
	});
}

function savePrinciple(principle) {
	return axios.post(`${apiUrl}/create/`, principle, {
		headers: {
			"Content-type": "application/json",
		},
	});
}

function deletePrincipleById(id) {
	return axios.delete(`${apiUrl}/delete/?id=${id}`);
}

export const getFormData = (data) => {
	const formData = new FormData();
	Object.entries(data).forEach(([k, v]) => {
		if (v) {
			formData.append(k, v);
		}
	});

	return formData;
};

export const getPayload = (form) => {
	var data = {};
	form.map((field) => {
		data[field.field] = field.value;
	});

	return data;
};

export default {
	getAllPrinciples,
	updatePrinciple,
	savePrinciple,
	deletePrincipleById,
};
