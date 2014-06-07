// ==UserScript==
// @name           CroqueMonster CO2 Counter
// @namespace      vgvallee
// @include        http://www.croquemonster.com/monster/*
// ==/UserScript==


//check if the variable was set
if(GM_getValue("CO2") == "undefined") {
	//initialize it
	GM_setValue("CO2","0");
}

try {
	var t = document.evaluate("//div[@class='sitePopup']/div[@class='content']/div/strong/child::text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	//found something
	if(t.snapshotLength > 0) {
		//use the parseFloat
		var fart = parseFloat(t.snapshotItem(0).nodeValue);
		//don't add it up if it's not a number
		if(!isNaN(fart)) {
			fart += parseFloat(GM_getValue("CO2"));
			GM_setValue("CO2", fart.toString());
		}
	}
}
catch(e)
{
	//alert(e);
}

//try to get the placement besides the monster name
var heading = document.evaluate("//h1[@class='noMarg']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(heading.snapshotLength == 1) {
	heading = heading.snapshotItem(0);
	var span = document.createElement("span");
	span.style.paddingLeft = "10px";
	span.style.paddingRight = "2px";
	span.style.fontSize = "75%";
	span.style.backgroundRepeat = "no-repeat";
	span.style.backgroundImage = "url('http://data.croquemonster.com/gfx/gui/monster_skin_hole.png')";
	span.style.borderStyle = "solid";
	span.style.borderTopWidth = "1px";
	span.style.borderTopColor = "#FBD461";
	span.style.borderBottomWidth = "2px";
	span.style.borderBottomColor = "#9A7300";
	span.style.borderRightWidth = "2px";
	span.style.borderRightColor = "#9A7300";
	span.style.borderLeftWidth = "1px";
	span.style.borderLeftColor = "#FBD461";
	if(GM_getValue("CO2") != "0") {
		span.appendChild(document.createTextNode("CO²  total: " + parseFloat(GM_getValue("CO2")).toFixed(5) + "m³"));
		var reset = document.createElement("a");
		reset.setAttribute("class", "okButton");
		//reset.setAttribute("href", "#");
		reset.addEventListener("click", function() {
			span.innerHTML = "CO²  total: rien!";
			GM_setValue("CO2", "0");
		}, false);
		reset.appendChild(document.createTextNode("RaZ"));
		span.appendChild(reset);
	}
	else {
		span.appendChild(document.createTextNode("CO²  total: rien!"));
	}
	heading.appendChild(span);
}
