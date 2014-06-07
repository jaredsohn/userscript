// ==UserScript==
// @name           HackForums.net - Hide Thread Ratings
// @namespace      spafic/noratings
// @description    Hides the star ratings for every thread in every section.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/forumdisplay.php?*
// @match          *://*.hackforums.net/showthread.php?*
// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/150714.user.js
// @updateURL      https://userscripts.org/scripts/source/150714.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Fixed a small bug
// ==/UserScript==

(function(){var b,a;if(-1==window.location.toString().indexOf("showthread")){b=document.getElementsByClassName("tcat");for(a=0;a<b.length;a++)if(-1!=b[a].textContent.indexOf("Rating")){b[a].style.display="none";break}b=document.getElementsByClassName("star_rating");for(a=0;a<b.length;a++)b[a].parentNode.style.display="none"}else document.getElementsByClassName("inline_rating")[0].parentNode.style.display="none"})();