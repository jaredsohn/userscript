/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            USO: Scripts Table Linkification
// @namespace       http://userscripts.org/users/12
// @description     Adds links to scripts' discuss, fans, etc.
// @version         2.5
// @author          LouCypher
// @license         WTFPL
// @updateURL       https://userscripts.org/scripts/source/128169.meta.js
// @match           *://userscripts.org/*
// @include         *://userscripts.org/*
// ==/UserScript==

setTimeout(function() {
  var scripts = document.querySelectorAll("tr[id^='scripts']");
  if (!scripts) return;

  // Linkification
  var isManagePage = /home\/scripts$/.test(location.pathname);
  var isGroupPage = /^\/groups\//.test(location.pathname);
  var s, nm, id, r, p, f, i, v;
  for (var n = 0; n < scripts.length; n++) {
    s = scripts[n];
    nm = s.querySelector("td.script-meat > a.title").title;
    id = s.id.match(/\d+/).toString();
    r = s.querySelectorAll("td")[isManagePage ? 2 : isGroupPage ? 2 : 1];
    p = s.querySelectorAll("td")[isManagePage ? 3 : isGroupPage ? 3 : 2];
    f = s.querySelectorAll("td")[isManagePage ? 4 : isGroupPage ? 4 : 3];
    i = s.querySelectorAll("td")[isManagePage ? 5 : isGroupPage ? 5 : 4];
    v = s.querySelectorAll("td")[isManagePage ? 6 : isGroupPage ? 6 : 5];
    if (/no\sreviews/.test(r.textContent)) {
      linkify("/reviews/new?script_id=" + id, r, "Write a review for " + nm);
    }
    if (p.textContent == "0") {
      linkify("/topics/new?script_id=" + id, p,
              "Start a discussion for " + nm);
    } else {
      linkify("/scripts/discuss/" + id, p);
    }
    linkify("/scripts/fans/" + id, f);
    linkify("/scripts/source/" + id + ".user.js", i, "Install " + nm);
    linkify("/scripts/review/" + id, v, v.children[0].title);
  }

  function linkify(aPath, aParent, aTitle, aClass) {
    var link = document.createElement("a");
    link.setAttribute("href", aPath);
    if (aTitle) link.title = aTitle;
    if (aClass) link.className = aClass;
    var gsPosDiff = aParent.querySelector(".gsPosDiff");
    if (!gsPosDiff) {
      link.textContent = aParent.textContent;
      while (aParent.firstChild) aParent.removeChild(aParent.firstChild);
      aParent.appendChild(link);
    } else {
      link.appendChild(aParent.firstChild);
      aParent.insertBefore(link, gsPosDiff);
    }
  }
}, 1500)