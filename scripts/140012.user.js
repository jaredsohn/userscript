// ==UserScript==
// @name        IMDB - add tracker links
// @namespace   KG
// @include     http*://*imdb.com*tt*
// @run-at	document-start
// @grant	GM_addStyle
// @version     1.2
// ==/UserScript==

var sites = [
"https://karagarga.net/browse.php?search_type=imdb&search=",
"https://cinemageddon.net/browse.php?search=tt",
"http://cinematik.net/browse.php?cat=0&incldead=1&sort=1&type=asc&srchdtls=1&search=tt",
"https://passthepopcorn.me/torrents.php?searchstr=tt",
"https://broadcasthe.net/torrents.php?imdb=tt"
];

var names = ["KG", "CG", "Tik", "PtP", "BtN"];

// don't run in iframes
if (!window.frameElement) {
	var h = document.location + "";
	var q = h.split('/tt')[1] + "";
	var ref = q.substr(0, 7);

	doIt();
}

function doIt() {
    if (!document.body) { 
    	setTimeout(function(){ doIt(); }, 100); 
    	return;
    }

    GM_addStyle(" #linkbar { font-family: sans-serif; font-weight: bold; color: #ccc; background-color: #000; font-size: 0.8em;  padding: 0.5em; position: fixed; right: 0; text-align: left; bottom: 0; z-index: 1000; } ");
    GM_addStyle(" #linkbar a:link, #linkbar a:visited { color: #ccc; text-decoration: none; } ");

    var bar = document.createElement('div');
    bar.id = "linkbar";
    document.body.appendChild(bar);
    
    var openAll = "<a href='#' onclick=\"javascript: ";
    
    for (i=0; i < sites.length; i++) {
    	bar.innerHTML += "<a href='" + sites[i] + ref + "'>" + names[i] + "</a> | ";
    	openAll += "window.open(' " + sites[i] + ref + " ', '_blank'); ";
    }
    
    bar.innerHTML += openAll + " return false; \">ALL</a> ";
}