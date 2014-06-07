/*
    Add Pinterest button on wallpaperhere.com
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
// @name            Wallpaperhere.com - Add Pinterest button
// @namespace       http://userstyles.org/users/12
// @version         2.0
// @author          LouCypher
// @licensed        GPL
// @screenshot      https://s3.amazonaws.com/uso_ss/20382/large.png
// @homepageURL     https://userscripts.org/scripts/show/132289
// @supportURL      https://userscripts.org/scripts/discuss/132289
// @downloadURL     https://userscripts.org/scripts/source/132289.user.js
// @updateURL       https://userscripts.org/scripts/source/132289.meta.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://www.wallpaperhere.com/*
// @grant           none
// ==/UserScript==

var plug = $(".detailed_main .detailed_plug");
plug && addButton(plug);

function addButton(aNode) {
  var permalink = $(".main article .box_l a.select").href;
  var image = $("#downlink .wallpaper_img");
  if (!image) throw new Error("Image is " + image);

  var media = image.src.replace(/\/detail\//, "/preview/");
  //var media = image.src.replace(/\/thumbnails\/detail\//, "/wallpapers/1280x800/");

  var title = $(".detailed_main h1").textContent;
  var button = document.createElement("a");
  var div = $(".left.ml45.mt5", aNode);
  div.appendChild(button);

  button.outerHTML = '<a href="http://pinterest.com/pin/create/button/'
                   + '?url=' + encodeURIComponent(permalink)
                   + '&media=' + encodeURIComponent(media)
                   + '&description=' + encodeURIComponent(title)
                   + '" target="_blank" '
                   + 'class="pin-it-button" count-layout="horizontal">'
                   + '<img border="0" '
                   + 'src="//assets.pinterest.com/images/PinExt.png" '
                   + 'title="Pinterest"/></a>';
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}