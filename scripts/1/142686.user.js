// ==UserScript==
// @id			MIZX
// @name		Mizahar Extensions
// @namespace	Mizahar
// @version		0.21
// @description	Appends a words per post metric on player posts/profiles.
// @grant               none
// @icon		http://www.mizahar.com/favicon.ico
// @include		http://www.mizahar.com/forums/*
// @homepage	http://userscripts.org/scripts/show/142686
// @updateURL	https://userscripts.org/scripts/source/142686.user.js
// @run-at		document-end
// ==/UserScript==

(function() {
  var Main, WPP;
  WPP = {
    insert: function(node, pos, content, wpp) {
      content = content.replace("WPP", Math.round(wpp));
      node.insertAdjacentHTML(pos, content);
    },
    thread: function() {
      var currentprofile, i, postprofiles;
      postprofiles = document.evaluate('//*[@class="postprofile"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      i = 0;
      currentprofile = postprofiles.snapshotItem(0);
      while (currentprofile !== null) {
        this.insert(currentprofile.children[3], 'beforeBegin', '<dd><b>Words per post:</b> WPP</dd>', currentprofile.children[4].lastChild.nodeValue / currentprofile.children[3].lastChild.nodeValue);
        currentprofile = postprofiles.snapshotItem(++i);
      }
    },
    profile: function() {
      var postsStr, userstats;
      userstats = (document.evaluate('//*[@class="column2"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotItem(0).children[1];
      postsStr = userstats.children[5].childNodes[0].textContent;
      this.insert(userstats.children[4], 'beforeBegin', '<dt>Words per post:</dt><dd>WPP</dd>', userstats.children[7].textContent / postsStr.substring(0, postsStr.indexOf('|') - 1));
    }
  };
  Main = {
    init: function() {
      if (/\/member/.test(document.URL)) {
        WPP.profile();
      } else {
        WPP.thread();
      }
    }
  };
  Main.init();
}).call(this);
