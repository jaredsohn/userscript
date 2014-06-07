// ==UserScript==
// @name           Prodavalnik MOD
// @namespace      prodavalnik.com
// @include        http://prodavalnik.com/*
// @include        http://www.prodavalnik.com/*
// @include        http://ssl.prodavalnik.com/*
// @include        https://ssl.prodavalnik.com/*
// @include        https://www.prodavalnik.com/*
// @include        https://prodavalnik.com/*
// ==/UserScript==

// Detecs Pages
// @returns: 'my_items', 
function detectPage()
{
	var result = '';
	
	var patt_my_stuff = new RegExp('user/myads');
	
	if (patt_my_stuff.test(document.location.href)){
		result =  'my_items';
	}
	
	return result;
}

function addItemButtons(input)
{
	var patt_relist = new RegExp('relistad/');
	if (patt_relist.test(input.innerHTML)){
		// no modifications when the button is already there
		return input;
	}
		
	var cells = input.getElementsByTagName('td');
	var patt_cell_buttons = new RegExp('item-option-delete');
	var patt_item_id = new RegExp('promote/([0-9]+)/');
	
	var i = 0;
	for (i = 0; i < cells.length; i++){
		if (patt_cell_buttons.test(cells[i].innerHTML)){
			if (res = patt_item_id.exec(cells[i].innerHTML)){
				cells[i].getElementsByTagName('div')[0].innerHTML += '<a href="http://prodavalnik.com/user/relistad/'+res[1]+'/?ref%5B0%5D%5Baction%5D=user&ref%5B0%5D%5Bmethod%5D=myads"><img src="http://s2.prodavalnik.com/static/prodavalnikcom/external/sites/prodavalnikcom/img/profile/item_option_relist.png" class="item-option-edit" alt="Re-Publish" title="Re-Publish" style="background-color: #0033CC; border: 0px;padding: 2px; -moz-border-radius: 17px; -webkit-border-radius: 17px; -khtml-border-radius: 17px; border-radius: 17px;" /></a>';
				cells[i].setAttribute('style', 'width: 200px; padding-left: 10px;');
			}
			break;
		}
	}
	return input;
}

function MOD_my_items()
{
	// display republish buttons
	var i = 0;
	var table = document.getElementsByTagName('table');
	
	if (table){
		var patt_table = new RegExp('myoffers');
		for(ti = 0; ti < table.length; ti++){
			if (patt_table.test(table[ti].getAttribute('class'))){
				var rows = table[ti].getElementsByTagName('tr');
				var patt_item_row = new RegExp('adRow');
				//var patt_republish = new RegExp('item_option_relist\.png')
				for (i = 0; i < rows.length; i++){
					// chech if it is not header row, nor where update button exists
					if (patt_item_row.test(rows[i].getAttribute('class'))){
						//&& !patt_republish.test(rows[i].innerHTML)){
						// modify entry row here
						rows[i] = addItemButtons(rows[i]);
					}
				}
				break;
			}
		}
	}
		
	if (table){
		
	}
}

var page = detectPage();

if (page == 'my_items'){
	MOD_my_items();
}