/*
    Add Flattr button on GitHub.com
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
// @name          GitHub: Add Flattr button
// @namespace     https://github.com/LouCypher
// @description   Add Flattr button on GitHub.com
// @version       13.0
// @author        LouCypher
// @license       GPL
// @icon          http://i.imgur.com/VDx96.png
// @resource      license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource      changelog https://github.com/LouCypher/userscripts/raw/master/github-flattr/changelog.txt
// @updateURL     https://userscripts.org/scripts/source/137434.meta.js
// @downloadURL   https://userscripts.org/scripts/source/137434.user.js
// @include       https://github.com/*
// @include       https://gist.github.com/*
// @exclude       https://github.com/dashboard/*
// @exclude       https://github.com/*/following
// ==/UserScript==

(function() {
  var isGist = location.hostname == "gist.github.com";
  var buttons = $(".pagehead ul.pagehead-actions") || // repo/gist page
                $(".user-following-container");       // user profile page
  if (!buttons ||

      // Thou shalt not Flattreth thyself.
      ($("li.text", buttons) && ($("li.text", buttons).textContent == "This is you!")) ||

      // Thou canst not Flattreth organizations.
      // http://blog.flattr.net/2012/02/winter-update-github-tweets-extensions/#comment-8471
      $(".pagehead > .avatared > .organization-bit") ||

      $("li a.minibutton.btn-back", buttons)

     ) return;

  var url = location.href;

  if (isGist) {
    var owner = $(".author.vcard a");
    var user = $("#user-links .name");
    if (user && (user.href == owner.href)) return; // Thou shalt not Flattreth thine own gist.

    var li = insertBefore(document.createElement("li"), $("li", buttons), buttons);

    var button = li.appendChild(document.createElement("button"));
    button.className = "minibutton";
    button.appendChild(flattrButton($("a.js-current-repository").href));
    button.appendChild(button.firstChild.lastChild);
    button.addEventListener("click", function(e) {
      e.target.querySelector("a").click();
    }, false);

    return;
  }

  var username = $(".avatared > h1 > em") || $(".avatared > h1 > .name-only");
  var repoName = url.match(/[^(\.com\/)]\w+\/.[^\/]*/);
  if (!(repoName || username)) return;

  var permalink = $(".js-current-repository");

  var name = repoName ? repoName.toString() : username.textContent;

  if (buttons.nodeName == "SPAN") {
    url = location.href.replace(location.search, "");
    var span = insertBefore(document.createElement("span"),
                            buttons.firstChild, buttons);
    span.appendChild(flattrButton(url, "Flattr " + name, "minibutton"));

  } else if (!$(".repohead ul.tabs li:last-child a[href$='settings']")) {
  // Thou shalt not Flattreth thine own repo.
    var li = insertBefore(document.createElement("li"),
                          $("li.text", buttons) ? $("li.text", buttons).
                                                  nextSibling
                                                : buttons.firstChild,
                          buttons);
    li.appendChild(flattrButton(permalink ? permalink.href : url,
                                "Flattr " + name, "minibutton"));
  }

  var container = $("#js-repo-pjax-container");
  var committer = $(".authorship .author-name a", container);
  var user = $("#user .name"); // Logged in.

  // Thou shalt not Flattreth thine own commit.
  if (user && committer && (user.href == committer.href)) return;

  var browse = $(".commit > .browse-button", container);
  browse && (browse.style.marginLeft = ".5em")
         && insertBefore(flattrButton(url, "Flattr this commit!", "browse-button"),
                         browse.nextSibling,
                         browse.parentNode);

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }

  function insertBefore(aNode, aSibling, aParent) {
    return aParent.insertBefore(aNode, aSibling);
  }

  function getCSSPrefix() {
    var ua = navigator.userAgent;
    if (/Firefox/.test(ua)) return "-moz-";
    if (/Opera/.test(ua)) return "-o-";
    if (/AppleWebKit/.test(ua)) return "-webkit-";
  }

  // Flattr button
  function flattrButton(aURL, aTitle, aClassName) {
    var link = document.createElement("a");
    link.href = "https://flattr.com/submit/auto?url="
              + encodeURIComponent(aURL);
    link.title = aTitle ? aTitle : "";
    link.className = aClassName ? aClassName : "";
    link.target = "_blank";
    link.setAttribute("data-flattr-uid", "flattr");
    link.setAttribute("data-flattr-category", "software");
    link.setAttribute("data-flattr-tags", "software, github, opensource");
    link.innerHTML = '<img src="'
                     + 'https://api.flattr.com/button/flattr-badge-small.png"'
                     + ' alt="Flattr!" style="width: 12px; height: 12px;'
                     + ' vertical-align: -1px; margin-right: .5em; "/>Flattr!';
    return link;
  }
})()