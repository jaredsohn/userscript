// ==UserScript==
// @name           Shopify Checkout Assistant
// @namespace      checkout.shopify.com
// @description    Automatically fill the order details in the checkout area
// @include        https://checkout.shopify.com/*
// ==/UserScript==

var Customer = {
  email: 'staging@shopify.com',
  firstName: "Mister",
  lastName: "Shopify",
  address1: "Bla Drive 123",
  city: "Beverly Hills",
  zip: "90210",
  country: "United States",
  province: "California",
  phone: "12345"
};


function selectOption(id, value) {
	var select = document.getElementById(id);
	for (index = 0; index < select.options.length; index++) {
	  if (select.options[index].value == value) {
	    select.selectedIndex = index;
	    return true;
	  }
	}
}

function pageScroll() {
  window.scrollBy(0,1000);
}


function fillWithDummyData() {
  document.getElementById("order_email").value = Customer.email;
  document.getElementById("billing_address_first_name").value = Customer.firstName;
  document.getElementById("billing_address_last_name").value  = Customer.lastName;
  document.getElementById("billing_address_address1").value   = Customer.address1;
  document.getElementById("billing_address_city").value       = Customer.city;
  document.getElementById("billing_address_zip").value        = Customer.zip;

  selectOption("billing_address_country", Customer.country);    
  document.getElementById("billing_address_province").value   = Customer.province; 
  document.getElementById("billing_address_phone").value      = Customer.phone;
};

window.addEventListener("load", function() {
  var email = document.getElementById('order_email');
  var button = document.createElement("input");
  button.type = "button"
  button.value = 'Fill with dummy data';
  button.addEventListener("click", function() {
    fillWithDummyData();
    pageScroll();
    document.getElementById("commit-button").focus();
    return false;
  }, true);
  email.parentNode.insertBefore(button, email); 
}, true);