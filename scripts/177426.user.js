// ==UserScript==
// @name        Letsget Coupon Page Initial Load for Coupon Add
// @namespace   http://localhost.localdomain
// @include     https://admin.letsget.net/Private/MenuCoupon.aspx
// @version     1
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require  	https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       metadata
// ==/UserScript==


document.getElementById("BP_Content_lstPromotionItems").size = "24";
document.getElementById("BP_Content_lstPromotionItemsSelected").size = "24";


if (document.getElementById("BP_Content_ddlCoupon").selectedIndex == 0) {

// Looks like we may be setting up a new coupon, so set some defaults for the way
// we like it.

document.getElementById("BP_Content_rbCouponCode").checked = true;
document.getElementById("BP_Content_rbAlwaysUse").checked = false;
document.getElementById("BP_Content_rbLoyaltyProgramOfferCode").checked = false;
document.getElementById("BP_Content_rbCouponCode").onclick();

waitForKeyElements("#BP_Content_rbOneTimeOnly", fnFinishPage, true);

}


function fnFinishPage(jNode) {

	var dt = new Date();
	var myMonth = dt.getMonth()
	myMonth++
	document.getElementById("BP_Content_txtEffectiveDate").value = myMonth + '/' + dt.getDate() + '/' + dt.getFullYear();

	document.getElementById("BP_Content_txtExpirationDate").value = '12/31/2055';

	document.getElementById("BP_Content_rbUseQualifyingItem").checked = false;
	document.getElementById("BP_Content_rbUseQualifyingOrder").checked = true;
	document.getElementById("BP_Content_txtMinimumOrder_txt").value = '0.0';

	document.getElementById("BP_Content_chkAutoAddInd").checked = true;
	
	document.getElementById("BP_Content_lstPromotionItems").size = "24";
	document.getElementById("BP_Content_lstPromotionItemsSelected").size = "24";


}

