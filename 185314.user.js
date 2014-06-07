// ==UserScript==
// @name        Letsget Menu Item - Update Defaults
// @namespace   http://localhost.localdomain
// @description Update the Item Level Info to the defaults (Coupon Code, Default Out Of Stock, Allow Comments)
// @include     https://admin.letsget.net/Private/MenuBuilder.aspx*
// @include     https://admin.letsget.net/Private/MenuItem.aspx
// @version     2
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require  	https://snappytomato.com/js/store-js/store.js
// @grant       metadata
// ==/UserScript==

// From userscripts.org

//
//To use:
//**********************************************************************************
// Usage: 
//      1) Turn on "Show Descriptions" option on the page
//		2) Turn on this script in GreaseMonkey
//      3) Click the box to the left of the items you want to verify defaults and report errors on
//      6) Click "Update Selected Items" button (should be red)
//      7) Watch it work
//      8) Look at the bottom of the Menu page to see ir errors were found.
//			Errors checked are Name/POS Adjustmemnt Item mis match
//					Name / Coupon Code Name mis-match.

//********************************************************************************


var ProcessStatus = store.get('ProcessStatus');
if (ProcessStatus === undefined) {ProcessStatus = 'BEGIN';}

//alert('processStatus: ' + ProcessStatus);

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
	window.addEventListener("load", fnGetStartedDetail, false);
}

function fnGetStarted() {

	if (ProcessStatus == 'BEGIN')
	{

		$("#ctl00_uHeaderLinks_lblMessage").after('<div id="gmItems" style="width: 190px; position: fixed; left: 50%; top: 120px; margin: 0 0 0 110px;"><input id="gmbProcessItem" type="button" value="Update Selected Items" style="color: black; background-color:red;" /></div>');
		
		$('#gmbProcessItem').on('click', function(){ fnProcessItem() });

		
	}
	else if (ProcessStatus == 'STARTED') 
	{
		
		fnProcessItem();

	}
	else if (ProcessStatus == 'LASTITEM') 
	{
		
		var myProblems = store.get('Problems');
		if (myProblems === undefined) 
		{
			alert('No Problems were detected for your selected items!!');

		}
		else
		{

			var LastButton=document.getElementById("aspnetForm");
			LastButton.outerHTML = LastButton.outerHTML + '<textarea id="greasemonkeyTextArea1"  rows="15" cols="100"  />';
			document.getElementById('greasemonkeyTextArea1').value = store.get('Problems');

		}

		store.clear();
	}

} // fnGetStarted

function fnProcessItem() {

	store.set('ProcessStatus','STARTED');
	
	//alert ('In fnProcessItem');

	// Look for a checked item to work on
	for (var i=0; i<1000; i++){
		var snum = ('0' + i).slice(-2);
		var xnum = i + 1;
		var snumLookAhead = ('0' + xnum).slice(-2);
		var jqCkdItem = '#ctl00_BP_Content_rptMenuItem_ctl' + snum + '_chkSelected';
		var jqCkdItem_LookAhead = '#ctl00_BP_Content_rptMenuItem_ctl' + snumLookAhead + '_chkSelected';
		var foundItem = false;
		//alert ($(ckdItem).is(':checked'));
		if ($(jqCkdItem).is(':checked')) {
			
			foundItem = true;
			$(jqCkdItem).prop('checked', false);

			if ($(jqCkdItem_LookAhead).is(':checked')) 
			{}
			else{	store.set('ProcessStatus','LASTITEM'); 	}
			
		//	//simluate the clicking of the EDIT link
			var evt = document.createEvent("MouseEvents");
			var el = document.getElementById("ctl00_BP_Content_rptMenuItem_ctl" + snum + "_btnEditItem");
			evt.initEvent("click", true,true);
			el.dispatchEvent(evt);
			//break; // get out of if
		}
		 if (foundItem == true) {break;}
		
			
	} //for

	 
}   // fnProcessItem

function fnGetStartedDetail() {
	
	if (ProcessStatus != 'BEGIN') // This should only process when the status is "STARTED" or "LASTITEM"
	{

		var Problems = store.get('Problems');
		if (Problems === undefined) {Problems = ' ';}

		var ItemDesc = $('#ctl00_BP_Content_txtMenuItemDescription').val();
		var ItemName = $('#ctl00_BP_Content_txtMenuItemName').val();
		var ItemNameArr = ItemName.split(" ");
		var CouponCode =  ItemNameArr[0];
		var CouponCodeSeq = ItemDesc.slice(-1); // gets the last character of the string.
		
		var selectobject=document.getElementById("ctl00_BP_Content_ddlPOSAdjustmentMenuItem");
		var POSAdjOptions = selectobject.options[selectobject.selectedIndex].text.split(" ");

		if (CouponCode.toUpperCase() != POSAdjOptions[0].toUpperCase()) 
		{
			Problems += "Item: " + ItemName + " Bad POS Adjustment Item: " + selectobject.options[selectobject.selectedIndex].text + " /\n";
		}

		$('#ctl00_BP_Content_chkDefaultOutOfStock').prop('checked',true);
		$('#ctl00_BP_Content_chkAllowComments').prop('checked',false);
				
		
		if ($('#ctl00_BP_Content_txtCouponDescription').val().trim() == "")
		{
			$('#ctl00_BP_Content_txtCouponDescription').val(ItemName);
			$('#ctl00_BP_Content_txtCouponCode').val(ItemDesc);

			var dt = new Date();
			var myMonth = dt.getMonth()
			myMonth++
			$('#ctl00_BP_Content_txtEffectiveDate').val( myMonth + '/' + dt.getDate() + '/' + dt.getFullYear());
			$('#ctl00_BP_Content_txtExpirationDate').val('12/31/2055');

		}else
		{
			if (CouponCode.toUpperCase() != $('#ctl00_BP_Content_txtCouponCode').val().toUpperCase())
			{
				Problems += "Item: " + ItemName + " Coupn Code Mis-Match: Code in DESC: " + CouponCode.toUpperCase() + " Coupon Code Setup: " + $('#ctl00_BP_Content_txtCouponCode').val().toUpperCase() + " /\n";
			}
		}
		

		store.set('Problems',Problems);
		
		//If this is the last item, then clear the local storage so script will load gracefully on the MenuBuilder page.
		// if (ProcessStatus == 'LASTITEM')  
		// {
		// 	store.clear();

		// }else
		// {
		// 	store.set('Problems',Problems);
		// }

		//Simulate the clicking of the "SAVE" button
		var evt2 = document.createEvent("MouseEvents");
		var e2 = document.getElementById("ctl00_BP_Content_btnSave_btnAction");
		evt2.initEvent("click", true,true);
		e2.dispatchEvent(evt2);
	}

} // fnProcessDetail 