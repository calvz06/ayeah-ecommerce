let isAdmin = localStorage.getItem("isAdmin");
//console.log(isAdmin);

let token = localStorage.getItem("token");

let userId = localStorage.getItem("userId");
let params = new URLSearchParams(window.location.search)
let productId = params.get("productId");

let confirmDelete = confirm(`Do you want to delete this product?`)


if (confirmDelete) {
	fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productId}/delete-product`, {
		method: "DELETE",
		headers: {
			"Content-Type" : "application/json",
			"Authorization" : `Bearer ${token}`
		}
	}).then(response => response.json()).then(response => {
		if (response) {
			alert(`Item deleted successfully.`);
			window.location.replace("./shoppingPage.html");
		} 
	})
} else {
		alert(`Item not deleted.`);
		window.location.replace("./shoppingPage.html");
	}

