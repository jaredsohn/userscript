// ==UserScript==
// @name          Show xkcd hidden text below images
// @namespace     http://khopis.com/scripts
// @description   Shows comics' mouse-over text below the image instead
// @author        Adam Katz <scriptsATkhopiscom>
// @include       http://xkcd.com/*
// @include       http://www.xkcd.com/*
// @include       https://xkcd.com/*
// @include       https://www.xkcd.com/*
// @grant         none
// @version       1.1+20130527
// @copyright     2009 by Adam Katz
// @license       AGPL v3+
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2009+  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==

// This was inspired by riddle's "xkcd titles" script from way back in the day.
// http://userscripts.org/scripts/show/6080
// My version is a little safer, it'll cover multiple images (which may or may
// not create inappropriate spoilers...), and if your internet connection is
// congested (your tubes are clogged), it ensures the title isn't printed
// before the image is drawn (which is the main reason I rewrote it).

var content = document.getElementById("middleContainer");
if (content) {

  var comic = document.evaluate("//img[@title!='']", content, null, 
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  // Just in case there are multiple images with titles, we'll do all of them
  for (var c=0, cl=comic.snapshotLength; c < cl; c++) {
    var text = comic.snapshotItem(c).title;
    var comicText = document.createElement("div");

    comic.snapshotItem(c).removeAttribute("title");

    comic.snapshotItem(c).parentNode
      .insertBefore(comicText, comic.snapshotItem(c).nextSibling);

    // no cheating:  only place the text once the image has finished loading
    comic.snapshotItem(c).addEventListener("load",
      function() { comicText.appendChild(document.createTextNode(text)); },
      true);

  }
}