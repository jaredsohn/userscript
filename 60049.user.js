// ==UserScript==
// @name           The West - Job Equip
// @namespace      http://armeagle.nl
// @description    Eases equipping the right equipment suggested by The West Insider.
// @include        http://*.the-west.com.br/*
// @include        http://www.thewestinsider.com/job_calc.php*
// ==/UserScript==
// It makes the "Your Best Items" fields clickable, which stores those items using GreaseMonkey. Then when you open the Inventory in the game, you can click a new button [equip] to automatically equip those items.
// Requires Firefox 3.5+ [Using localStorage (falling back to globalStorage) and GM_set/getValue].

// version 0.4
//
// This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License by Alex Haan (http://creativecommons.org/licenses/by-nc-sa/3.0/)
// Suggested to use together with The West Extra Tools (http://userscripts.org/scripts/show/53930), so you have an easy button to open the The West Insider Job Calculator.
//
// Changelog:
// version 0.4:
//  - Better filtering on item names ("Gray bow" will not be equipped when "Gray bow tie" is supposed to be).
// version 0.3.1:
//  - Requiring Firefox 3.5 as minimum again now. It's too much hassle to make it work in older versions.
// version 0.3:
//  - Supporting Firefox 3+ now by falling back to globalStorage when localStorage (introduced with FF3.5+) is not available.
// version 0.2:
//  - Added saving, recalling and deleting (currently equipped) sets. Moved the equip button for that.
//  - Will count down the amount of items that still have to be equipped (shown by amount of dots reducing in the equip button).

// code namespace
unsafeWindow.AEG = {};

