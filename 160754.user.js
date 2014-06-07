// ==UserScript==
// @name           iBOOD Autosubmit to Bancontact/Mr Cash
// @namespace      Allows you to Fast Forward required forms in iBOOD
// @description    When Ibood organises a "hunt", it can be very hard to obtain some objects due to the limited quantity. This script will auto-submit the forms directly up to the Bancontact/MrCash page.
// @include        https://order.ibood.com/*
// @include	   htt*://www.ibood.com/*
// @include        htt*://www.paypal.com/*
// @include        htt*://www.sofort.com/*
// @include	   htt*://secure.ogone.com/*
// @author         K.M. de Haan
// @authorURL	   http://www.k-graphics.nl
// @downloadURL    https://userscripts.org/scripts/source/160754.user.js
// @updateURL      https://userscripts.org/scripts/source/160754.meta.js
// @icon	   http://i1229.photobucket.com/albums/ee462/joeralit/jempollike.png
// @version        1.1
// @license        GNU
// ==/UserScript==

// Start of url in webpage
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.90;
	div.style.bottom = "+15px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E52A71";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#FAFAFA' href='http://www.K-Graphics.nl' title='K-Graphics.nl - Full service internetagency'><center>K-Graphics.nl</center></a>"
body.appendChild(div);}

// Start of submitscript
var quantity = 1;
  var paymentprovider = 21; // Bancontact-MrCash
//var paymentprovider = 32; //Sofortbanking
//var paymentprovider = 23; // Paypal

// Submit first form
var firstform = document.getElementById('order');
if(firstform != undefined){
	for(var x=0;x<firstform.length;x++){
		if(firstform.elements[x].name == "order[quantity]"){
			if(firstform.elements[x].value == quantity){
				firstform.elements[x].checked = true;
				break;
			}
		}
	}	
	firstform.submit();
}


// Change provider type
var secondform = document.getElementById('orderform');
if(secondform != undefined){
	for(var x=0;x<secondform.length;x++){
		if(secondform.elements[x].name == "order[payment]"){
			if(secondform.elements[x].value == paymentprovider){
				secondform.elements[x].checked = true;
				break;
			}
		}
	}
}

// create virtual click
function simulateClick(node) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return node.dispatchEvent(ev);
}

$(document).ready(function() {
      $("input[pmmethod=bancontact/mrcash]").click();
//    $("input[pmmethod=Sofortbanking]").click();
//    $("input[pmmethod=paypal]").click();
simulateClick( $(".submit-button")[0] );
});