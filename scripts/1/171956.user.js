// ==UserScript==
// @name        Steam Community - Remove potential unsafe URL dialog box
// @namespace   http://mave.me/
// @include     http://steamcommunity.com/*
// @include     https://steamcommunity.com/*
// @version     1
// ==/UserScript==


function AlertNonSteamSite( elem )
	{
		return false;
	}
	
var links = document.body.querySelectorAll("a.bb_link");
for(var i=0;i<links.length;i++)
{
    links[i].setAttribute ("onclick", null);
}
function embedFunction(s) {
document.body.appendChild(document.createElement('script'))
.innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(AlertNonSteamSite);