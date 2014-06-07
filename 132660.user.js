/*
    Add Posterous button on Flickr photo page to share on Posterous
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
// @name            Flickr Posterous
// @namespace       http://userstyles.org/users/12
// @description     Add 'Share on Posterous' on Flickr photo and group page
// @version         2.0
// @author          LouCypher
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/132660.meta.js
// @include         http://www.flickr.com/photos/*
// @include         http://www.flickr.com/groups/*
// @include         https://secure.flickr.com/photos/*
// @include         https://secure.flickr.com/groups/*
// @match           *://*.flickr.com/photos/*
// @match           *://*.flickr.com/groups/*
// ==/UserScript==

/*
Changelog:
  - v2.0  (2012-05-07) Change class name if sharing is disabled
                       or photo is not public.
  - v1.0  (2012-05-07) Initial release.
*/

(function() { // Function wrapper for Opera UserJS

var canonical = $("link[rel='canonical']");
var noShare = $("meta[name='pinterest'][content='nopin']") ||
              $(".share-disabled a");

var Posterous = {
  name: "Posterous",
  get text() {
    if (noShare) {
      return noShare.title ? noShare.title
                           : noShare.getAttribute("description");
    } else {
      return "Share on Posterous";
    }
  },
  get href() {
    if (noShare) {
      return "";
    } else {
      return "//posterous.com/posts/new/";
    }
  },
  icon: "data:image/png;base64,\
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"
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
                 + '"><a class="share-icon" href="' + Posterous.href
                 + '" title="' + Posterous.text
                 + '" style="background-image: url(\''
                 + Posterous.icon + '\'); background-size: 16px 16px;">'
                 + Posterous.text + '</a></span></span>';
    return li;
  },
  big: function(aParent) {
    var li = aParent.appendChild(document.createElement("li"));
    li.className = "share-service" + (noShare ? " share-disabled" : "");
    li.innerHTML = '<a href="' + Posterous.href + '" title="'
                 + Posterous.text + '"><img src="' + Posterous.icon
                 + '" alt="' + Posterous.name + '" style="opacity: '
                 + (noShare ? '.3' : '1') + ';"/>'
                 + '<span class="service-name">' + Posterous.name
                 + '</span></a>';
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

var x = document.body.appendChild(document.createElement('script'));
x.type = 'text/javascript';
x.textContent = "var POSTEROUS___bookmarklet_domain = "
              + "'http://posterous.com';";

icon.addEventListener("click", function(e) {
  e.preventDefault();
  if (noShare) {
    e.stopPropagation();
  } else {
    var d = new Date();
    var e = (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime();
    var z = document.body.appendChild(document.createElement('script'));
    z.type = 'text/javascript';
    z.src = '//posterous.com/javascripts/bookmarklet2.js?' + e;
  }
}, false);

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}

})()