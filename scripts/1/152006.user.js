 	// ==UserScript==
// @name          Exclude All iFrames
// @namespace     http://sixside.com/
// @description   This script hides all the iframes on a website
// ==/UserScript==

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var first = getUrlVars()["i"];
var second = getUrlVars()["page"];
// document.getElementById("ifr").src="http://offer.ebay.com/ws/eBayISAPI.dll?BinConfirm&item="+first+"&quantity=1";
var alliFrames, thisiFrame;
alliFrames = document.getElementsByTagName('iframe');
for (var i = 0; i < alliFrames.length; i++) {
    thisiFrame = alliFrames[i];
    // do something with iFrame
	thisiFrame.src = "http://offer.ebay.com/ws/eBayISAPI.dll?BinConfirm&item="+first+"&quantity=1";


}