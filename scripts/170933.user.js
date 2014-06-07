// ==UserScript==
// @name           LeakForums - Scrollbar Fix
// @namespace      DeNial/scrollbar
// @description    Allows horizontal scrolling on LeakForums.org
// @author         DeNial
// @copyright      Mike 2013 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see http://www.gnu.org/licenses/. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/*
// @match          *://leakforums.org/*
//
// @version        1.0
// @downloadURL    https://userscripts.org/scripts/source/170933.user.js
// @updateURL      https://userscripts.org/scripts/source/170933.meta.js
//
// @icon           http://www.leakforums.org/images/pro_star2.png
// @icon64         http://www.leakforums.org/images/pro_star2.png
// @history        1.0.0 - Script created
// ==/UserScript==

(function() {
	document.body.setAttribute("style","overflow-x: auto");
})();