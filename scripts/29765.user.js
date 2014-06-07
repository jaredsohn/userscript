// version 0.1 BETA
// 2008-07-07
// Copyright (c) 2008, Michael Wise, Weezilla
// Please contact for rights or contributions to script
// weezilla@gmail.com
// Big thanks to ecmanaut of #greasemonkey at irc.freenode.net --
// this script would have taken 6 times as long to write.
//
// Usage: This uses firefox and greasemonkey. Greasemonkey is a java based script
// utility designed to streamline internet browsing with firefox. Greasemonkey is a plugin
// for firefox. Please download it at https://addons.mozilla.org/en-US/firefox/addon/748
// A Firefox restart is required. 
//
// Once installed, use firefox to open the file eqlinks.user.js
// (Press CTRL-O while in firefox and browse for eqlinks.user.js)
// Finally, use allakhazam as normal ! The text "Recipe list - Premium only" will be replaced
// with a link to that item on www.eqtraders.com
//
//
// Finally, if you didn't get this file from www.netsflaw.com, please uninstall it and go to
// www.netsflaw.com/freeware/eqlinks.zip, as it may be unsafe !
//
// ==UserScript==
// @name          eqlinks
// @namespace     http://netsflaw.com/freeware/
// @description   This script automatically links to EQtraders on allakhazam
// @include       http://everquest.allakhazam.com/*
// @require       http://netsflaw.com/$x$X.js
// ==/UserScript==

var premium = $X('id("srec")/../text()[.="Recipe list - Premium only."]');
var name = $X('id("wwrap")//tr[@class="headerrow"]/td/text()').nodeValue.match(/\S.*\S/)[0];
var a = document.createElement("a"); a.href = 'http://eqtraders.com/search/search.php?min=0&hits=0&menustr=035000000000&submit=find&data[item]='+ encodeURIComponent(name); a.textContent = name + " on eqtraders";
premium.parentNode.replaceChild(a, premium);