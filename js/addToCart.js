let token = localStorage.getItem("token");
let isAdmin = localStorage.getItem("isAdmin");
let userId = localStorage.getItem("userId");

let params = new URLSearchParams(window.location.search);
let productId = params.get("productId");

fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/${productId}/add-to-cart`, {
	method: "POST",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(response => {
	//console.log(response);
	if (response) {
		alert(`Item added to cart!`)
		window.location.replace("./shoppingPage.html")
	} else {
		alert(`Something went wrong. Please try again.`)
		window.location.replace("./shoppingPage.html")
	}
})