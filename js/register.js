
// To notify if user is logged in or not

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");
let checkOutCart = document.getElementById("check-out-cart");
let createProduct = document.getElementById("create-product");
let allusers = document.getElementById("all-users");

let retrieveOrders = document.getElementById("retrieve-orders");
let retrieveFulfilledOrders = document.getElementById("retrieve-fulfilled-orders");
//console.log(register);

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
			<a href="./checkOut.html" class="btn btn-outline-dark" type="submit">
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
	<a class="nav-link active" aria-current="page" href="#">Register</a>
	</li>
	`

 	
}




//console.log(`Register.js`);

/*Targetting the whole form*/
let registerForm = document.getElementById("register-user");

//Checking if the form is targetted
//console.log(registerForm);

registerForm.addEventListener("submit", (event) => {
	//to prevent the page from refreshing if wrong details are given
	event.preventDefault();


//Grab Every input value
let firstName = document.getElementById("FirstName1").value;
let lastName = document.getElementById("LastName1").value;
let mobileNumber = document.getElementById("MobileNumber1").value;
let email = document.getElementById("InputEmail1").value;
let password = document.getElementById("InputPassword1").value;
let confirmPassword = document.getElementById("InputConfirmPassword1").value;
	
	//Confirm if password and confirm password are the same
	if (password == confirmPassword && mobileNumber.length >= 11) {
		fetch("https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users/email-exists", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				email : email
			}) 
		}).then(response => response.json()).then((json) => {
			//check the result 
			//console.log(json);
			//if true then it will continue
			if (json) {
				fetch("https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users/register", {
				method: "POST",
				headers: {
					"Content-Type" : "application/json"
				},
				body: JSON.stringify({
					firstName : firstName,
					lastName : lastName,
					email : email,
					mobileNo : mobileNumber,
					password : password
				})
			}).then(response => response.json()).then(response => {
				//check if successful
				//console.log(response)
				if (response) {
						alert(`Successfully Registered!, You may now login!`);
						window.location.replace("./login.html");
					} else {
						alert(`Something went wrong. Please try again!`);
					}
			})
			}
			
		})
	}
		
})

let checkFirstPassword = document.getElementById("Check1")

checkFirstPassword.addEventListener("click", (event) => {
	let getPassword = document.getElementById("InputPassword1");

	if (getPassword.type == 'password') {
		getPassword.type = 'text';
	} else {
		getPassword.type = 'password';
	}
})

let checkConfirmPassword = document.getElementById("Check2");

checkConfirmPassword.addEventListener("click", (event) => {
	let getConfirmPassword = document.getElementById("InputConfirmPassword1");

	if (getConfirmPassword.type == 'password') {
		getConfirmPassword.type = 'text';
	} else {
		getConfirmPassword.type = 'password';
	}
})

if (token != null && isAdmin == "true") {
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