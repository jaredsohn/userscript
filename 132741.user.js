// ==UserScript==
// @name           HackForums.net - RepsGiven Page Fix
// @namespace      spafic/repsgivenfix
// @description    Fixes a bug on the RepsGiven page.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/repsgiven.php*
// @version        1.0.2
// @downloadURL    https://userscripts.org/scripts/source/132741.user.js
// @updateURL      https://userscripts.org/scripts/source/132741.meta.js
//
// @icon         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64       http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history      1.0.0 - Script created
// @history      1.0.1 - Compressed script
// @history      1.0.2 - Added more data to the metadata
// ==/UserScript==

(function(){var b,c,a;b=document.getElementsByClassName("smalltext")[0].getElementsByTagName("a");for(a=0;a<b.length;a++)c=b[a].href,c=c.replace("reputation.php","repsgiven.php"),b[a].href=c})();