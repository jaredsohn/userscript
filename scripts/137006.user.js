/*
    Add Pinterest button on wallpaperfox.com
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
// @name          Wallpaperfox.com - Add Pinterest button
// @namespace     http://userstyles.org/users/12
// @version       1.0
// @author        LouCypher
// @license       GPL
// @updateURL     https://userscripts.org/scripts/source/137006.meta.js
// @include       http://www.wallpaperfox.com/wallpaper/*
// @match         http://www.wallpaperfox.com/wallpaper/*
// ==/UserScript==

var div = $(".addthis_toolbox.addthis_default_style");
if (!div) return;

var title = $("#container .pos").lastChild.textContent.match(/[^\W].*/)
                                                      .toString();
var lnk = $("#detail"), img = $("img", lnk);
var imgRes = lnk.href.match(/\w+$/).toString();
var imgID  = img.src.match(/\/\d+.*$/).toString();
var imgSrc = "http://www.wallpaperfox.com/download/view?file="
           + btoa(imgRes + imgID);

var newDiv = div.insertBefore(document.createElement("div"), div.lastChild);
newDiv.className = "left ml45 mt5 clearfix";
newDiv.innerHTML = '<a href="http://pinterest.com/pin/create/button/'
                 + '?url=' + encodeURIComponent(location.href)
                 + '&media=' + encodeURIComponent(imgSrc)
                 + '&description=' + encodeURIComponent(title)
                 + '" target="_blank" '
                 + 'class="pin-it-button" count-layout="horizontal">'
                 + '<img border="0" '
                 + 'src="//assets.pinterest.com/images/PinExt.png" '
                 + 'title="Pin It"/></a>';

var script = newDiv.appendChild(document.createElement("script"));
script.type = "text/javascript";
script.async = true;
script.src = "//assets.pinterest.com/js/pinit.js";

if (newDiv.firstChild.nodeName != "iframe") {
  newDiv.firstChild.addEventListener("click", function(e) {
    e.preventDefault();
    window.open(this.href, "_pinterest",
                "width=640, height=300, toolbar=no, location");
  }, false);
}

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}