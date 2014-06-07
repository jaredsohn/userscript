// ==UserScript==
// @name        Letsget Coupon Save and Copy
// @namespace   http://localhost.localdomain
// @description Save current coupon and copy it
// @include     https://admin.letsget.net/Private/MenuCoupon.aspx
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==


var myCoupID, myCoupText, myCpyText;

window.addEventListener("load", fnAddButton(), false);

function fnAddButton() {
	var buttonElems = document.getElementById('uHeaderLinks_lblMessage');
	buttonElems.outerHTML = buttonElems.outerHTML + '<input id="gmbSaveAndCopy" type="button" value="Test Click" />';
	addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("gmbSaveAndCopy");
  button.addEventListener('click',fnClickMe,false);
}

function fnClickMe() {

	triggerMouseEvent ($('#BP_Content_btnSave_btnAction')[0], "click");
//evtx = document.createEvent("MouseEvents");
//evtx.initEvent("click", true,true);
//document.getElementById("BP_Content_btnSave_btnAction").dispatchEvent(evtx);


 //$('#BP_Content_btnSave_btnAction').trigger('click');

 	console.log('clicked');

	myCoupText = $('#BP_Content_txtCouponDescription').val();
	myCoupID = $('#BP_Content_ddlCoupon').selectedOption().index;

 	//Wait till the screen saves the current record, which you know by the fact that the 
 	// "Coupn Name" becomes empty.
 	waitForKeyElements ("#BP_Content_txtCouponDescription", fnRetrieveTheCurrent, true);

 	//console.log('All done');

}

function fnRetrieveTheCurrent (jNode) {

	console.log('1 In fnRetrieveTheCurrent for: ' + jNode[0].value);

	// Check to see if the screen is showing the "NEW" item in the drop down which is the 
	// indication that the record has been saved. (its index is 0)
	if (jNode[0].value != "") {return true;}

	console.log('2 In fnRetrieveTheCurrent for: ' + jNode[0].value);

	//Re select the option that was just saved so we can make a copy of it
	$("#BP_Content_ddlCoupon option:contains(" + myCoupText + ")").prop('selected', 'selected');
	
	if ($('#BP_Content_ddlCoupon').selectedOption().index > 0) {

		triggerHtmlEvent($('#BP_Content_ddlCoupon')[0],'change'); // this forces the page to change to this option info

		waitForKeyElements ("#BP_Content_txtCouponDescription[value='"+myCoupText+"']",fnSaveTheCopy);
		
		//waitForKeyElements ("#BP_Content_txtCouponDescription",fnSaveTheCopy, true);
	}
	// return false;

 }

 function fnSaveTheCopy(jNode) {

	//alert("in save the copy");
	console.log("3 in save the copy for: " + myCoupText + " and jN : " + jNode[0].value );

	if (jNode[0].value != myCoupText) {return true;}

	console.log('4 in fnSaveTheCopy after if for return true');

	triggerMouseEvent ($('#BP_Content_btnSaveCopy_btnAction')[0], "click");

	waitForKeyElements ("#BP_Content_ddlCoupon option:contains(New)", fnRetrieveTheCopy); //This passes an option, not the ddl
	//waitForKeyElements ("#BP_Content_ddlCoupon", fnRetrieveTheCopy, true);

} //fnSaveTheCopy

function fnRetrieveTheCopy(jNode) {

	console.log("5 in fnRetrieveTheCopy for option: " + jNode[0].text);
	
	if (jNode[0].value != -1) {return true;}

	myCpyText = "Copy of " + myCoupText;
	//alert('In make the changes');
		
	//jNode[0].selected = true;
	$("#BP_Content_ddlCoupon option:contains(" + myCpyText + ")").prop('selected', 'selected');
	
	triggerHtmlEvent($('#BP_Content_ddlCoupon')[0],'change');
	
	//waitForKeyElements ("#BP_Content_txtCouponDescription[value='"+myCpyText+"']",
	    // fnMakeChangesRemoveSelectedPromo, true );

	//waitForKeyElements ("#BP_Content_txtCouponDescription", fnMakeChangesRemoveSelectedPromo, true);

	//This will pass the option, not the ddl
	waitForKeyElements ("#BP_Content_txtCouponDescription[value*='"+myCpyText+"']", fnMakeChangesRemoveSelectedPromo);  

} //fnRetrieveTheCopy

