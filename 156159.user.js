// ==UserScript==
// @name        Disable Autoplaying Youtube Advertisements on JustDial
// @namespace   http://www.justdial.com
// @description Removes annoying advertisements.
// @include     *.justdial.com/*
// ==/UserScript==

var yt_iframe = document.getElementById('adif');
var parent = yt_iframe.parentNode;
parent.removeChild(yt_iframe);

var ad_tabs = document.getElementsByClassName('jad');
for(i=0; i<ad_tabs.length; i++){
    ad_tab = ad_tabs[i];
    ad_tab.parentNode.removeChild(ad_tab);
}
