// ==UserScript==
// @name           HackForums.net - Automatic PM Retry
// @namespace      spafic/pmretry
// @description    Automatically sends a PM after the cooldown timer reaches 0.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/private.php
// @version 	   1.0.1
//
// @downloadURL    https://userscripts.org/scripts/source/152095.user.js
// @updateURL      https://userscripts.org/scripts/source/152095.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
//
// @history        1.0.0 - Script created
// @history        1.0.1 - Script compressed
//
// ==/UserScript==

(function(){var a,b;a=document.getElementsByClassName(String.fromCharCode(101,114,114,111,114))[0].innerHTML.toString().match(/wait (.*?) more/)[1];b=document.getElementsByName(String.fromCharCode(115,117,98,109,105,116))[0];setTimeout(function(){b.click()},1E3*a)})();