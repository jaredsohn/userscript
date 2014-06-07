// ==UserScript==

// @name           SPON Zentrieren

// @namespace      http://joshua-jung.com

// @description    Zentriert das neue Spiegel Online (ab 18.08.2009) im Browserfenster

// @include        http://www.spiegel.de/*
// @include        https://www.spiegel.de/*

// @include        http://forum.spiegel.de/*



var spWrapper = document.getElementById('spWrapper');
var adSidebar = document.getElementById('spColumnAd');
var home = document.body;

if (adSidebar) {
   spWrapper.removeChild(adSidebar);
}

var qcTopBlocker = document.getElementById('qcTopBlocker');
if (qcTopBlocker) {
    qcTopBlocker.parentNode.removeChild(qcTopBlocker);
}

spWrapper.style.width = '900px';
spWrapper.style.maxWidth = '900px';
spWrapper.style.minWidth = '900px';
home.style.width = '900px';
home.style.position = 'absolute';
home.style.left = '50%';
home.style.marginLeft = '-450px';


// ==/UserScript==