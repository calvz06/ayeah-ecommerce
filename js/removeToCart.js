let token = localStorage.getItem("token");
let isAdmin = localStorage.getItem("isAdmin");
let userId = localStorage.getItem("userId");

let params = new URLSearchParams(window.location.search);
let productId = params.get("productId");
let index = params.get("index")

fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/${productId}/${index}/remove-to-cart`, {
	method: "POST",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(response => {
	if (response) {
		alert(`Item Removed Successfully`)
		window.location.replace("./myCart.html")
	} else {
		alert(`Something went wrong. Please try again`)
		window.location.replace("./myCart.html")
	}
})

