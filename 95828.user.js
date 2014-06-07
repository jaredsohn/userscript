// ==UserScript==
// @name        CS2 Asteroid Scan Enhancement
// @namespace   http://cstools.freehostia.com
// @description Displays the turns needed to mine individual layers and amount when refined
// @include     http://*.chosenspace.com/index.php?go=asteroid_scan
// ==/UserScript==
// Fix 1 - RegExp expressions would only select layers bigger than 100,000 x.x
// Fix 2 - Cleaned up the functions and rounding is prescise now
function format(n) {
	n = n.toString();
	result = "";
	len = n.length;
	while (len > 3) {
		result = "," + n.substr(len - 3, 3) + result;
		len -= 3;
	}
	return n.substr(0, len) + result;
}
var scnloc, patt1, patt2, layers, i, refined, remainder, turnsreq,totalsize, turnsreqtotal, layerstotal,mb;
mb = 400;
alltags = document.evaluate("//a[@href[contains(.,'index.php?go=item_info&item_id=')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisTag = alltags.snapshotItem(0);
scnloc = thisTag.parentNode.innerHTML;
patt1 = /\w{3,}\s\w{3}.Layer...\d{0,3},{0,1}\d{0,3},{0,1}\d{0,3}.Isatons/ig;
patt2 = /\d{0,3},{0,1}\d{0,3},{0,1}\d{0,3}.Isatons/ig;
layers = scnloc.match(patt1);
sizes = scnloc.match(patt2);
turnsreq = new Array(sizes.length);
refined = new Array(layers.lenght);
totalsize = sizes[0];
turnsreqtotal = '';
tsl = '';
for (i = 0; i != sizes.length; i++) {
	sizes[i] = sizes[i].replace(/\D/g, "");
	turnsreq[i] = Math.ceil(sizes[i] / mb);
	if ( i != 0 ){
	tsl = tsl + sizes[i];
	turnsreqtotal = turnsreqtotal + turnsreq[i];
	}
}
for (i = 0; i != layers.length; i++) {
	if (RegExp("Iridium").test(layers[i])) {
		refined[i] = (sizes[i + 1] / 10) * 8;
	} else if (RegExp("Tetrium").test(layers[i])) {
		refined[i] = (sizes[i + 1] / 10) * 1.5;
	} else {
		refined[i] = (sizes[i + 1] / 10);
	}
	scnloc = scnloc.replace(layers[i], layers[i] + " - " + format(turnsreq[i + 1]) + " Turns - " + format(refined[i]) + " Refined Ore");
}
if (RegExp("Scanner cannot penetrate this Layer").test(scnloc)){
	nosl = scnloc.match(/Scanner cannot penetrate this Layer/ig);
	switch(nosl.length){
	case 1:
	remainder = Math.ceil((sizes[0]-tsl)/mb);
	scnloc = scnloc.replace(/\d{0,3},{0,1}\d{0,3},{0,1}\d{0,3}.Isatons/, totalsize + " - " + format(turnsreq[0]) + " Turns</span>");
	scnloc = scnloc.replace(/Scanner cannot penetrate this Layer/, "Scanner cannot penetrate this Layer - " + format(remainder) + " Turns</span>");
	break;
	
	default:
	scnloc = scnloc.replace(/\d{0,3},{0,1}\d{0,3},{0,1}\d{0,3}.Isatons/, totalsize + " - " + format(turnsreq[0]) + " &#177;" + nosl.length + " Turns</span>");
	break;
}} else {
	scnloc = scnloc.replace(/\d{0,3},{0,1}\d{0,3},{0,1}\d{0,3}.Isatons/, totalsize + " - " + format(turnsreq[0]) + " Turns</span>");
}
thisTag.parentNode.innerHTML = scnloc;