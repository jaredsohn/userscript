// ==UserScript==
// @name           Oanda forums content filter
// @description    Ignore users/content.  
// @copyright      Based on http://userscripts.org./scripts/show/86159 , @include modified
// @include        http://fxtrade.oanda.com/community/fxmessage/*
// ==/UserScript==

GM_registerMenuCommand("Ignored users...", editUsers);

function editUsers() {
    var users = window.prompt("Ignored strings are case-sensitive and must be delimited by commas. Spaces are optional.\n\nIgnored users:", GM_getValue("users", "the1,example2"));
    GM_setValue("users", users);
}

	var users = GM_getValue("users", "");
	if (users) {
	var ausers = users.split(",");
	var allElements = document.getElementsByTagName("td");
	for(var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if (thisElement.getAttribute("colspan") == 2)
		for (var j = 0; j < ausers.length; j++)
		{
		if (thisElement.textContent.toLowerCase().indexOf(ausers[j].toLowerCase()) != -1)
		{
     			thisElement.style.display = "none";
		}
		}
  	}
	}
