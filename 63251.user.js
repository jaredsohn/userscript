// ==UserScript==
// @name		schuelerVZ | VisitorWatch
// @namespace		agrafix.net
// @description		Beschreibt die Veränderungen des Besucherzählers
// @include		http://*.schuelervz.net/Start*
// @include		http://*.schuelervz.*/Home*
// ==/UserScript==


// @version 1.1

function main() {
	var element = document.getElementsByClassName("visitorsCounter")[0];
	var visitors = element.innerHTML.split(": ");
	var count = visitors[1];
	
	if (count.indexOf(".")) {
		var pts = count.split(".");
		
		count = Number(pts[0] + "" + pts[1]);
	}
	
	// relative change
	var last = GM_getValue('LastVisitors', 0);
	var change = count-last;
	GM_setValue('LastVisitors', count);
	
	var extra = "";
	
	if (change > 0) {
		extra = "style='color:green;'";
	}
	
	element.innerHTML += " <b "+ extra +">(+" + change + ")</b>";
	
	// daily chance
	var currentDate = new Date();
	var last_update_day = GM_getValue('LastUpdateDay', currentDate.getDate());
	var dailychange = GM_getValue('DailyChange', 0);
	
	if (last_update_day == currentDate.getDate()) {
		dailychange += change;
		GM_setValue('DailyChange', dailychange);
		GM_setValue('LastUpdateDay', currentDate.getDate());
	}
	else {
		GM_setValue('LastUpdateDay', currentDate.getDate());
		GM_setValue('DailyChange', change);
		dailychange = change;
	}
	
	var extra_style = "";
	if (dailychange > 0) {
		extra_style = "style='color:green;'";
	}
	
	element.innerHTML += " | Heute: <i " + extra_style + ">"+dailychange+"</i> ";
	element.parent.height = 40;
	
}

main();


/*
 * The function library
 * 
 */
function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;

	return node;
}

function $gid(id) {
	var el = document.getElementById(id);

	return el;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

