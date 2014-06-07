/*
    Show group scripts in group main page on userscripts.org.
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
// @name            USO Group: Show Scripts
// @namespace       http://userstyles.org/users/12
// @description     Show group scripts in group main page
// @version         1.0
// @author          LouCypher
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/136453.meta.js
// @include         http://userscripts.org/groups/*
// @include         http://userscripts.org./groups/*
// @include         https://userscripts.org/groups/*
// @include         http://greasefire.userscripts.org/groups/*
// ==/UserScript==

(function(){ // function wrapper for Opera UserJS
  if (!/groups\/\d+$/.test(location.href)) return;
  var cnt = document.getElementById("content");
  var div = cnt.appendChild(document.createElement("div"));
  div.textContent = "Loading scripts\u2026";
  div.style.width = "100%";
  div.style.height = "80px";
  div.style.textAlign = "center";
  div.style.background = "transparent url('data:image/gif;base64,\
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\
/AGCp3QUnCB1KEECAgA7') center bottom no-repeat";

  if (typeof GM_xmlhttpRequest == "function") {
    GM_xmlhttpRequest({
      method: "GET",
      url: location.href + "/scripts?sort=updated",
      onload: function(req) {
        parseHTML(req.responseText);
      }
    })
  } else {
    var req = new XMLHttpRequest();
    req.open("GET", location.href + "/scripts?sort=updated", true);
    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        parseHTML(req.responseText);
      }
    }
    req.send(null);
  }

  function parseHTML(aString) {
    var regx = /<div id='content'>(.*)[\s\S]+<div id='right'>/g;
    var html = aString.match(regx).toString();
    html = html.replace(/(<div id='content'>|<div id='right'>)/g, "");
    html = html.replace(/h2/, "h3");
    cnt.removeChild(div);
    cnt.innerHTML += html;
  }
})()