// ==UserScript==
// @name           PartnerConnect
// @namespace      http://userscripts.org/users/jchamber1
// @include        https://w3.ibm.com/connections/*
// ==/UserScript==
// 
addClicks();

function addClicks()
{
    var aEl, aEls = document.getElementsByTagName('a');
    for (var i=0, len=aEls.length; i<len; ++i){
        aEl = aEls[i];
        aEl.href = aEl.href.replace('https:\/\/w3.ibm.com\/connections','https://partnerconnect.b2b.pok.ibm.com/w3_s/connections');
    }
}
