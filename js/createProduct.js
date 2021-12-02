let isAdmin = localStorage.getItem("isAdmin");
//console.log(isAdmin);

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");

let retrieveOrders = document.getElementById("retrieve-orders");
let retrieveFulfilledOrders = document.getElementById("retrieve-fulfilled-orders")
let allusers = document.getElementById("all-users");
let linkForCreateProd = document.getElementById("create-product-1")
let createProduct = document.getElementById("create-product");
let userProfile = document.getElementById("user-profile");
let checkOutCart = document.getElementById("check-out-cart");
let userId = localStorage.getItem("userId");
//User has token
if (token != null) {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="#!">Log Out</a>
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

if (isAdmin == "true") {
	linkForCreateProd.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="#">Register Product</a>
	</li>
		
	`
	allusers.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./fetchUser.html">All Users</a>
	</li>
	`


	retrieveFulfilledOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./retrieveFulfilledOrders.html">Retrieve Fulfilled Orders</a>
	</li>
	`

	retrieveOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./retrieveAllOrders.html">Retrieve All Orders</a>
	</li>
	`

}

createProduct.addEventListener("submit", (event) => {
	event.preventDefault();

	let productName = document.getElementById("product-name").value;
	let productDescription = document.getElementById("product-description").value;
	let productPrice = document.getElementById("product-price").value;

	fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/register`, {
		method: "POST",
		headers: {
			"Content-Type" : "application/json",
			"Authorization" : `Bearer ${token}`
		},
		body: JSON.stringify({
			productName : productName,
			productDescription : productDescription,
			productPrice : productPrice
		})
	}).then(response => response.json()).then(response => {

		if (response) {
			alert(`Product Name: ${productName} registered successfully.`)
			window.location.replace("./shoppingPage.html")
		} else {
			alert(`Something went wrong. Please try again`)
			window.location.replace("./shoppingPage.html")
		}
	})
})

