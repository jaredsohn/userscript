/*
    Add Tumview.com link on Tumblr sites and vice versa.
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
// @name            Tumblr Tumview Linker
// @namespace       http://userscripts.org/users/12
// @description     Add Tumview.com link on Tumblr sites and vice versa.
// @version         4.1
// @author          LouCypher
// @license         GPL
// @homepageURL     https://userscripts.org/scripts/show/158464
// @downloadURL     https://userscripts.org/scripts/source/158464.user.js
// @updateURL       https://userscripts.org/scripts/source/158464.meta.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.changelog.txt
// @include         *
// @grant           none
// ==/UserScript==

(function() {
  if (window.top === window.self) {
    var tumblr = document.getElementById("tumblr_controls");
    if (!tumblr) return;
    tumblr.removeAttribute("width");
    tumblr.removeAttribute("height");
    /*tumblr.style.setProperty("width", "500px", "important");
    tumblr.style.setProperty("height", "auto", "important");*/
    if (getComputedStyle(tumblr, null).display === "none") {
      tumblr.style.setProperty("display", "block", "important");
    }
    return;
  }

  var url = location.href;
  var name, tmvLink;

  if (/(www|assets).tumblr.com\/((dashboard|assets\/html)\/)?iframe/.test(url)) {
    name = getName(/&name=[A-Za-z0-9_-]+/);
    if (!name) return;
    tmvLink = addLink("Tumview", "http://tumview.com/" + name);
    tmvLink.title = "View photos from this site on Tumview.com";

    var bodyClasses = document.body.classList;
    var parent;
    if (bodyClasses.contains("version_card")) {
      parent = $("#btn_tray .btn_tray_bottom");
      parent.appendChild(tmvLink);
      $("a.last", parent).classList.remove("last");
      tmvLink.className = "chrome last";
      tmvLink.style.backgroundColor = "#273f3d";
    } else {
      tmvLink.className = "btn";
      parent = $("div.iframe_controls");
      if (bodyClasses.contains("logged_in")) {
        parent.appendChild(tmvLink);
      } else {
        parent.insertBefore(tmvLink, $("#btn_join", parent));
        tmvLink.className = "btn button";
        tmvLink.style.cssFloat = "right";
      }
    }

  } else if (/tumview.com\/assets\/top.php/.test(url)) {
    name = getName(/&pagename=[A-Za-z0-9_-]+/);
    if (!name) return;
    var title = $("#left > h1");
    if (!title) return;
    tmvLink = addLink("Tumblr", "http://" + name + ".tumblr.com/");
    title.appendChild(document.createTextNode("@"));
    title.appendChild(tmvLink);
    var tag = getName(/&tag=[A-Za-z0-9_-]+/);
    if (tag) tmvLink.href += "tagged/" + tag;
  }

  function getName(aRexExp) {
    var name = location.href.match(aRexExp);
    if (!name) return null;
    return name.toString().split("=")[1];
  }

  function addLink(aText, aURL) {
    var link = document.createElement("a");
    link.textContent = aText;
    link.href = aURL;
    link.target = "_top";
    return link;
  }

  function $(aSelector, aNode) {
    return (aNode || document).querySelector(aSelector);
  }

})()
