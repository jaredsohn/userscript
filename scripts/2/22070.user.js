// ==UserScript==
// @name           JHunz's KOL Price Protection
// @namespace      hunsley@gmail.com
// @description    This script adds a confirmation dialogue when an item on the Manage your Prices page is 10% or more below current lowest mall price.  It also allows entry of prices in k/K for thousands and m/M for millions.
// @include        *kingdomofloathing.com/manageprices.php*
// ==/UserScript==

var submitButton = document.evaluate('//input[@class="button" and @type="submit" and @value="Update Prices"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

var replacementButton = document.createElement("input");
with(replacementButton) {
	value = "Update Prices";
	setAttribute("class","button");
	type = "button";
	addEventListener("click",PriceProtection,false);
}
submitButton.parentNode.replaceChild(replacementButton,submitButton);

var confirmCheckbox = document.createElement("input");
with(confirmCheckbox) {
	type = "checkbox";
}
var checkSpan = document.createElement("span");
with(checkSpan) {
	appendChild(confirmCheckbox);
	appendChild(document.createTextNode('Confirm pricing'));
	style.visibility = "hidden";
	style.fontSize = "90%";
}
replacementButton.parentNode.appendChild(checkSpan);

return;

function PriceProtection () {
	var form = document.evaluate('//form[@name="updateprices"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var underPricedItems = new Array();
	var curItem,i,j=0,itemName,mallPrice,numericPrice,thousands,millions;

	var items = document.evaluate('//form[@name="updateprices"]//input[@type="text" and contains(@name,"price")]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i=0;i<items.snapshotLength;i++) {
		curItem = items.snapshotItem(i);
		itemName = curItem.parentNode.parentNode.firstChild.textContent;
		numericPrice = parseFloat(curItem.value);
		thousands = curItem.value.replace(/[^k]/ig,"");
		millions = curItem.value.replace(/[^m]/ig,"");
		while(thousands != "") {
			numericPrice *= 1000;
			thousands = thousands.replace(/k/i,"");
		}
		while(millions != "") {
			numericPrice *= 1000000;
			millions = millions.replace(/m/i ,"");
		}
		curItem.value = Math.ceil(numericPrice);

		mallPrice = parseInt(curItem.parentNode.nextSibling.nextSibling.textContent.replace(/,/g,""));
		
		if(numericPrice < (Math.floor(mallPrice * 0.9))) {
			underPricedItems[underPricedItems.length] = itemName;
		}
	}
	if ((underPricedItems.length == 0) || (confirmCheckbox.checked)) {
		replacementButton.removeEventListener("click",PriceProtection,false);
		form.submit();
		return;
	}
	else {
		message = "The following items are under mall minimum by 10% or more:\n";
		for(i=0;i<underPricedItems.length;i++) {
			message += (underPricedItems[i] + "\n");
		}
		message += "\nCheck the confirm box to update prices anyway.";

		checkSpan.style.visibility = "visible";
		alert(message);
	}
}

