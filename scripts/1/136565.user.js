// ==UserScript==
// @name           Subeta Wizard Quest Search Popups (fix)
// @namespace      Kairus
// @description    A revision of Shaun Dreclin's script, fixed for 20/6/12.
// @include        *subeta.net/explore/wizard_quests.php*
// ==/UserScript==

if(document.getElementsByTagName('body')[0].innerHTML.indexOf("Thank You!") == -1) {
    for(i in document.getElementsByTagName('img')) {
        try {
            if(document.getElementsByTagName('img')[i].id != "" && document.getElementsByTagName('img')[i].id != undefined) {
                window.open("http://subeta.net/ushop.php?act=dosearch&itemname=" + document.getElementsByTagName('img')[i].id+"&type=shops", String(Math.floor(Math.random()*1001)));
				
            } else { continue; }
        } catch(e) { }
    }
}