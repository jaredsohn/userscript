// ==UserScript==
// @name        Letsget Coupon Page Assistant
// @namespace   http://localhost.localdomain
// @description Script to make the Letsget Coupon Page useable by humans
// @include     https://admin.letsget.net/Private/MenuCoupon.aspx
// @version     3
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require  	https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       metadata
// ==/UserScript==

//From userscripts.org

// Declare variables
var mycoup = "";

// Set up buttons/boxes that should be at the top of the page
window.addEventListener("load", fnAddMyStuff(), false);


function fnAddMyStuff() {

	$("#uHeaderLinks_lblMessage").after('<div id="gmItems"><input id="gmbSaveAndCopy" type="button" value="Save and Copy" /><input id="gmbListAllCodes" type="button" value="Get Item List" /><input id="gmbFindCoupon" type="button" value="Find Coupon" /></div>');

	//$("#BP_Content_txtDiscountedQuantity_txt").after(" <input id=myPromoSearchBox name=myPromoBox type=text value='Coup Code' style=width: 50px;> ");

	//$("#uHeaderLinks_lblMessage").after(" <input id=myPromoSearchBox name=myPromoBox type=text value='Promotions' style=width: 50px;> ");
	
	fnFinishPage();
	//fnShowCouponPromotions();
	
	//Set up event listener for Coupon find button
	$('#gmbFindCoupon').on('click', function(){

		if (mycoup === null) {mycoup = ''};
		mycoup = prompt('give me a coupon please');

		if(mycoup){
			var selectobject=document.getElementById("BP_Content_ddlCoupon");
			var found = false;
			for (var i=0; i<selectobject.length; i++){
				var loc = selectobject.options[i].text.toUpperCase().indexOf(mycoup.toUpperCase(),0)
				if (loc > -1 ){
					//alert(selectobject.options[i].text+" "+selectobject.options[i].value);
					selectobject.selectedIndex = i;
					selectobject.onchange();
					found = true;
					waitForKeyElements("#BP_Content_txtCouponDescription", fnShowCouponPromotions, false);
					break;
				}
			}
			if (found == false){
				alert('The coupon code you provided could not be found: ' + mycoup);
			}
			
		}else{
		alert('no value given');
		}
	});
	
	//Setup event listener for Get All Codes button
	$('#gmbListAllCodes').on('click', fnDisplayAllCodes);
	
} //EOF fnAddMyStuff


function fnShowCouponPromotions(jnode) {

	$("#BP_Content_lstPromotionItems").attr('size',24);
	$("#BP_Content_lstPromotionItemsSelected").attr('size',24);
	
	$("#BP_Content_txtDiscountedQuantity_txt").after(" <input id=myPromoSearchBox name=myPromoBox type=text value='Coup Code' style=width: 50px;> CTL to Search!");
	
	$("#myPromoSearchBox").keyup(function(event) {
		if (event.which == 17) { //17 is the CTRL key
		//alert("Im here: " + $("#myPromoSearchBox").val());
			event.preventDefault();
			fnSearchForItem($("#myPromoSearchBox").val());
		}
	});
}

function fnSearchForItem(mycoup) {

//alert('mycoup: ' +  mycoup.toString());

	 if(mycoup){
		 var selectobject=document.getElementById("BP_Content_lstPromotionItems");
		 var found = false;
		 for (var i=0; i<selectobject.length; i++){
			 var loc = selectobject.options[i].text.toUpperCase().indexOf(mycoup.toUpperCase(),0)
			 if (loc > -1 ){
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

function fnFinishPage() {

	var dt = new Date();
	var myMonth = dt.getMonth()
	myMonth++
	document.getElementById("BP_Content_txtEffectiveDate").value = myMonth + '/' + dt.getDate() + '/' + dt.getFullYear();

	document.getElementById("BP_Content_txtExpirationDate").value = '12/31/2055';

	document.getElementById("BP_Content_rbUseQualifyingItem").checked = false;
	document.getElementById("BP_Content_rbUseQualifyingOrder").checked = true;
	document.getElementById("BP_Content_txtMinimumOrder_txt").value = '0.0';

	document.getElementById("BP_Content_chkAutoAddInd").checked = true;
	document.getElementById("BP_Content_rbCouponCode").checked = true;
	document.getElementById("BP_Content_rbCouponCode").onclick();
	
	//$(#"BP_Content_btnSave_btnAction").click(function() {window.location.reload();});
	
	waitForKeyElements("#BP_Content_rbOneTimeOnly,#BP_Content_lstPromotionItems", fnShowCouponPromotions, false);
	
//	document.getElementById("BP_Content_btnSave_btnAction").addEventListener("click", function(){ window.location.reload(); }, false);
	
	//$(#"BP_Content_btnSave_btnAction").click(function() {window.location.reload();});
}

function fnDisplayAllCodes() {
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