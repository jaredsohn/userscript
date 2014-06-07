// ==UserScript==
// @name          Slashdot BSD Section Insertion
// @description   Re-inserts the BSD section to it's rightful place.
// @include       http://*.slashdot.org/*
// @include       http://slashdot.org/*
// ==/UserScript==

var contentSection;

contentSection = document.getElementById('links-sections-content');
if(contentSection) {
	var bsdSection = document.createElement('li');
	bsdSection.innerHTML = '<a href="//BSD.slashdot.org/">BSD</a>';
	
	var list = contentSection.getElementsByTagName('ul');
	if(list) {
		var items = list[0].getElementsByTagName('li');
		if(items) {
			for(var j=0;j<items.length;j++) {
				var name = items[j].getElementsByTagName('a')[0].innerHTML;
				if(name.toUpperCase() > 'BSD' && name.toUpperCase() != 'MAIN') {
					items[j].parentNode.insertBefore(bsdSection,items[j]);
					break;
				}						
			}
		}
	}
}
