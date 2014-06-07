// ==UserScript==
// @name           LeakForums - Clickable Warning Level For LSx Sponsors
// @namespace      MikE/sponsorwarning
// @description    Gives you access to a wider collection of smilies to use on Leak.sx
// @author         Mike
// @copyright      Mike 2014 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see http://www.gnu.org/licenses/. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leak.sx/thread-*
// @match          *://leak.sx/thread-*
//
// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/192264.user.js
// @updateURL      https://userscripts.org/scripts/source/192264.meta.js
//
// @icon           http://www.leak.sx/images/pro_star2.png
// @icon64         http://www.leak.sx/images/pro_star2.png
//
// @history        1.0.0 - Script created
// @history        1.0.1 - Fixed.  Forgot to change to new URL format
// ==/UserScript==

(function(){var a,b;a=document.querySelectorAll("#posts>table");for(b=0;b<a.length;++b)a[b].getElementsByClassName("smalltext post_author_info")[0].innerHTML=a[b].getElementsByClassName("smalltext post_author_info")[0].innerHTML.replace(/Warning Level\: (.+)\%/g,'Warning Level: <a href="//leak.sx/warnings.php?uid='+a[b].getElementsByClassName("post_avatar")[0].getElementsByTagName("a")[0].getAttribute("href").split("user-")[1]+'">$1%</a>');}());