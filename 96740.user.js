// ==UserScript==
// @name           Alert when missing decimal in price
// @namespace      bricklink
// @description    Checks entered selling price to ensure there is a decimal point
// @icon           http://www.sculpturesupplies.com.au/GMBL.png
// @include        http://www.bricklink.com/inventory_add.asp?*
// @include        http://www.bricklink.com/inventory_detail.asp*
// @match        http://www.bricklink.com/inventory_add.asp?*
// @match        http://www.bricklink.com/inventory_detail.asp*
// ==/UserScript==

// Should also do inventory etc screens

function OnChangePrice()
{
	var reg = /\d*\.\d/;
	if ((this.value.search(reg) == -1) && (this.value.length > 0) && (this.value != '0')) {
		alert(this.value + " is missing a decimal point");
	}
}

function AddOnChangeFor(fieldName)
{
	elms = document.getElementsByName(fieldName);
	for (var i = elms.length - 1; i >= 0; i--) {
		elms[i].addEventListener("change", OnChangePrice, true);
	}
}

function AddOnChangeForStartsWith(fieldName)
{
	var snapNames = document.evaluate("//*[starts-with(@name,'"+fieldName+"')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapNames.snapshotLength - 1; i >= 0; i--) {
		var elm = snapNames.snapshotItem(i);
		// do stuff with elm
		elm.addEventListener("change", OnChangePrice, true);
	}
}

function InventoryAdd()
{
	AddOnChangeFor("p_price");
	AddOnChangeForStartsWith('tierPrice');
}

function InventoryDetail()
{
	AddOnChangeForStartsWith('newInvPrice');
	AddOnChangeForStartsWith('newTierPrice');
}

if (document.URL.indexOf('bricklink.com/inventory_add.asp')!=-1) InventoryAdd();
else if (document.URL.indexOf('bricklink.com/inventory_detail.asp')!=-1) InventoryDetail();
else GM_log('unexpected URL');