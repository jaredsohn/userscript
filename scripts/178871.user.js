// ==UserScript==
// @name       IMDb to Filmtipset
// @namespace  DScript
// @version    0.3
// @descriptionAdd "Lookup at Filmtipset.se" context to all IMDb links
// @include    *
// ==/UserScript==

var body = document.body;
body.addEventListener("contextmenu", initMenu, false);

var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-filmtipset-lookup" type="context"><menuitem label="Slå upp på Filmtipset.se"></menuitem></menu>';

document.querySelector("#userscript-filmtipset-lookup menuitem").addEventListener("click", filmtipsetLookup, false);

function initMenu(aEvent) {
  var node = aEvent.target;
  var item = document.querySelector("#userscript-filmtipset-lookup menuitem");
  var imdbId = null;

  while(node && node.localName != "a") node = node.parentNode;

  if (node.localName == "a" && node.href.indexOf('imdb.com') >= 0)
    imdbId = node.href.match(/tt\d+/);

  if(!!imdbId) {
    body.setAttribute("contextmenu", "userscript-filmtipset-lookup");
    item.setAttribute("imdbId", imdbId);
  } else {
    body.removeAttribute("contextmenu");
    item.removeAttribute("imdbId");
  }
}

function filmtipsetLookup(aEvent) {
    var id = aEvent.target.getAttribute("imdbId");
    location.href = 'http://www.filmtipset.se/'+id;
}