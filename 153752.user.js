/*
    ERROR: McKayla is not impressed!
    Show 'McKayla is not impressed' image on Firefox error page.
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name            ERROR: McKayla is not impressed!
// @namespace       http://userscripts.org/users/12
// @description     Show 'McKayla is not impressed' image on Firefox error page.
// @version         1.0
// @author          LouCypher
// @license         GPL
// @icon            https://lh4.googleusercontent.com/-IKe4ZFDgZEM/UMORs0PJ8oI/AAAAAAAAC-o/6Glt50oL4Pw/s0/error-mckayla-icon.png
// @screenshot      https://lh4.googleusercontent.com/-pm9icNNEJRQ/UMOQtTtv0_I/AAAAAAAAC-g/8tnpnpwUx84/s640/error-mckayla.png
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/error-mckayla
// @downloadURL     https://userscripts.org/scripts/source/153752.user.js
// @updateURL       https://userscripts.org/scripts/source/153752.meta.js
// @resource        css https://raw.github.com/LouCypher/userscripts/master/error-mckayla/error-mckayla.css
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         *
// @run-at          document-start
// @grant           GM_addStyle
// @grant           GM_getResourceText
// ==/UserScript==

if (!/^about:neterror/.test(document.URL)) return;

document.addEventListener("DOMContentLoaded", function(e) {
  GM_addStyle(GM_getResourceText("css"));
  document.title += ". McKayla is not impressed!";

  var titleText = document.getElementById("errorTitleText")
  titleText.textContent += ".";
  titleText.appendChild(document.createElement("br"));
  titleText.appendChild(document.createTextNode("McKayla is not impressed!"));

  var list = document.createElement("li");
  list.textContent = "Impress McKayla. Give her a gold medal.";
  document.querySelector("#errorLongDesc > ul").appendChild(list);
}, false);