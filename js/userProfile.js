let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");
let createProduct = document.getElementById("create-product");
let checkOutCart = document.getElementById("check-out-cart");

let retrieveOrders = document.getElementById("retrieve-orders");
let retrieveFulfilledOrders = document.getElementById("retrieve-fulfilled-orders")
let allusers = document.getElementById("all-users");
let userProfile = document.getElementById("user-profile");

let usersProfile = document.getElementById("users-profile");

let isAdmin = localStorage.getItem("isAdmin");

let params = new URLSearchParams(window.location.search);
let userId = params.get("userId");

let tableHead = document.getElementById("table-head");
let tableBody = document.getElementById("table-body");


//User has token
if (token != null) {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="./logout.html">Log Out</a>
	</li>
	`
	userProfile.innerHTML = 
	`
		<li>
		<a class="nav-link active" aria-current="page" href="./userProfile.html">User Profile</a>
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
	
	fetch
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
	<a class="nav-link active" aria-current="page" href="./register.html">Register</a>
	</li>
	`

 	
}


if (isAdmin == true) {
	createProduct.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./createProduct.html">Register Product</a>
	</li>
		
	`

	retrieveOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./retrieveAllOrders.html">Retrieve All Orders</a>
	</li>
	`
	retrieveFulfilledOrders.innerHTML = 	`
	<li>
	<a class="nav-link active" aria-current="page" href="./retrieveFulfilledOrders.html">Retrieve Fulfilled Orders</a>
	</li>
	`
	allusers.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./fetchUser.html">All Users</a>
	</li>
	`
}

//Convert date string
function ConvertMonth(Month) {
		if (Month == "01") {
		MonthConverted = "Jan"
		return MonthConverted
	} else if (Month == "02"){
		MonthConverted = "Feb"
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
		MonthConverted = "Sept"
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


//


fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users/${userId}/details/`, {
	method: "GET",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(response => {
	
	const { firstName, lastName, mobileNo, email } = response

	usersProfile.innerHTML =
	 `
	 <p>Name: ${firstName} ${lastName}</p>
	 <p>Contact: ${mobileNo}</p>
	 <p>Email: ${email}</p>

	`
})

fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/${userId}/retrieve-user-orders`, {
	method: "GET",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(orders => {

	let addTable;

			tableHead.innerHTML = `
			<tr>
			  <th scope="col"></th>
			  <th scope="col">Items</th>
			  <th scope="col">Total Price</th>
			  <th scope="col">Date Checked Out</th>
			  <th scope="col">Status</th>
			  <th scope="col">Tracking Number</th>
			</tr>
			`

	orders.map((order, index) => {
		
		const { orderedProducts, purchasedOn, isFulfilled, totalAmount, _id } = order

		if (isFulfilled == true) {
			addTable = `
				<tr>
			      <th scope="row"></th>
			      <td id="items${index}"></td>
			      <td>Php ${totalAmount}</td>
			      <td>${ConvertedDate(purchasedOn)}</td>
			      <td>Checked Out</td>
			      <td>${_id}</td>
			    </tr>
			`

			tableBody.innerHTML += addTable
		} else {
			addTable = `
				<tr>
			      <th scope="row"></th>
			      <td id="items${index}"></td>
			      <td>Php ${totalAmount}</td>
			      <td> -- </td>
			      <td>Not Yet Checked Out</td>
			      <td>${_id}</td>
			    </tr>
			`
			tableBody.innerHTML += addTable
		}

		orderedProducts.map((orderedProduct) => {
			const {productId} = orderedProduct
			
			fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productId}/retrieve-product`, {
				method: "GET",
				headers: {
					"Content-Type" : "application/json",
					"Authorization" : `Bearer ${token}`
				}
			}).then(response => response.json()).then(response => {

				let items = document.getElementById(`items${index}`)

				let addtoItems;

				const { productName, productPrice } = response

				addtoItems = 
				`
				<div>
					${productName} PHP ${productPrice}
				</div>
				`
				items.innerHTML += addtoItems
			})
		})
	})

})


