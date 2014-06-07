// ==UserScript==
// @name           Twitter Tweaks 2014
// @namespace      http://handscomb.me.uk
// @description    Flip content and 'dashboard', reduce impact of Feb 2014 changes
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @grant          none
// ==/UserScript==
var bjhNewStyle = document.createElement('style');
bjhNewStyle.type = 'text/css';
bjhNewStyle.innerHTML = '.dashboard{float:right!important;}.content-main,.profile-card{float:left!important;}#suggested-users{clear:none!important;float:right!important;}.global-nav-inner{background:#000!important;width:890px!important;margin-left:auto!important;margin-right:auto!important;border-radius:6px!important;}.global-nav{border-bottom:none!important;}.topbar{border-bottom:none!important;}ul.nav li{color:#ccc!important;}.nav.right-actions>li>a,.nav.right-actions>li>button{opacity:1!important;}';
document.getElementsByTagName('head')[0].appendChild(bjhNewStyle);