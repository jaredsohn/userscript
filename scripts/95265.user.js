// ==UserScript==
// @name           WoWHead to WAA
// @namespace      127.0.0.1
// @description    Adds a button to help generate a WAA itemlist
// @include        http://www.wowhead.com/item=*
// ==/UserScript==

// "Item Name", gold.silver, "Bait", "Singles", "Tag"

var $=unsafeWindow.$;

$(document).ready(function(){
	$('#infobox-quick-facts').append('<br/><br/><small>Price: </small><span class="moneygold"><input id="WAAGold" type="text" value="0" size="5" /></span>');
	$('#infobox-quick-facts').append('<span class="moneysilver"><input type="text" id="WAASilver" value="0" size="5" /></span>');
	$('#infobox-quick-facts').append('<br/><small>Bait: </small><input type="checkbox" id="WAABait" />');
	$('#infobox-quick-facts').append('<br/><small>Singles: </small><input type="checkbox" id="WAASingles"/>');
	$('#infobox-quick-facts').append('<br/><small>Tag: </small><input type="text" id="WAATag" />');
	$('#infobox-quick-facts').append('<br/><br/><a id="WAAc" href="#">Generate');

		
	$('#WAAc').click(function (){
		var item_title = document.title.replace(' - Item - World of Warcraft','');
		var item_gold = parseInt($('#WAAGold').val());
		var item_silver = parseInt($('#WAASilver').val());
		var item_bait = $('#WAABait:checked').val() ? 'Yes' : 'No';
		var item_singles = $('#WAASingles:checked').val() ? 'Yes' : 'No';
		var item_tag = $('#WAATag').val();
		
	
		if(isNaN(item_gold)){
			alert("The gold value must be an integer");
		}else if(isNaN(item_silver)){
			alert("The silver value must be an integer");
		}else{
			if(item_silver != 0){
				var line = '"' + item_title + '",' + item_gold + '.' + item_silver + ',"' + item_bait + '",' + '"' + item_singles + '",' + '"' + item_tag + '"';
			}else{
				var line = '"' + item_title + '",' + item_gold + ',"' + item_bait + '",' + '"' + item_singles + '",' + '"' + item_tag + '"';
			}
			prompt('Copy the following onto a new line in your WAA profile:', line);
		}
		
	}); 
});
