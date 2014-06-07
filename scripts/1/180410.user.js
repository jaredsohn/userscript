// ==UserScript==
// @name          ikariam secret
// @namespace     http://www.userscripts.org/coco
// @include     http://s*.ikariam.*/index.php*
// @description   Auto Pirate update
// @version       0.2.5
// ==/UserScript==

function click_captureSmuglersBtn() {
	var captureSmuglersBtn = document.evaluate("//a[contains(@class,'button capture')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (captureSmuglersBtn) {
	   
		var timebox = [155000, 455000];//, 905000, 1805000];
		//var opp = Math.floor(Math.random() * timebox.length);
                Math.random()>=.2?index=0:index=1;
        
		captureSmuglersBtn.snapshotItem(index).click();
        
		var totaltime = timebox[index];
		setTimeout(myPause, totaltime);
        
		window.clearInterval(int1);
	}
}

var delay = getRandomInt(3000, 6000);
var int1 = setInterval(click_captureSmuglersBtn, delay);


function myPause() {
    delay=getRandomInt(50000, 35000);
	int1 = setInterval(click_captureSmuglersBtn, delay );
}
//--
//************  calculate random delays  **************

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}