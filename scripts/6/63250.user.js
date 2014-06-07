// Unicode 5.1 To Zawgyi 2009
// version 1.3.1
// 2009-11-30
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "onthefly", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Unicode 5.1 To Zawgyi 2009
// @namespace     http://hahauni.zawgyi.info
// @description   Unicode 5.1 To Zawgyi
// @include       http://my.wikipedia.org/wiki/*
// @include       http://mmfreethinker.wordpress.com/*
// @exclude       
// ==/UserScript==
//window.location.href = "http://hahauni.zawgyi.info/index.php?q="+window.location.href;

document.body.innerHTML=document.body.innerHTML.replace(/ဿ/g,'သဿသ').replace(/္/g,'ဿ').replace(/်/g,'္').replace(/ျ/g,'်').replace(/ြ/g,'ျ').replace(/ွ/g,'ြ').replace(/ှ/g,'ွ').replace(/င္ဿ([က-အ])/g,'$1ဿင').replace(/([က-အ](?:ဿ[က-အ])?)ျ/g,'ျ$1').replace(/(ျ?[က-အ](?:ဿ[က-အ])?[်ြွ]*)ေ/g,'ေ$1').replace(/(?:Myanmar[23]|PadaukO?T?|Parabaik|MyMyanmar\ Unicode)/g,'Zawgyi-One');void(0);