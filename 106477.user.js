// ==UserScript==
// @name           ItaliaFilm-NoLock
// @namespace      http://userscripts.org
// @description    Disables italia-film.com lock
// @include        http://italia-film.com/telefilm/*
// @author         fox (fox91 at anche dot no)
// ==/UserScript==

function disableLock() {
  if (document.getElementById("lockWraper")) {
    document.getElementById("lockWraper").style.visibility = 'hidden';
  }
}

window.setTimeout(disableLock, 1000);
