/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Petrik de Heus

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */


// ==UserScript==
// @name          Belastingdienst.nl verbeterd
// @namespace     http://deheus.net/petrik/demo/scripts/
// @description	  Maakt witte links in teksten geel
// @include       http://www.belastingdienst.nl/*
// @exclude       https://mijn.belastingdienst.nl/Webdiensten/*
// @version	      1.00
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#divContent a { color: #ff0 ! important; }');
addGlobalStyle('#divContent { background-color:#01267F ! important; }');
addGlobalStyle('p, li, h1, h2, h3, h4 { color: #fff ! important; }');