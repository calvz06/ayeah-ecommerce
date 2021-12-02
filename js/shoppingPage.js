
// To notify if user is logged in or not

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");
let createProduct = document.getElementById("create-product");
let checkOutCart = document.getElementById("check-out-cart");

let retrieveOrders = document.getElementById("retrieve-orders");
let retrieveFulfilledOrders = document.getElementById("retrieve-fulfilled-orders")
let allusers = document.getElementById("all-users");
let userProfile = document.getElementById("user-profile");

let isAdmin = localStorage.getItem("isAdmin");
let userRegID = localStorage.getItem("userId");

let cardFooter;
let productData;

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
		<a class="nav-link active" aria-current="page" href="./userProfile.html?userId=${userRegID}">User Profile</a>
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


//target the page
let itemsList = document.getElementById("items-list")
//console.log(itemsList);

	

if (token != null && isAdmin == "false") {
	//Not Admin

	fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/active-products`).then(response => response.json()).then(Products => {

		if (Products.length < 1) {
			itemsList.innerHTML = `
			<h2>No Items Available</h2>
			`;
		} else {
			//console.log(`else`)
			productData = Products.map((product, index) =>{
				const { createdOn, isActive, productDescription, productName, productPrice, _id } = product
				
				cardFooter = 
					`
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./addToCart.html?productId=${_id}">Add to Cart</a>
					</div>
					
					`
				return (`<div class="col mb-5">
			               	<div class="card h-100">
			                <!-- Product image-->
			                <img class="card-img-top" src="./../assets/shopping${index}.jpg" alt="..." />
			                <!-- Product details-->
			                    <div class="card-body p-4">
			                        <div class="text-center">
			                            <!-- Product name-->
			                                <h5 class="fw-bolder">${productName}</h5>
			                                <!-- Product price-->
			                                Php ${productPrice}
			                        </div>
			                   </div>
			                  		    <!-- Product actions-->
			               		            <p class="p-2 text-center">${productDescription}</p>
			                     	<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
			                       ${cardFooter}
			                        </div>
			                    </div>
			            	</div>
			            </div>
					`)
			}).join("")

			itemsList.innerHTML = productData;

		}
	})
} else if (token != null && isAdmin == "true"){

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
	//IF ADMIN
	//console.log(`else if`)

	fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/`, {
		method: "GET",
		headers: {
			"Content-Type" : "application/json",
			"Authorization" : `Bearer ${token}`
		}
	}).then(response => response.json()).then(Products => {

		if (Products.length < 1) {
			itemsList.innerHTML = `
			<h2>No Items Available</h2>
			`;
		} else {
			productData = Products.map((product, index) =>{
				const { createdOn, isActive, productDescription, productName, productPrice, _id } = product
				//console.log(isActive);
				if (isActive == false) {
					cardFooter = 
					`
					
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./unarchive.html?productId=${_id}">Unarchive Product</a>
					</div>
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./editProduct.html?productId=${_id}">Edit Product</a>
					</div> 
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./deleteProduct.html?productId=${_id}">Remove Product</a>
					</div>
					`;
				} else {
					cardFooter = 
					`
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./addToCart.html?productId=${_id}">Add to Cart</a>
					</div>
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./archive.html?productId=${_id}">Archive Product</a>
					</div>
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./editProduct.html?productId=${_id}">Edit Product</a>
					</div> 
					<div class="text-center p-1">
						<a class="btn btn-outline-dark mt-auto" href="./deleteProduct.html?productId=${_id}">Remove Product</a>
					</div> 
					`;
				}

				return (`
					<div class="col mb-5">
						<div class="card h-100">
						<!-- Product image-->
							<img class="card-img-top" src="./../assets/shopping${index}.jpg" alt="..." />
							<!-- Product details-->
							<div class="card-body p-4">
								<div class="text-center">
								<!-- Product name-->
								<h5 class="fw-bolder">${productName}</h5>
								<!-- Product price-->
								Php ${productPrice}
								</div>
								</div>
								<!-- Product actions-->
								<p class="p-2 text-center">${productDescription}</p>
								<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
								${cardFooter}
							</div>
						 </div>
						</div>
					</div>					
				`)

			}).join("")

			itemsList.innerHTML = productData
		}
	})
} else {
	//console.log(`else`)
	fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/active-products`).then(response => response.json()).then(Products => {

		if (Products.length < 1) {
			itemsList.innerHTML = `
			<h2>No Items Available</h2>
			`;
		} else {
			//console.log(`else`)
			productData = Products.map((product, index) =>{
				const { createdOn, isActive, productDescription, productName, productPrice, _id } = product

				return (`<div class="col mb-5">
			               	<div class="card h-100">
			                <!-- Product image-->
			                <img class="card-img-top" src="./../assets/shopping${index}.jpg" alt="..." />
			                <!-- Product details-->
			                    <div class="card-body p-4">
			                        <div class="text-center">
			                            <!-- Product name-->
			                                <h5 class="fw-bolder">${productName}</h5>
			                                <!-- Product price-->
			                                Php ${productPrice}
			                        </div>
			                   </div>
			                  		    <!-- Product actions-->
			               		            <p class="p-2 text-center">${productDescription}</p>
			                  
			                    </div>
			            	</div>
			            </div>
					`)
			}).join("")

			itemsList.innerHTML = productData;

		}
	})
}

	