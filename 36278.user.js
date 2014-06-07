// ==UserScript==
// @name           Wikipedia : Grey Lady
// @namespace      hanns
// @include        http://de.wikibooks.*/*
// @include        http://de.wikipedia.*/*
// @include        http://de.wikimedia.*/*
// @include        http://de.wikiquote.*/*
// @include        http://de.wikisource.*/*
// @include        http://de.wikiversity.*/*
// @include        http://de.wiktionary.*/*
// @resource       css http://userstyles.org/styles/11686.css
// @author         hanns
// @email          hanns@hanns.de
// @version        1.1.1
// @copyright      hanns 2008
// @license        GNU GPL
// ==/UserScript==

/**************************************************************************

    Author's NOTE

    This script is an adaption of "Wikipedia - Grey Lady" made by chochem

    Based on http://userstyles.org/styles/1365 (by chochem)

***************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

GM_addStyle(GM_getResourceText('css'));
GM_xmlhttpRequest({
	method: "get",
	url: "http://userstyles.org/styles/11686.css",
	onload: function(e) {
		with(document.getElementsByTagName("head")[0].appendChild(h=document.createElement("style")))innerHTML=e.responseText;
	}
});