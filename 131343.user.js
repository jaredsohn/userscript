// ==UserScript==
// @match          http://*.deviantart.com/*
// @match          https://*.deviantart.com/*
// @name           deviantArt outgoing redirect remover
// @namespace      http://mathrick.org/da-outgoing
// @description    Remove the incredibly annoying outgoing interstitial dA wraps all external links in
// @version        0.2
// ==/UserScript==

var as = document.getElementsByTagName("a")
var rx = /^https?:\/\/(www.)?deviantart.com\/users\/outgoing\?(.*)$/;

for (var i = 0; i < as.length; i++) 
{ 
    if(as[i].href.match(rx))
        {
            as[i].href = as[i].href.replace(rx,"$2");
            console.log(as[i].href);
        }
}
 