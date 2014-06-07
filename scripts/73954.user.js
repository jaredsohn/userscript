// ==UserScript==
// @name           InstapaperIt holdClick
// @version			1.0
// @description    sends link to Instapaper in the background by clicking and  holding down the left mouse button
// @description     till the link changes color (about a second).
// @description     Make sure and change YOURUSERNAME and YOURPASSWORD appropriately. 
// @description     If you don't have a password,  change "YOURPASSWORD" to ""  (two quotation marks).
// @include     *
// @copyright   2010, ElasticThreads
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var usrNm="YOURUSERNAME",
psswrd="YOURPASSWORD",
timeOut = 1350;  // msec to wait

allLinks=document.evaluate("//a[@href]", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(i=0;i<allLinks.snapshotLength;i++){
	thisLink=allLinks.snapshotItem(i);
	if (thisLink.hasAttribute('href') && ! thisLink.href.match(/^javascript:/i)) {
		new TabOpener(thisLink);
	}
}

function TabOpener(lnx) {
	var timer = null;
	var opened = false;

	var iprl5 = function() {
		var d = document,
		zed=d.createElement('SCR'+'IPT'),
		bob=d.body;
		window.onclick=false;	
		zed.setAttribute('src','https://www.instapaper.com/api/add?url='+escape(lnx.href)+'&auto-title=1&username='+usrNm+'&password='+psswrd);
		bob.appendChild(zed);
		window.onclick=true;
		opened = true;
		lnx.style.color="#2e2e2e";
	}
	var mousedownHandler = function(e) {
		if (e.button == 0) {
			timer = setTimeout(iprl5, timeOut);
		}
	}
	var clickHandler = function(e) {
		clearTimeout(timer);
		if (opened) {
			e.preventDefault();
			opened = false;
		}
	}	
	lnx.addEventListener('mousedown', mousedownHandler, false);
	lnx.addEventListener('click', clickHandler, false);
}