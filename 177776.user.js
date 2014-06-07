// ==UserScript==
// @name        Letsget Menu Item List with Details
// @namespace   http://localhost.localdomain
// @include     https://admin.letsget.net/Private/MenuBuilder.aspx*
// @include     https://admin.letsget.net/Private/MenuItem.aspx
// @version     6
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require  	https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  	https://snappytomato.com/js/store-js/store.js
// @grant       metadata
// ==/UserScript==

// From userscripts.org

var itemInfo = '';
var ProcessStatus = store.get('ProcessStatus');
if (ProcessStatus === undefined) {ProcessStatus = 'BEGIN';}

var lastWord = function(o) {
  return (""+o).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
};
//lastWord('This is a test.'); // => 'test.'

var myUrl = document.URL;
var myPage = '';
if (myUrl.toUpperCase().indexOf('MENUBUILDER.ASPX') > -1) {
	 myPage = 'MENUBUILDER';
}else{
	 myPage = 'MENUITEM';
}

if (myPage == 'MENUBUILDER') {
	window.addEventListener("load", fnGetStarted, false);
}

if (myPage == 'MENUITEM') {
	window.addEventListener("load", fnGetDetails, false);
}

function fnClearStore() {

	store.clear();
	alert('store cleared');
	}

function fnFormatFieldName(myname,myItemNum) {
	return '#BP_Content_rptMenuItem_' + myname + '_' + myItemNum; 
}	

function fnGetStarted() {
	
	//alert('fngetStarted');
	
	if (ProcessStatus == 'BEGIN'){

		$("#uHeaderLinks_lblMessage").after('<div id="gmItems" style="width: 190px; position: fixed; left: 50%; top: 120px; margin: 0 0 0 110px;"><input id="gmbProcessItem" type="button" value="Create Detail List" style="color: black; background-color:red;" /></div>');
		
		$('#gmbProcessItem').on('click', function(){ fnProcessItem() });

		var labels = 'Item Name|Option Sets|Item Type|Offer|Valid With Offers|Min Qty|Max Qty|Take Out Taxed|Delv Taxed|Dine In Taxed|POS Menu Item|POS Manual Combo Price|POS Adj Item|POS Price|Comments Allowed|Default OOS|Item Hidden|Coupon Code|Coupon Desc|Coupon Eff Date|Coupon Expire Date|Coupon Good with Other Offers|Good on 1st Time Only /\n'
		store.set('itemInfo',labels);


		//This enlarges all the input boxes so more of the text is visible
		$('.ContentInput').css("width", "500px");
	}else if (ProcessStatus == 'STARTED') {
		fnProcessItem();
	}
} // fnGetStarted

function fnProcessItem() {
	
	store.set('ProcessStatus','STARTED');
	
	// Look for a checked item to work on
	
	for (var i=0; i<1000; i++){
		var jqCkdItem = "#BP_Content_rptMenuItem_chkSelected_" + i;
		var foundItem = false;
		//alert ($(ckdItem).is(':checked'));
		if ($(jqCkdItem).is(':checked')) {
			
			foundItem = true;
			$("#BP_Content_rptMenuItem_chkSelected_" + i).prop('checked',false);
			
			var myInfo = store.get('itemInfo');
			// if (itemInfo === undefined) {itemInfo = '';}

			myInfo += $(fnFormatFieldName('txtMenuItemName',i)).val() + '|'; //Item Name
			myInfo += $(fnFormatFieldName('Label4',i)).text() + '|';  //Option Sets

			store.set('itemInfo',myInfo);

					
		//	//simluate the clicking of the EDIT link
			var evt = document.createEvent("MouseEvents");
			var el = document.getElementById("BP_Content_rptMenuItem_btnEditItem_"+i);
			evt.initEvent("click", true,true);
			el.dispatchEvent(evt);
			//break; // get out of if
		}
		 if (foundItem == true) {break;}
		
			
	} //for
	if (foundItem == false) {
		
		var LastButton=document.getElementById("frmBasePage");
		LastButton.outerHTML = LastButton.outerHTML + '<textarea id="greasemonkeyTextArea1"  rows="15" cols="100"  />';
		document.getElementById('greasemonkeyTextArea1').value = store.get('itemInfo');
		return;

		store.clear();

	}
}   // fnProcessItem

function fnGetDetails() {

	var myItemType = $("#BP_Content_ddlItemType option:selected").text();

	if  (myItemType == "Combination") {

		if ($("#BP_Content_dgCombination_rptCombinationSelectedList_0_trCombinationSelectedList_0").val() === undefined) {
			
			myItemType = "*NO Items*";

		}else{

			myItemType = "Combo";
		}
	}

	var theInfo = store.get('itemInfo');
	
	theInfo += myItemType + '|';
	theInfo += $("#BP_Content_chkOffer").is(':checked') ? 'YES|' : 'NO|';
	theInfo += $("#BP_Content_chkNotGoodWithOtherOffers").is(':checked') ? 'NO|' : 'YES|';
	theInfo += $("#BP_Content_txtMinimumQuantity_txt").val() + '|';
	theInfo += $("#BP_Content_txtMaximumQuantity_txt").val() + '|';
	
	theInfo += $("#BP_Content_chkNonTaxableTakeout").is(':checked') ? 'NO|' : 'YES|';
	theInfo += $("#BP_Content_chkNonTaxableDelivery").is(':checked') ? 'NO|' : 'YES|';
	theInfo += $("#BP_Content_chkNonTaxableDineIn").is(':checked') ? 'NO|' : 'YES|';
	
	theInfo += $( "#BP_Content_ddlPOSMenuItem option:selected" ).text() + '|';
	theInfo += $( "#BP_Content_txtManualCombinationPrice" ).val() +'|';
	theInfo += $( "#BP_Content_ddlPOSAdjustmentMenuItem option:selected" ).text() + '|';
	theInfo += $("#BP_Content_lblPOSPrice").text() + '|';
	theInfo += $("#BP_Content_chkAllowComments").is(':checked') ? 'YES|' : 'NO|';
	theInfo += $("#BP_Content_chkDefaultOutOfStock").is(':checked') ? 'YES|' : 'NO|';
	theInfo += $("#BP_Content_chkHidden").is(':checked') ? 'YES|' : 'NO|';
	
	theInfo += $( "#BP_Content_txtCouponCode" ).val() + '|';
	theInfo += $( "#BP_Content_txtCouponDescription" ).val() + '|';
	theInfo += $( "#BP_Content_txtEffectiveDate" ).val() + '|';
	theInfo += $( "#BP_Content_txtExpirationDate" ).val() + '|';
	theInfo += $( "#BP_Content_chkNotGoodWithOtherOfferInd" ).is(':checked') ? 'NOT Good|' : 'IS Good |';
	theInfo += $( "#BP_Content_chkFirstTimeCustomerOnlyInd" ).is(':checked') ? 'YES|' : 'NO|';
	
	theInfo += " /\n";
	
	store.set('itemInfo',theInfo);

	var evt2 = document.createEvent("MouseEvents");
	var e2 = document.getElementById("BP_Content_btnCancel_btnAction");
	evt2.initEvent("click", true,true);
	e2.dispatchEvent(evt2);


} // fnGetDetails