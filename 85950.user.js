// ==UserScript==
// @name          Inventory Compression Tool
// @namespace     http://www.ray3k.com/
// @description   A UD script that compresses the inventory. If there is more than one of an item, it is compressed to one button. Firearms still list individual ammo counts as well as total loaded ammo. 
// @include       http://www.urbandead.com/map.cgi*
// @include       http://urbandead.com/map.cgi*
// ==/UserScript==

//the inventory is NOT compressed when the script starts
GM_setValue("inventoryIsCompressed", false);

//get the drop select menu
var allDropSelects, dropSelect;
allDropSelects = document.evaluate(
	"//select[@name='drop']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
dropSelect = allDropSelects.snapshotItem(0);

//get the drop button
var allDropInputs, dropInput;
allDropInputs = document.evaluate(
	"//input[@value='Drop']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
dropInput = allDropInputs.snapshotItem(0);

//if item organization is allowed
compressInventory();

function findDropIndex(itemName) {
	for (i = 0; i < dropSelect.options.length; i++) {
		if (dropSelect.options[i].text.toLowerCase() == itemName.toLowerCase()) {
			return i;
		}
		else if (itemName.toLowerCase() == "radio" && dropSelect.options[i].text.toLowerCase().match("radio")) {
			return i;
		}
	}
	return -1;
}

function calcItemQuantity(itemName) {
	var itemCount = 0;

	var allInputs;
	allInputs = document.evaluate(
		"//input[@value='" + itemName + "']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var thisInput = allInputs.snapshotItem(0);

	//check if the inventory has been compressed
	if (checkForInventoryCompression() && thisInput) {
		itemCount = thisInput.parentNode.textContent;
		itemCount = parseInt(itemCount.match(/\d/));
	}
	else {
		itemCount = allInputs.snapshotLength;
	}
	return itemCount;
}

function checkForInventoryCompression() {
	if (GM_getValue("setting_compressInventory") && GM_getValue("inventoryIsCompressed", false)) {
		return true;
	}
	else {
		return false;
	}
}

//Modifies the inventory so that each item is only listed once with a quantity
function compressInventory() {
	var itemName, foundShotgun, foundPistol;
	
	foundShotgun = false;
	foundPistol = false;
	//foundRadio = false;

	//go through each item listed in the drop menu
	for (var i = 0; i < dropSelect.options.length; i++) {
	
		//get the name of the current item
		itemName = dropSelect.options[i].text;
		
		//if item is a shotgun
		if (itemName.match("shotgun") && !itemName.match("shell")) {
			//if shotgun has been found earlier
			if (foundShotgun == true) {
				//do not compress this item any further
				itemName = "cancel";
			}
			else {
				//change the item name to the correct format
				itemName = "shotgun";
				foundShotgun = true;
			}
		}
		
		//if item is a pistol
		if (itemName.match("pistol") && !itemName.match("clip")) {
			//if pistol has been found earlier
			if (foundPistol == true) {
				//do not compress this item any further
				itemName = "cancel";
			}
			else {
				//change the item name to the correct format
				itemName = "pistol";
				foundPistol = true;
			}
		}
		
		//if item is a radio
		if (itemName.match("radio")) {
			itemName = "radio";
		}
	
		//if the item is in the inventory and is a valid name
		if (itemName != "cancel" && calcItemQuantity(itemName) > 0) {
			compressInventoryItem(itemName);
		}
	}
	
	//the inventory has been compressed
	GM_setValue("inventoryIsCompressed", true);
}

//compresses a single inventory item
function compressInventoryItem(itemName) {
	//get the quantity of the item
	var quantity = calcItemQuantity(itemName);
	
	//find the item buttons
	var allInputs, itemInput, itemForm;
	allInputs = document.evaluate(
	    "//input[@value='" + itemName + "']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
		
	//if the item is actually in the inventory
	if (allInputs.snapshotLength > 0) {
		var ammo, thisAmmo, weaponList, isWeapon;
		
		//if it is an ammo weapon
		if (itemName == "shotgun" || itemName == "pistol") {
			ammo = 0;
			weaponList = "";
			isWeapon = true;
		}
		else {
			ammo = "";
			weaponList = "";
			isWeapon = false;
		}
		
		//go through each item button after the first one
		for (var i = 1; i < allInputs.snapshotLength; i++) {
			//get the current button
			itemInput = allInputs.snapshotItem(i);
			//get the button's corresponding form
			itemForm = itemInput.parentNode;

			if (isWeapon) {
				//get the amount of ammo
				thisAmmo = itemForm.textContent.replace(/\D/g, "");
				
				//add this weapon's ammo to the list
				weaponList += ", " + thisAmmo;
				
				//increase the total ammo
				ammo += parseInt(thisAmmo);
			}
			
			//delete the form including the button
			itemForm.parentNode.removeChild(itemForm);
		}
		
		//transform the first item button
		itemInput = allInputs.snapshotItem(0);
		itemForm = itemInput.parentNode;
		if (isWeapon) {
			//format the form as a weapon
			thisAmmo = itemForm.textContent.replace(/\D/g, "");
			weaponList = thisAmmo + weaponList;
			ammo += parseInt(thisAmmo);
			itemForm.innerHTML = "";
			itemForm.appendChild(itemInput);
			itemForm.innerHTML = quantity + " x " + itemForm.innerHTML + "(" + weaponList + ") at " + ammo + " shots";
		}
		else {
			//format the form as a normal item
			itemForm.innerHTML = quantity + " x " + itemForm.innerHTML;
		}
	}
}