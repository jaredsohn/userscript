// Copyright (c) 2006 Albert Bachand, 2008-2009 Malte Kraus
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Based on Tin Foil Hat 0.1 Beta
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "AMO-Link", and click Uninstall.
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name          AMO-Link
// @namespace     http://maltekraus.de/Firefox/
// @description   Gets the name for Add-ons linked only with their AMO url
// @include       *
// @exclude       https://addons.mozilla.org/*
// ==/UserScript==

var pageCache = {};

for(var i = 0; i < document.links.length; i++) {
  var link = document.links.item(i);
  if(link.tagName != "A" || !link.href)
    continue;
  if(link.href.substr(0, 27) == "https://addons.mozilla.org/" &&
     link.textContent == link.href) {
    var match = link.href.match(/^https:\/\/addons\.mozilla\.org\/(?:[^\/]+\/){1,2}addon\/([0-9]+)$/i);
    if(match && match[1] && !isNaN(parseInt(match[1]))) {
      getNameForLink(link, match[1]);
    }
  }
}

function getNameForLink(link, num) {
  if(pageCache[num]) {
    pageCache[num].push(link);
  } else {
    pageCache[num] = [link];
    if(!GM_getValue(num + "-name", "")) {
      GM_xmlhttpRequest({
        headers: [{"User-Agent": "AMO-LINK Greasemonkey Script"}],
        method:"GET",
        url: "https://services.addons.mozilla.org/en-US/firefox/api/1.4/addon/" + num,
        onload: function (details) {
          var xml = new DOMParser().parseFromString(details.responseText, "text/xml");
          var name = xml.getElementsByTagName("name");
          if(name.length) {
            GM_setValue(num + "-name", name[0].textContent);
            pageCache[num].forEach(setName);
          }
        }
      });
      return;
    }
  }
  setName(link);

  function setName(link) {
    var name = GM_getValue(num + "-name", "");
    if(!name)
      return;
    link.title = link.title + " (Add-on Name: " + name + ")";
    link.textContent = name + " (AMO-Link)";
  }
}