


// To notify if user is logged in or not

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");
let checkOutCart = document.getElementById("check-out-cart");
let createProduct = document.getElementById("create-product");
let retrieveOrders = document.getElementById("retrieve-orders");
let retrieveFulfilledOrders = document.getElementById("retrieve-fulfilled-orders");
let allusers = document.getElementById("all-users");
let userProfile = document.getElementById("user-profile");
let isAdmin = localStorage.getItem("isAdmin");
let userId = localStorage.getItem("userId");
//User has token
if (token != null) {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="./pages/logout.html">Log Out</a>
	</li>
	`;
	checkOutCart.innerHTML = 
	`
		<form class="d-flex">
			<a href="./pages/myCart.html" class="btn btn-outline-dark" type="submit">
		        <i class="bi-cart-fill me-1"></i>
		        Cart
		    </a>
		</form>
	`

	userProfile.innerHTML = 
	`
		<li>
		<a class="nav-link active" aria-current="page" href="./pages/userProfile.html?userId=${userId}">User Profile</a>
		</li>
	`
	
} else {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="./pages/login.html">Log In</a>
	</li>
	`;

	register.innerHTML = 
	`
	<li>
	<a class="nav-link active" aria-current="page" href="./pages/register.html">Register</a>
	</li>
	`

 	
}

if (token != null && isAdmin == "true") {
	createProduct.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./pages/createProduct.html">Register Product</a>
	</li>
		
	`
	allusers.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./pages/fetchUser.html">All Users</a>
	</li>
	`


	retrieveOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./pages/retrieveAllOrders.html">Retrieve All Orders</a>
	</li>
	`


	retrieveFulfilledOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./pages/retrieveFulfilledOrders">Retrieve Fulfilled Orders</a>
	</li>
	`

}
