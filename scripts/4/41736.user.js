// ==UserScript==
// @name           Remove the header on Sweclockers
// @namespace      http://remove.header.on.sweclockers
// @description    Removes the header on Sweclockers.com
// @author         RobinRosengren
// @version        1.4
// @include        http:*sweclockers.com/*
// @exclude        http://sweclockers.com/news_ticker.php
// ==/UserScript==


var logState = (document.getElementById('logout') ? 'logout' : 'login');
var bannerBool = true;

function switchBanner()
{
	bannerBool = !bannerBool;
	document.getElementById("hider").innerHTML = (bannerBool ? "Göm header" : "Visa header");
	var state = (bannerBool ? 'block': 'none');
	document.getElementById(logState).style.display = state;
	var banner = document.evaluate("//DIV[@class='bannerhorizontal']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(banner.snapshotLength>0) banner.snapshotItem(0).style.display = state;
}


// addButton
var links = document.getElementById("mainnav").getElementsByTagName("ul")[0];
var swi = document.createElement("li");
swi.innerHTML = "<a><span id=\"hider\">Visa header</span></a>";
links.insertBefore(swi, links.firstChild);

document.getElementById('hider').addEventListener('click',switchBanner,false);

switchBanner();

