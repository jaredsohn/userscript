/*
    Add 'Share on Google+' on Flickr photo and group page.
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
// @name            Flickr Google+
// @namespace       http://flickr.com/zoolcar9
// @description     Add 'Share on Google+' on Flickr photo and group page
// @icon            http://i.imgur.com/WCN0X.png
// @version         4.0
// @author          LouCypher
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/126151.meta.js
// @include         http://www.flickr.com/photos/*
// @include         http://www.flickr.com/groups/*
// @include         https://secure.flickr.com/photos/*
// @include         https://secure.flickr.com/groups/*
// @match           *://*.flickr.com/photos/*
// @match           *://*.flickr.com/groups/*
// ==/UserScript==

/*
Changelog:
  - v4.0    (2012-07-18) Change class name if sharing is disabled
                         or photo is not public.
  - v3.6    (2012-05-07) Fixed: Disabling icon failed on photo set.
  - v3.5    (2012-05-07) Opera compatibility.
  - v3.4    (2012-05-06) Disable icon if sharing is disabled
                         or photo is not public.
  - v3.3    (2012-04-11)
              - Small icon only shown if not logged in to Flickr.
              - Removed Opera support (Opera UserJS sucks!)
              - Refactored.
  - v3.2    (2012-04-02)
              - Use online icons instead of data:URI.
              - Refactored.
  - v2.0    (2012-03-20) Chrome compatibility.
  - v1.3    (2012-03-10)
              - Use new window instead of new tab.
              - Refactored.
  - v1.2    (2012-02-22) Added small icon.
  - v1.0.1  (2012-02-20) Included group page.
  - v1.0    (2012-02-19) Initial release.
*/

(function() { // Function wrapper for Opera UserJS

var canonical = $("link[rel='canonical']");
var noShare = $("meta[name='pinterest'][content='nopin']") ||
              $(".share-disabled a");

var GPlus = {
  name: "Google+",
  get text() {
    if (noShare) {
      return noShare.title ? noShare.title
                           : noShare.getAttribute("description");
    } else {
      return "Share on Google+";
    }
  },
  get href() {
    if (noShare) {
      return "";
    } else {
      return "https://plus.google.com/share?url="
           + encodeURIComponent(canonical ? canonical.href : location.href);
    }
  }
}

var addIcon = {
  small: function(aSibling) {
    aSibling.className = "share-this-v3 share-service";
    var li = aSibling.parentNode.insertBefore(document.createElement("li"),
                                              aSibling.nextSibling);
    li.className = "share-this-v3 share-service share-service-last"
                 + (noShare ? " share-disabled" : "");
    li.innerHTML = '<span class="share-service-options"><span class="'
                 + (noShare ? 'share-disabled DisabledButt' : 'Butt')
                 + '"><a class="share-icon" href="' + GPlus.href
                 + '" title="' + GPlus.text
                 + '" style="background-image: url(\''
                 + '//ssl.gstatic.com/images/icons/gplus-16.png\');">'
                 + GPlus.text + '</a></span></span>';
    return li;
  },
  big: function(aParent) {
    var li = aParent.appendChild(document.createElement("li"));
    li.className = "share-service" + (noShare ? " share-disabled" : "");
    li.innerHTML = '<a href="' + GPlus.href + '" title="' + GPlus.text + '">'
                 + '<img src="//ssl.gstatic.com/images/'
                 + 'icons/gplus-64.png" alt="' + GPlus.name
                 + '" width="45" height="45" style="opacity: '
                 + (noShare ? '.3' : '1')
                 + ';"/><span class="service-name">'
                 + GPlus.name + '</span></a>';
    return li;
  }
}

var icons = {
  small: ".share-this-v3.share-service.share-service-last",
  big: "#share-options-services > .share-options-inner > .share-services"
}

var icon;
if (document.getElementById("head-signin-link")) { // if not signed in
  // small icon
  var sIcon = $(icons.small);
  sIcon && (icon = addIcon.small(sIcon));
} else {
  // big icon
  var bIcon = $(icons.big);
  bIcon && (icon = addIcon.big(bIcon));
}

icon.addEventListener("click", function(e) {
  e.preventDefault();
  !noShare && window.open(GPlus.href, "",
                        "width=600, height=400, toolbar=no, location");
}, false);

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}

})()