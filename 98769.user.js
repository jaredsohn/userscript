// ==UserScript==
// @name           HiddenBelowNeopetsDailes
// @namespace      http://hiddenbelow.110mb.com/
// @description    Does dailies in neopets. Sign up at hiddenbelow for more great programs!
// @include        http://txtup.co/rAnbk
// @include        http://hiddenbelow.110mb.com/DailiesRepeat.txt
// @language       english
// @author         XC - Credits to Fexxel
// @version        1.0.3
// ==/UserScript==

//Original Script is done by fexxel here (http://userscripts.org/scripts/show/52005)
//go to www.hiddenbelow.com for more guides, scripts and programs!

//Changes
// 1.0.1 Added links for apple bobbing and wheel of extravagance
// 1.0.2 Added in lab, comment out monotony
// 1.0.3 Added new daily for krawk n buried treasure

//The links below is for once a day only.. Feel free to edit it to your liking

if (document.body.innerHTML.indexOf('Running only once a day!') != -1)
{

GM_openInTab("http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes")
GM_openInTab("http://www.neopets.com/prehistoric/omelette.phtml?type=get_omelette");
GM_openInTab("http://www.neopets.com/jelly/jelly.phtml?type=get_jelly");
GM_openInTab("http://www.neopets.com/desert/fruitmachine2.phtml");
GM_openInTab("http://www.neopets.com/faerieland/springs.phtml?type=heal");
GM_openInTab("http://www.neopets.com/water/fishing.phtml?go_fish=1");
GM_openInTab("http://www.neopets.com/worlds/geraptiku/process_tomb.phtml");
GM_openInTab("http://www.neopets.com/faerieland/wheel.phtml");
GM_openInTab("http://www.neopets.com/desert/shrine.phtml?type=approach");
GM_openInTab("http://www.neopets.com/petpetpark/daily.phtml");
GM_openInTab("http://www.neopets.com/prehistoric/mediocrity.phtml");
GM_openInTab("http://www.neopets.com/lab2.phtml");
// GM_openInTab("http://www.neopets.com/prehistoric/monotony/monotony.phtml");
GM_openInTab("http://www.neopets.com/faerieland/tdmbgpop.phtml");
GM_openInTab("http://ncmall.neopets.com/mall/shop.phtml?page=giveaway");
GM_openInTab("http://www.neopets.com/medieval/knowledge.phtml");
GM_openInTab("http://www.neopets.com/island/tombola.phtml");
GM_openInTab("http://www.neopets.com/halloween/applebobbing.phtml?bobbing=1");
GM_openInTab("http://www.neopets.com/desert/extravagance.phtml");
GM_openInTab("http://www.neopets.com/games/play.phtml?game_id=983&size=regular&quality=low");
GM_openInTab("http://www.neopets.com/pirates/anchormanagement.phtml");
}

//The links below is for the links that u might do a few times a day
else
{
GM_openInTab("http://www.neopets.com/faerieland/springs.phtml?type=heal");
GM_openInTab("http://www.neopets.com/prehistoric/mediocrity.phtml");
GM_openInTab("http://www.neopets.com/faerieland/wheel.phtml");
GM_openInTab("http://www.neopets.com/winter/kiosk.phtml");
GM_openInTab("http://www.neopets.com/pirates/buriedtreasure/index.phtml");
}