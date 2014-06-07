// ==UserScript==
// @name           Wikipedia : Inline cites faint en
// @namespace      84user
// @include        http://en.wikibooks.*/*
// @include        http://de.wikipedia.*/*
// @include        http://en.wikipedia.*/*
// @include        http://fr.wikipedia.*/*
// @include        http://it.wikipedia.*/*
// @include        http://en.wikimedia.*/*
// @include        http://en.wikiquote.*/*
// @include        http://en.wikisource.*/*
// @include        http://en.wikiversity.*/*
// @include        http://en.wiktionary.*/*
// @resource       css http://userstyles.org/styles/11804.css
// @author         84user
// @email          
// @version        1.1.1
// @copyright      84user 2008
// @license        GNU GPL
// ==/UserScript==

/********************************************************************

    Modifier's NOTE

    This script is an adaption of userscript "Wikipedia : Grey Lady en" made by hanns, in turn adapted from "Wikipedia - Grey Lady" made by chochem. Modifications made on 2008-11-04 were intended to reduce the boldness of Wikipedia's inline citations and are: added more wikipedia subdomains; replaced author "hanns" by "84user"; removed email "hanns@hanns.de"; replaced 11683.css with "11804.css"; replaced copyright "hanns" with "84user". The 11804.css itself was copied from the GFDL code posted by Wikipedia User:Mzajac.

*********************************************************************

*********************************************************************

    Author's NOTE

    This script is an adaption of "Wikipedia - Grey Lady" made by chochem

    Based on http://userstyles.org/styles/1365 (by chochem)

*********************************************************************

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

**********************************************************************/

GM_addStyle(GM_getResourceText('css'));
GM_xmlhttpRequest({
	method: "get",
	url: "http://userstyles.org/styles/11804.css",
	onload: function(e) {
		with(document.getElementsByTagName("head")[0].appendChild(h=document.createElement("style")))innerHTML=e.responseText;
	}
});