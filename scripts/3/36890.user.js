// ==UserScript==
// @name           igoogle-sidebar-to-tab-bar
// @namespace      http://www.drikanis.org/
// @description    Moves iGoogle's silly new sidebar back to the top in the form of a tab bar, the way it should be! Not the prettiest hack in the world, and you'll have to disable it to reorder your 'tabs', but the rest of the functionality should still all be there.
// @include        http://www.google.com/
// @include        http://www.google.com/ig
// ==/UserScript==

var MAX_TABS = 8;
var TAB_WIDTH = 133;


var navbar = document.getElementById('full_nav');

var doc3 = document.getElementById('doc3');
var maintable = document.getElementById('col1').parentNode.parentNode.parentNode;

var tabsbar = document.createElement("div");

doc3.insertBefore(tabsbar, maintable);

var i = 0;
var element;
var tabtable = document.createElement("table");
tabsbar.appendChild(tabtable);

var tabtablerow;

while(element = document.getElementById('section'+i+'_contents')){
	if(element.parentNode == navbar){
		if( i%MAX_TABS == 0 ){
			tabtablerow = document.createElement("tr");
			tabtable.appendChild(tabtablerow);
		}
		var cell = document.createElement("td");
		cell.appendChild(element);
		cell.width = TAB_WIDTH;
		tabtablerow.appendChild(cell);
	}
	i++;
}

document.getElementById('col1').parentNode.removeChild(document.getElementById('col1'));
