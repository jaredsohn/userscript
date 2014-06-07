// ==UserScript==
// @name           KoL - Sell from Inventory
// @namespace      kol
// @description    Add selling links to mall and inventory.
// @include        http://www*.kingdomofloathing.com/inventory.php*
// @include        http://www*.kingdomofloathing.com/account.php*
// @include        http://www*.kingdomofloathing.com/managestore.php*
// @include        http://www*.kingdomofloathing.com/manageprices.php*
// ==/UserScript==

// ----- Revision History -----
//  1 Initial release. Allow movement of items directly from inventory to mall.
//  2 Added ability to autosell from inventory. Cleaned up "How many?" prompt to allow canceling.
//  3 Fixed autosell bug when only one item is present.
//  4 Added preferences to account menu.
//  5 Added revision history, like a good programmer.
//     Also, updated description to say exactly where preferences are in account menu.
//  6 Add ability to autosell from mall (both on managestore.php and manageprices.php).
//     Also, cleaned up autoselling from inventory, so it doesn't go to the autosell page.
//     Same deal for moving items to the mall.
//     Also, enforce wrapping at 100 characters, so you can actually read things in the code
//     preview window on userscripts.org.
//  7 Bugfix: sale prices with commas no longer display as null.
//     Bugfix: don't try to attach autosell link to items taken from store inventory.
//     Take pwd value straight from webpage, so we don't have to parse it.
//     Use built-in functions to remove items from inventory, so we don't have to refresh.
//     Miscellaneous cleanup and code re-use.
//     Added error messages if item couldn't be traded/sold.
//     Added options to suppress notification of sale prices.
//     Shorten description in favor of a longer description on userscripts.org.
//  8 Refresh charpane after sales.
//  9 Added ability to move items to display case from inventory.
//     Bugfix: preserve prices and limits when autoselling only some of an item from the mall.
// 10 Removed small bit of code used when debugging previous bugfix.
//     Added ability to move items to closet from inventory.

// ----- Known Issues -----
// Using built-in functions kills the item's links. Maybe I'm wrong, but I think the ability to
// keep the content in place when selling items outweighs the odd chance that you'd need to hit
// the links more than once.

