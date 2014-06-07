// ==UserScript== 
// @name          XING Quick Links
// @version       0.1
// @date          20014-01-17
// @description	  adds handy links to the top of the XING page
// @author        Stefan Schiedermaier, sschiedermaier@factory42.com
// @include       https://*.xing.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
// The customhtml holds the links, feel free to edit/expand to your liking

// removed background background: #FFFFFF; (20.6.13, sts)

if (window.top != window.self)  //don't run on frames or iframes
{
    return;
}

// salesforce blue = #1797C0
// dark grey = #999999  - works for most Apps

var customhtml = "<div class=\"messages\" style=\"position: absolute; top: 10px; left: 560px; color: #999999; \">&nbsp;" + 
    "<a href=\"/app/search?op=agents&dpt=sysm&ttp=mail&plf=own&pid=search-agent-ra&xtr=lnk">Search Agents</a> | " +
    "&nbsp;</div>";

var allspans = new Array();

allspans = document.getElementsByClassName('left');
if (allspans.length == 0) {
    allspans = document.getElementsByClassName('zen-navViaSearch');
}
allspans[0].innerHTML += customhtml;