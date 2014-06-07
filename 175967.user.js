// ==UserScript==
// @name        Ikariam Gold Pillage Capacity
// @namespace   thanasis
// @description This script shows the gold capacity of your army when you try to pillage. Only works on war servers. Still at very early stage, could be buggy.
// @include     http://s2*.ikariam.com/*
// @grant       none
// @version     0.1.0.1
// ==/UserScript==
const INTERVAL = 500;
var resItem = null;
var initTitle;
function mainAction()
{
    var all, sum = 0;
    all = document.evaluate('//div[@class="sliderbg withButtons"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < all.snapshotLength; i++)
    {
        var id =  all.snapshotItem(i).id;
        var amount = all.snapshotItem(i).title;
        switch(id)
        {
             case "sliderbg_301": // slinger
                sum += amount * 22;
                break;
            case "sliderbg_302": // swordsman
                sum += amount * 12;
                break;
            case "sliderbg_303": // hoplite
                sum += amount * 18;
                break;
            case "sliderbg_304": // sulfur carabineer
                sum += amount * 2;
                break;
            case "sliderbg_305": // mortar
                sum += amount * 244;
                break;
            case "sliderbg_306": // catapult
                sum += amount * 70;
                break;
            case "sliderbg_307": // ram
                sum += amount * 150;
                break;
            case "sliderbg_308": // steam giant
                sum += amount * 72;
                break;
            case "sliderbg_309": // bombardier
                sum += amount * 198;
                break;
            case "sliderbg_310": // cook
                sum += amount * 150;
                break;
             case "sliderbg_311": // medic
                sum += amount * 78;
                break;
            case "sliderbg_312": // gyrocopter
                sum += amount * 109;
                break;
            case "sliderbg_313": // archer
                sum += amount * 37;
                break;
            case "sliderbg_315": // spearman
                sum += amount * 21;
                break;
        }
    }
    if (resItem == null)
    {
        resItem = document.getElementById("js_mainBoxHeaderTitle");
        initTitle = resItem.innerHTML;
    }
    if (i > 0)
        resItem.innerHTML = initTitle + " - gold pillage capacity: " + sum.toString();
	else
		resItem = null;
}
setInterval(mainAction, INTERVAL);