// ==UserScript==
// @name         Nexus War Enchanted Item Protector
// @namespace    http://nw.enchanted.item.protector/arundor
// @description  Removes the 'Drop', 'Give to' and 'Place in Safe' buttons for enchanted items on Nexus War inventory pages. This way you cannot accidently get rid of your valuable items.
// @include      http://*nexuswar.com/map/*
// ==/UserScript==

//0 means processing is not done yet.  1 means processing is done.
//Processing the inventory takes a noticeable amount of time, so we need to keep track of whether it has already been done. If it is already done, we won't attempt to do it again.
var done = 0;

//If the inventory is already open, it can be protected immediately upon page load. If the inventory is not open, this attempt will simply fail silently.
protectInventory();

//Add an event listener to the inventory container so that we can sort it once it is loaded.
//Also add an event listener to the "shroud" that dims the rest of the screen while the inventory is open. When the shroud is no longer displayed, we know the inventory has been closed.
document.getElementById('inventory').addEventListener('DOMNodeInserted', protectInventory, false);
document.getElementById('shroud').addEventListener('DOMAttrModified', tabToggled, false);

//The inventory needs to be re-processed each time it is re-opened.
//This function fires when the inventory is closed, setting the 'done' variable back to 0 so that we know the inventory needs to be sorted again.
function tabToggled() {
	var shroud = document.getElementById('shroud');
	if (shroud.style.display == 'none'); {
		done = 0;
	}
}

function protectInventory() {
	if (done == 0) {
		//This element will only exist if the inventory has been opened.
		var inv = document.getElementById('tinventory');
		
		if (inv) {
			//Each item in the inventory is a table row.  Get each row.
			var items = inv.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			
			//It is possible for the event listener to fire before the inventory is fully loaded, so we need to check if there are actually any items loaded.
			//If yes, we know that it's safe to start processing the inventory, and we set the done variable to 1 so that if the event listener fires again in the future we know we don't need to process the inventory again.
			if (items.length > 1) {
				done = 1;
			}
			
			//Loop through each item in the inventory.
			for (var i=0; i<items.length; i++) {
				//Each item record in the inventory has a series of columns.  One for the name, one for the quantity, one for each the buttons, and so forth.
				var cols = items[i].getElementsByTagName('td');
				//This is the text that only gets displayed after the '+' icon is clicked.
				var hiddenText = cols[0].getElementsByTagName('div')[0];
				
				//Determine if the current item needs to be protected.
				if (needsProtection(cols[0].innerHTML)) {
					var newButtons = document.createElement('div');
					
					//Check through each button in the inventory. As long as it is not a Reload/Unload button, hide it and then add a copy to the hidden text.
					var forms = items[i].getElementsByTagName('form');
					for (var x=0; x<forms.length; x++) {
						if (forms[x].parentNode.innerHTML.search(/(Unload)|(Reload)/) == -1) {
							newButtons.appendChild(forms[x].cloneNode(true));
							forms[x].style.visibility = 'hidden';
						}
					}
					
					//Add the new buttons to the hidden text, where they will be harder to press by accident.
					if (newButtons.innerHTML.length > 0) {
						var buttons = newButtons.getElementsByTagName('button');
						for (var x=0; x<buttons.length; x++) {
							buttons[x].style.background = 'red';
						}
						var forms = newButtons.getElementsByTagName('form');
						for (var x=0; x<forms.length; x++) {
							forms[x].style.paddingRight = '15px';
						}
						hiddenText.appendChild(newButtons);
					}
				}
			}
		}
	}
}

function needsProtection(text) {
	if (text.search(/enchanted/i) != -1) { return true; }
	if (text.search(/Death Pistol/i) != -1) { return true; }
	if (text.search(/Poison Pistol/i) != -1) { return true; }
	if (text.search(/Eagle Eye Pistol/i) != -1) { return true; }
	if (text.search(/Death Sword/i) != -1) { return true; }
	if (text.search(/Thunder Sword/i) != -1) { return true; }
	if (text.search(/Fireblade/i) != -1) { return true; }
	if (text.search(/Flaming Sword/i) != -1) { return true; }
	if (text.search(/Hateblade/i) != -1) { return true; }
	if (text.search(/Holy Sword/i) != -1) { return true; }
	if (text.search(/Magical Knife/i) != -1) { return true; }
	if (text.search(/Magical Saber/i) != -1) { return true; }
	if (text.search(/Magical Scimitar/i) != -1) { return true; }
	if (text.search(/Magical Sword/i) != -1) { return true; }
	if (text.search(/Dagger of Poisoning/i) != -1) { return true; }
	if (text.search(/Steel Fire/i) != -1) { return true; }
	if (text.search(/Steel Lightning/i) != -1) { return true; }
	if (text.search(/Frozen Steel/i) != -1) { return true; }
	if (text.search(/Death Steel/i) != -1) { return true; }
	if (text.search(/Murder Armor/i) != -1) { return true; }
	if (text.search(/Golden Breastplate/i) != -1) { return true; }
	return false;
}