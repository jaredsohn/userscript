// ==UserScript==
// @name           HackForums.net - Quick Page Navigation
// @namespace      spafic/quickpagenav
// @description    Allows the viewer to use the left and right arrow keys to change pages and the up and down arrow keys to scroll between posts.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?tid=*
// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/138506.user.js
// @updateURL      https://userscripts.org/scripts/source/138506.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Fixed a minor bug.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        https://raw.github.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js
// @require        https://raw.github.com/balupton/jquery-scrollto/master/scripts/jquery.scrollto.js
// ==/UserScript==

(function(){function g(){var a={};window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(c,b,d){a[b]=d});return a}var h,i,c,b,d,e,j,f,a,k;h=window.location.toString().split(/\?/)[0];i=g().tid;c="undefined"==typeof g().page?1:parseInt(g().page);"undefined"!=typeof document.getElementsByClassName("pages")[0]&&(k=document.getElementsByClassName("pages")[0].innerHTML.toString().match(/\d\d?\d?/));d=document.getElementById("posts").getElementsByTagName("table");e=[];for(a=j=0;a<d.length;a++)null!=d[a].getAttribute("id")&&-1!=d[a].getAttribute("id").indexOf("post_")&&(e[j]=d[a],j++);for(a=0;a<e.length;a++)e[a].setAttribute("name","post_"+(a+1));$(document).ready(function(){b=0;$(document).bind("keydown","left",function(){1<c&&(c-=1,window.location=h+"?tid="+i+"&page="+c);return!1});$(document).bind("keydown","right",function(){k>c&&(c+=1,window.location=h+"?tid="+i+"&page="+c);return!1});$(document).bind("keydown","down",function(){b<e.length&&(b+=1,f=document.getElementsByName("post_"+b)[0],$(f).ScrollTo());return!1});$(document).bind("keydown","up",function(){1!=b&&(b-=1,f=document.getElementsByName("post_"+b)[0],$(f).ScrollTo());return!1})})})();