// ==UserScript==
// @name	Update source from remote script URL
// @namespace	http://code.google.com/p/ecmanaut/
// @description	Adds a button on the user script create / update pages to load the contents of the remote script page into the userscripts.org textarea.
// @include	http://userscripts.org/scripts/new
// @include	http://userscripts.org/scripts/edit_src/*
// @require     http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// ==/UserScript==

var loc = $("script_location"), txt = "⤴ Load ⤴", button =
  node({ after: loc, tag: <input id="load" type="button" value={ txt }/> });

button.style.marginLeft = "1em";
button.addEventListener("click", load, false);

function $(id) { return document.getElementById(id); }

function load() {
  function loaded(xhr) {
    var msg = "Load error!";
    if (xhr.status == 200) {
      $("script_src").value = xhr.responseText;
      msg = "Updated!";
    }
    button.value = msg;
    setTimeout(function() { button.value = txt; button.blur(); }, 3e3);
  }

  var url = loc.value;
  url += (/\?/.test(url) ? "&" : "?") + "no-cache=" + (new Date).getTime();
  GM_xmlhttpRequest({ url: url, method: "GET", onload: loaded });
}
