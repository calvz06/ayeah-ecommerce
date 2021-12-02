let token = localStorage.getItem("token");
let isAdmin = localStorage.getItem("isAdmin");
let userId = localStorage.getItem("userId");



fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/cart-exists`,{
	method: "GET",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
})
.then(response => response.json()).then(response => {
	//console.log(response)
	if (response == true) {
		fetch("https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/create-order", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
				"Authorization" : `Bearer ${token}`
			}
		}).then(response => response.json()).then(response => {
			//console.log(response);
			if (response) {
				window.location.replace("./shoppingPage.html");
			} else {
				alert(`Something went wrong.`);
			}
		})
	} else {
	window.location.replace("./shoppingPage.html")
	}
})