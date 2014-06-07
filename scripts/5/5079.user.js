// Kicktipp Forum Char Count user script
// version 0.1.3
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          Kicktipp Forum Char Count
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5079
// @include       http://www.kicktipp.de/*/forumsbeitraganlegen
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var para = document.evaluate('//textarea[@id="beitrag"]/ancestor::td[1]/text()',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
var parent = para.parentNode;
var newPara = document.createElement("p");
newPara.innerHTML = para.data;
parent.replaceChild(newPara, para);
var tarea = document.evaluate('//textarea[@id="beitrag"]', document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var chars;
tarea.addEventListener('keyup',
    function(event) {
        chars  = 2000 - this.value.length;
        if (chars >= 0) {
            newPara.innerHTML = "HTML ist nicht erlaubt. Obergrenze 2.000 " +
                "Zeichen (noch " + chars + " Zeichen &uuml;brig).";
        } else {
            newPara.innerHTML = "HTML ist nicht erlaubt. Obergrenze 2.000 " +
                "Zeichen <span style='color: red'>(noch " + -chars +
                " Zeichen zuviel)</span>.";
        }
    }, false // true doesn't work in Opera
);

})(); // function wrapper for Opera