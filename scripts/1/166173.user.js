// ==UserScript==
// @name        Letsget Coupon Find Box
// @namespace   http://localhost.localdomain
// @description Help find Coupons in the List
// @include     https://admin.letsget.net/Private/MenuCoupon.aspx
// @version     1
// @grant       metadata
// ==/UserScript==




window.addEventListener("load", addButton(), false);
var mycoup = "";
 
 // alert('here here here' & mycoup);
 
function addButton(){

//var newElement = '<input id="greasemonkeyButton" type="button" value="Call Greasemonkey Function" />';
//document.body.insertBefore(newElement,document.body.firstChild);

//alert('Load yes);

var buttonElems = document.getElementById('ctl00_uHeaderLinks_lblMessage');
buttonElems.outerHTML = buttonElems.outerHTML + '<input id="greasemonkeyButton" type="button" value="Coupon Search" />';
addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey1,true);
}
 
function doMonkey1(){

//alert('mycoup: ' +  mycoup.toString());

	if (mycoup === null) {mycoup = ''};

//	if (mycoup.toString() == '') {
		mycoup = prompt('give me a coupon please');
//	}else{
	//	mycoup = prompt('give me a coupon please','Copy of ' + mycoup.toString());
//	}
	
//	alert(mycoup);
	if(mycoup){
		var selectobject=document.getElementById("ctl00_BP_Content_ddlCoupon");
		var found = false;
		for (var i=0; i<selectobject.length; i++){
			//if ( i = 708) {
			//	alert(selectobject.options[i].text.toUpperCase());
			//	}
			//console.info("Coupon: #" + i.toString() + "   -   " + selectobject.options[i].text.toUpperCase());
			var loc = selectobject.options[i].text.toUpperCase().indexOf(mycoup.toUpperCase(),0)
			if (loc > -1 ){
				//alert(selectobject.options[i].text+" "+selectobject.options[i].value);
				selectobject.selectedIndex = i;
				selectobject.onchange();
				found = true;
				break;
			}
		}
		if (found == false){
			alert('The coupon code you provided could not be found: ' + mycoup);
		}
			
    }else{
		alert('no value given');
		}
	
}