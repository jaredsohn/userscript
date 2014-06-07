// ==UserScript==
// @name					eBay Country Filter
// @description		Filter out eBay items listed by sellers from certain countries, for example China or Hong Kong.
// @namespace			http://userscripts.org/users/307595
// @include				http://*.ebay.*
// @include				http://shop.ebay.*
// @require				http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==
// Uses MooTools for Greasemonkey. Check it out, MooTools makes your life easier.


// Edit this list with the countries you like to exclude.
// Examples: 'Malaysia', 'California', 'Australia', etc.
// You also need to enable eBay to show you where the item is located for the script to work.
var blacklist = ['Hong Kong', 'China', 'Taiwan'];



var enable = true;

function compareCountry(s) {	
	for (var i = 0; i < blacklist.length; i++) {
		if (s.contains(blacklist[i]))
			return true;
	}
	
	return false;
}

function createList() {
	var listBox = new Element('div', {
		id: 'listBox',
	}).inject(document.body, 'top');
	
	
	listBox.setStyles({
		'z-index': '1000',
		'top': '25px',
		'right': '5px',
		'position': 'fixed'
	});
	
	var updateButton = new Element('input', {
		id: 'updateButton',
		type: 'button',
		value: 'Disable Country Filter'		
	}).inject(listBox);
	
	updateButton.addEvent('click', function() {
		if (enable) {
			updateButton.set('value', 'Enable Country Filter');
			enable = false;
			filter();
		} else {
			updateButton.set('value', 'Disable Country Filter');
			enable = true;
			filter();
		}
	});
	
}

function filter() {
	var countriesGER = $$('div[class$=s1]');
	var countriesUS = $$('div[class$=s2]');
	var countries = countriesGER;
	countries.combine(countriesUS);
	Array.each(countries, function(entry, index) {
		if (compareCountry(entry.get('text'))) {
			if (enable) {
				entry.getParent('table').setStyle('display', 'none');
			} else {
				entry.getParent('table').setStyle('display', 'block');
			}
		}
	});
	
}

createList();
filter();