function fnMakeChangesRemoveSelectedPromo(jNode) {

  	console.log("6 In fnMakeChangesRemoveSelectedPromo for: " + jNode[0].value );

  	//if (jNode[0].text != myCpyText) {return true};
  	if (jNode[0].value .indexOf(myCpyText,0) < 0) {return true;}

	$('#BP_Content_lstPromotionItemsSelected option').prop('selected','selected');

	triggerMouseEvent($("#BP_Content_btnRemovePromotion_btnAction")[0], "click");

	waitForKeyElements('#BP_Content_lstPromotionItemsSelected', fnMakeChanges, true);


} // fnMakeChangesRemoveSelectedPromo

function fnMakeChanges(jNode) {

	console.log('7 in fnMakeChanges');
	if (jNode[0].length != 0 ) {return true;}
	console.log('8 in fnMakeChanges after if length != 0');

	$('#BP_Content_txtCouponDescription').val($('#BP_Content_txtCouponDescription').val().replace('Copy of ',''));

	var tcode = $('#BP_Content_txtCouponCode').val();
	var lstNum = tcode.charAt(tcode.length-1);
	var newNum;
	var newCode = tcode.substring(0,tcode.length-1);
	switch (lstNum) {
		case '1' : newNum = '2'; break;
		case '2' : newNum = '3'; break;
		case '3' : newNum = '4'; break;
		case '4' : newNum = '5'; break;
		case '5' : newNum = '6'; break;
		case '6' : newNum = 'B'; break;
		case 'B' : newNum = 'D'; break;
		case 'D' : newNum = 'C'; break;
					

	}	

	var xy = newCode += newNum;
	$('#BP_Content_txtCouponCode').val(xy);

	console.log('9 in fnMakeChanges New Coupon Code: ' + xy);

	var arrDesc = $('#BP_Content_txtCouponDescription').val().trim().split(" ");

	arrDesc[0] = xy;
	var xyy = arrDesc.join(" ");
	$('#BP_Content_txtCouponDescription').val(xyy);

	console.log('10 in fnMakeChanges New Description: ' + xyy);

	if (newNum == "C") { // C is for carry out coupons only so uncheck the delivery and dinein options

		$('#BP_Content_chkDelivery').prop('checked', false);
		$('#BP_Content_chkDineIn').prop('checked', false);
	}
	
	$("#BP_Content_lstPromotionItems option:contains(" + xy + ")").prop('selected', 'selected');
	
	if ($('#BP_Content_lstPromotionItems').selectedOption().index > 0 ) {

			//var evtx = document.createEvent("HTMLEvents");
			//evtx.initEvent("change", true, true);
			//document.getElementById('BP_Content_lstPromotionItems').dispatchEvent(evtx);

			evtx = document.createEvent("MouseEvents");
			evtx.initEvent("click", true,true);
			document.getElementById("BP_Content_btnAddPromotion_btnAction").dispatchEvent(evtx);

			triggerMouseEvent($("#BP_Content_btnAddPromotion_btnAction")[0], "click");
		}

} // fnMakeChanges	

//*********************************************************************************
function triggerMouseEvent (node, eventType) {

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);

  }

  function triggerHtmlEvent (node, eventType) {

    var clickEvent = document.createEvent('HTMLEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}

   (function($) {
    $.fn.selectedOption = function() {
        var sel = this[0];
        return sel.options[sel.selectedIndex];
    };
})(jQuery)