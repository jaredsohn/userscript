// ==UserScript==
// @name          Buy the BOC v0.1
// @namespace     http://userscripts.org/users/59834/
// @description   Automatically fills in your credit card security code on the Woot order page. Note: This code isn't encrypted when stored. However, since Woot keeps your credit card info while the security code is stored seperately on your computer, the risk is neglible. (The paranoid may not wish to use this script though.)
// @include       https://www.woot.com/Member/Order.aspx
// ==/UserScript==

window.addEventListener('load',fillCVV, true);
//window.addEventListener('load',doit,true);

function fillCVV() {
	var cvv = GM_getValue('cvv', false);
	
	if( !cvv ) {
		var cvv = prompt('Please enter your credit card\'s security code. It will be autofilled in the future.');
		GM_setValue('cvv', cvv);
	}

	var cvv_input = document.getElementById('ctl00_ContentPlaceHolder_SecurityCodeTextBox');
	if( cvv_input ) {
		cvv_input.value = cvv;
		cvv_input.addEventListener('change', updateCVV, true);	
	}

	//if (document.getElementById('ctl00_ContentPlaceHolder_ShoppingCartControl_SaleTitleLabel').value='Random Crap'} {
	__doPostBack('ctl00$ContentPlaceHolder$BuyButton','');
        //document.getElementById('ctl00$ContentPlaceHolder$BuyButton').submit();
	//}
__doPostBack('ctl00$ContentPlaceHolder$ShoppingCartControl$WantedThreeButton','');
}


function updateCVV() {
	var cvv_input = document.getElementById('ctl00_ContentPlaceHolder_SecurityCodeTextBox');
	var r = confirm("You've changed the security code for your credit card.\nDo you want it autofilled in the future with this new value?");
	if( r ) {
		GM_setValue('cvv', cvv_input.value);
	}

}

function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}

