// ==UserScript==
// @name       Kounta Email Autofill
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Automatically Enters an Address into the Email field when creating a new customer in the Kounta POS System 
// @match      http://kounta.com/index.php/pos/kounta
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document).click(function() {
  //alert("you clicked something");
    if ($('#txtCustomerEmail').length > 0) {
  		// exists.
        //alert(new Date().getTime() + '@Sans-Souci-AutomatedAddress')
        $('#txtCustomerEmail').val(new Date().getTime() + '@An-automated-address.com');
        //alert("It is here");
	}
});