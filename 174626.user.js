// ==UserScript==
// @name       Badge Market Link
// @namespace  http://ehsankia.com
// @version    0.1
// @description  Adds market links to the Steam Badge Page
// @match      http://steamcommunity.com/id/*/gamecards/*
// @copyright  2012+, Ehsan Kia
// ==/UserScript==

var names = document.querySelectorAll('.badge_card_set_card > div:nth-child(2)');
var places = document.querySelectorAll('.badge_card_set_card > div:nth-child(3)');
var appid = document.location.pathname.match(/\/gamecards\/(\d+?)\//)[1];
var MARKET_BASE = "http://steamcommunity.com/market/listings/753/";

for (var i=0; i<names.length; i++){
    var url = MARKET_BASE + appid + "-" + getTextNode(names[i]);
    var d = document.createElement('div');
    d.classList.add('badge_card_set_text_qty');
    d.innerHTML = "<a href='" + url + "'>Market Link</a>";
    places[i].appendChild(d);
}

function getTextNode(e){
    for (var i=0; i<e.childNodes.length; i++){
        if (e.childNodes[i].nodeType == e.TEXT_NODE){
            var text = e.childNodes[i].textContent.trim();
            if (text) return text;
        }        
    }
}