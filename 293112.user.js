// ==UserScript==
// @name          Make Sponsored Ads More Visible On Google
// @version    	  1.5 (21-02-2014)
// @author        Pais Ionut (paisionut.com)
// @namespace     http://paisionut.com
// @description   The pale yellow color scheme on Google top ads is barely identifiable on some monitors. It fooled me on many occasions into clicking ads. How annoying. This script makes ads visible. 
// @copyright  	  2014+, paisionut.com
// @include       http://*google.*/*
// @include       https://*google.*/*
// @updateURL     http://userscripts.org/scripts/source/293112.user.js
// ==/UserScript==
function adsview(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
adsview('#tads, #tadsb {background-color: #fff !important;}');
adsview('#mbEnd h3,#tads h3{color:#4385f5 !important;}');
adsview('#mbEnd h3 > a:link, #tads h3 > a:link, li.ads-ad h3 > a {
{color:#4385f5 !important;text-decoration:none !important;border-bottom:1px solid #f5b400 !important;}');
adsview('#mbEnd .ads-ad,#tads .ads-ad,#tadsb .ads-ad {color:#333333 !important;border:1px solid #ed9c98 !important;margin:10px 5px 5px 0px !important;padding:10px 10px 10px 10px !important;}');
adsview('#mbEnd .ads-ad:hover,#tads:hover .ads-ad:hover,#tadsb .ads-ad:hover{color:#333333 !important;border:1px solid #a0c2ff !important;margin:10px 5px 5px 0px !important;padding:10px 10px 10px 10px !important;-moz-box-shadow:0 0 5px rgba(0,0,0,0.2) !important;-webkit-box-shadow:0 0 5px rgba(0,0,0,0.2) !important;box-shadow:0 0 5px rgba(0,0,0,0.2) !important;background-color:#fbfbfb !important;cursor:pointer !important;}');
adsview('#center_col .ads-visurl{color:#109d59 !important;}');
adsview('#center_col ._p{color:#000 !important;}');
adsview('#center_col ._je,#center_col ._t{background-color:#fff !important;color:#333333 !important;margin-left:-7px !important;padding-left:10px !important;}');
adsview('#center_col ._je>b,#center_col ._je span b{color:#333333 !important;}');
adsview('#center_col ._p a{color:#3366cc !important;}');
adsview('.ac.ads-creative{color:#dc4437 !important;}');