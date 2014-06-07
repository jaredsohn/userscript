// ==UserScript==
// @name          Etsy Item Quick Price Edit 
// @description   Allows one click price editing on Etsy
// @include       http://www.etsy.com/your/listings
// @include       http://www.etsy.com/your/listings?ref*
// @include       http://www.etsy.com/your/listings?page=*
// @include       http://www.etsy.com/your/listings?order*
// @include       http://www.etsy.com/your/item/edit*
// @author        Kevin Turgeon (kevin AT krtwood DOT com)
// @version       0.1.5
// 
// ==/UserScript==
//
// This script adds a Quick Price entry box and Quick Set links to items on the Your Etsy
// Currently for Sale page, allowing prices to be set with one click per item.  
//
// Enter price as either a fixed price or a percentage of the current price.  Press the Set
// button to store the value.  Click the Quick Set link on any item you want to apply.
//
// Enter "50" for price set to $50
// Enter "80%" for price set to 80% of original price
// Enter "80%0" for price set to 80% of original price rounded to nearest whole dollar
// Enter "80%1" for price set to 80% of original price rounded to nearest 10 cents
//
// Stored Variables:
//   EtsyQuickPriceEditActive - State 0=inactive 1=setting price 2=redirecting to start page
//   EtsyQuickPriceEditHREF - Start page
//   EtsyQuickPriceEditValue - Value entered in text box
//
//



/* ===== Click on an element (borrowed from Facebook Fixer, @namespace http://userscripts.org/people/14536) ===== */
function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
} 

if(window.location.href.match('your/listings')) {
	if(GM_getValue('EtsyQuickPriceEditActive') == 2) {
		window.location.href = GM_getValue('EtsyQuickPriceEditHREF');
	}

	GM_setValue('EtsyQuickPriceEditActive', 0);
	GM_setValue('EtsyQuickPriceEditHREF', window.location.href);
	
	var formElm = document.createElement('div');
	formElm.innerHTML='<form action="" method="get">Quick Price or %: <input id="QPEtext" type="text"/ size="8" value="10"> <input id="QPEsubmit" type="submit" value="Set" /> &nbsp To Undo %, 10000/% </form>';
	
	var headerElm = document.getElementsByClassName('your-etsy-header clear')[0];
	headerElm.parentNode.insertBefore(formElm,headerElm.nextSibling);

	if(GM_getValue('EtsyQuickPriceEditValue') != undefined) {
		document.getElementById('QPEtext').value = GM_getValue('EtsyQuickPriceEditValue');
	}
	
	document.getElementById('QPEsubmit').addEventListener('click', function() {
		//validate
		var val = document.getElementById('QPEtext').value;
		if(val.match('%')) {
			//handle as percentage
			if(val.charAt(val.length-1) == '%') {
				GM_setValue('EtsyQuickPriceEditValue', val) ;
			} else if(val.charAt(val.length-2) == '%' && (val.charAt(val.length-1) == '0' || val.charAt(val.length-1) == '1' || val.charAt(val.length-1) == '2')) {
				GM_setValue('EtsyQuickPriceEditValue', val) ;
			} else {
				alert("Please enter a fixed dollar amount or percentage");	
			}

		} else {
			//handle as fixed dollar amount
			val = parseFloat(val).toFixed(2);
			if(val!='NaN') {
				document.getElementById('QPEtext').value = val;
				GM_setValue('EtsyQuickPriceEditValue', val) ;
			} else {
				alert("Please enter a fixed dollar amount or percentage");	
			}
		}

	}, false); 




	var allTds, thisTd, thisId, thisListing;
	allTds = document.evaluate(
		"//td[@class='list-price']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allTds.snapshotLength; i++) {
		thisTd = allTds.snapshotItem(i);
		thisId = thisTd.parentNode.id;
		var index = thisId.indexOf('-');
		thisListing = thisId.substring(index+1);

		var newElm = document.createElement('a');
		var newElmBr = document.createElement('br');

		newElm.href='http://www.etsy.com/your/item/edit/' + thisListing + '?step=listing';
 		newElm.innerHTML = 'Quick Set';
		newElm.addEventListener('click', function() {
			GM_setValue('EtsyQuickPriceEditActive', 1);
		}, false);


		thisTd.insertBefore(newElmBr,thisTd.lastChild.nextSibling);
		thisTd.insertBefore(newElm,thisTd.lastChild.nextSibling);

	}
} else if(window.location.href.match('your/item/edit/') && window.location.href.match('step=listing')) {
	if(GM_getValue('EtsyQuickPriceEditActive')) {
		var newprice, origprice = parseFloat(document.getElementById('item-price').value);
		var val = GM_getValue('EtsyQuickPriceEditValue');

		if(val.match('%')) {
			//handle as percentage
			newprice = origprice * parseInt(val) / 100;

			if(val.charAt(val.length-1) == '%') {
				newprice = newprice.toFixed(2);
				
			} else {

				newprice = newprice.toFixed(val.charAt(val.length-1));

			} 
			document.getElementById('item-price').value = newprice;

		} else {
			//handle as fixed dollar amount
			document.getElementById('item-price').value = val;

		}
		
		var last;
			last = document.evaluate(
			"//input[@value='Last']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		click(last.snapshotItem(0));
	}


} else if(window.location.href.match('your/item/edit/') && window.location.href.match('step=publish')) {
	if(GM_getValue('EtsyQuickPriceEditActive')) {
		GM_setValue('EtsyQuickPriceEditActive', 2);

		var images = document.getElementsByClassName('images clear');
		if (images[0]) {
 			images[0].innerHTML = "";
		}
		
		var finish;
			finish = document.evaluate(
			"//input[@value='Finish']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		click(finish.snapshotItem(0));

	}


}



