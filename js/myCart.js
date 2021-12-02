
// To notify if user is logged in or not

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");

let createProduct = document.getElementById("create-product");
let isAdmin = localStorage.getItem("isAdmin");

//console.log(register);
let tableHead = document.getElementById("table-head");
let tableBody = document.getElementById("table-body");
let table = document.getElementById("tableMain");
let totalPrice = document.getElementById("total-price");

let tableBodyContent;

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


if (isAdmin == "true") {

	createProduct.innerHTML = `
	<li>
	<a class="nav-link active" aria-current="page" href="./createProduct.html">Register Product</a>
	</li>
		
	`
}



fetch("https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/retrieve-cart", {
	method: "GET",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(cartOrder => {
	//console.log(cartOrder)
	let {totalAmount, _id } = cartOrder 

	if (cartOrder) {
		let productsOrdered = cartOrder.orderedProducts;
		//console.log(productsOrdered.length)

		if (productsOrdered.length == 0) {
			tableBodyContent = null
			table.innerHTML = `
			<div>
				<h3 class="text-center">No products ordered yet</h3>
			</div>
			`
		} else {



			tableHead.innerHTML = `
			<tr>
			  <th scope="col"></th>
			  <th scope="col">Name</th>
			  <th scope="col">Product Description</th>
			  <th scope="col">Price</th>
			  <th scope="col">Status</th>
			</tr>
			`

			totalPrice.innerHTML = `
			<div class="p-2 m-2 d-flex justify-content-around">
				<div>
				Total Price: Php ${totalAmount}
				</div>
				<div>
					<a class="btn btn-outline-dark" href="./checkOut.html?orderId=${_id}">Check Out</a>
				</div>
			</div>

			`
			productsOrdered.map((product, index) => {
			let productID = product.productId
			fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productID}/retrieve-product`).then(response => response.json()).then(product => {
				const { productName, productDescription, productPrice, _id} = product

				tableBodyContent = `
				<tr>
				      <th scope="row"></th>
				      <td>${productName}</td>
				      <td>${productDescription}</td>
				      <td>Php ${productPrice}</td>
				      <td><a class="btn btn-outline-dark" href="./removeToCart.html?productId=${_id}&index=${index}">Remove to Cart</a></td>
				    </tr>
				`

				tableBody.innerHTML += tableBodyContent
			})

		})

		}
		
	} else {
		alert(`Something went wrong. Please try again later.`)
	}
})




