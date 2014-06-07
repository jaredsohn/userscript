// ==UserScript==
// @name           Mafia Wars New Tab Unframe
// @copyright      Mafia Wars Malaysia
// @description    Mafia Wars Unframe BM On FB Bar(Open In New Tab with Spockon.me/HappyPlacev2/UnlockedMW)
// @icon           http://lockupmwm.webs.com/gambor/mwmsmall1.png
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*apps.facebook.com/*
// @version        Mat Kie.〤
// ==/UserScript==

/*
$Id: mwunframefb.js,v Mat Kie.〤 2012-12-04 06:30:11 matkie
    Credits:
    Spockholm. http://www.spockholm.com/mafia/bookmarklets.php
    Lucifer. http://screepts.com/
*/
var y=document.getElementById("pageNav");y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="http://spockon.me/unframed/" target="_blank" class="navLink bigPadding" style="padding-left: 0px; padding-right: 8px;">Spockholm</a></li>';y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="http://facebook.mafiawars.zynga.com/mwfb/index.php?skip_req_frame=1&mwcom=1" target="_blank" class="navLink bigPadding" style="padding-left: 10px; padding-right: 10px;">Zynga</a></li>';y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="http://mwscripts.com/happyplace" target="_blank" class="navLink bigPadding" style="padding-left: 12px; padding-right: 12px;">HappyPlace</a></li>';var x=document.getElementById("extra_toplinks_holder");var t=x.getElementsByTagName("a")[0];t.setAttribute(".submit();")