// Script injected on The West (game)
function TW_DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=TW_DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	
	AEG.addEquipLink = function() {
		// check whether content is loaded
		var wear_group = document.getElementById('wear');
		if ( wear_group == null) {
			// try again later
			AEG.addEquipLink.delay('500');
		} else if ( document.getElementById('AEGequip_wrapper') == null ) { // try to prevent multiple additions, if clicked too fast
			// store, equip dropdown and link
			var equip_wrapper = document.createElement('form');
			equip_wrapper.setAttribute('id', 'AEGequip_wrapper');
			equip_wrapper.setAttribute('style', 'position: absolute; top: 10px; left: 20px; -moz-user-select: none; padding: 0px; margin: 0px;');
			wear_group.appendChild(equip_wrapper);
			
			// add 'store set' link to bottom of the "wear" element
			var store_set_link = document.createElement('a');
			store_set_link.setAttribute('href', '#');			
			store_set_link.setAttribute('title', 'Store equipped items as a set');
			store_set_link.setAttribute('onclick', 'AEG.storeSet(); return false;');
			store_set_link.textContent = 'Store set';
			equip_wrapper.appendChild(store_set_link);
			
			// add dropdown with 'equip' link
			var equip_dropdown = document.createElement('select');
			equip_dropdown.setAttribute('id', 'AEGequip_dropdown');
			equip_dropdown.setAttribute('style', 'width: 160px; max-width: 135px; margin: 0px 5px 0px 20px;');
			equip_wrapper.appendChild(equip_dropdown);

			//add delete link
			var delete_link = document.createElement('a');
			delete_link.setAttribute('href', '#');
			delete_link.setAttribute('title', 'Delete selected set');
			delete_link.setAttribute('style', 'margin-right: 7px');
			delete_link.setAttribute('onclick', 'AEG.deleteSet(); return false;');
			delete_link.textContent = 'x';
			equip_wrapper.appendChild(delete_link);

			//add equip link
			var equip_link = document.createElement('a');
			equip_link.setAttribute('href', '#');
			equip_link.setAttribute('id', 'equip_link');
			equip_link.setAttribute('onclick', 'AEG.equip(); return false;');
			equip_link.textContent = 'Equip';
			equip_wrapper.appendChild(equip_link);
			
			// fill dropdown
			AEG.fillEquipDropdown();
		}
	}
	// fill the equip dropdown with entries; the The West Insider option, and all stored sets
	AEG.fillEquipDropdown = function() {
		var dropdown = document.getElementById('AEGequip_dropdown');
		// clear it
		dropdown.textContent = '';
		// add TWI entry
		addItem(dropdown, "TWI job items", "_TWIji");
		var sets = AEG.getSets();
		for ( set_name in sets ) {
			addItem(dropdown, set_name, set_name);
		}
		
		function addItem(select, option_name, option_value) {
			var option = document.createElement('option');
			option.textContent = option_name;
			option.setAttribute('value', option_value);
			select.appendChild(option);
		}
	}
	
	
	// Gathers the item IDs, called when clicked on the Equip link
	// Equip TWI job set, or stored set
	AEG.equip = function() {
		AEG.setEquipLinkText('Equipping'); //change link text so it's showing that it is busy
		// get items based on dropdown value
		var dropdown_value = document.getElementById('AEGequip_dropdown').value;
		switch ( dropdown_value ) {
			case '':
				new HumanMessage("No sets listed!");
			break;
			case '_TWIji':
				AEG.getEquipItems(); // get the array as stored from The West Insider, using GM_getValue, and stores it in AEG.equipItems
			break;
			default:
				// get set by value
				AEG.equipItems = AEG.getSets()[dropdown_value];
		}
		
		// call next step with a delay (for the GM_getValue delay
		(function(){
			// store the item IDs first, 'carry' them later
			var equip_item_ids = [];
			if ( AEG.equipItems != undefined && AEG.equipItems.length > 0 ) {
				var equip_items_string = '|'+ AEG.equipItems.join('|') +'|';
				var equip_items_count = AEG.equipItems.length;
				// remove all items in the set that are already equipped
				var wearing_items = AEG.getCurrentSet();
				for ( ind=0; ind < wearing_items.length; ind++ ) {
					if ( equip_items_string.indexOf(wearing_items[ind]) > 0 ) {
						equip_items_string.replace(wearing_items[ind]+'|', '');
						equip_items_count--;
					}
				}
				var progress_dots = ''; // initiate with set size [minus already equipped amount] and remove one with every item equipped
				for ( ind=0; ind < equip_items_count; ind++ ) {
					progress_dots += '.';
				}
				AEG.setEquipLinkText('Equipping'+progress_dots);
				var bag = document.getElementById('bag');
				if ( bag != null ) {
					// go trough all items in the bag, store the IDs of the (first) matching items
					var items = bag.getElementsByClassName('bag_item');
					for ( var ind=0; ind < items.length; ind++) {
						var bag_item = items[ind];
						var item_img = bag_item.getElementsByTagName('img')[0];
						var item_name = item_img.getAttribute('alt');
						if ( equip_items_string.indexOf(item_name+'|') >= 0 ) {
							// store equip item id
							equip_item_ids.push(bag_item.getAttribute('id').replace('item_', ''));
							bag_item.setAttribute('style', 'background-color: red');
							// remove item from the list/string
							equip_items_string.replace(item_name+'|', '');
						} else {
							bag_item.removeAttribute('style');
						}
					}					
				} else {
					new HumanMessage("No item bag found!");
					AEG.setEquipLinkText('Equip'); //reset link text
				}
				// clear the (TWI) storage
				AEG.equipItems = null;
				//now equip them one by one with a delay between
				AEG.equipIDs(equip_item_ids);
			} else {
				new HumanMessage("No stored items found, click a Best Items link on The West Insider's Job Calculator!");
				AEG.setEquipLinkText('Equip');
			}
		}).delay(200); // delay because the GM_getValue wrapper is 'asynchronous'
	}
	// separate function to equip the items, by item ID. use last_removed_id  
	AEG.equipIDs = function(item_ids, last_removed_id) {
		// check whether the item is still in the bag, we need to space apart the carry commands enough or they won't all execute
		if ( last_removed_id != null ) { // first call last_removed_id is undefined, skip
			if ( document.getElementById('item_'+ last_removed_id) != null ) {
				// it's still here, wait a bit longer
				(function(){AEG.equipIDs(item_ids, last_removed_id)}).delay(200);
				return;
			} else {
				// reduce dots, done here, so it is only removed when the item has really been equipped
				AEG.setEquipLinkTextDotReduced();
			}
		}
		if ( item_ids.length > 0 ) {
			var item_id = item_ids.pop();
			Bag.getInstance().carry(item_id);
			(function(){AEG.equipIDs(item_ids, item_id)}).delay(200);
		} else {
			AEG.setEquipLinkText('Equip');
		}
	}
	// set equip link text
	AEG.setEquipLinkText = function(text) {
		document.getElementById('equip_link').textContent = text;
	}
	// set equip link text with one period removed
	AEG.setEquipLinkTextDotReduced = function() {
		var text = document.getElementById('equip_link').textContent;
		document.getElementById('equip_link').textContent = text.substr(0, text.length-1);
	}
	// store equipped items as a set, prompt for name
	AEG.storeSet = function() {
		var wear_imgs = document.querySelectorAll('#wear img');
		var set_items = AEG.getCurrentSet();
		var set_items_string = set_items.join(', ');
		var sets = AEG.getSets();
		var set_name = prompt("  Give a name for this set:\n"+ set_items_string);
		while ( sets[set_name] != undefined ) {
			if( !confirm("This set name is already in use, do you want to overwrite?") ) {
				var set_name = prompt("  Give a name for this set:\n"+ set_items_string);
			} else {
				break;
			}
		}
		sets[set_name] = set_items;
		localStorage.setItem('AEGitem_sets', JSON.stringify(sets));
		AEG.fillEquipDropdown();
	}
	// delete selected set, after confirmation
	AEG.deleteSet = function() {
		var dropdown_value = document.getElementById('AEGequip_dropdown').value;
		var dropdown_value = document.getElementById('AEGequip_dropdown').value;
		switch ( dropdown_value ) {
			case '':
				new HumanMessage("No set selected!");
			break;
			case '_TWIji':
				new HumanMessage("Cannot delete this entry!");
			break;
			default:
				if ( confirm('Do you really want to delete set "'+ dropdown_value +'"?') ) {
					var sets = JSON.parse(localStorage.getItem('AEGitem_sets'));
					sets[dropdown_value] = undefined;
					localStorage.setItem('AEGitem_sets', JSON.stringify(sets));
					AEG.fillEquipDropdown();
				}
		}
	}
	AEG.getCurrentSet = function() {
		var wear_imgs = document.querySelectorAll('#wear img');
		var set_items = []; 
		for ( var ind = 0; ind < wear_imgs.length; ind++ ) {
			var img = wear_imgs[ind];
			// filter for non-empty slots, when an item is equipped it will have an (empty) title and style set
			if ( img.hasAttribute('title') ) {
				set_items.push(img.getAttribute('alt'));
			}
		}
		return set_items;
	}
	// get the sets from localStorage, or return an empty object
	AEG.getSets = function() {
		var sets = localStorage.getItem('AEGitem_sets');
		if ( sets == null ) {
			sets = {};
		} else {
			sets = JSON.parse(sets);
		}
		return sets;
	}
	
	// add call to addEquipLink to the Inventory button
	var InventoryButton_link = document.getElementById('menu_inventory').getElementsByTagName('a')[0];
	InventoryButton_link.setAttribute('onclick', InventoryButton_link.getAttribute('onclick')+ "; AEG.addEquipLink()");
} // end of TW_DOM_SCRIPT

