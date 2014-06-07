// The West Bag Info
// version 0.1 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Bag Info
// @namespace      www.the-west.sk
// @description    Calculate inventory buy/sell price. Detailed statistic.
// @include        http://*.the-west.*
// @include        http://*.innogames.*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }

	function numberFormat(num) {
		var cislo = '';
		num += '';
		while (num.length > 3) {
			cislo = num.substring(num.length - 3) + ' ' + cislo;
			num = num.substring(0,num.length - 3);
		}
		return num + ' ' + cislo;
	}
	
	function convertBagInfo(div) {

		var sell_value = new Array();
		sell_value['neck'] = 0;
		sell_value['head'] = 0;
		sell_value['right_arm'] = 0;
		sell_value['left_arm'] = 0;
		sell_value['body'] = 0;
		sell_value['yield'] = 0;
		sell_value['foot'] = 0;
		sell_value['animal'] = 0;
		sell_value['total'] = 0;
		
		var sell_value_equipped = 0;
		equipped = unsafeWindow.Wear.wear;
		inventory_value = 0;
		inventory = unsafeWindow.Bag.getInstance().items;
		if (equipped.animal) sell_value['animal'] += equipped.animal.get_sell_price();
		if (equipped.body) sell_value['body'] += equipped.body.get_sell_price();
		if (equipped.foot) sell_value['foot'] += equipped.foot.get_sell_price();
		if (equipped.head) sell_value['head'] += equipped.head.get_sell_price();
		if (equipped.neck) sell_value['neck'] += equipped.neck.get_sell_price();
		if (equipped.left_arm) sell_value['left_arm'] += equipped.left_arm.get_sell_price();
		if (equipped.right_arm) sell_value['right_arm'] += equipped.right_arm.get_sell_price();
		if (equipped.yield) sell_value['yield'] += equipped.yield.get_sell_price();
		for (var p in inventory) {
			sell_value[inventory[p].get_type()] += inventory[p].get_sell_price() * inventory[p].get_count_value();
		}
		sell_value['total'] = sell_value['neck'] + sell_value['head'] + sell_value['right_arm'] + sell_value['body'] + sell_value['yield'] + sell_value['foot'] + sell_value['animal'];

		code = '\
			<style type="text/css">\
				table.inventary {\
					padding:0px;\
					margin:10px;\
				}\
				table.inventary td {\
					text-align: right;\
					vertical-align: middle;\
					padding-bottom: 12px;\
					padding:0px;\
				}\
				table.inventary td.hr {\
					height:4px;\
					background:url(data:image/jpeg;base64,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);\
				}\
				table.inventary .type {\
					background:url(data:image/jpeg;base64,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%3D%3D);\
					width:80px;\
					height:50px;\
				}\
				table.inventary th.icon {\
					width:37px;\
				}\
				table.inventary .typebuyown {background-position:-85px 0px;}\
				table.inventary .typesell {background-position:85px 0px;}\
				table.inventary .icon {\
					width:37px;\
					height:40px;\
					background:url(data:image/jpeg;base64,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%3D);\
				}\
				table.inventary .sum {\
					height:30px;\
					font-weight:bold;\
				}\
				table.inventary .iconneck {background-position:0px -40px;}\
				table.inventary .iconhead {background-position:0px -80px;}\
				table.inventary .iconright_arm {background-position:0px -160px;}\
				table.inventary .iconleft_arm {background-position:0px -280px;}\
				table.inventary .iconbody {background-position:0px -240px;}\
				table.inventary .iconfoot {background-position:0px -200px;}\
				table.inventary .iconanimal {background-position:0px -120px;}\
				table.inventary .iconyield {background-position:0px 0px;}\
			</style>\
			<table border="0" cellspacing="0" cellpadding="0" class="inventary">\
				<tr>\
					<th class="iconheader"></th>\
					<th class="type typebuy"></th>\
					<th class="type typebuyown"></th>\
					<th class="type typesell"></th>\
				</tr>\
				<tr>\
					<td></td>\
					<td class="sum">' + numberFormat(sell_value['total']*8) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']*2) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconneck"></td>\
					<td>' + numberFormat(sell_value['neck']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['neck']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['neck']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconhead"></td>\
					<td>' + numberFormat(sell_value['head']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['head']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['head']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconright_arm"></td>\
					<td>' + numberFormat(sell_value['right_arm']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['right_arm']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['right_arm']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconleft_arm"></td>\
					<td>' + numberFormat(sell_value['left_arm']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['left_arm']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['left_arm']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconbody"></td>\
					<td>' + numberFormat(sell_value['body']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['body']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['body']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconfoot"></td>\
					<td>' + numberFormat(sell_value['foot']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['foot']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['foot']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconanimal"></td>\
					<td>' + numberFormat(sell_value['animal']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['animal']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['animal']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconyield"></td>\
					<td>' + numberFormat(sell_value['yield']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['yield']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['yield']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td></td>\
					<td class="sum">' + numberFormat(sell_value['total']*8) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']*2) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']) + ' $</td>\
				</tr>\
				<tr>\
					<td class=""></th>\
					<td class="type typebuy"></th>\
					<td class="type typebuyown"></th>\
					<td class="type typesell"></th>\
				</tr>\
			</table>';
		bag = document.getElementById('bag');
		if (document.getElementById('calc')) {
			if (bag.style.display=='none') {
				bag.style.display = 'block';
				calc = document.getElementById('calc');
				calc.style.display = 'none';
			} else {
				bag.style.display = 'none';
				calc = document.getElementById('calc');
				calc.innerHTML = code;
				calc.style.display = 'block';
			}
		} else {
			bag.style.display = 'none';
			bagparent = bag.parentNode;
		    calc = document.createElement('div');
		    calc.innerHTML = code;
			calc.setAttribute('id','calc');
			calc.style.width = '330px';
			calc.style.height = '294px';
			calc.style.overflow = 'auto';
			calc.style.float = 'left';
			calc.style.padding = '5px 0 0 5px';
			calc.style.background = 'url(../images/bgdark.png)';
			bagparent.appendChild(calc);
		}
		calcbutton = document.getElementById('calcbutton');
		if (calcbutton.style.backgroundPosition!='37px 0px') calcbutton.style.backgroundPosition = '37px 0px';
		else calcbutton.style.backgroundPosition = '0px 0px';
	}
	
	function hookInventory(div) {
		if (!document.getElementById('window_inventory')) return;
		div = document.getElementById('window_inventory_content');
		titleRow = div.getElementsByTagName('h2')[0];
	    button = document.createElement('a');
		button.setAttribute('id','calcbutton');
		button.style.background = 'url(data:image/jpeg;base64,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)';
		button.style.width = '37px';
		button.style.height = '37px';
		button.style.position = 'absolute';
		button.style.top = '0px';
		button.style.right = '0px';
		button.style.cursor = 'pointer';
		button.style.display = 'block';
		titleRow.appendChild(button);
		button.addEventListener("click", function() { convertBagInfo(button); }, false);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookInventory(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_68', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_68', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=68&version=0.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();