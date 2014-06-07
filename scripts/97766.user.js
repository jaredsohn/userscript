// ==UserScript==
// @name           Orkut Link Redirect
// @namespace      http://userscripts.org/
// @include        http://www.orkut.com*/Interstitial?u=*
// @author	       Luis Felipe Zaguini Nunes Ferreira
// @orkutUID  	   http://www.orkut.com.br/Main#Profile?uid=14158628203739064351
// @twitter	       @davegrohl_
// ==/UserScript==

pega = location.href.match(/u=(.+)\&t=/);
window.location = pega[1];