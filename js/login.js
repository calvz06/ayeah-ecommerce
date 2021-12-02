
// To notify if user is logged in or not

let token = localStorage.getItem("token");

let navSession = document.getElementById("nav-session");
let register = document.getElementById("register-status");
let checkOutCart = document.getElementById("check-out-cart");
//console.log(register);

//User has token
if (token != null) {
	//console.log(token)
	navSession.innerHTML = 

	`
	<li>
	<a class="nav-link active" aria-current="page" href="#!">Log Out</a>
	</li>
	`

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
	//console.log(token);
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


/*Targetting the login form*/
let logInForm = document.getElementById("login-user");

logInForm.addEventListener("submit",(event)=> {
	event.preventDefault();

//Capturing the value of email and password
let email = document.getElementById("InputEmail1").value;
let password = document.getElementById("InputPassword1").value;

	fetch("https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users/login", {
		method: "POST",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify({
			email : email,
			password : password
		})
	}).then(response => response.json()).then(response =>{
		//console.log(response);
		//localStorage -store the token in the local storage
				//setItem("property name, data")
				//getItem("property name")

		//console.log(response.access);
		localStorage.setItem("token", response.access);
		if (response.access){

			let token = localStorage.getItem("token");

			fetch("https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/users/details", {
				method: "GET",
				headers: {
					"Content-Type" : "application",
					"Authorization" : `Bearer ${token}`
				}
			}).then(response => response.json()).then(response => {
				//to check for result
				
				const { isAdmin, _id } = response
				//console.log(response);
				//console.log(response.isAdmin);

				localStorage.setItem("isAdmin", isAdmin);
				localStorage.setItem("userId", _id);

				alert(`Logged in successfully!`)
				window.location.replace("./issueCart.html");
			})
			
			
		} else {
			alert(`Incorrect or missing details. Please try again.`);
		}
	})
})

let checkFirstPassword = document.getElementById("Check1");

checkFirstPassword.addEventListener("click", (event) => {
	let getPassword = document.getElementById("InputPassword1");

	if (getPassword.type == 'password') {
		getPassword.type = 'text';
	} else {
		getPassword.type = 'password';
	}
})

