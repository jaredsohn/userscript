// ==UserScript==
// @name           Princess Novie FB Menu Unframe
// @copyright      Princess Novie
// @description    Mafia Wars Unframe On FB Bar with Zinga, Spockholm & Lucifer HappyPlace
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*apps.facebook.com/*
// @version        1.0.0
// ==/UserScript==

var y=document.getElementById("pageNav");y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="http://facebook.mafiawars.zynga.com/mwfb/index.php?skip_req_frame=1&mwcom=1" target="_blank" class="navLink bigPadding" style="padding-left: 0px; padding-right: 8px;">Zynga</a></li>';y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="http://spockon.me/unframed/" target="_blank" class="navLink bigPadding" style="padding-left: 10px; padding-right: 10px;">SPOCKHOLM</a></li>';y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="http://mwscripts.com/happyplace" target="_blank" class="navLink bigPadding" style="padding-left: 12px; padding-right: 12px;">LUCIFER</a></li>';var x=document.getElementById("extra_toplinks_holder");var t=x.getElementsByTagName("a")[0];t.setAttribute(".submit();")