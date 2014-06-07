// ==UserScript==
// @name         TPB Hide seedless
// @namespace    http://www.nocrew.org/~stefan/gm/
// @description  Hides torrents without seeders
// @author       Stefan Berndtsson <stefan@nocrew.org>
// @include      http://*.thepiratebay.*/*
// @include      http://thepiratebay.*/*
// ==/UserScript==

/*
 * This is a Greasemonkey script for use with ThePirateBay.
 *
 * It adds a new link to the right on the H2-line when browsing
 * or searching, giving you the option to hide rows that has no
 * recorded seeds. Default is to show the seedless rows, and the
 * setting is stored in the GM preference 'showHide'.
 * 
 * This has been tested with Greasemonkey 0.6.4 on Firefox 1.5.0.2
 *
 */

/* LICENSE
 * Copyright (C) 2005 Stefan Berndtsson
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You can download a copy of the GNU General Public License at
 * http://www.gnu.org/licenses/gpl.txt
 * or get a free printed copy by writing to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/

function tpbHideSeedless() {
  var showTextStr = "Show seedless";
  var hideTextStr = "Hide seedless";

  function showhideLink() {
    var head2 = document.getElementsByTagName('h2')[0];
    if(!head2) { return; }

    var shLink = document.createElement('a');
    shLink.setAttribute('id', 'showHide');
    shLink.setAttribute('href', '#');
    var t = hideTextStr;
    if (hide) {
       t = showTextStr;
    }
    shLink.appendChild(document.createTextNode(t));
    head2.appendChild(shLink);
  }

  function performShowHide(hide) {
     var rows = document.getElementsByTagName('tr');
     for (i=0; i < rows.length; i++) {
        if(rows[i].childNodes.length < 14) { continue; }
        if(rows[i].childNodes[13].innerHTML == '0') {
           if (hide) {
              rows[i].style.display = 'none';
           } else {
              rows[i].style.display = 'table-row';
           }
        }
     }

     var e = document.getElementById('showHide');
     if (hide) {
        e.innerHTML = showTextStr;
     } else {
        e.innerHTML = hideTextStr;
     }
  }

  function toggleShowHide() {
     var showhide = GM_getValue('showhide', 0);
     if (!showhide) {
        GM_setValue('showhide', 1);
        return 1;
     } else {
        GM_setValue('showhide', 0);
        return 0;
     }
  }

  var hide = GM_getValue('showhide', 0);
  showhideLink(hide);
  performShowHide(hide);

  // Install click intercept
  document.addEventListener('click', function(event) {
     if (event.target.getAttribute('id') == 'showHide') {
        var value = toggleShowHide();
        performShowHide(value);
        event.stopPropagation();
        event.preventDefault();
     }
  }, true);
}

tpbHideSeedless();

