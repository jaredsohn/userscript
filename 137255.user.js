/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name          USO: Forum Jumper
// @namespace     http://userstyles.org/users/12
// @description   Add links to jump to other forum
// @version       6.3
// @author        LouCypher
// @license       WTFPL http://www.wtfpl.net/
// @homepageURL   https://userscripts.org/scripts/show/137255
// @updateURL     https://userscripts.org/scripts/source/137255.meta.js
// @downloadURL   https://userscripts.org/scripts/source/137255.user.js
// @resource      LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include       https://userscripts.org/forums
// @include       https://userscripts.org/forums/*
// @include       https://userscripts.org/topics/*
// @include       https://userscripts.org/posts*
// @include       https://userscripts.org/spam*
// @include       http://userscripts.org/forums
// @include       http://userscripts.org/forums/*
// @include       http://userscripts.org/topics/*
// @include       http://userscripts.org/posts*
// @include       http://userscripts.org/spam*
// @exclude       https://userscripts.org/topics/new?script_id=*
// @exclude       http://userscripts.org/topics/new?script_id=*
// @exclude       https://userscripts.org/posts/search*
// @exclude       http://userscripts.org/posts/search*
// ==/UserScript==

/* Changelog:
    - 2013-03-12: v6.3 - Updated CSS. Refactored.
    - 2013-01-15: v6.0 - Added to forum front page.
    - 2013-01-03: v5.0 - Removed 'Jetpack' forum.
    - 2012-12-29: v4.0 - Added 'Recent posts' and 'Spam' links.
    - 2012-07-05: v3.1 – Fixed style.
    - 2012-07-03: v3.0 – Added forum description.
    - 2012-07-02:
      - v2.1 – Fixed menu position when scrolling now works on all browsers.
      - v2.0 – Fixed menu position when scrolling (Mozilla only).
    - 2012-06-29: v1.0 – Initial release.
*/

(function() {
  var fLink = $("#mainmenu li a[href='/forums']");
  if (!fLink || fLink.parentNode.className != "active") return;

  var style = $("head").appendChild(document.createElement("style"));
  style.type = "text/css";
  style.textContent = "#forum-jumper, #forum-jumper ul { width: inherit; }\n"
                    + "#forum-jumper { position: relative; }\n"
                    + "#forum-jumper, #forum-jumper .info {"
                    + " background-color: inherit; padding-top: 1em; }\n"
                    + "#forum-jumper.fixed { position: fixed; }\n"
                    + "#forum-jumper h5 { margin-bottom: 1em; }\n"
                    + "#forum-jumper li:not(.notblock) a, "
                    + "#forum-jumper a:hover + .info { display: block; }\n"
                    + "#forum-jumper a, #forum-jumper a:hover {"
                    + " text-decoration: none !important; }\n"
                    + "#forum-jumper li { list-style-type: circle; }\n"
                    + "#forum-jumper li:not(.active):hover {"
                    + " list-style-type: disc; }\n"
                    + "#forum-jumper li.active { list-style-type: square; }\n"
                    + "#forum-jumper li a.active { font-weight: bold; }\n"
                    + "#forum-jumper .info, "
                    + "#forum-jumper .hide { display: none; }\n"
                    + "#forum-jumper .info { position: absolute;"
                    + " top: +19em; font-weight: normal; border: none;"
                    + " margin-left: -2em; }";

  var div = document.createElement("div");
  div.id = "forum-jumper";
  div.className = "fixed";
  div.innerHTML = '<h5><a href="/forums">Jump to forum</a>:'
                + '<div class="info">This is a place to discuss'
                + ' Greasemonkey, JavaScript, and other ways of'
                + ' remixing the web and making it your own.</div></h5>'
                + '<ul>'
                + '<li><a href="/forums/1">Script development</a>'
                + '<div class="info">Stuck? Discuss problems,'
                + ' experiences and anything else related to'
                + ' development here.</div></li>'
                + '<li><a href="/forums/2">Ideas and script requests</a>'
                + '<div class="info">Have an idea for a killer script?'
                + ' Talk about it in here.</div></li>'
                + '<li><a href="/forums/3">Userscripts.org discussion</a>'
                + '<div class="info">Ideas or problems with the site?'
                + ' This is where to talk about them.</div></li>'
                + '<li><a href="/forums/5">Greasefire</a>'
                + '<div class="info">Discussions about the Firefox Addon'
                + ' that brings userscripts.org to Greasemonkey</div></li>'
                + '<!--<li><a href="/forums/6">Jetpack</a>'
                + '<div class="info">Mozilla Lab\'s new project to extend'
                + ' your browser using JavaScript, HTML, jQuery and Firebug.'
                + '</div></li>-->'
                + '<li><a href="/forums/4">The Banana Bar</a>'
                + '<div class="info">A forum for general, off-topic chit-chat'
                + ' among monkeys.</div></li>'
                + '</ul>'
                + '<ul>'
                + '<li class="notblock"><a href="/posts">Recent posts</a>'
                + '<div class="info">View recent posts.</div>'
                + ' (<a href="/posts?spam=1">include spam</a>)'
                + '<div class="info">View recent posts including potential'
                + ' spam posts.</div></li>'
                + '<li class="hide"><a href="/spam">Spam reports</a>'
                + '<div class="info">Reported spam posts. Please vote to'
                + ' help keep Userscripts.org clean.</div>'
                + '</li></ul>'
                + '<ul><li class="hide">'
                + '<a href="/home/posts">Monitored topics</a>'
                + '</li></ul>'

  if (location.pathname == "/forums") {
    $("#right").insertBefore(div, $("#right > h6"));
    div.removeChild(div.firstChild);
    while (div.nextSibling) {
      $("#right").removeChild(div.nextSibling);
    }
  } else {
    $("#right").appendChild(div);
  }

  var isLoggedIn = $("#top .login_status a[href='/logout']") != null;
  if (isLoggedIn) {
    var hide = $all(".hide", div);
    for (var i = 0; i < hide.length; i++) {
      hide[i].removeAttribute("class");
    }
  }

  var links = $all("li a", div);
  var link, list;
  for (var i = 0; i < links.length; i++) {
    link = links[i];
    list = link.parentNode;
    if (/\/(posts|spam)/.test(location.pathname)) {
      if ((new RegExp(location.pathname)).test(link.href)) {
        list.className += " active";
        break;
      }
    } else {
      if ((link.textContent == $("#section h2").textContent) ||
          (link.href == $("#section .subtitle a").href)) {
        list.className = "active";
        break;
      }
    }
  }
  link.className = "active";
  if (($all("a", list).length > 1) &&
      (/spam/.test(location.search) ==
       /spam/.test($all("a", list)[1].href))) {
    $all("a", list)[1].className = "active";
    $all("a", list)[1].textContent = "including spam";
  }

  var divTop = div.offsetTop;
  fixToTop();
  addEventListener("scroll", fixToTop, false);

  function fixToTop() {
    if (pageYOffset >= divTop) {
      div.className = "fixed";
      div.style.top = "0";
    } else {
      div.removeAttribute("style");
      div.className = "";
    }
  }

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }

  function $all(aSelector, aNode) {
    return (aNode ? aNode : document).querySelectorAll(aSelector);
  }
})()