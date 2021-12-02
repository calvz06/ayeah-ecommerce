//Get the information of admin

let isAdmin = localStorage.getItem("isAdmin");
//console.log(isAdmin);

let token = localStorage.getItem("token");

let userId = localStorage.getItem("userId");
let params = new URLSearchParams(window.location.search)
let productId = params.get("productId");
//console.log(productId);

fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productId}/unarchive`, {
	method: "PUT",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(response => {
	//console.log(response);	
	if (response) {
		alert(`Item unarchived Successfuly.`);
		window.location.replace("./shoppingPage.html");
	}
})