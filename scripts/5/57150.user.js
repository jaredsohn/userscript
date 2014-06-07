// ==UserScript==
// @name           Vote every 30 minutes
// @namespace      www.amlw.com
// @include        http://weareaustin.keyetv.com/*
// @include        http://weareaustin.tv/*
// ==/UserScript==

function eventClickOn() {
    document.getElementById("p14").checked=true;
    var evt = document.createEvent("HTMLEvents");
    var link = document.getElementById("task_button");
    evt.initEvent("click", true, true);
    link.dispatchEvent(evt);
}

function testForNinjaAttack() {
    if (window.find('You already voted for that poll', false, false)) {
        setTimeout(function() { document.location.reload(); } , 1000);
    }
}

window.setTimeout(eventClickOn, 1800000);
window.setTimeout(testForNinjaAttack, 6000);

delCookie("ec88f6924d20070e4b07a5ca10cad5e0");
delCookie("__utma");
delCookie("__utmb");
delCookie("__utmc");
delCookie("__utmz");
delCookie("voted2");
delCookie("ec88f6924d20070e4b07a5ca10cad5e0");
delCookie("__utma");
delCookie("__utmb");
delCookie("__utmc");
delCookie("__utmz");
delCookie("voted2");


function delCookie(name) {	
document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/";	
}	
