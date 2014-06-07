// ==UserScript==
// @name           LeakForums - All Thread Prefixes
// @namespace      DeNial/prefix
// @description    Tehe.  Prefix!
// @author         DeNial
// @copyright      DeNial 2013 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/editpost.php*
// @match          *://leakforums.org/editpost.php*
// @match          *://*.leakforums.org/newthread.php*
// @match          *://leakforums.org/newthread.php*
//
// @version        1.0
// @downloadURL    https://userscripts.org/scripts/source/175642.user.js
// @updateURL      https://userscripts.org/scripts/source/175642.meta.js
//
// @icon           http://www.leakforums.org/images/pro_star2.png
// @icon64         http://www.leakforums.org/images/pro_star2.png
// ==/UserScript==

(function() {
	var prefixes = document.getElementsByName("threadprefix")[0];
    prefixes.innerHTML = '<option value="0">No Prefix</option>' +
    					 '<option value="1">Leak</option>' +
    					 '<option value="2">Elite</option>' +
    					 '<option value="3">AW3SOM3</option>' +
    					 '<option value="4">Release</option>' +
    					 '<option value="5">Buy</option>' +
    					 '<option value="6">Sell</option>' +
    					 '<option value="7">Suggestion</option>' +
    					 '<option value="8">Feedback</option>' +
    					 '<option value="9">NSFW</option>' +
    					 '<option value="10">Sponsor</option>' +
    					 '<option value="11">HF</option>' +
    					 '<option value="12">TTG</option>' +
    					 '<option value="13">Greed</option>' +
					 '<option value="14">Franchise</option>' +
					 '<option value="15">Nigger</option>';
})();