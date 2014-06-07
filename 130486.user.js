/*
    Add Pinterest button on Flickr photo page to share on Pinterest
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
// @name            Flickr Pinterest
// @namespace       http://pinterest.com/zoolcar9
// @description     Add Pinterest button on Flickr photo page to share on Pinterest
// @icon            http://i.imgur.com/ZKsQ2.png
// @version         2.0
// @author          LouCypher
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/130486.meta.js
// @include         http://www.flickr.com/photos/*
// @include         http://www.flickr.com/groups/*
// @include         https://secure.flickr.com/photos/*
// @include         https://secure.flickr.com/groups/*
// @match           *://*.flickr.com/photos/*
// @match           *://*.flickr.com/groups/*
// ==/UserScript==

/*
Changelog:
  - v2.0  (2012-07-18) Change class name if sharing is disabled
                       or photo is not public.
  - v1.6  (2012-05-07) Fixed: Disabling icon failed on photo set.
  - v1.5  (2012-05-07) Opera compatibility.   
  - v1.4  (2012-05-07) Fixed: small icon not showing.
  - v1.3  (2012-05-06)
            1. Disable icon if sharing is disabled or photo is not public.
            2. Hides default Pinterest button, as my script does better
               with photo credits, etc.
            3. Moves button position near default Pinterest button.
  - v1.2  (2012-04-11) Small icon only shown if not logged in to Flickr.
  - v1.1  (2012-04-10) Added photo credits.
  - v1.0  (2012-04-09) Initial release.
*/

(function() { // Function wrapper for Opera

var canonical = $("link[rel='canonical']");

var image = $("#main-photo-container img") ||
            $("#main-photo-container img") ||
            null;

var noShare = $("meta[name='pinterest'][content='nopin']") ||
              $(".share-disabled a");

var pinterest = $(".share-dialog-action.share-via-service-132");
pinterest && (pinterest.parentNode.style.display = "none");

var PinIt = {
  name: "Pinterest",
  get text() {
    if (noShare) {
      return noShare.title ? noShare.title
                           : noShare.getAttribute("description");
    } else {
      return "Share on Pinterest";
    }
  },
  get href() {
    if (image && !noShare) {
      return "http://pinterest.com/pin/create/button/?url="
           + $esc(canonical ? canonical.href : location.href)
           + "&media="
           + $esc($("#main-photo-container img")
                  ? $("#main-photo-container img").src
                  : $("#primary_photo_img").src.replace(/\_m.jpg/, ".jpg"))
           + "&description="
           + ($esc($(".photo-title")
             ? ($(".photo-title").textContent + ", photo")
             : ($(".set-title").textContent.match(/\w.*/).toString()
             + ", photo set")))
           + " by "
           + $esc($(".username") ? $(".username a").textContent
                                 : $("#setCrumbs a").textContent)
           + " on Flickr";
    } else {
      return "";
    }
  },
  get klik() {
    if (noShare) {
      return "return false;";
    } else {
      if (image) {
        return "window.open(\'" + this.href + "\', \'\', "
             + "'width=600, height=400, toolbar=no, location\'); "
             + "return false;";
      } else {
        return "var e = document.createElement('script'); "
             + "e.setAttribute('type', 'text/javascript'); "
             + "e.setAttribute('charset', 'UTF-8'); "
             + "e.setAttribute('src', "
             + "'//assets.pinterest.com/js/pinmarklet.js?r=' "
             + "+ Math.random() * 99999999); "
             + "document.body.appendChild(e); "
             + "return false;";
      }
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
                 + '"><a class="share-icon" href="' + PinIt.href
                 + '" title="' + PinIt.text
                 + '" style="background-image: url(\''
                 + '//a248.e.akamai.net/passets.pinterest.com.s3.'
                 + 'amazonaws.com/images/about/small-p-button.png\');">'
                 + PinIt.text + '</a></span></span>';
    return li;
  },
  big: function(aParent) {
    var li = aParent.insertBefore(document.createElement("li"),
                                  pinterest.parentNode);
    li.className = "share-service" + (noShare ? " share-disabled" : "");
    li.innerHTML = '<a href="#" title="' + PinIt.text + '"/>'
                 + '<img src="//a248.e.akamai.net/passets.pinterest.com'
                 + '.s3.amazonaws.com/images/about/big-p-button.png" '
                 + 'alt="' + PinIt.name + '" width="45" height="45" '
                 + ' style="opacity: ' + (noShare ? '.3' : '1') + ';"/>'
                 + '<span class="service-name">' + PinIt.name + '</span>'
                 + '</a>';
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
  if (image) {
    window.open(PinIt.href, "_blank",
                "width=600, height=400, toolbar=no, location");
  } else {
    var script = document.body.appendChild(document.createElement("script"));
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "//assets.pinterest.com/js/pinmarklet.js?r="
                             + (Math.random() * 99999999));
  }
}, false);

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}

function $esc(aString) {
  return encodeURIComponent(aString);
}
})()