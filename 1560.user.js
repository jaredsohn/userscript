// ==UserScript==
// @name        Eastern Shores Library System - Amazon.com & other sources Lookup
// @description Display the availability of a book in the Eastern Shores Library System (WI, USA) on amazon.com, other bookstores and wikipedia book pages
// @namespace   http://loonyone.livejournal.com
// @include     *abebooks.com/*
// @include     *alibris.com/*
// @include     *amazon.*/*
// @include     *barnesandnoble.com/*
// @include     *bookfinder.com/*
// @include     *books.google.com/*
// @include     *booksamillion.com/*
// @include     *bookshelved.org/*
// @include     *bookmooch.com/*
// @include     *bordersstores.com/*
// @include     *buy.com/*
// @include     *c2.com/*
// @include     *half.ebay.com/*
// @include     *librarything.com/work/*
// @include     *mitpress.mit.edu/*
// @include     *penguin.*/*
// @include     *penguingroup.*/*
// @include     *penguinbooksindia.*/*
// @include     *penguincatalogue.*/*
// @include     *powells.com/*
// @include     *wikipedia.org/*isbn=*
// @include     *worldcat.org/*
// @include     *worldcatlibraries.org/*
// @creator     Manpreet Singh |junkblocker<at>yahoo<dot>com|
// @source      http://userscripts.org/scripts/show/1072
// @identifier  http://userscripts.org/scripts/source/1072.user.js
// @version     0.1
// @date        2007-03-11
// ==/UserScript==

// Initially based on Peninsula Library System lookup script
// Work on most sites. More specifically at least on *abebooks.com/*,
// *alibris.com/*, *amazon.*/*, *barnesandnoble.com/*, *bookfinder.com/*,
// *books.google.com/*, *booksamillion.com/*, *bookmooch.com/*,
// *bordersstores.com/*, *buy.com/*, *c2.com/*, *half.ebay.com/*,
// *librarything.com/work/*, *penguin.*/*, *penguingroup.*/*,
// *penguinbooksindia.*/*, *penguincatalogue.*/*, *powells.com/*,
// *wikipedia.org/*isbn=*, *worldcat.org/* & *worldcatlibraries.org/*
//
// Version 0.1 - First release based on Peninsula Library System - Amazon.com & other sources lookup script


