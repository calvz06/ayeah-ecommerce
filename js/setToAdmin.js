
let isAdmin = localStorage.getItem("isAdmin");
//console.log(isAdmin);

let token = localStorage.getItem("token");

let userId = localStorage.getItem("userId");
let params = new URLSearchParams(window.location.search)

let userRegId = params.get("userId");

fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users/${userRegId}/setToAdmin`, {
	method: "PUT",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(response => {
	if (response) {
		alert(`User Set to Admin`)
		window.location.replace("./fetchUser.html")
	} else {
		alert(`Something went wrong. Please try again.`)
		window.location.replace("./fetchUser.html")
	}
})