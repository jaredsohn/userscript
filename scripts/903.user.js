/**
 * Livejournal userpic adder (v0.2.1)
 *   a script that adds user picks when you hover over a link to a user.
 *
 * CHANGES
 * 2005-06-03 - from loonyone, regular expressions handle user info links
 *
 * TODO
 * ? cache images if firefox isn't already cacheing rss/image requests
 * ? search page for existing icons?
 * ? maybe make it look prettier (border around image?)
 *
 * This file is licensed under the BSD-new license:
 * http://www.opensource.org/licenses/bsd-license.php
 */

// ==UserScript==
// @name      Livejournal userpic adder
// @namespace   http://ponderer.org
// @description   adds user pics of LJ user when you over on a journal link
// @include     http://*.livejournal.com/*
// ==/UserScript==

(function() {
  // these could be combined into a single super regex, but it'd be ugly
  var recent_regex = new RegExp("^http://www.livejournal.com/(users|community)/[a-z0-9_]+/?$", "i");
  var info_regex = new RegExp("^http://www.livejournal.com/userinfo.bml.user=[a-z0-9_]+$", "i");
  
  function xpath(expr, doc) {
    if (!doc) {
      doc = document;
    }
    var nodes = doc.evaluate(expr, doc, null,
                             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                             null);
    var ret = [];
    for (var n = 0; n < nodes.snapshotLength; ++n) {
      ret.push(nodes.snapshotItem(n));
    }
    return ret;
  }


  // modified from http://www.quirksmode.org/js/findpos.html
  function findPos(obj) {
    var x = 0, y = 0;
    while (obj.offsetParent) {
      x += obj.offsetLeft;
      y += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return [x,y];
  }
  
  function mouseover(ev) {
    var pos = findPos(this);
    var div = document.createElement('div');
    div.id = 'usericon_hover';
    div.style.position = 'absolute';
    div.style.left = pos[0] + 'px';
    div.style.top = pos[1] - 8 + 'px';
    
    // make the xmlhttprequest and create the object once it returns
    
    // url of the rss feed
    var url = this.href;
    
    if (url.match(info_regex)) {
      url = url.replace(/^.*=/g, "http://www.livejournal.com/users/")
    }
    
    if (url.charAt(url.length-1) != '/')
      url += '/';
    url += 'data/rss';
    
    this.hovering = true;
    var self = this;
    GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {'User-Agent': 'usericon greasemonkey script (tony@ponderer.org)'},
      onload: function (res) {
        if (!self.hovering) // cancel request
          return;
        var parser = new DOMParser();
        var dom = parser.parseFromString(res.responseText, "text/xml");

        var nodes = xpath('//image/url/text()', dom);
        for (var n = 0; n < nodes.length; ++n) {
          var url = nodes[n].nodeValue;
          var img = new Image();
          img.onload = function() {
            div.style.top = parseInt(div.style.top) - img.height + 'px';
            div.innerHTML = '<img src="' + url + '"/>';
            document.body.appendChild(div);
          };
          img.src = url;
          return; // found it, time to quit
        }
      }
    });
  }
  
  function mouseout(ev) {
    // this cancels the request early
    this.hovering = false;
    
    // remove images if they exist
    var elt = document.getElementById('usericon_hover');
    if (elt)
      elt.parentNode.removeChild(elt);
  }
  
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.hasAttribute('href') && 
            (link.href.match(recent_regex) || link.href.match(info_regex))) {
      link.addEventListener('mouseover', mouseover, false);
      link.addEventListener('mouseout', mouseout, false);
    }
  }
})();
