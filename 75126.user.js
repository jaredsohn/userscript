// ==UserScript==
// @name           WestStats Jobs Best Own Items
// @namespace      http://armeagle.nl
// @description    The WestStats Jobs calculator links to showing the very best items for the job, but that often doesn't include your own best items, so you don't know how much better some items are. This script adds your current own best bonuses per slot.
// @include        http://www.weststats.com/Jobs/?type=personal*
// @include        http://www.weststats.com/Job_items/?job=*
// ==/UserScript==

// Updated on June 15 2010 to work on the new layout again

// *** Job Calculator page:
if ( location.href.indexOf('weststats.com/Jobs/?type=personal') >= 0 ) {
	// Find all Job icons, add an onclick action that adds the information from the popup (showing your own best items) to the link (then the second part of this script will parse that and somehow show that info.

	// Jobs table is the third one (first is a layout container, second is for the form.
	var jobs_table = document.getElementById('middle').getElementsByTagName('table')[1];
	var outfit_links = jobs_table.querySelectorAll('tr > td:first-child > a');
	console.log(outfit_links);
	for ( i_outfit_links=0; i_outfit_links<outfit_links.length; i_outfit_links++ ) {
		outfit_links[i_outfit_links].setAttribute('onmousedown', 'AEG_addBestOwnOutfit(this);');
	}
	JC_DOM_script();
}

// *** Best Items page
if ( location.href.indexOf('weststats.com/Job_items/?job=') >= 0 &&
	 location.href.indexOf('&bestitems=') >= 0 ) {
	//window.setTimeout((function() {
		var own_best_items = JSON.parse(unescape(location.href).split('&bestitems=')[1]);
		
		var slot_headers = document.querySelectorAll('#middle > h5');
		for ( i_slot_headers=0; i_slot_headers<slot_headers.length; i_slot_headers++ ) {
			var slot_header = slot_headers[i_slot_headers];
			var slot_first_char = slot_header.textContent.split('Best ')[1][0];
			var own_best_item = own_best_items[slot_first_char];
			slot_header.textContent += ', own best: '+ own_best_item.name +' (+'+ own_best_item.bonus +')';
		}
	//}), 500);
}

// *** Job Calculator page, inject
function JC_DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=JC_DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");

	function AEG_addBestOwnOutfit(element) {
		// there is only one tip-classed element
		var tooltip_text = document.getElementById('tooltip').textContent;
		// example of tooltip_text:    ConstructionBest items:Headgear: Lincoln's top hat (+42)Neckgear: Gray bow tie (+39)Clothing: Brown cotton jacket (+39)Shoes: Brown ragged shoes (+12)Weapon: Club (+0)Total bonus: +132
		var items_text = tooltip_text.split('items:')[1];
		var items = items_text.split(')');
		var own_best_items = {};
		for ( i_items=0; i_items<items.length; i_items++ ) {
			var best_item = {};
			var item_text = items[i_items];
			// it ends with the Total bonus, skip that one/only handle the actual item entries
			if ( item_text.indexOf('(') > 0 ) {
				var slot_and_item = item_text.split(': ');
				var slot_name = slot_and_item[0];
				var item_and_bonus = slot_and_item[1].split(' (');
				best_item.name = item_and_bonus[0];
				best_item.bonus = Number(item_and_bonus[1]);
				own_best_items[slot_name[0].toLowerCase()] = best_item
			}
		}
		// Get total (negative) points for the job
		// Element is the link(a) element. Go up two levels, then get the 6th td element and then the 3rd div
		var points = element.parentNode.parentNode.getElementsByTagName('td')[5].getElementsByTagName('div')[2].textContent;
		element.href = element.href.split('&')[0] + '&points='+ points +'&bestitems='+escape(JSON.stringify(own_best_items));
		
	}
}