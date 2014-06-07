// ==UserScript==
// @name         Nexus War Spell Scroll Sorter
// @namespace    http://nw.spell.scroll.sorter/arundor
// @description  Sorts spell scrolls in Nexus War so that self-transcribed scrolls are always at the top of the list.
// @include      http://*nexuswar.com/map/*
// ==/UserScript==

var lock = 0;

//Sort scrolls on the combat flyout.
sortFlyoutSpells();

//Sorting for scrolls in the normal spell pane.
//If the spell pane is open, sort the spells right away.
//Sorting is lost each time the pane is re-opened, so add an event listener to re-sort it each time.
var spells = document.getElementById('spellactions');
if (spells) {
	if (spells.innerHTML.indexOf('spinner') == -1) {
		sortPaneSpells();
	}
	spells.addEventListener('DOMNodeInserted', sortPaneSpellsWrapper, true);
}

//-----------------------------------------------------------------

//Sort scrolls on the combat flyout.
function sortFlyoutSpells() {
	//Sort scrolls on the player combat flyout.
	var scroll_list = document.getElementById('occd-scroll');
	if (scroll_list) {
		var select = scroll_list.getElementsByTagName('select')[0];
		sortSpells(select);
	}
	//Sort scrolls on the pet combat flyout.
	scroll_list = document.getElementById('ocpd-scroll');
	if (scroll_list) {
		var select = scroll_list.getElementsByTagName('select')[0];
		sortSpells(select);
	}
}

//This is a wrapper for the function that sorts scrolls on the spell pane.
//It checks if the pane is fully opened before attempting to sort the scrolls. The pane needs to be fully opened so that the data is fully loaded before we attempt to sort it.
function sortPaneSpellsWrapper() {
	//This function is called from multiple event listeners, sometimes at the same time.
	//The documents I've read say that javascript is single-threaded, but testing has nonetheless shown a crash if I do not lock this function.
	//This is a crude lock.  I'm not certain about the atomicity of javascript statements, but this method seems to work at least for now.
	if (lock == 0) {
		lock = 1;
		
		var spells = document.getElementById('spellactions');
		if (spells.innerHTML.indexOf('from Scroll') != -1) {
			sortPaneSpells();
		}
		
		lock = 0;
	}
}

//Sort scrolls on the normal spell pane.
function sortPaneSpells() {
	var spells = document.getElementById('spellactions');
	if (spells) {
		//Search through all the buttons on the spell actions pane. If the button contains the words 'from Scroll' then we know there may be scrolls to sort.
		var buttons = spells.getElementsByTagName('button');
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].innerHTML.indexOf('from Scroll') != -1) {
				var select = buttons[i].parentNode.getElementsByTagName('select')[0];
				sortSpells(select);
			}
		}
	}
}

//Most of the work is done here. Given a 'select' tag this will sort on the 'option' childen so that any child containing the string 'self-transcribed' will appear first.
function sortSpells(select) {
	var items = select.getElementsByTagName('option');
	
	//This array will contain all self-transcribed spells.
	var newNodes = new Array();
		
	//Search through each scroll and find the ones that are self-transcribed.
	for (var i=items.length-1; i>=0; i--) {
		if (items[i].getAttribute('value').indexOf('self-transcribed') != -1) {
			//When a self-transcribed scroll is found, make a copy of it.
			var newNode = items[i].cloneNode(true);
			newNodes.push(newNode);
				
			//Remove the original item from the list, since the copy is about to be added to the top.
			items[i].parentNode.removeChild(items[i]);
		}
	}
		
	//Add all self-transcribed scrolls to the top of the list.
	for (var i=0; i<newNodes.length; i++) {
		items[0].parentNode.insertBefore(newNodes[i], items[0].nextSibling);
	}
}