(function() {
  // check for updates every day
  /*
  if ((unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates) {
    var lastChecked = GM_getValue('LAST_UPDATE_CHECKED', null);
    var now = new Date().getTime();
    if (!lastChecked || (now - lastChecked) > 24 * 60 * 60 * 1000) {
      GM_setValue('LAST_UPDATE_CHECKED', now.toString());
      var SCRIPT = {
        name: ' Eastern Shores Library System - Amazon.com & other sources Lookup',
        namespace: 'http://loonyone.livejournal.com',
        description:  'Display the availability of a book in the Eastern Shores Library System (WI, USA) on amazon.com, other bookstores and wikipedia book pages'
        source: 'http://userscripts.org/scripts/show/1072',
        identifier: 'http://userscripts.org/scripts/source/1072.user.js',
        version: "0.1",               // version
        date: (new Date(2007, 3 - 1, 11))    // update date
            .valueOf()
      };
      try {
        (unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
      } catch (ex) {}
    }
  }
  */
  Array.prototype.addUnique = function (elem) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (this[i] == elem) {
        return;
      }
    }
    this.push(elem);
  }
  /*
  window.alert = function (msg) {
    if (! window.confirm(msg)) {
      throw 'aborted';
    }
  }*/
  function findGenericISBN(themap) {
    var bodyhtml = document.body.innerHTML;
    while (bodyhtml.match(/ISBN(?:-1[03])?\s*[ =:]\s*(?:<\/?[a-zA-Z0-9]+\s*\/?>)?([\n\r\s\dX-]+)((.*[\n\r]*)*)/i)) {
      var maybeMultiple = RegExp.$1;
      bodyhtml = RegExp.$2;
      while (maybeMultiple.match(/\b((?:\d{3}-?)?(?:\d{9}[\dX]|[\d-]{8,}[\dx]))([\s\n\r\dX-]*)/i)) {
        themap[RegExp.$1]='';
        maybeMultiple = RegExp.$2;
      }
    }
    try {
      themap[location.href.match(/isbn[=\/]((\d{3}-?)?\d{9}[\dX])/i)[1]] = '';
    } catch (e){}
  }
  function getISBN() {
    var results = {};
    try {
      if (location.href.match(/^https?:\/\/(www\.)?librarything\.com/)) {
        var isbns = document.evaluate("//div[@class='isbn']/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0, len = isbns.snapshotLength; i < len; i++) {
          var a = isbns.snapshotItem(i);
          if (a.innerHTML.match(/ISBN\s+((\d{3}-?)?\d{9}[\dX])/i)) {
            results[RegExp.$1] = '';
          }
        }
      } else if (location.href.match(/^https?:\/\/(www\.)?amazon\./)) {
        try {
          results[location.href.match(/(asin|product|dp)[\/=]((\d{3}-?)?\d{9}[\dX])(\/|&|;|\?|$)/i)[2]] = '';
        } catch (e) {}
        var thiscontent = document.body.innerHTML;
        var idx = thiscontent.indexOf('ISBN-10:</b>');
        if (idx != -1 && thiscontent.substring(idx+12).match(/^[\n\r\s]*((\d{3}-?)?\d{9}[\dX])/i)) {
          results[RegExp.$1] = '';
        }
        var idx = thiscontent.indexOf('ISBN-13:</b>');
        if (idx != -1 && thiscontent.substring(idx+12).match(/^[\n\r\s]*((\d{3}-?)?\d{9}[\dX])/i)) {
          results[RegExp.$1] = '';
        }
      } else if (location.href.match('abebooks.com')) {
        try {
          results[document.title.match(/ISBN ((\d{3}-?)?\d{9}[\dX])/i)[1]] = '';
        } catch (e) {};
        try {
          results[document.body.innerHTML.match(/class="isbn">((\d{3}-?)?\d{9}[\dX])/i)[1]] = '';
        } catch (e) {};
      } else if (location.href.match('buy.com')) {
        results[document.title.match(/ISBN ((\d{3}-?)?\d{9}[\dX])/i)[1]] = '';
      } else if (location.href.match('powells.com')) {
        findGenericISBN(results);
        var dts = document.getElementsByTagName('dt');
        for (var i=0; i<dts.length; i++) {
          if (dts[i].innerHTML.match('ISBN(-?1[03])?:')) {
            results[dts[i].nextSibling.firstChild.text] = '';
          }
        }
      } else if (location.href.match('(alibris|half.ebay).com')) {
        var bs = document.getElementsByTagName('b');
         for (var i=0; i<bs.length; i++) {
          if (bs[i].innerHTML.match('ISBN(-?1[03])?:')) {
            results[bs[i].nextSibling.nextSibling.text] = '';
          }
        }
      } else if (location.href.match('books.google.com')) {
        results[location.href.match(/vid=ISBN((\d{3}-?)?\d{9}[\dX])/i)[1]] = '';
      } else if (location.href.match('bookmooch.com')) {
        results[location.href.match(/detail\/((\d{3}-?)?\d{9}[\dX])/i)[1]] = '';
      } else if (location.href.match(/worldcat(libraries)?.org/)) {
        findGenericISBN(results);
        var thiscontent = document.body.innerHTML;
        var idx = thiscontent.indexOf('<strong>ISBN: </strong>');
        if (idx != -1) {
          if (thiscontent.substring(idx+23).match(/[\n\r\s]*((\d{3}-?)?\d{9}[\dX])/i)) {
            results[RegExp.$1] = '';
          }
          if (thiscontent.substring(idx+23).match(/[\n\r\s]*\d+\s+((\d{3}-?)?\d{9}[\dX])/i)) {
            results[RegExp.$1] = '';
          }
        }
      } else {
        findGenericISBN(results);
      }
      return results; // sorting doesn't matter as search requests finish out of order
    } catch (e) {
      return;
    }
  }
  var thisisbn = getISBN();
  if (!thisisbn || thisisbn.count <= 0) return;
  var Drag = function(){ this.init.apply( this, arguments ); };

  Drag.fixE = function( e ) {
    if( typeof e == 'undefined' ) e = window.event;
    if( typeof e.layerX == 'undefined' ) e.layerX = e.offsetX;
    if( typeof e.layerY == 'undefined' ) e.layerY = e.offsetY;
    return e;
  };

  Drag.prototype.init = function( handle, dragdiv ) {
    this.div = dragdiv || handle;
    this.handle = handle;
    if( isNaN(parseInt(this.div.style.left)) ) this.div.style.left  = '0px';
    if( isNaN(parseInt(this.div.style.top)) ) this.div.style.top = '0px';
    this.onDragStart = function(){};
    this.onDragEnd = function(){};
    this.onDrag = function(){};
    this.onClick = function(){};
    this.mouseDown = addEventHandler(this.handle, 'mousedown', this.start, this);
  };

  Drag.prototype.start = function(e) {
    e = Drag.fixE(e);

    this.started = new Date();
    var y = this.startY = parseInt(this.div.style.top);
    var x = this.startX = parseInt(this.div.style.left);
    this.onDragStart(x, y);
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.documentMove = addEventHandler(document, 'mousemove', this.drag, this);
    this.documentStop = addEventHandler(document, 'mouseup', this.end, this);
    if (e.preventDefault) e.preventDefault();
    return false;
  };

  Drag.prototype.drag = function( e ) {
    e = Drag.fixE(e);
    var ey = e.clientY;
    var ex = e.clientX;
    var y = parseInt(this.div.style.top);
    var x = parseInt(this.div.style.left);
    var nx = ex + x - this.lastMouseX;
    var ny = ey + y - this.lastMouseY;
    this.div.style.left = nx + 'px';
    this.div.style.top  = ny + 'px';
    this.lastMouseX = ex;
    this.lastMouseY = ey;
    this.onDrag(nx, ny);
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  };

  Drag.prototype.end = function() {
    removeEventHandler( document, 'mousemove', this.documentMove );
    removeEventHandler( document, 'mouseup', this.documentStop );
    var time = (new Date()) - this.started;
    var x = parseInt(this.div.style.left),  dx = x - this.startX;
    var y = parseInt(this.div.style.top), dy = y - this.startY;
    this.onDragEnd( x, y, dx, dy, time );
   if( (dx*dx + dy*dy) < (4*4) && time < 1e3 ) {
      this.onClick( x, y, dx, dy, time );
    }
  };

  function removeEventHandler( target, eventName, eventHandler ) {
    if( target.addEventListener ) {
      target.removeEventListener( eventName, eventHandler, true );
    } else if( target.attachEvent ) {
      target.detachEvent( 'on' + eventName, eventHandler );
    }
  }

  function addEventHandler( target, eventName, eventHandler, scope ) {
    var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
    if( target.addEventListener ) {
      target.addEventListener( eventName, f, true );
    } else if( target.attachEvent ) {
      target.attachEvent( 'on' + eventName, f );
    }
    return f;
  }

  var libraryUrlPattern = 'http://www.easicat.net/ipac20/ipac.jsp?menu=search&index=ISBNEX&term=';
  var libraryUrlPatternSuffix = '';
  var libraryName = 'Eastern Shores Library System';
  var libraryAvailability = />\s*Checked in\s*</i;
  var libraryCheckedOut = />\s*Checked out\s*</i;
  var libraryTransit = />\s*Transit request\s*</i;
  var notFound = /Sorry, could not find anything matching/;
  var maindiv;

  var libraryLookup = {
    insertLinks: function(isbn, avails) {
      var body = document.getElementsByTagName('body')[0];
      var divStyled=document.createElement('div');
      divStyled.setAttribute('style','border:1px solid #e4e4e4;padding:4px; background:#efefff;font-size: 12px;');

      var thespan = document.createElement('span');
      with (thespan.style) {
        display = 'block';
        border = 'dotted 1px black';
        textAlign = 'left';
        fontFamily = 'arial,sans';
        color = 'black';
        background = '#c0cfcf';
        padding = '2px 1px 1px';
      }
      thespan.innerHTML = '<b> ISBN </b> ' + isbn;
      for (var i = 0, len = avails.length; i < len; i++) {
        var hrefTitle = avails[i][0];
        var theColor = avails[i][1];
        var thislink = document.createElement('a');
        with (thislink) {
          href = libraryUrlPattern + isbn + libraryUrlPatternSuffix;
          alt = hrefTitle;
          title = hrefTitle;
          textContent = hrefTitle;
        }
        with (thislink.style) {
          display = 'block';
          border = 'outset thin black';
          padding = '2px';
          textAlign = 'center';
          color = 'white';
          fontWeight = 'bold';
          background = theColor;
          textDecoration = 'none';
          fontFamily = 'arial,sans';
          margin = '0px 0px 3px';
        }
        thespan.appendChild(thislink);
      }
      divStyled.appendChild(thespan);
      if (!maindiv) {
        maindiv = document.createElement('div');
        maindiv.id = 'trlcdiv';
        with (maindiv.style) {
          left = '200px';
          top = '6px';
          zIndex = '999';
          border = '1px solid #000033';
          color = 'black';
          padding = '0px';
          position = 'absolute';
          opacity = '0.95';
          textAlign = 'left';
        }

        var title = document.createElement('div');
         with (title.style) {
          background = 'rgb(153,204,255)';
          border = 'solid';
          borderWidth = '0px 0px 1px';
          cursor = 'move';
          fontFamily = 'dialog,arial,sans';
          fontSize = '12px';
          fontWeight = 'bold';
          padding = '3px 0px 2px 15px';
          textAlign = 'right';
        }
        title.appendChild(document.createTextNode(' ' + libraryName + ' '));
        var closeButton = document.createElement('a');
        closeButton.href = 'javascript: closeTRLC();';
        closeButton.innerHTML = 'X';
        with (closeButton.style) {
          display = 'inline';
          padding = '2px 6px 1px';
          color = 'white';
          cursor = 'pointer';
          textDecoration = 'none';
          border = 'solid 1px white';
          background = '#069';
        }
        title.appendChild(closeButton);

        maindiv.appendChild(title);
        body.appendChild(maindiv);
        title.drag = new Drag(title, maindiv);
      }
      maindiv.appendChild(divStyled);
    },

    doLookup : function (isbns) {
      var makeCallback = function(isobune) {
        return function(results) {
          page = results.responseText;
          var availTypes = [];
          if (notFound.test(page)) {
            var due = page.match(notFound)[1];
            availTypes.addUnique(["Not available." , "#f66"]);
          } else {
            if (libraryAvailability.test(page)) {
              availTypes.addUnique(["On the shelf now!" , "#00cc66"]);
            }
            if (libraryCheckedOut.test(page)) {
              availTypes.addUnique(["Checked out" , "orange"]);
            }
            if (libraryTransit.test(page)) {
              availTypes.addUnique(["Transit Request" , "orange"]);
            }
          }
          if (!availTypes.length) {
            while (page.match(/(?:white|FCFDC|ormation)">(.+)<\/a>((.*[\n\r]*)*)/i)) {
              var extraType = RegExp.$1;
              page = RegExp.$2;
              extraType = extraType.replace(/<!--.*-->/g,'');
              extraType = extraType.replace(/.nbsp;/g, ' ');
              extraType = extraType.replace(/^\s+/, '');
              extraType = extraType.replace(/\s+$/, '');
              availTypes.addUnique([extraType, "orange"]);
            }
          }
          if (!availTypes.length) {
            availTypes.addUnique(["Error: Click for library page. You can check by searching manually." , "red"]);
          }
          libraryLookup.insertLinks (isobune, availTypes);
        };
      };
      for (var isbn in isbns) {
        GM_log(libraryUrlPattern + isbn + libraryUrlPatternSuffix);
        GM_xmlhttpRequest ({method : 'GET', url : libraryUrlPattern + isbn + libraryUrlPatternSuffix, onload : makeCallback(isbn)});
      }
    }
  }

  try {
    libraryLookup.doLookup(thisisbn);
    var head = document.getElementsByTagName('head');
    if (head && head[0]) {
      var s = document.createElement('script');
      s.language='javascript';
      s.type = 'text/javascript';
      s.text = 'function closeTRLC(){try{document.getElementById("trlcdiv").style.display="none"}catch(e){}}';
      head[0].appendChild(s);
    }
  } catch (e) {
    return;
  }
}
)();