// Script injected on The West Insider (job calculator)
function JC_DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=JC_DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	
	// get table and make links of all the "Your Best Items" strings
	var table_rows = document.getElementById('mainTableBody').getElementsByTagName('tr');
	for ( ind=0; ind < table_rows.length; ind++ ) {
		var best_items_cell = table_rows[ind].getElementsByTagName('td')[7];
		var anchor = document.createElement('a');
		anchor.setAttribute('href', '#');		
		anchor.setAttribute('style', 'color: #333333');
		anchor.setAttribute('title', 'Store items for auto equip in The West');
		anchor.setAttribute('onclick', 'AEG.itemsClick(this); return false;');
		anchor.textContent = best_items_cell.textContent;
		best_items_cell.textContent = '';
		best_items_cell.appendChild(anchor);
	}
	// click handler, cleans up the string and stores it using GM_setValue
	AEG.itemsClick = function(best_items_cell) {
		var items_string = best_items_cell.textContent.replace(/ \[[0-9]+\]/g,'')
		AEG.storeEquipItems(items_string);
		// create notifaction popup
		AEG.popupMessage("&nbsp;&nbsp;Stored<br /><br />"+ items_string +"<br /><br />&nbsp;&nbsp;for automatic equipment", "green");
	}
	AEG.popupMessage = function(string, bgcolor) {
		if ( bgcolor == null ) {
			bgcolor = "red";
		}
		var popupContainer = document.createElement('div');
		popupContainer.setAttribute('id', 'AEGpopupMessage');
		popupContainer.setAttribute('style', 'position: relative; margin: 0 auto; width: 500px');
		var popup = document.createElement('div');
		popup.setAttribute('style', 'border: black 3px solid; background: '+ bgcolor +'; color: white; font: larger bold Arial,Verdana,sans-serif; padding: 20px; position: fixed; top: 200px; width: 490px;');
		popup.innerHTML = string;
		popupContainer.appendChild(popup);
		document.getElementsByTagName('body')[0].appendChild(popupContainer);
		window.setTimeout(function() {
			var popup = document.getElementById('AEGpopupMessage');
			if ( popup != null ) {
				popup.parentNode.removeChild(popup);
			}
		}, 2000);
	}
}

// include different code for the different sites
if ( location.href.indexOf('the-west.net/') >= 0 ) {
	TW_DOM_script();
} else if ( location.href.indexOf('thewestinsider.com/job_calc.php' >= 0) ) {
	JC_DOM_script();
}

// Work arounds to be able to use the GM_setValue functions in the normal code
unsafeWindow.AEG.storeEquipItems = function(items) {
  window.setTimeout(GM_setValue, 0, "TheWestInsiderEquipItems", items);
};
// Work arounds to be able to use the GM_getValue functions in the normal code. Note that this function is 'asynchronous',
//  so any following code has to be called with a delay, to have AEG.equipItems set.
unsafeWindow.AEG.getEquipItems = function() {
  window.setTimeout(function() {
	unsafeWindow.AEG.equipItems = GM_getValue("TheWestInsiderEquipItems").split(', ');
	}, 0
  );
