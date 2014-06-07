// ==UserScript==
// @name           Angra Mainyu's Suspension Counter
// @namespace      BasilMarket
// @description    1.0.0.2
// @include        http://www.basilmarket.com/*
// ==/UserScript==


var moderators = new RegExp("angramainyu|eveepony|etokapa|kevvl|limusocobobo|misacorp|oocieloo|pavchka|rodoner|suama|zora|mrbasil", "i");

window.addEventListener('submit', getSuspensions, true);

if (!GM_getValue('moderator')) {
    GM_setValue('moderator', readCookie("name"));
}

if (!GM_getValue('rCounter')) {
    GM_setValue('rCounter', 0);
}
if (GM_getValue('moderator').match(moderators)) {
    document.title += (" - [" + GM_getValue('moderator') + "'s suspensions: " + GM_getValue('rCounter') + "]");
}

function getSuspensions(eventArgs) {

    var suspensions = GM_getValue('rCounter');

    if (eventArgs.target.action.match("admin_report/139")) {
        for (var rule in eventArgs.target.elements) {
            if (eventArgs.target.elements[rule].name.match("rule") && eventArgs.target.elements[rule].value > 0) {

                suspensions += 1;
            }
        }
    } else if (eventArgs.target.action.match("func-mod")) {
    	for(var del in eventArgs.target.elements) {
            if (eventArgs.target.elements[del].name.match("del") && eventArgs.target.elements[del].checked == true) {

                suspensions += 1;
            }
        }
    } else if (eventArgs.target.action.match("window-mod")) {

        suspensions += 1;
   }

    GM_setValue('rCounter', suspensions);
}

function readCookie(name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {

        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }

    return null;
}
