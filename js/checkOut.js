let isAdmin = localStorage.getItem("isAdmin");
//console.log(isAdmin);

let token = localStorage.getItem("token");

let userId = localStorage.getItem("userId");
let params = new URLSearchParams(window.location.search)
let orderId = params.get("orderId")

let checkOutPromt = document.getElementById("check-out-prompt");

let checkOutItems = document.getElementById("check-out-items");
let totalPriceReceipt = document.getElementById("total-price");

fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/orders/${orderId}/check-out`, {
	method: "PUT",
	headers: {
		"Content-Type" : "application/json",
		"Authorization" : `Bearer ${token}`
	}
}).then(response => response.json()).then(orderDetails => {
	//console.log(orderDetails)

	let { totalAmount, orderedProducts, userId, _id} = orderDetails
	
	totalPriceReceipt.innerHTML = `
	<div class="p-3 m-3">
	Total amount to pay: PHP ${totalAmount}
	<span id="tracking-number"></span>
	</div>
	`

	let trackingNumber = document.getElementById("tracking-number");

	trackingNumber.innerHTML = 
	`
	<div>
		Order Number: ${_id}
	</div>
	`

	orderedProducts.map((product) => {
		let { productId } = product
		//console.log(productId)
		fetch(`https://ayeah-ecommerce-booking.herokuapp.com/ecommerce/products/${productId}/retrieve-product`,{
		method: "GET",
		headers: {
			"Content-Type" : "application/json",
			"Authorization" : `Bearer ${token}` 
			}
		}).then(response => response.json()).then(product => {
			//console.log(product);
			

			let checkOutItem = `
				<div class="d-flex justify-content-around">
					<div class="p-1 m-1 font-weight-bold">
						${product.productName}
					</div>
					<div class="p-1 m-1 font-weight-bold">
						Php ${product.productPrice}
					</div>
				</div>
			`

			checkOutItems.innerHTML += checkOutItem;
		})

	})
	
})	