// ==UserScript==
// @name        Clicker to arena
// @namespace   http://userscripts.org/
// @include     http://www.neopets.com/dome/
// @include     http://www.neopets.com/dome/fight.phtml
// @version     1
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// ==/UserScript==

var random = rand(0, 1200);

var Battle = document.getElementById("bdHomeUpperBattle");
//GM_log(Battle);

if (Battle != null)
{
Battle.click();
sleep(300 + rand(-25, 300));
}
else
{
GM_log("null detected");

 setTimeout(function() { document.getElementsByClassName("nextStep")[0].click(); }, 200 + random);
 setTimeout(function() { document.getElementsByClassName("nextStep")[0].click(); }, 500 + rand(-25, 300));
 setTimeout(function() { document.getElementsByClassName("tough tough1")[0].click(); }, 500 + rand(-25, 300));
 sleep(300 + rand(-25, 300));
 setTimeout(function() { document.getElementById("bdFightStep3FightButton").click(); }, 300 + random);
}



function rand(min, max)
{
    return Math.floor((Math.random() * max) + min);
}

function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}