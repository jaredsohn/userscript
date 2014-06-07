/******************************************************************************
 *
 * ORF.at Ticker Only
 * Copyright (C) 2009 Alexander Exner
 * Version 0.5
 * 2009-01-19
 *
 * Released under the GPL license, version 3
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * 
 * v0.1 - initial release
 * v0.2 - fixes errors on pages without frames
 * v0.3 - better exception handling, improved GUI, fixed include tag
 * v0.4 - fixed regression bug: Links on pictures frame stopped working
 *      - fixed "Error: Permission denied ..." messages on cross site frame content
 * v0.5 - changes due to new ORF.at layout (new top level frame for ads)
 *
 *******************************************************************************
 * 
 *  This is a Greasemonkey user script.  To install it, you need
 *  Greasemonkey 0.8 or later: http://greasemonkey.mozdev.org/
 *  Then restart Firefox and revisit this script.
 *  Under Tools, there will be a new menu item to "Install User Script".
 *  Accept the default configuration and install.
 * 
 *  To uninstall, go to Tools/Manage User Scripts,
 *  select "ORF.at Ticker Only", and click Uninstall.
 * 
 ******************************************************************************/

// ==UserScript==
// @name           ORF.at Ticker Only
// @namespace      uzuz
// @description    Displays surrounding content only if mouse is over the upper frame. By the way the frame for ads is hidden.
// @include        *orf.at/*
// ==/UserScript==

//alert("Hi");

// General stuff
var frameConfigN1 = "30,*,0";
var frameContent = '<p style="color:#000000; line-height:30px; font-size:20px;">' +
                   '<b style="text_decoration:blink;">&nbsp;ORF.at Ticker Only</b>' +
                   ' Greasemonkey user script. Move cursor here to see ORF pictures.</p>';
var frameContentStyle = "background-color:#7766EE; position: absolute; width: 100%; height: 30px; top: 0px; left: 0px; right: 0px; bottom: 0px;"



function getSite() {
  try {
    return window.location.href;
  } catch (e) {
    alert(e + "\n" + e.stack);
  }
}

function isParent() {
  try {
    return (parent == window);
  } catch (e) {
    alert(e + "\n" + e.stack);
  }
}

// ORF introduced a new top-level frame on some pages
//function hasFrameSet() {
//  try {
//    return (document.getElementsByTagName("frameset").length == 1);
//  } catch (e) {
//    alert(e + "\n" + e.stack);
//  }
//}

// This function does identify the frame containing the ticker
// does mark it, saves original settings
// ToDo: and redefines other frames to remove ads.
function prepareFrames() {
  try {
    var framesets = document.getElementsByTagName("frameset");
    for (var i = 0; i < framesets.length; i++) {
      var frameset = framesets[i];
      // ToDo: More sophisticated check to determine the frameset that contains the ticker
      var rowSepCount = String(frameset.rows).match(/,/g);
      var colSepCount = String(frameset.cols).match(/,/g);
      if ((rowSepCount != null) && (rowSepCount.length == 2)) {
          //alert("setting id framesetContainingTicker");
          frameset.setAttribute('id', "framesetContainingTicker");
          frameset.setAttribute('originalFrameConfig', frameset.rows);
      }
      if ((colSepCount != null) && (colSepCount.length == 1)) {
        // Hide ad frame
        frameset.cols = "*,0";
      }
    }
  } catch (e) {
    alert(e + "\n" + e.stack);
  }
}

// From http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Used in frames only
function getFrameName() {
  try {
    return window.name;
  } catch (e) {
    alert(e + "\n" + e.stack);
  }
}

// Called by frame grid
function dispPics() {
  try {
    var framesetContainingTicker = parent.document.getElementById("framesetContainingTicker");
    var divFrameContent = document.getElementById("divFrameContent");
    if (framesetContainingTicker && divFrameContent) {
      framesetContainingTicker.rows = framesetContainingTicker.getAttribute("originalFrameConfig");
      divFrameContent.setAttribute("style", "display: none;");
    }
  } catch (e) {
    alert(e + "\n" + e.stack);
  }
}

// Called by frame grid
function hidePics() {
  try {
    var framesetContainingTicker = parent.document.getElementById("framesetContainingTicker");
    var divFrameContent = document.getElementById("divFrameContent");
    if (framesetContainingTicker && divFrameContent) {
      framesetContainingTicker.rows = frameConfigN1;
      divFrameContent.setAttribute("style", frameContentStyle);
    }
  } catch (e) {
    alert(e + "\n" + e.stack);
  }
}

// Main
try {
//  alert(getFrameName());

  prepareFrames();

  if (!isParent()) {

  // This is the frame with the pictures
    if (getFrameName() == "grid") {
      // Add div to overlay message on minimized frame
      var newdiv = document.createElement('div');
      newdiv.setAttribute('style', "display: none;");
      newdiv.setAttribute('id', "divFrameContent");
      newdiv.innerHTML = frameContent;
      document.getElementsByTagName("body")[0].appendChild(newdiv);
      // Add event listeners
      document.addEventListener("mouseover", dispPics, true);
      document.addEventListener("mouseout", hidePics, true);
    }

    // This is the frame with the ticker content
    if (getFrameName() == "content") {
      // Hide ads
      addGlobalStyle('div.right { display: none ! important; }');
    }

  }

} catch (e) {
  alert(e + "\n" + e.stack);
}
