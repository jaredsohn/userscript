// ==UserScript==
// @name           Mafia Wars Feed
// @copyright      Mafia Wars Malaysia
// @description    Mafia Wars Feed Bookmark On FB/Timeline
// @icon           http://lockupmwm.webs.com/gambor/mwmsmall1.png
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*apps.facebook.com/*
// @version        Aingah Roroz.〤
// ==/UserScript==

//$Id: mwunframefb.js,v Mat Kie.〤 2012-12-04 06:30:11 matkie

var y=document.getElementById("pageNav");y.innerHTML+='<li id="extra_toplinks_holder" class="navItem middleItem"><a href="https://www.facebook.com/?sk=app_10979261223" target="_blank" class="navLink bigPadding" style="padding-left: 0px; padding-right: 8px;">Mafia Feed</a></li>';var x=document.getElementById("extra_toplinks_holder");var t=x.getElementsByTagName("a")[0];t.setAttribute(".submit();")