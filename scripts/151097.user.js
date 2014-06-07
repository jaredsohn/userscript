/*
    Google Image Search Context Menu
    Add 'Search by Image' in browser context menu when you
    right click on image to search Google with that image.
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
// @name            Google Image Search Context Menu
// @namespace       http://userscripts.org/users/12
// @description     Add 'Search by Image' in browser context menu when you right click on image to search Google with that image.
// @version         1.2
// @author          LouCypher
// @license         GPL
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @updateURL       https://userscripts.org/scripts/source/151097.meta.js
// @include         *
// @exclude         file://*
// @grant           GM_openInTab
// ==/UserScript==

if (!("contextMenu" in document.documentElement &&
      "HTMLMenuItemElement" in window)) return;

var body = document.body;
body.addEventListener("contextmenu", initMenu, false);

var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-search-by-image" type="context">\
                    <menuitem label="Search Google with this image"\
                              icon="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
AAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAEl\
SURBVDiNY/z//z8DJYCRkIKsthv/kRX9Z2BgmFalARdiIcaGKZXqcH5O+01U+ay2G3MYGBiSiXUm\
mofnsBDSjEUTMkiBe2Eq1JnZ7TcZBHhZGNythBl0lLkZODmYGX7++sdw/sZnhl3H3zF8+voHwwsY\
FkR5ijNICLMzTF31hOHnr38MHGxMDJlhMgwv3vxkWL7jJYpaJmzu0lTigWtmYGBg+PHrH8P0VU8Y\
tJV5MNRiNYCfmxmuGQZ+/PrHwMmOqRyrAX///WfgYEOV4mBjwjAUpwHHL31iyA6XgRvCwcbEkBUm\
w3DuxmcMtVgDkYONicHLVoTBSJOXgYONieHHz38Ml+98Ydh88DXDtx//CBtACmBiYGCYS4H+OYyU\
5kasgUgKAADN8WLFzlj9rgAAAABJRU5ErkJggg=="></menuitem>\
                  </menu>';

document.querySelector("#userscript-search-by-image menuitem")
        .addEventListener("click", searchImage, false);

function initMenu(aEvent) {
  // Executed when user right click on web page body
  // aEvent.target is the element you right click on
  var node = aEvent.target;
  var item = document.querySelector("#userscript-search-by-image menuitem");
  if (node.localName == "img") {
    body.setAttribute("contextmenu", "userscript-search-by-image");
    item.setAttribute("imageURL", node.src);
  } else {
    body.removeAttribute("contextmenu");
    item.removeAttribute("imageURL");
  }
}

function addParamsToForm(aForm, aKey, aValue) {
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", aKey);
  hiddenField.setAttribute("value", aValue);
  aForm.appendChild(hiddenField);
}

function searchImage(aEvent) {
  // Executed when user click on menuitem
  // aEvent.target is the <menuitem> element
  var imageURL = aEvent.target.getAttribute("imageURL");
  if (imageURL.indexOf("data:") == 0) {
    var base64Offset = imageURL.indexOf(",");
    if (base64Offset != -1) {
      var inlineImage = imageURL.substring(base64Offset + 1)
                                 .replace(/\+/g, "-")
                                 .replace(/\//g, "_")
                                 .replace(/\./g, "=");

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "//www.google.com/searchbyimage/upload");
      form.setAttribute("enctype", "multipart/form-data");
      form.setAttribute("target", "_blank");
      addParamsToForm(form, "image_content", inlineImage);
      addParamsToForm(form, "filename", "");
      addParamsToForm(form, "image_url", "");
      body.appendChild(form);
      form.submit();
    }
  } else {
    GM_openInTab("https://www.google.com/searchbyimage?image_url=" +
                 encodeURIComponent(imageURL));
  }
}