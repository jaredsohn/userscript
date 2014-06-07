// IMDB Torrents Linker 2.5

// ==UserScript==
// @name          IMDB Torrents Linker
// @author        Arvid, sowrov
// @namespace     http://determinist.org/greasemonkey/
// @description   Places links to various torrentsites on IMDB. Version 2.4

// @include       http://www.imdb.com/title/*/*
// ==/UserScript==

/*
Changelog:
2011-08-02      2.5 (sowrov)
* IMDB update there UI all the time? :-w

2011-03-13      2.4 (sowrov)
* Modified to work with new imdb interface

2009-10-28      2.3
* Rewrote most of the code
* Works again
* Removed support for most of the trackers, most of them long gone
* Now supports torrentz.com, thepiratebay.org and mininova.com.
* The suppport for AKAs may be fubared, please report bugs

2006-08-10	2.2a
* This is just a small fix for some minor html-changes on imdb
* Some small fixes.

2005-08-16	2.2	
* Added the tracker object
* More cleanup.
* Added a link to Torrent Typhoon (excellent searchpage, recommended)
Torrent Typhoon searches The Pirate Bay and Mininova, so I removed them.
But i kept the ability to search on IMDB-ID on Mininova
* Added the open all in tabs function. It only works in Greasemonkey 0.5 though

2005-08-14	2.1
* Removed non-ascii chars.
* Added the xpath function
* Added the license block
* General cleanup

*/

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/
//http://www.kickasstorrents.com/search/pirates-of-the-caribbean/?categories[]=movies
var ImdbTorrentsLinker = {
 trackers: [new SearchEngine('TPB',
                             'http://thepiratebay.org/favicon.ico',
                             'http://thepiratebay.org/search.php?video=on&q=%title',
							 'The Piratebay',
                             false),
			new SearchEngine('Ext',
                             'http://extratorrent.com/favicon.ico',
                             'http://extratorrent.com/search/?search=%title&s_cat=4&new=1',
							 'Extra Torrent',
                             false),
			new SearchEngine('TZ',
                             'http://www.torrentz.com/favicon.ico',
                             'http://www.torrentz.com/search?q=%title',
							 'Torrentz',
                             false),
			new SearchEngine('KA',
                             'http://www.kickasstorrents.com/favicon.ico',
                             'http://www.kickasstorrents.com/search/%title/?categories[]=movies',
							 'Kickass torrents',
                             false),
            new SearchEngine('MN',
                             'http://mininova.org/favicon.ico',
                             'http://mininova.org/search/?cat=4&search=%title',
							 'Mininova',
                             false),
            new SearchEngine('IH',
                             'http://isohunt.com/favicon.ico',
                             'http://isohunt.com/torrents.php?ihq=%title',
							 'Isohunt',
                             false),
            new SearchEngine('TB',
                             'http://torrentbytes.net/favicon.ico',
                             'http://torrentbytes.net/browse.php?incldead=0&search=%title',
							 'Torrentbytes',
                             false),
            new SearchEngine('BT',
                             'http://www.bittorrent.am/favicon.ico',
                             'http://www.bittorrent.am/search.php?kwds=%title&cat=4',
							 'Bittorrent',
                             false)
            ],

 title: '',
 id: '',

 init: function() {
    this.title = this.getTitle();
    this.id = this.getId();
    
    this.addStyles();
    this.addIconBarIcons();
    this.addAkaIcons();
  },

 openAllInTabs: function (ti, trs) {
    var that = this;
    trs.forEach(function (t) {
        GM_openInTab(t.getSearchUrl(ti, that.id));
      });
  },

 getTitle: function() {
    return document.title.match(/^(.*) \(/)[1];
  },

 getId: function() {
    return location.href.match(/title\/tt(.*?)\//i)[1];
  },

 addIconBarIcons: function () {
    var stars = $('overview-top');

    var trackerBar = createEl({n: 'div', a: {'@class': 'info', '@style':'float:left'}});
    createEl({n: 'b', a: {textContent: 'Trackers:'}}, trackerBar);

    var trackerList = this.createTrackerListNode(this.title, this.trackers);
    trackerBar.appendChild(trackerList);
    //alert(stars.parentNode);
    stars.appendChild(trackerBar);
    //stars.insertBefore(trackerBar, stars.nextSibling);
    //stars.parentNode.insertBefore(trackerBar, stars.nextSibling);
    createEl({n: 'br'}, trackerBar);
  },


 createTrackerListNode: function(ti, trs) {
    var tl = createEl({n: 'ul', a: {'@class': 'tracker-list'}});
    var that = this;
    trs.forEach(function (t) {
        var li = createEl({n: 'li'}, tl);
        li.appendChild(t.getIconNode(ti, that.id));
      });

    if (GM_openInTab) {
      var tdopenall = createEl({n: 'li'}, tl);
      var aopenall = createEl({n: "a", a: {'href': 'javascript:;', '@class': 'openall', 'innerHTML': "Open All"}}, tdopenall);
      aopenall.addEventListener("click", curry(this.openAllInTabs, this, ti, trs), false);
    }
    
    return tl;
  },
 
 addAkaIcons: function () {
    var aka = $xs("//div[@class='info' and h5/text()[contains(., 'Also')]]");
    if (!aka)
      return;

    
    var akaTitleNode = $x("./text()", aka);
    akaTitleNode = akaTitleNode.filter(function (t) { return (trim(t.textContent) != ""); });
    if (akaTitleNode.length != 1)
      return;
    akaTitleNode = akaTitleNode[0];
    var akaTitle = akaTitleNode.textContent.match(/^(.*?)\s+\(.*?\)\s+$/)[1];

    var noIdTrackers = this.trackers.filter(function (t) { return !t.usesIMDBID; });
    console.log(noIdTrackers);
    console.log(noIdTrackers.length);
    var tlist = this.createTrackerListNode(akaTitle, noIdTrackers);


    akaTitleNode.parentNode.insertBefore(tlist, akaTitleNode.nextSibling);
  },

 addStyles: function () {
    var open_all_class = "a.openall {\n" +
    "	font-weight: 401;\n" + 
    "	font-family: Verdana, Arial, Helvetica, sans-serif;\n" +
    "	font-size: 10px\n" +
    "}" +
    "ul.tracker-list {" +
    "list-style-type: none;" + 
    "display: inline;" +
    "margin: 0;" +
    "padding: 0;" +
    "}" +
    "ul.tracker-list li {" +
    "display: inline;" +
    "margin-right: 0.4em;" +
    "}";
	
    GM_addStyle(open_all_class);
  }
};

ImdbTorrentsLinker.init();

/*
 * SearchEngine class
 */
function SearchEngine(shortname, icon, searchurl, fullName, usesIMDBID) {
  this.shortname = shortname;
  this.icon = icon;
  this.searchurl = searchurl;
  this.usesIMDBID = usesIMDBID;
	
  this.getIconNode = function(title, id) {
    var ino = createEl({n: 'a', a: {'href': this.getSearchUrl(title, id)}});
    if (this.icon) {
      var img = createEl({n: 'img', a: {'width': '16', 'height': '16', 'border': '0', 'src': this.icon, 'alt': this.shortname, 'title': fullName}}, ino);
    }
    else {
      ino.appendChild(document.createTextNode(this.shortname));
    }
    return ino;
  }
	
  this.getSearchUrl = function (title, id) {
    var searchUrl = this.searchurl;
    if (this.usesIMDBID)
      return searchUrl = searchUrl.replace(/%imdb\-id/, id);
    else
      return searchUrl = searchUrl.replace(/%title/, encodeURIComponent(title));
  }
}

// --------------- Boilerplate  ---------------  

function createEl(elObj, parent) {
  var el;

  el = document.createElement(elObj.n);
  if (elObj.a) {
    attributes = elObj.a;
    for (var key in attributes) {
      if (typeof(attributes[key]) == 'string') {
        if (key.charAt(0) == '@')
          el.setAttribute(key.substring(1), attributes[key]);
        else 
          el[key] = attributes[key];
      }
    }
  }
  if (elObj.c) {
    elObj.c.forEach(function (v) { createEl(v, el); });
  }
  if (elObj.el) {
    el.addEventListener(elObj.el.e, elObj.el.l, elObj.el.b ? elObj.el.b : false);
  }
  if (parent) {
    parent.appendChild(el);
  }
  return el;
}


function $x(xpath, root) { // From Johan Sundström
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
  while(next = got.iterateNext())
    result.push(next);
  return result;
}

function $xs(xpath, root) {
  return $x(xpath, root)[0];
}

function bind(method, obj) {
  return function() {
    method.apply(obj, arguments);
  };
}

function curry(method, obj) {
  var curryargs = $A(arguments).slice(2);
  return function() { return method.apply(obj || window, curryargs.concat($A(arguments))); };
}

function $(id) {
  return document.getElementById(id);
}


function $A(arr) {
  var r = [], len = arr.length;
  while (len--) r.unshift(arr[len]);
  return r;
}

function trim(str) {
  return str.replace(/^\W+|\W+$/gi, "");
}
