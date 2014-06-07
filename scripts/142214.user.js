// ==UserScript==
// @name        Lager-Räumer
// @namespace   maxe_pete
// @author	maxe_pete
// @description Ermöglicht es, unbrauchbare Items im Lager schnell zu wegzusortieren.
// @include     http://*.world-of-dungeons.de/wod/spiel/hero/items.php*
// @include     https://*.world-of-dungeons.de/wod/spiel/hero/items.php*
// @version     0.1.2
// @grant	none
// ==/UserScript==

// CHANGELOG
// 0.1.2 - updated the storage page recognition again, now language independent
// 0.1.1 - identify the storage page by selected menu item
// 0.1.0 - initial release

var targetLA = "-go_lager";
var targetSK = "go_group";
var targetGL = "go_group_2";
var regex_menu = /\s+Lager\s+$/;
var regex_page = /.+\:\ Lager$/;
var regex_VG = /\ *\(\d+\/\d+\)$/;
var regex_VM = /.+(Schmuckstein|Kamee|Anleitung für Rillen|Glyphen der Macht|Lederbänder|Lederriemen|Glassplitter|Metallplättchen|Sticktwist|Perlgarn|Rohgemme|Gemme|Tunke|Beize|Harz|Edelharz|Kalk (grob)|Kalk (fein)|Tinte|Tusche|Öl|Pigmentfarbe)$/;
var regex_AVM_1 = /.+\(Extrakt|frisch|getrocknet|Konzentrat|gereinigt|naturbelassen\)$/;
var regex_AVM_2 = /.+\(Konzentrat|Destillat|Lösung|Wurzel\)$/;
var regex_AVM_3 = /.*(Getrocknete Früchte|Lavendelöl|Milch|Vanilleschoten|Zitronensaft|Zuckersirup)$/;
var regex_AVM_4 = /.*(Geweihtes Wasser der Reinheit|Heiliges Wasser|Reines Wasser|Wasser aus den Quellen der Güte)$/;

// sorts out all visible items to GL or SK according to their classes
function WODLR_sortOutItems() {
	// get list of all shown items
	var items = document.getElementsByClassName('content_table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');

	// iterate over all shown items
	for (var i = 0; i < items.length; i++) {
		// reset recognized class variables
		var item_is_later_usable = false; 
		var item_is_unusable = false; 
		var item_is_VG = false;
		var item_is_VM = false;
		var item_is_AVM = false;  

		// access elements
		var columns = items[i].getElementsByTagName('td');
		var link = columns[1].getElementsByTagName('a')[0];
		var name = link.firstChild.nodeValue;
		var moveForm = columns[2].getElementsByTagName('select')[0];

		// check item class
		if(link.className.indexOf('item_unique') != -1) {
			// skip uniques
			continue;
		}
		if(link.className.indexOf('item_usable') != -1) {
			// skip usable
			continue;
		} else if(link.className.indexOf('item_later_usable') != -1) {
			item_is_later_usable = true;
		} else if(link.className.indexOf('item_unusable') != -1) {
			item_is_unusable = true;
		}
		if(regex_VG.test(link.parentNode.lastChild.data)) {
			item_is_VG = true;
		} else if(regex_VM.test(name)) {
			item_is_VM = true;
		} else if(regex_AVM_1.test(name) || regex_AVM_2.test(name) || regex_AVM_3.test(name) || regex_AVM_4.test(name)) {
			item_is_AVM = true;
		}

		// move item as needed
		if(item_is_unusable && document.getElementsByName('WODLR_cb_unusable')[0].checked) {
			if(item_is_VG || item_is_AVM) {
				WODLR_sortTo(moveForm, targetGL);
			} else {
				WODLR_sortTo(moveForm, targetSK);
			}
		} else if (item_is_later_usable && document.getElementsByName('WODLR_cb_later_usable')[0].checked) {
			if(item_is_VG || item_is_AVM) {
				WODLR_sortTo(moveForm, targetGL);
			} else {
				WODLR_sortTo(moveForm, targetSK);
			}
		}
	}
}


// reset the sorting out
function WODLR_resetItems() {
	var items = document.getElementsByClassName('content_table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	for (var i = 0; i < items.length; i++) {
		var moveForm = items[i].getElementsByTagName('td')[2].getElementsByTagName('select')[0];
		WODLR_sortTo(moveForm, targetLA);
	}
}


// sort an item to a target place
function WODLR_sortTo(moveForm, target) {
	var moveTargets = moveForm.getElementsByTagName('option');
	for (var j = 0; j < moveTargets.length; j++) {
		if (moveTargets[j].value == target) {
			moveForm.selectedIndex = j;
			return true;
		}
	}
	console.log("Couldn't sort item to target "+target+".");
	return false;
}


// adds the interface to the page
function WODLR_changepage() {
	// create div box
	var divbox = document.createElement('div');
	divbox.style.cssFloat = 'right';

	// create buttons
	var btn_reset = document.createElement('button');
	btn_reset.innerHTML = 'Zurücksetzen';
	btn_reset.style.cssFloat = 'left';
	btn_reset.style.marginLeft = '4px';
	btn_reset.setAttribute('class', 'button clickable');
	btn_reset.setAttribute('onclick', 'return false');
	btn_reset.addEventListener('click', WODLR_resetItems);
	divbox.appendChild(btn_reset);

	var btn_sort = document.createElement('button');
	btn_sort.innerHTML = 'Lager räumen';
	btn_sort.style.cssFloat = 'left';
	btn_sort.style.marginLeft = '4px';
	btn_sort.setAttribute('class', 'button clickable');
	btn_sort.setAttribute('onclick', 'return false');
	btn_sort.addEventListener('click', WODLR_sortOutItems);
	divbox.appendChild(btn_sort);

	// create checkboxes
	var cb_unusable = document.createElement('input');
	cb_unusable.type = 'checkbox';
	cb_unusable.name = 'WODLR_cb_unusable';
	cb_unusable.id = 'WODLR_cb_unusable';
	cb_unusable.defaultChecked = true;
	var lb_unusable = document.createElement('label');
	lb_unusable.htmlFor = 'WODLR_cb_unusable';
	lb_unusable.appendChild(document.createTextNode('Unbenutzbar'));
	divbox.appendChild(cb_unusable);
	divbox.appendChild(lb_unusable);
	
	var cb_later_usable = document.createElement('input');
	cb_later_usable.type = 'checkbox';
	cb_later_usable.name = 'WODLR_cb_later_usable';
	cb_later_usable.id = 'WODLR_cb_later_usable';
	cb_later_usable.defaultChecked = false;
	var lb_later_usable = document.createElement('label');
	lb_later_usable.htmlFor = 'WODLR_cb_later_usable';
	lb_later_usable.appendChild(document.createTextNode('Später benutzbar'));
	divbox.appendChild(cb_later_usable);
	divbox.appendChild(lb_later_usable);
	
	// place all
	var w = document.getElementsByName('ok')[0];
	w.parentNode.insertBefore(divbox, w.nextSibling);
	return;
}


// returns true if on the character's storage page
function WODLR_ontherightpage() {
	// newest language independent test
	var menu = document.getElementById('menu_hero_storage');
	if (menu != null) {
		var menulink = menu.getElementsByTagName('a');
		if (menulink != null && menulink[0] != null && menulink[0].className.indexOf('selected') != -1) {
			console.log("WODLR: Page identified as storage by lang-indep. menu selected.");
			return true;
		}
	}
	console.log("WODLR: Page not identified as storage by lang-indep. menu selected.");
	return false;
}


if (WODLR_ontherightpage()) { WODLR_changepage(); }
