// ==UserScript==
// @name           Enable Windows Live Space Media Player
// @namespace      http://spirit.jay.blog.163.com
// @description    This script enables the Windows Media Player in any MSN spaces page
// @include        http://*.spaces.live.com/*
// @version        1.2
// @changelog      1.1 fixed index of "document.styleSheets": 0->9 
//                 1.2 9->7

// ==/UserScript==
//Notice:
//For this funtion to work,it is necessary to pre-install another firefox add-on which named "MediaWrap",here is the link:"https://addons.mozilla.org/zh-CN/firefox/addon/1879"

var anonymousStyleSheet = document.styleSheets[7];
var rules = anonymousStyleSheet.rules?anonymousStyleSheet.rules:anonymousStyleSheet.cssRules;

for(var i=0; i<rules.length; i++) {
  if(rules[i].selectorText=="spaces:widget#WMP, div#WMP")
    rules[i].style.display="block";
}