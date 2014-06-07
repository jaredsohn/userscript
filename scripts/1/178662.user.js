// ==UserScript==
// @name        Letsget Menu Item Add Sequence of Items
// @namespace   http://localhost.localdomain
// @description Add the next in the line of coupon code items based on the base item.
// @include     https://admin.letsget.net/Private/MenuBuilder.aspx*
// @include     https://admin.letsget.net/Private/MenuItem.aspx
// @version     5
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require  	https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  	https://snappytomato.com/js/store-js/store.js
// @grant       metadata
// ==/UserScript==

// From userscripts.org

/*
This script is used to update the "Copied 8 items" that were copied from the 1st one that was done
perfectly.

To use:
1) On the "ItemList" page make sure that the Descriptions are showing.
2) Enter your New Item and make sure that everything about it is perect.
	*** Make sure that DEFAULT OUT OF STOCK is checked
	*** Make sure taht "ALLOW COMMENTS" is NOT checked.
	*** Make sure the coupon code is in the Description field (wont work if you dont)
3) Make 5 Copies of this item
4) Make and additional 3 copies of this item for a total of 8 copies (9 items in all)
5) Place checkmarks next to the 8 copies (NOT the original).  Then click on "Process Items" button.
6) Repeat steps 2 thru 5
*/

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
	window.addEventListener("load", fnGetStartedDetail, false);
}

function fnClearStore() {

	store.clear();
	alert('store cleared');
	}

function fnGetStarted() {
	
//	alert('fngetStarted');
	
	if (ProcessStatus == 'BEGIN'){
		$("#ctl00_uHeaderLinks_lblMessage").after('<div id="gmItems" style="width: 190px; position: fixed; left: 50%; top: 120px; margin: 0 0 0 110px;"><input id="gmbProcessItem" type="button" value="Process Item" style="color: black; background-color:red;" /></div>');
		
		$('#gmbProcessItem').on('click', function(){ fnProcessItem() });

		//This enlarges all the input boxes so more of the text is visible
		// $('.ContentInput').css("width", "500px");
	
	}else if (ProcessStatus == 'STARTED') {

		fnProcessItem();

	}else if (ProcessStatus == 'LASTITEM') {

		store.clear();
		alert('Script is finished and the Local Storage has been cleared');
		$("#ctl00_uHeaderLinks_lblMessage").after('<div id="gmItems" style="width: 190px; position: fixed; left: 50%; top: 120px; margin: 0 0 0 110px;"><input id="gmbProcessItem" type="button" value="Process Item" style="color: black; background-color:red;" /></div>');
		$('#gmbProcessItem').on('click', function(){ fnProcessItem() });
		
	}

} // fnGetStarted

function fnProcessItem() {
	
	store.set('ProcessStatus','STARTED');
	
	//alert ('In fnProcessItem');

	// Look for a checked item to work on
	for (var i=0; i<1000; i++){

		if (i < 10)
		{
			var snum = ('0' + i).slice(-2);
		}
		else
		{
			var snum = i;	
		}
		
		
		var xnum = i + 1;
		if (xnum < 10) 
		{
			var snumLookAhead = ('0' + xnum).slice(-2);
		}
		else 
		{
			var snumLookAhead = xnum;
		}
		//var snumLookAhead = ('0' + xnum).slice(-2);
		var jqCkdItem = '#ctl00_BP_Content_rptMenuItem_ctl' + snum + '_chkSelected';
		var jqItemName = '#ctl00_BP_Content_rptMenuItem_ctl' + snum + '_txtMenuItemName';
		var jqItemDesc =  '#ctl00_BP_Content_rptMenuItem_ctl' + snum + '_txtMenuItemDescription';
		var jqCkdItem_LookAhead = '#ctl00_BP_Content_rptMenuItem_ctl' + snumLookAhead + '_chkSelected';
		var arrName = [];
		var foundItem = false;
		//alert ($(ckdItem).is(':checked'));
		if ($(jqCkdItem).is(':checked')) {
			
			arrName = $(jqItemName).val().split(" ");
			var ItemCouponCode = arrName[0];
			var ItemCopyNo = arrName[arrName.length-1].charAt(1);
			var ItemCopyNo = arrName.pop().charAt(1); //pop removes the last array element and returns its value
			var ItemDesc = $(jqItemDesc).text();
			var ItemNameNew
			//alert('arrName[0] before: ' + arrName[0]);
			switch (ItemCopyNo) {
				case '1':
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + '2';
					break;
				case '2': 
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + '3';
					break;
				case '3': 
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + '4';
					break;
				case '4': 
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + '5';
					break;
				case '5': 
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + '6';
					break;
				case '6': 
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + 'B';
					break;
				case '7': 
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + 'D';
					break;
				case '8': 
					arrName[0] = arrName[0].substring(0,arrName[0].length -1) + 'C';
					break;
				default:
			}
			foundItem = true;
			$(jqItemName).val(arrName.join(" "))  ;
			$(jqItemDesc).val(arrName[0])  ;
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
		var ItemDesc =  $('#ctl00_BP_Content_txtMenuItemDescription').text();
		var ItemName = $('#ctl00_BP_Content_txtMenuItemName').val();
		
		var selectobject=document.getElementById("ctl00_BP_Content_ddlPOSAdjustmentMenuItem");
		var found = false;
		for (var i=0; i<selectobject.length; i++){
			var loc = selectobject.options[i].text.toUpperCase().indexOf(ItemDesc,0)
			if (loc > -1 ){
				//alert(selectobject.options[i].text+" "+selectobject.options[i].value);
				selectobject.selectedIndex = i;
				selectobject.onchange();
				found = true;
				//waitForKeyElements("ctl00_BP_Content_txtCouponDescription", fnShowCouponPromotions, false);
				
				//simluate the clicking of the cancel button
							
				break;
			}
		}
		if (found == false) {
			$('ctl00_BP_Content_txtMenuItemDescription').text($('ctl00_BP_Content_txtMenuItemDescription').text() + ' ** POS Adjustment Item not found for this code!!')
		}
		
		$('#ctl00_BP_Content_txtCouponDescription').val(ItemName);
		$('#ctl00_BP_Content_txtCouponCode').val(ItemDesc);

		var dt = new Date();
		var myMonth = dt.getMonth()
		myMonth++
		$('#ctl00_BP_Content_txtEffectiveDate').val( myMonth + '/' + dt.getDate() + '/' + dt.getFullYear());
		$('#ctl00_BP_Content_txtExpirationDate').val('12/31/2055');

		var evt2 = document.createEvent("MouseEvents");
		var e2 = document.getElementById("ctl00_BP_Content_btnSave_btnAction");
		evt2.initEvent("click", true,true);
		e2.dispatchEvent(evt2);
	}

} // fnProcessDetail