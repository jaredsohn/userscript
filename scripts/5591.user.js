// Wikipedia summary user script
// version 0.2
// 2006-09-13
// Copyright (c) 2006, David Leadbeater <dgl at dgl.cx>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Wikipedia summary", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wikipedia summary
// @namespace     http://dgl.cx/2006/09/wikipedia-summary.user.js
// @description   Display summary of Wikipedia entry as title of links to Wikipedia
// @include       *
// ==/UserScript==

var cache = { };

wpLinks = document.evaluate(
    document.location.host == "en.wikipedia.org"
    // Handle relative links on wikipedia itself
    ? '//a[starts-with(@href, "http://en.wikipedia.org/wiki/") or starts-with(@href, "/wiki/")]'
    // Else handle en. and www.
    : '//a[starts-with(@href, "http://en.wikipedia.org/wiki/") or starts-with(@href, "http://www.wikipedia.org/wiki/")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < wpLinks.snapshotLength; i++)
  wpLinks.snapshotItem(i).addEventListener('mouseover', getTitle, true);

function getTitle() {
  if(/^(?:http:\/\/(?:www|en).wikipedia.org)?\/wiki\/([^#]+)/.test(this.href)) {
    var name = RegExp.$1;
    // Only handle the default namespace
    if(name.indexOf(":") != -1)
      return;
    var element = this;
    if(typeof(cache[name]) != "undefined") {
      setTitleName(element, cache[name]);
    } else {
      // stop duplicate requests
      cache[name] = null;
      GM_xmlhttpRequest({
        method: "GET",
        url: "http://greasemonkey-wp.dg.cx/json/" + name,
        onload: function(res) {
          var obj;
          eval("obj="+res.responseText);
          if(obj && obj.text)
          {
            obj.text = obj.text.replace(/\([^)]+\)/, "").replace(/ +/g, " ");
            cache[obj.name] = obj.text;
            setTitleName(element, obj.text);
          }
        }
      });
    }
  }
}

// Handle nicetitle (from multiline tooltip enabler)
function setTitleName(el, text) {
  if(typeof(el.getAttribute("nicetitle")) == "string") {
    el.setAttribute("nicetitle", text);
  } else {
    el.title = text;
  }
}
