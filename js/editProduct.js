// To notify if user is logged in or not

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");
let checkOutCart = document.getElementById("check-out-cart");
//console.log(register);
let createProduct = document.getElementById("create-product");
let editProductForm = document.getElementById("edit-product");

let previousName = document.getElementById("previous-name");
let previousDescription = document.getElementById("previous-description");
let previousPrice = document.getElementById("previous-price");

let params = new URLSearchParams(window.location.search);
let productId = params.get("productId");

let isAdmin = localStorage.getItem("isAdmin");
let retrieveOrders = document.getElementById("retrieve-orders");
let retrieveFulfilledOrders = document.getElementById("retrieve-fulfilled-orders")
let allusers = document.getElementById("all-users");
let userId = localStorage.getItem("userId");
let userProfile = document.getElementById("user-profile");

//User has token
if (token != null) {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="./logout.html">Log Out</a>
	</li>
	`;
	checkOutCart.innerHTML = 
	`
		<form class="d-flex">
			<a href="./myCart.html" class="btn btn-outline-dark" type="submit">
		        <i class="bi-cart-fill me-1"></i>
		        Cart
		    </a>
		</form>
	`
	userProfile.innerHTML = 
	`
		<li>
		<a class="nav-link active" aria-current="page" href="./userProfile.html?userId=${userId}">User Profile</a>
		</li>
	`
} else {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="./login.html">Log In</a>
	</li>
	`;

	register.innerHTML = 
	`
	<li>
	<a class="nav-link active" aria-current="page" href="#">Register</a>
	</li>
	`

 	
}


// Fetch Product Details

fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productId}/retrieve-product`, {
	method: "GET",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(response => {
	//console.log(response);
	const { productName, productPrice , productDescription} = response

	//  <small id="emailHelp" class="form-text text-muted">Last Name is required.</small>

	previousName.innerHTML = `
		<small class="form-text text-muted">Previous Name: ${productName}</small>
	`

	previousDescription.innerHTML = `
		<small class="form-text text-muted">Previous Description: ${productDescription}</small>
	`

	previousPrice.innerHTML = `
		<small class="form-text text-muted">Previous Price: PHP ${productPrice}</small>
	`
})



editProductForm.addEventListener("submit", (event) => {
	event.preventDefault();

	let productName = document.getElementById("product-name").value;
	let productDescription = document.getElementById("product-description").value;
	let productPrice = document.getElementById("product-price").value;

		fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productId}/update-product`, {
			method: "PUT",
			headers: {
				"Content-Type" : "application/json",
				"Authorization" : `Bearer ${token}`
			},
			body: JSON.stringify({
				productName : productName,
				productDescription : productDescription,
				productPrice
			})
		}).then(response => response.json()).then(response => {
			//console.log(response)
			if (response != null) {
				alert(`Product editted Successfully.`)
				window.location.replace("./shoppingPage.html")
			} else {
				alert(`Something went wrong. Please check details and try again.`)
			}
	})
})


if (isAdmin == "true") {
	createProduct.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./createProduct.html">Register Product</a>
	</li>
		
	`
	allusers.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./fetchUser.html">All Users</a>
	</li>
	`
	retrieveOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./retrieveAllOrders.html">Retrieve All Orders</a>
	</li>
	`
	retrieveFulfilledOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="#">Retrieve Fulfilled Orders</a>
	</li>
	`
}