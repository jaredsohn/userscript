// ==UserScript==
// @name           SRD - load official WotC images
// @namespace      http://khopis.com/scripts
// @description    Load official images rather than displaying links to them
// @include        http://www.systemreferencedocuments.org/35/sovelior_sage/*
// @include        http://systemreferencedocuments.org/35/sovelior_sage/*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2007+ by Adam Katz
// @license        AGPL v3+
// @version        1.4
// @lastupdated    2008-11-13
// ==/UserScript==
/*
 * Load official WotC images instead of placeholder links, format them nicely.
 * See also http://userscripts.org/scripts/show/2033 for a similar approach 
 * for monster images at the Hypertext d20 SRD.
 * (Note that the site I modify has images for far more than just monsters.)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */

// silly site doesn't have the proper index file
if ( document.title.match(/^403 Forbidden/) ) {
  var real_home = '/35/sovelior_sage/home.html';
  var h1 = document.getElementsByTagName("H1");
  if (h1) {
    var redir = document.createElement("a");
    redir.style.color = "red";
    redir.style.fontSize = "0.5em";
    redir.appendChild( document.createTextNode(" redirecting to home ...") );
    redir.href = real_home;
    h1[0].appendChild(redir);
  }
  window.setTimeout( function(){ location.pathname = real_home; }, 999);
}

function under500() {
  if (this.height > 500) { this.style.height="500px"; } // shrink to 500px tall
  if (this.width > 500)  { this.style.height="inherit"; // undo if still too big
                           this.style.width="500px"; }  // shrink to 500px wide
}

var images = document.evaluate("//img[contains(@src,'pict.jpg')]",
               document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<images.snapshotLength; i++) {
  var imageI = images.snapshotItem(i);
  newImg = document.createElement("img");
  newImg.src = imageI.parentNode; // the magic: parentNode is the image
  newImg.style.cssFloat = "right";
  newImg.addEventListener("load", under500, true); //resize img after it loads
  // parent (<a><img></a>) becomes real image by replacing grandparent's child
  imageI.parentNode.parentNode.replaceChild(newImg, imageI.parentNode);
}

// Full-width tables (e.g. dragons) overlap the new pictures.  Force-clear them.
var tables = document.evaluate("//table[contains(@style,'width: 100%')]",
               document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<tables.snapshotLength; i++) {
  tables.snapshotItem(i).style.clear = "right";
  // This doesn't work.  If it did, it would clear the table's heading, too.
  //tables.snapshotItem(i).previousSibling.style.clear = "right";
}


GM_addStyle(<r><![CDATA[

h3 { clear:right; } /* names fail to clear larger images */

/* make menus rounded, bordered, and slightly transparent */
.menu2 ul ul { border:solid 1px #8b2323 !important; -moz-opacity:0.95;
    -moz-border-radius:0 6px 6px 0; padding:1px 1px 3px 1px !important; }
.menu2 ul ul ul { -moz-border-radius:0 6px 6px 6px; }
.menu2 ul ul li:first-child a:hover { -moz-border-radius-topright:4px; }

]]></r> + "");