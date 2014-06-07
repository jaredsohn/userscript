// ==UserScript==
// @name		schuelerVZ Extended VisitorCounter
// @namespace		Lukas M. & Agrafix
// @description		Ein erweiterter Besucherzähler für das Schülervz
// @include		http://*.schuelervz.net/Start* 
// @include             http://*.schuelervz.*/Home*
// ==/UserScript==

/*
 * Original von Agrafix, Geupdated von Lukas M.
 *
 */



function main() {
	var element = document.getElementsByClassName("visitorsCounter")[0];
	var visitors = element.innerHTML.split(": ");
	var count2 = visitors[1];

	s=new String;
	s=String(count2);
	s = s.replace(".","");
	count=Number(s);

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
	
	element.innerHTML += " | H: <i " + extra_style + ">"+dailychange+"</i> ";
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

