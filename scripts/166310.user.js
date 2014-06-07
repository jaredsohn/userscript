// ==UserScript==
// @name        Letsget List All Coupon Codes
// @namespace   http://localhost.localdomain
// @include     https://admin.letsget.net/Private/MenuCoupon.aspx
// @version     1
// @grant       metadata
// ==/UserScript==

window.addEventListener("load", addButton(), false);
 
function addButton(){

var buttonElems = document.getElementById('uHeaderLinks_lblMessage');
buttonElems.outerHTML = buttonElems.outerHTML + '<input id="greasemonkeyButton2" type="button" value="Get Item List" />';
addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton2");
  button.addEventListener('click',doMonkey1,true);
}
 
function doMonkey1(){

		var selectobject=document.getElementById("BP_Content_ddlCoupon");
		
		var found = false;
		var coupons = "";
		
		for (var i=0; i<selectobject.length; i++){
			if ( selectobject.options[i].text.trim() == "New" ) {
			}else{

// The next commented out code is an attempt to make
// a list of all coupon codes and their relavent data.
			selectobject.onchange();	
			//var bDate = document.getElementById("BP_Content_txtEffectiveDate");
			//var EDate = document.getElementById("BP_Content_txtExpirationDate");
// End of Code to make list
			
			//coupons += selectobject.options[i].text + " Beg Date: " + bDate.text + "  Exp Date: " + EDate.text + "\n";
			coupons += selectobject.options[i].text + "[" + selectobject.options[i].value + "]" + "\n";
			}
		}
		var LastButton=document.getElementById("frmBasePage");
		
		LastButton.outerHTML = LastButton.outerHTML + '<textarea id="greasemonkeyTextArea1"  rows="15" cols="100"  />';
		document.getElementById('greasemonkeyTextArea1').value = coupons;
}

