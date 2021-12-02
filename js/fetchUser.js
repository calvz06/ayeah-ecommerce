// To notify if user is logged in or not

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");
let checkOutCart = document.getElementById("check-out-cart");
let createProduct = document.getElementById("create-product");

let retrieveOrders = document.getElementById("retrieve-orders");
let retrieveFulfilledOrders = document.getElementById("retrieve-fulfilled-orders")
let allusers = document.getElementById("all-users");

let tableHead = document.getElementById("table-head");
let tableBody = document.getElementById("table-body");

let allOrdersBtn = document.getElementById("all-orders-btn");
let forProcessingBtn = document.getElementById("for-processing-btn");

let isAdmin = localStorage.getItem("isAdmin");

//User has token
if (token != null) {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="./logout.html">Log Out</a>
	</li>
	`;

	
} else {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="#">Log In</a>
	</li>
	`;

	register.innerHTML = 
	`
	<li>
	<a class="nav-link active" aria-current="page" href="./register.html">Register</a>
	</li>
	`

 	
}


if (token != null && isAdmin == "true") {
	createProduct.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./createProduct.html">Register Product</a>
	</li>
		
	`
	allusers.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="#">All Users</a>
	</li>
	`

	retrieveOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./retrieveAllOrders.html">Retrieve All Orders</a>
	</li>
	`
	createProduct.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./createProduct.html">Register Product</a>
	</li>
		
	`
	checkOutCart.innerHTML = 
	`
		<form class="d-flex">
			<a href="./myCart.html" class="btn btn-outline-dark" type="submit">
		        <i class="bi-cart-fill me-1"></i>
		        Cart
		    </a>
		</form>
	`
	retrieveFulfilledOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./retrieveFulfilledOrders.html">Retrieve Fulfilled Orders</a>
	</li>
	`
		tableHead.innerHTML =
		`
			<tr>
			  <th scope="col"></th>
			  <th scope="col">Name</th>
			  <th scope="col">Contact</th>
			  <th scope="col">Email</th>
			  <th scope="col">Status</th>
			</tr>
		`

		fetch("https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users", {
			method: "GET",
			headers: {
				"Content-Type" : "application/json",
				"Authorization" : `Bearer ${token}`
			}
		}).then(response => response.json()).then(users => {
			//console.log(users)

			users.map((user) => {
				//console.log(user)
				const {firstName, lastName, email, mobileNo, isAdmin, _id} = user

				let addtoTable;
				if (isAdmin == true) {
					 addtoTable = `
					<tr>
						<th scope="row"></th>
						<td>${firstName} ${lastName}</td>
						<td>${mobileNo}</td>
						<td>${email}</td>
						<td><a class="btn btn-outline-dark" href="./unsetToAdmin.html?userId=${_id}">Admin</a></td>
					</tr>
									`
				} else {
					 addtoTable = `
					<tr>
				      <th scope="row"></th>
				      <td>${firstName} ${lastName}</td>
				      <td>${mobileNo}</td>
				      <td>${email}</td>
				      <td><a class="btn btn-outline-dark" href="./setToAdmin.html?userId=${_id}">Not Admin</a></td>
				    </tr>
				`
				}

				

				tableBody.innerHTML += addtoTable
			})
		})

}
	



