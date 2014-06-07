// ==UserScript==
// @name           SSW Last Adventure
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Adds a link to the last location that you have adventured.
// @include        http://www.secretsocietywars.com/index.php*
// ==/UserScript==

var loc;
var planetname;
var location_name;
var last_planet;

planetname = get_planet_name();
if(/a=(?:meet|quest|daily_maze|gofish)/.exec(document.location.href)) {
	location_name = get_location_name(document.location.href);
}
if(location_name) {
	GM_setValue("last_location", document.location.href);
	GM_setValue("last_planet", planetname);
}

loc = GM_getValue("last_location", "");
last_planet = GM_getValue("last_planet", "");

if(loc && (last_planet == planetname)) {
	var last_link = document.createElement('a');
	
	last_link.href = loc;
	last_link.style.color = "white";
	last_link.style.fontSize = "9px";
	last_link.innerHTML = get_location_name(loc);
	add_last_link(last_link);
}


function add_last_link(lastlink) {
	var cell;

	cell = document.evaluate('//td[@class="leftside"]//td[@class="pattrName"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(cell) {
		cell.appendChild(lastlink);
	}
}

function get_planet_name() {
	var planetname;
	var sel;

	sel = document.evaluate('//select[@name="jumpmenu"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(sel) {
		var re;
		if(re = /On Planet: (.*)/.exec(sel.options[0].text)) {
			planetname = re[1];
		}
	}
	return planetname;
}

function get_location_name(href) {
	var sel;
	var location_name;
	
	sel = document.evaluate('//select[@name="jumpmenu"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(sel) {
		for(var i = 0; i < sel.options.length; i++) {
			if(sel.options[i].value == href) {
				location_name = sel.options[i].text;
				break;
			}
		}
	}
	return location_name;
}
