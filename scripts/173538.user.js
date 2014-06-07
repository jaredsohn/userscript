// ==UserScript==   
// @name           Detwinterceptor
// @description    Replace Twitter's tracking links with direct, untracked links. This is automatically done at load, scroll and also on new tweets but, if needed, you can always click anywhere in the window to force replacement to be done.
// @namespace      https://userscripts.org/users/524962
// @downloadUrl    https://gitorious.org/cguserscripts/detwintercepter/blobs/raw/master/detwinterceptor.js
// @updateUrl      https://gitorious.org/cguserscripts/detwintercepter/blobs/raw/master/detwinterceptor.js
// @source         https://gitorious.org/cguserscripts/detwintercepter/blobs/raw/master/detwinterceptor.coffee
// @licence        GPLv3 (or later)
// @include        http://*twitter.com/*
// @include        http://twitter.com/*
// @include        https://*twitter.com/*
// @include        https://twitter.com/*
// @grant          GM_addStyle
// @version        1.00
// ==/UserScript==
//;
/*
by Cathal Garvey
Twitter: @onetruecathal
Email:   cathalgarvey@cathalgarvey.me
Gittip:  https://www.gittip.com/onetruecathal

Source Repository: https://gitorious.org/cguserscripts/detwintercepter

Based on "Twitter t.co killer", found here: https://userscripts.org/scripts/show/168401
Mostly a rewrite in Coffeescript (isn't that enough?), but with additional code to edit
pic.twitter.com links, which slip through "Twitter t.co Killer".

Original coffeescript code is in the same gitorious repository as the updateUrl: gitorious.org/detwintercepter

Please provide suggestions or updates ONLY in coffeescript.
Detwintercepter is mirrored at github.com/cathalgarvey/detwintercepter so I can also receive pull requests
there, however there is a minor risk the github repo will be a version behind sometimes as I prioritise
free software sites such as Gitorious.
*/

var fix_links, scrollstutter, stutter;

fix_links = function() {
  var expanded, key, links, _i, _len, _results;

  links = document.getElementsByTagName("a");
  _results = [];
  for (_i = 0, _len = links.length; _i < _len; _i++) {
    key = links[_i];
    if (key != null) {
      expanded = key.getAttribute("data-expanded-url");
      if ((expanded == null) && key.getAttribute("class") === "twitter-timeline-link") {
        expanded = key.textContent;
        expanded = expanded.slice(0, 5) === "http" ? expanded : "http://" + expanded;
      }
      if (expanded != null) {
        key.href = expanded;
        _results.push(key.setAttribute("arrow", "true"));
      } else {
        _results.push(void 0);
      }
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

GM_addStyle("a[arrow]:before { content: '\u2192'; }\na[arrow] { color: green; }");

fix_links();

stutter = function() {
  fix_links();
  return setTimeout(fix_links, 800);
};

scrollstutter = function() {
  if (window.scrollY > window.scrollMaxY - 800) {
    return stutter();
  }
};

window.addEventListener("scroll", scrollstutter);

window.addEventListener("click", stutter, true);

window.addEventListener("contextmenu", stutter, true);
