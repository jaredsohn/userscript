// ==UserScript==
// @name           OnlySimchas Clean
// @namespace      microalps
// @description    OnlySimchas.com Cleaned
// @include        http://onlysimchas.com/*
// @include        http://www.onlysimchas.com/*
// ==/UserScript==


//Apply CSS
styleCode=".toplinks { width: auto !important; height: auto !important; border: none !important; text-align: right !important; } \n";
styleCode+=".toplinks a { display: inline !important; height: auto !important; }\n";
styleCode+=".BannerContainer { display: none !important; }\n";
GM_addStyle(styleCode)

//Apply JSS
var toplinks = document.getElementsByClassName("toplinks")[0];
var toplinksTable1 = toplinks.parentNode.parentNode.parentNode.parentNode;
toplinksTable1.style.width = "100%";
var toplinksTable2Td = toplinksTable1.parentNode.parentNode;
toplinksTable2Td.style.width = "100%";
var toplinksTable2 = toplinksTable2Td.parentNode.parentNode;
toplinksTable2.getElementsByTagName("td")[0].style.display = 'none';
toplinksTable2.style.width = "100%";
