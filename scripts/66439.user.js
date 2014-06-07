// ==UserScript==
// @name           Neopets: Total Adremover
// @description    Removes almost all ads at neopets.com.
// @include        http://*.neopets.com/*
// @version				 2.0
// ==/UserScript==

try {var brandmamabar = document.getElementsByClassName('brand-mamabar');
 brandmamabar[0].parentNode.removeChild(brandmamabar[0]);}catch(err){};
 
try {var pushdown_banner = document.getElementById('pushdown_banner');
 pushdown_banner.parentNode.removeChild(pushdown_banner);}catch(err){};
 
try {var adboxsf = document.getElementsByClassName('adBox sf');
 adboxsf[0].parentNode.removeChild(adboxsf[0]);}catch(err){};
 
try {var ad_wrapper_fixed = document.getElementsByClassName('ad_wrapper_fixed');
 ad_wrapper_fixed[0].parentNode.removeChild(ad_wrapper_fixed[0]);}catch(err){};
 
try {var phpGamesTowerAd = document.getElementsByClassName('phpGamesTowerAd');
 phpGamesTowerAd[0].parentNode.removeChild(phpGamesTowerAd[0]);}catch(err){};

var css = '.contentModule.phpGamesNonPortalView{width:804px !important;}';
var head = document.getElementsByTagName('head');
var node = document.createElement('style');
node.type = 'text/css';
node.innerHTML = css;
head[0].appendChild(node);