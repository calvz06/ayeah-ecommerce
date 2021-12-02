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
let userRegId = localStorage.getItem("userId");
let usersProfile = document.getElementById("user-profile");


function ConvertMonth(Month) {
		if (Month == "01") {
		MonthConverted = "Jan"
		return MonthConverted
	} else if (Month == "02"){
		MonthConverted = "Febr"
		return MonthConverted
	} else if (Month == "03"){
		MonthConverted = "Mar"
		return MonthConverted
	} else if (Month == "04") {
		MonthConverted = "Apr"
		return MonthConverted
	} else if (Month == "05") {
		MonthConverted = "May"
		return MonthConverted
	} else if (Month == "06") {
		MonthConverted = "Jun"
		return MonthConverted
	} else if (Month == "07") {
		MonthConverted = "Jul"
		return MonthConverted
	} else if (Month == "08") {
		MonthConverted = "Aug"
		return MonthConverted
	} else if (Month == "09") {
		MonthConverted = "Sep"
		return MonthConverted
	} else if (Month == "10") {
		MonthConverted = "Oct"
		return MonthConverted
	} else if (Month == "11") {
		MonthConverted = "Nov"
		return MonthConverted
	} else {
		MonthConverted = "Dec"
		return MonthConverted
	};

}

ConvertedDate = (wholeDate) => {
	let Year = wholeDate.slice(0,4);
	let Month = wholeDate.slice(5,7);
	let Day = wholeDate.slice(8,10);

	let Hour = wholeDate.slice(11,13);
	let Minute = wholeDate.slice(14,16);
	let Second = wholeDate.slice(17,19);
	
	let MonthConverted;
	let wholeStatement;

	wholeStatement = `${ConvertMonth(Month)} ${Day}, ${Year} at ${Hour}:${Minute}`;

	return wholeStatement
}


//User has token
if (token != null) {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="./logout.html">Log Out</a>
	</li>
	`;

		usersProfile.innerHTML = 
	`
		<li>
		<a class="nav-link active" aria-current="page" href="./userProfile.html?userId=${userRegId}">User Profile</a>
		</li>
	`


	
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
	<a class="nav-link active" aria-current="page" href="./fetchUser.html">All Users</a>
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
	<a class="nav-link active" aria-current="page" href="#">Retrieve Fulfilled Orders</a>
	</li>
	`
		tableHead.innerHTML =
		`
			<tr>
			  <th scope="col"></th>
			  <th scope="col">Ordered By</th>
			  <th scope="col">Items</th>
			  <th scope="col">Total Price</th>
			  <th scope="col">Date Checked Out</th>
			  <th scope="col">Status</th>
			  <th scope="col">Tracking Number</th>
			</tr>
		`


		fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/fulfilled-orders`, {
			method: "GET",
			headers: {
				"Content-Type" : "application/json",
				"Authorization" : `Bearer ${token}`
			} 
		}).then(response =>response.json()).then(orders => {

			orders.map((order, index) => {

				const { purchasedOn, totalAmount, userId, orderedProducts, _id, isFulfilled } = order
				let addtoTable;

				if (isFulfilled == true){
				addtoTable = `
						<tr>
					      <th scope="row"></th>
					      <td id="user-name${index}"></td>
					      <td id="items${index}"></td>
					      <td>Php ${totalAmount}</td>
					      <td>${ConvertedDate(purchasedOn)}</td>
					      <td>Checked Out</td>
					      <td>${_id}</td>
					    </tr>
					`
				 
				} else {
				addtoTable = 	`
					<tr>
				      <th scope="row"></th>
				      <td id="user-name${index}"></td>
				      <td id="items${index}"></td>
				      <td>Php ${totalAmount}</td>
				      <td> -- </td>
				      <td>Not Yet Checked Out</td>
				      <td>${_id}</td>
				    </tr>
				`
				}
				

				tableBody.innerHTML += addtoTable

				fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users/${userId}/details/`, {
					method: "GET",
					headers: {
						"Content-Type" : "application/json",
						"Authorization" : `Bearer ${token}`
					}
				}).then(response => response.json()).then(users => {
					//console.log(users)
						const {firstName, lastName } = users 
						let userNames = document.getElementById(`user-name${index}`)

						let name = `
						<div>
							${firstName} ${lastName}
						</div>
						`

						userNames.innerHTML = name
					
				})

				orderedProducts.map((orderedProduct) => {
					const { productId } = orderedProduct

					fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productId}/retrieve-product`, {
						method: "GET",
						headers: {
							"Content-Type" : "application/json",
							"Authorization" : `Bearer ${token}`
						}
					}).then(response => response.json()).then(product => {
						const { productName } = product

						let items = document.getElementById(`items${index}`);
						let addProducts;

						addProducts = `
						<div>
						${productName}
						</div>
						`
						items.innerHTML += addProducts;
					})
				})
			})
		})
}
	



