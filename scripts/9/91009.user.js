/* No Ads in http://fakebook.org/
 * based on 'No Ads in LJ' by Serguei Trouchelle (http://trouchelle.com/)
 */

// ==UserScript==
// @name        No Ads in http://fakebook.org/
// @description Remove http://fakebook.org/ ads
// @version     1.1
// @include     http://fakebook.org/*
// ==/UserScript==

function RemoveAds() {
  var head = document.getElementsByTagName('head')[0];
  if (!head) { return; };
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = ' .ad_box, #banner1, #banner2 { display: none ! important; }';
  head.appendChild(style);
}

function RemoveHelpLink() {
  var sidebar = document.getElementById('sideBar');
  var regexp = /<script.*?src="http://fakebook.net/in.cgi[^"]+">(.*?)<\/script>/g
  sidebar.innerHTML = sidebar.innerHTML.replace(regexp, "");
}

RemoveAds();
RemoveHelpLink();