var pwd = '';
function $new(tag, attrib, str) {
	var el, key;
	if (attrib||str) {
		el = $new(tag);
		if (attrib) for (key in attrib) switch(key) {
			case 'click': case 'dblclick': case 'change':
				el.addEventListener(key, attrib[key], true); break;
			default: el.setAttribute(key, attrib[key]);
		}
		if (str) el.appendChild(document.createTextNode(str));
		return el;
	} else return document.createElement(tag);
}
function mallSell(item, qty, price, limit, suppressAlert) { GM_xmlhttpRequest({
	method: 'POST',
	url: location.protocol + '//' + location.host + '/managestore.php',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: 'action=additem&pwd=' + pwd +
		'&qty1=' + qty + '&item1=' + item + '&price1=' + price + '&limit1=' + limit,
	onload: function (d) {
		var r = d.responseText.match(/for sale for [0-9,]+ Meat/i);
		if (r) {
			if (suppressAlert)
				window.location = window.location;
			else if (GM_getValue('notify_mall', true))
				alert('Put up ' + r + ' each.');
			if (unsafeWindow.updateInv) {
				var chg = {}; chg[item] = -qty;
				unsafeWindow.updateInv(chg);
			}
		} else
			alert('Error occurred trying to put item in mall.');
	}
}); }
function autoSell(item, qty) { GM_xmlhttpRequest({
	method: 'POST',
	url: location.protocol + '//' + location.host + '/sellstuff_ugly.php',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: 'action=sell&pwd=' + pwd + '&quantity=' + qty + '&item=' + item + '&mode=3',
	onload: function (d) {
		var r = d.responseText.match(/for [0-9,]+ Meat/i);
		if (r) {
			if (GM_getValue('notify_auto', true)) alert('Sold ' + r);
			unsafeWindow.top.charpane.location = unsafeWindow.top.charpane.location;
			if (unsafeWindow.updateInv) {
				var chg = {}; chg[item] = -qty;
				unsafeWindow.updateInv(chg);
			}
		} else
			alert('Error occurred trying to sell item.');
	}
}); }
function putInDisplayCase(item, qty) { GM_xmlhttpRequest({
	method: 'POST',
	url: location.protocol + '//' + location.host + '/managecollection.php',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: 'action=put&pwd=' + pwd + '&howmany1=' + qty + '&whichitem1=' + item,
	onload: function (d) {
		var r = d.responseText.match(/ moved from inventory to case/i);
		if (r) {
			if (GM_getValue('notify_dc', true)) alert(qty + r);
			if (unsafeWindow.updateInv) {
				var chg = {}; chg[item] = -qty;
				unsafeWindow.updateInv(chg);
			}
		} else
			alert('Error occurred trying to put item in display case.');
	}
}); }
function putInCloset(item, qty) { GM_xmlhttpRequest({
	method: 'POST',
	url: location.protocol + '//' + location.host + '/closet.php',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: 'action=put&pwd=' + pwd + '&howmany1=' + qty + '&whichitem1=' + item,
	onload: function (d) {
		var r = d.responseText.match(/ moved from inventory to closet/i);
		if (r) {
			if (GM_getValue('notify_closet', true)) alert(qty + r);
			if (unsafeWindow.updateInv) {
				var chg = {}; chg[item] = -qty;
				unsafeWindow.updateInv(chg);
			}
		} else
			alert('Error occurred trying to put item in closet.');
	}
}); }
function autoSellFromMall(item, qty, price, limit) {
	// We want to take all, then sell, then replace what's left,
	// so we don't have to do one request per item.
	GM_xmlhttpRequest({
		method: 'GET',
		url: location.protocol + '//' + location.host + '/managestore.php?action=takeall' +
			'&whichitem=' + item + '&pwd=' + pwd,
		onload: function () {
			if (qty === 1 && GM_getValue('auto_on_one', true)) {
				autoSell(item, 1);
				window.location=window.location;
			} else {
				var x = prompt('How many? (Leave blank for all)');
				if (x !== null) {
					if (x === '') x = qty;
					autoSell(item, x);
					if (x < qty) mallSell(item, qty-x, price, limit, true);
					else window.location=window.location;
				}
			}
		}
	});
}
function printSell(el, func, text, desc, price) {
	el.appendChild(document.createTextNode(' '));
	el.appendChild($new('a', {
		href: 'javascript:void("' + desc + '");',
		click: function () {
			var item = this.parentNode.parentNode.getAttribute('id').replace(/i/, '');
			var max = this.parentNode.parentNode.textContent.match(/\((\d+)\)/);
			max = (max === null) ? 1 : max[1];
			if (max === 1 && GM_getValue('auto_on_one', true)) {
				func(item, 1);
			} else {
				var x = prompt('How many? (Leave blank for all)');
				if (x !== null) {
					if (x === '') x = max;
					func(item, x, price);
				}
			}
		}
	}, '[' + text + ']'));
}
switch (window.location.pathname) {
case '/account.php':
	var i, f = unsafeWindow.getObj('invstuff');
	f.appendChild($new('p', null, 'Sell from Inventory Options'));
	f.appendChild(f = $new('div', {class: 'small'}));

	var opts = {
		'auto_on_one': 'Automatically sell if only one item?',
		'mall_link': 'Display mall link?',
		'notify_mall': 'Notify of mall price?',
		'auto_link': 'Display autosell link?',
		'notify_auto': 'Notify of autosale income?',
		'auto_mall': 'Display autosell link in mall?',
		'dc_link': 'Display display case link?',
		'notify_dc': 'Show display case confirmation?',
		'closet_link': 'Display closet link?',
		'notify_closet': 'Show closet confirmation?'
	};
	for (var k in opts) {
		f.appendChild(i = $new('input', {
			id: k,
			type: 'checkbox',
			click: function (k) {
				return function () { GM_setValue(k, this.checked); };
			}(k)
		}));
		i.checked = GM_getValue(k, true);
		f.appendChild($new('label', {for: k}, opts[k]));
		f.appendChild($new('br'));
	}
break;
case '/inventory.php':
	pwd = unsafeWindow.pwd;
	if (GM_getValue('mall_link', true) || GM_getValue('auto_link', true))
		Array.forEach(unsafeWindow.$('td[id]'), function (td) {
			if (td.getAttribute('id').match(/^i/)) {
				var item = td.getAttribute('id').replace(/i/, '');
				if (GM_getValue('mall_link', true))
					printSell(td.lastChild,
						mallSell, 'mall', 'sell in mall');
				if (GM_getValue('auto_link', true))
					printSell(td.lastChild,
						autoSell, 'auto', 'autosell');
				if (GM_getValue('dc_link', true))
					printSell(td.lastChild,
						putInDisplayCase, 'case', 'put in display case');
				if (GM_getValue('closet_link', true))
					printSell(td.lastChild,
						putInCloset, 'closet', 'put in closet');
			}
		});
break;
case '/managestore.php':
	Array.forEach(document.getElementsByTagName('input'), function (i) {
		if (i.getAttribute('name') === 'pwd') pwd = i.getAttribute('value');
	});
	if (GM_getValue('auto_mall', true))
		Array.forEach(document.getElementsByTagName('tr'), function (tr) {
			if (tr.firstChild.firstChild && tr.firstChild.firstChild.tagName &&
			    tr.firstChild.firstChild.tagName === 'IMG' &&
			    !tr.textContent.match('You acquire')) {
				var item = tr.innerHTML.match(/whichitem=(\d+)/);
				item = item[1];
				var qty = tr.childNodes[1].textContent.match(/\((\d+)\)/);
				var price = tr.childNodes[2].textContent.replace(/[^0-9]/g, '');
				var limit = tr.childNodes[3].textContent.replace(/[^0-9]/g, '');
				qty = (qty === null) ? 1 : qty[1];
				tr.lastChild.appendChild(document.createTextNode(' '));
				tr.lastChild.appendChild($new('a', {
					href: 'javascript: void("autosell");',
					click: function () { autoSellFromMall(item, qty, price, limit) }
				})).appendChild($new('font', {size: '1'}, 'autosell'));
			}
		});
break;
case '/manageprices.php':
	Array.forEach(document.getElementsByTagName('input'), function (i) {
		if (i.getAttribute('name') === 'pwd') pwd = i.getAttribute('value');
	});
	if (GM_getValue('auto_mall', true))
		Array.forEach(document.getElementsByTagName('tr'), function (tr) {
			if (tr.childNodes[4] && tr.childNodes[4].firstChild &&
			    tr.childNodes[4].firstChild.tagName &&
			    tr.childNodes[4].firstChild.tagName === 'INPUT') {
				var item = tr.childNodes[4].firstChild.name.replace('price', '');
				var qty = parseInt(tr.childNodes[1].textContent);
				var price = parseInt(tr.childNodes[4].firstChild.value);
				var limit = parseInt(tr.childNodes[5].firstChild.value);
				tr.appendChild($new('td')).appendChild($new('a', {
					href: 'javascript: void("autosell");',
					click: function () { autoSellFromMall(item, qty, price, limit); }
				}, 'autosell'));
			}
		});
break;
}
