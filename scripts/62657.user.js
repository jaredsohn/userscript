// ==UserScript==
// @name        Amazon.com to Library Lookup
// @description Display the availability of a book in the Whitby Library System (by default) on amazon.com. Can easily to be updated to use other libraries
// @namespace   castaban.com
// @include     *amazon.*
// ==/UserScript==


(function() {
var alltds = document.getElementsByTagName("td");
for (var i=0; i<alltds.length; i++) {
	if (alltds[i].className=="navGreetingBkg") {
		var mytd = alltds[i];
		var menuButton = document.createElement("button");
		menuButton.addEventListener('click', displayLibrary, false);
		mytd.appendChild(menuButton);
		menuButton.style.width="120px";
		menuButton.style.height="25px";
		menuButton.innerHTML="Library Holdings";
		break;
	}
}

  function displayLibrary(event)
  {
	  displayLibResults();
  }

function displayLibResults()
{
  // ********** Auto update the script
  function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
    // Note: Version numbers must be in x.y float format
    try {
      if (!GM_getValue) return;
      // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage and a script with * includes
      var DoS_PREVENTION_TIME = 2 * 60 * 1000;
      var isSomeoneChecking = GM_getValue('CHECKING', null);
      var now = new Date().getTime();
      GM_setValue('CHECKING', now.toString());
      if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
      var lastChecked = GM_getValue('LAST_CHECKED', null);

      var ONE_DAY = 24 * 60 * 60 * 1000;
      if (lastChecked && (now - lastChecked) < ONE_DAY) return;

      GM_xmlhttpRequest({
        method: 'GET',
        url: SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
        onload: function(result) {
          if (result.status != 200) return;
          if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
          var theOtherVersion = parseFloat(RegExp.$1);
          if (theOtherVersion <= parseFloat(SCRIPT.version)) return;
          if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
            GM_openInTab(SCRIPT.url);
          }
        }
      });
      GM_setValue('LAST_CHECKED', now.toString());
    } catch (ex) {
    }
  }
  /*autoUpdateFromUserscriptsDotOrg({
    name: 'Peninsula Library System - Amazon.com & other sources Lookup',
    url: 'http://userscripts.org/scripts/source/1072.user.js',
    version: '3.7'
  })*/;

  // ********** Performance toggle
  function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
    // Load current value into variable
    window[key] = GM_getValue(key, defaultValue);
    // Add menu toggle
    GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
      GM_setValue(key, !window[key]);
      location.reload();
    });
  }





  makeMenuToggle('BIBLIOPHILE', true, "Find ISBNs on all sites", "Find ISBNs only on known sites", "Peninsula Library System");

  // ********** Link individual librarys on plsinfo.org book page
  // This code directly from 'Peninsula Library System Google Print Lookup'
  if (location.href.match(/^http:\/\/catalog\.plsinfo\.org\/(search|record)\//i)) {
    var library_id = new Array(); // library name and id hash table - for building url later

    library_id["Atherton"] = 18;
    library_id["Belmont"] = 19;
    library_id["Bookmobile"] = 44;
    library_id["Brisbane"] = 20;
    library_id["Burlingame"] = 5;
    library_id["Burlingame Easton"] = 6;
    library_id["CaÃ±ada College"] = 36;
    library_id["College of San Mateo"] = 37;
    library_id["Daly City Bayshore"] = 8;
    library_id["Daly City John D. Daly"] = 9;
    library_id["Daly City - Serramonte"] = 7;
    library_id["Daly City - Westlake"] = 10;
    library_id["East Palo Alto"] = 21;
    library_id["Foster City"] = 22;
    library_id["Half Moon Bay"] = 23;
    library_id["Menlo Park"] = 11;
    library_id["Menlo Park, Belle Haven"] = 12;
    library_id["Millbrae"] = 24;
    library_id["Pacifica-Sanchez"] = 26;
    library_id["Pacifica-Sharp Park"] = 25;
    library_id["Portola Valley"] = 27;
    library_id["Redwood City"] = 13;
    library_id["Redwood City, Fair Oaks"] = 14;
    library_id["Redwood City, Redwood Shores"] = 16;
    library_id["Redwood City, Schaberg"] = 15;
    library_id["San Bruno"] = 17;
    library_id["San Carlos"] = 28;
    library_id["San Mateo Main"] = 30;
    library_id["San Mateo - Hillsdale"] = 31;
    library_id["San Mateo - Marina"] = 32;
    library_id["Skyline College"] = 38;
    library_id["South San Francisc, Grand Avenue"] = 41;
    library_id["South San Francisco"] = 33;
    library_id["South San Francisco Community Learning Center"] = 34;
    library_id["Woodside"] = 29;


    var xpathLibraryNameCells = "//tr[@class='bibItemsEntry']/td[1]";
    var libraryNameElems = document.evaluate(xpathLibraryNameCells,
               document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var k = 0; k < libraryNameElems.snapshotLength; k++) { // iterate thru each library name table cell
      var libraryNameElem = libraryNameElems.snapshotItem(k);
      var libraryName = libraryNameElem.innerHTML;
      var namePattern;
      for (var nameKey in library_id) {
        namePattern = new RegExp(nameKey);
        var result;
        if ( (result = namePattern.exec(libraryName)) !=null ) {
          var libName = result[0]
          var newName = libraryName.replace(namePattern, "<a href='http://www.plsinfo.org/library/library.asp?libraryid=" + library_id[nameKey] + "' style='background-color:#FFC'>" + libName + "</a>");
          libraryNameElem.removeChild(libraryNameElem.firstChild);
          libraryNameElem.innerHTML = newName;

          break;
        }
      }
    }
    return;
  }

  function isSiteSupported() {
    return location.href.match(/https?:\/\/([a-z]+\.)?(?:a9\.com\/.+|abebooks\.com|addall\.com|alibris\.com|amazon.*|angusrobertson\.com|barnesandnoble\.com|biblio\.com|biblioquest\.com\.au|biblioz\.com|bigwords\.com|bokkilden\.no|bookfinder\.com|bookmooch\.com|books.google\.com|books\.search.ebay\.com|booksamillion\.com|booksense\.com|bookshelved\.org|bookshop\.unimelb\.edu\.au|bordersstores\.com|buy\.com|c2\.com|chapters\.indigo\.ca|ebayobjects\.com|elaurgonauta\.com|froogle\.google\.com|guardianbookshop\.co\.uk|half.ebay\.com|iblist\.com|ibookdb\.net|isbndb\.com|keplers\.com|librarything\.com\/work|mitpress\.mit\.edu|museophile\.com|old-xisbn\.oclc\.org|ottobib\.com|penguin.*|penguinbooksindia\..*|penguincatalogue\..*|penguingroup\..*|play\.com|powells\.com|safari\.informit\.com|safari\.oreilly\.com|search.ebay\.com|searchbox\.org|shopping\.yahoo\..*|strandbooks\.com|wikipedia\.org|worldcat\.org|worldcatlibraries\.org\/.+)/i);
  }
  if (!isSiteSupported() && !BIBLIOPHILE && !GM_getValue('DEVELOPER', 0)) return;

  // somewhat lax validation of ISBN
  function checkISBN(aISBN) {
    var theISBN = aISBN;
    try {
      theISBN = theISBN.replace(/-+/g, '').replace(/x/g, "X");
      if (! theISBN.match(/^\d{9,12}[\dX]$/)
          || (theISBN.length != 10 && theISBN.length != 13)) { // a multiline string with isbn appended can still trigger get ignored without this check
        if (GM_getValue('DEVELOPER', 0)) {
          unsafeWindow.confirm("Not a valid ISBN (length): " + aISBN + "\n" + theISBN);
        }
        return null;
      }
      if (theISBN.length == 10) {
        var checksum = 0;
        for (i = 0; i < 9; i++) {
          checksum += parseInt(theISBN.charAt(i)) * (10 - i);
        }
        if (theISBN.charAt(9) == "X") {
          checksum += 10;
        } else {
          checksum += parseInt(theISBN.charAt(9));
        }
        if ((checksum % 11) == 0) {
          return theISBN;
        } else {
          if (GM_getValue('DEVELOPER', 0)) {
            unsafeWindow.confirm("Not a valid ISBN (10): " + aISBN + "\n" + theISBN);
          }
          return null;
        }
      } else {
        var checksum = 0;
        for (i = 0; i < 12; i++) {
          checksum += parseInt(theISBN.charAt(i)) * (i % 2 == 0?1:3);
        }
        checksum = 10 - (checksum % 10);
        if (checksum == 10) {
          checksum = 0;
        }
        if (parseInt(theISBN.charAt(12)) != checksum) {
          if (GM_getValue('DEVELOPER', 0)) {
            unsafeWindow.confirm("Not a valid ISBN (13 X but not 0): " + aISBN + "\n" + theISBN);
          }
          return null;
        } else {
          return theISBN;
        }
      }
    } catch(e) {
      if (GM_getValue('DEVELOPER', 0)) {
        unsafeWindow.confirm("Error validating ISBN: " + aISBN + "\n\n" + e);
      }
      return null;
    }
  }

  Array.prototype.addUnique = function (elem) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (this[i] == elem) {
        return;
      }
    }
    this.push(elem);
  }
  function findGenericISBN(theArray) {
    var bodyhtml = document.body.innerHTML;
    while (bodyhtml.match(/ISBN-?(?:10|13)?(?:\&nbsp;|\s|\=|:|,|<[\s\/a-z0-9]+>)*[\n\r]*(?:\&nbsp;|\s|\=|:|,|<[\sa-z0-9\/]+>)*([\dX-]+)((.*[\n\r]*)*)/i)) {
      var maybeMultiple = RegExp.$1;
      bodyhtml = RegExp.$2;
      while (maybeMultiple.match(/\b((?:\d{3}-?)?(?:\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|[\d-]{8,}[\dx]|\d{4}-\d{5}-\d|\d-\d{5}-\d{3}-\d|\d-\d{3}-\d{5}-\d))([\s\n\r,\dX-]*)/i)) {
        theArray.addUnique(RegExp.$1);
        maybeMultiple = RegExp.$2;
      }
    }
    try {
      theArray.addUnique(location.href.match(/isbn(?:-?1[03])?[=\/+:]((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{5}-\d{3}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
    } catch (e){}
    try {
      theArray.addUnique(document.title.match(/isbn(?:-?1[03])?[=\/+:]+((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{5}-\d{3}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
    } catch (e){}
  }
  function $x(exp, ctx) {
    if (!ctx) ctx = document;
    var i, arr = [], r = document.evaluate(exp, ctx, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = r.snapshotItem(i); i++) arr.push(item);
    return arr;
  }
  function getISBN() {
    var results = [];
    var url = location.href;
    try {
      if (url.match(/^https?:\/\/(www\.)?librarything\.com/)) {
        $x("//div[@class='isbn']/a").forEach(function(a) {
          if (a.innerHTML.match(/ISBN\s+((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) results.addUnique(RegExp.$1);
        });
      } else if (url.match(/^https?:\/\/(www\.)?amazon\./)) {
        try {
          results.addUnique(url.match(/[\/=]((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)(\/|\&|;|\?|$)/i)[1]);
        } catch (e) {}
        var thiscontent = document.body.innerHTML;
        var idx = thiscontent.indexOf('ISBN-10:</b>');
        if (idx != -1 && thiscontent.substring(idx+12).match(/^[\n\r\s]*((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
          results.addUnique(RegExp.$1);
        }
        var idx = thiscontent.indexOf('ISBN-13:</b>');
        if (idx != -1 && thiscontent.substring(idx+12).match(/^[\n\r\s]*((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
          results.addUnique(RegExp.$1);
        }
      } else if (url.match(/abebooks\.com/)) {
        try {
          results.addUnique(document.title.match(/ISBN ((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
        } catch (e) {};
        try {
          results.addUnique(document.body.innerHTML.match(/class="isbn">((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
        } catch (e) {};
      } else if (url.match(/\baddall\.com/)) {
        try {
          results.addUnique(url.match(/query=((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
        } catch (e) {};
      } else if (url.match(/\bpowells\.com/)) {
        var dts = document.getElementsByTagName('dt');
        for (var i=0; i<dts.length; i++) {
          if (dts[i].innerHTML.match('ISBN([\s-]?1[03])?:')) {
            results.addUnique(dts[i].nextSibling.firstChild.text);
          }
        }
      } else if (url.match('(alibris|half.ebay).com')) {
        var bs = document.getElementsByTagName('b');
        for (var i=0; i<bs.length; i++) {
          if (bs[i].innerHTML.match('ISBN([\s-]?1[03])?:')) {
            results.addUnique(bs[i].nextSibling.nextSibling.text);
          }
        }
      } else if (url.match('books.google.com')) {
        results.addUnique(url.match(/v?id=ISBN((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
      } else if (url.match(/bookmooch\.com|searchbox.org/)) {
        results.addUnique(url.match(/detail\/((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
      } else if (url.match(/worldcat(libraries)?.org/)) {
        var thiscontent = document.body.innerHTML;
        var idx = thiscontent.indexOf('<strong>ISBN: </strong>');
        if (idx != -1) {
          if (thiscontent.substring(idx+23).match(/[\n\r\s]*((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
            results.addUnique(RegExp.$1);
          }
          if (thiscontent.substring(idx+23).match(/[\n\r\s]*\d+\s+((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
            results.addUnique(RegExp.$1);
          }
        }
      }
      findGenericISBN(results);
    } catch (e) {
      if (GM_getValue('DEVELOPER', 0)) {
        unsafeWindow.confirm(e);
      }
    }
    return results; // sorting doesn't matter as search requests finish out of order
  }
  var thisisbn = getISBN();
  if (!thisisbn || thisisbn.length <= 0) return;
  // DISCOVERY CODE START
  try {
    if (GM_getValue('DEVELOPER', 0) && !isSiteSupported()) {
      var foo = location.href.match(/\/\/([^\/]+)/)[1];
      if (!GM_getValue(foo, false)) {
        window.confirm("ISBN found: " + location.href);
        GM_setValue(foo, 1);
      }
    }
  } catch (ex) {GM_log(e)}
  // DISCOVERY CODE END


  // ********** Drag and Drop START
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
  // ********** Drag and Drop END
  var maindiv;

  // LIBRARY SETTINGS
  var libraryLookup = {
    //libraryUrlPattern : 'http://catalog.plsinfo.org/search/i?SEARCH=',
    libraryUrlPattern : 'http://hip.whitbylibrary.on.ca/ipac20/ipac.jsp?profile=remote&index=ISBNEX&term=',
    //libraryUrlPattern : 'http://catalogue.torontopubliclibrary.ca/uhtbin/cgisirsi/x/0/0/5/?searchdata1=',
    libraryName : 'Whitby Library',
    libraryAvailability : /\bIn Library|Check Shelf|Checked In/i,
    libraryRecentlyReturned : /Recently Returned/i,
    libraryRecentAvailability : /Recent Checkin|Shelving Cart/i,
    libraryCheckedOut : /\bChecked out\b/i,
    libraryStorage : /Storage/i,
    libraryOnHold : /(On Hold Shelf|[Bb]eing [Hh]eld|holds? on \w+ copy returned of \d+ cop|In transit \+\d+ hold)/i,
    libraryProcessing : /IN PROCESSING/i,
    libraryTransit : /(In )?Transit\b|>\s*Transit request\s*</i,
    libraryDueBack : /(\d{2} [A-Z][A-Z][A-Z] \d{2}|DUE \d{2}-\d{2}-\d{2})/i,
    libraryInternet : /INTERNET/,
    libraryWhereIsIt : /Where is it\?/,
    libraryOrdered : /COPY ORDERED|ITEM HAS BEEN ORDERED|On Order|ON-ORDER/i,
    libraryReordered : /REORDERED/i,
    libraryMissing : /MISSING|Copy Missing|Missing/i,
    libraryUseOnly : /LIB\. USE ONLY/i,
    libraryNotFound : /No matches found; nearby STANDARD NOS are|Sorry, could not find anything matching|no matches in the library/,
    libraryMending : /MENDING/i,
    xisbnQuery : 'http://old-xisbn.oclc.org/webservices/xisbn/',
    isbnREplain : /(\d{7,12}[\d|X])/ig,

    insertLinks: function(isbn, avails, hope, isAlternate) {
      var body = document.getElementsByTagName('body')[0];

      // already inserted
      if (document.getElementById('onebook' + isbn)) return;
      var onebook = document.createElement('div');
      onebook.id = 'onebook' + isbn;
      with (onebook.style) {
        display = 'block';
        textAlign = 'left';
        fontFamily = 'arial,sans-serif';
        color = '#120';
        background = 'lightyellow';
        padding = '5px 1px 1px';
        fontSize = '14px';
      }
      onebook.innerHTML = '<b> ' + (isAlternate?"Alternate ":"") + 'ISBN </b> ' + isbn;
      for (var i = 0, len = avails.length; i < len; i++) {
        var hrefTitle = avails[i][0];
        var theColor = avails[i][1];
        var thislink = document.createElement('a');
        with (thislink) {
          href = libraryLookup.libraryUrlPattern + isbn;
		  GM_log("URL: " +href);
          alt = hrefTitle;
          title = hrefTitle;
          textContent = hrefTitle;
        }
        with (thislink.style) {
          display = 'block';
          border = 'outset 2px #120';
          padding = '2px';
          textAlign = 'center';
          color = 'white';
          fontWeight = 'bold';
          background = theColor;
          textDecoration = 'none';
          fontFamily = 'arial,sans-serif';
          margin = '5px 5px 3px';
          fontSize = '14px';
        }
        onebook.appendChild(thislink);
      }
      if (!maindiv) {
        maindiv = document.createElement('div');
        maindiv.id = 'plsdiv';
        with (maindiv.style) {
          left = '8px';
          top = '6px';
          zIndex = '99999';
          border = '1px solid #000033';
          color = '#120';
          padding = '0px';
          position = 'absolute';
          opacity = '0.95';
          textAlign = 'left';
          fontSize = '12px';
        }

        var title = document.createElement('div');
        with (title.style) {
          background = 'lightyellow';
          border = 'solid';
          borderWidth = '0px 0px 1px';
          cursor = 'move';
          fontFamily = 'arial,sans-serif';
          fontSize = '14px';
          fontWeight = 'bold';
          padding = '3px 0px 2px 15px';
          textAlign = 'right';
        }
        title.appendChild(document.createTextNode(' ' + libraryLookup.libraryName + ' '));
        var closeButton = document.createElement('a');
        closeButton.href = 'javascript: closePLS();';
        closeButton.innerHTML = 'X';
        with (closeButton.style) {
          display = 'inline';
          padding = '2px 5px 1px';
          color = 'white';
          cursor = 'pointer';
          textDecoration = 'none';
          border = 'solid 1px 2px 1px 1px white';
          background = '#120';
          fontSize = '12px';
        }
        title.appendChild(closeButton);

        maindiv.appendChild(title);
        body.appendChild(maindiv);
        title.drag = new Drag(title, maindiv);
      }
      if (!hope) {
        maindiv.appendChild(onebook);
      } else {
        maindiv.insertBefore(onebook, maindiv.firstChild.nextSibling);
      }
    },

    donefor : {},
    doLookup : function (isbns) {
      var makeCallback = function(isobune, isAlternate) {
        return function(results) {
          page = results.responseText;
          var availTypes = [];
          var hope = 0;
          if (libraryLookup.libraryNotFound.test(page)) {
            var due = page.match(libraryLookup.libraryNotFound)[1];
            availTypes.addUnique(["Not available." , "#f22"]);
          } else {
            if (libraryLookup.libraryAvailability.test(page)) {
              availTypes.addUnique(["On the shelf now!" , "#00cc66"]);
              hope = 1;
            }
            if (libraryLookup.libraryRecentAvailability.test(page)) {
              availTypes.addUnique(["Recent Checkin" , "#00cc66"]);
              hope = 1;
            }
            if ( libraryLookup.libraryRecentlyReturned.test(page) ) {
              availTypes.addUnique(["Recently Returned" , "#00cc66"]);
              hope = 1;
            }
            if ( libraryLookup.libraryCheckedOut.test(page) ) {
              availTypes.addUnique(["Checked out" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryStorage.test(page) ) {
              availTypes.addUnique(["In Storage" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryProcessing.test(page) ) {
              availTypes.addUnique(["In Processing" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryTransit.test(page) ) {
              availTypes.addUnique(["In Transit" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryOnHold.test(page) ) {
              availTypes.addUnique(["Being Held" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryDueBack.test(page) ) {
              var due = page.match(libraryLookup.libraryDueBack)[1];
              availTypes.addUnique(["Due back" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryMending.test(page) ) {
              availTypes.addUnique(["Mending" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryInternet.test(page) ) {
              availTypes.addUnique(["eBook available" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryOrdered.test(page) ) {
              availTypes.addUnique(["Ordered" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryReordered.test(page) ) {
              availTypes.addUnique(["Reordered" , "orange"]);
              hope = 1;
            }
            if ( libraryLookup.libraryMissing.test(page) ) {
              availTypes.addUnique(["Missing" , "#f22"]);
            }
            if ( libraryLookup.libraryUseOnly.test(page) ) {
              availTypes.addUnique(["Library Use Only" , "orange"]);
              hope = 1;
            }
          }
          if (!availTypes.length) {
            while (page.match(/td\s+width.*22.*>(.+)<\/td>((.*[\n\r]*)*)/i)) {
              var extraType = RegExp.$1;
              page = RegExp.$2;
              extraType = extraType.replace(/<!--.*-->/g,'');
              extraType = extraType.replace(/.nbsp;/g, ' ');
              extraType = extraType.replace(/^\s+/, '');
              extraType = extraType.replace(/\s+$/, '');
              availTypes.addUnique([extraType, "orange"]);
            }
          }
          if (!availTypes.length && libraryLookup.libraryWhereIsIt.test(page) ) { // maybe multiple editions
            availTypes.addUnique(["Click for details" , "orange"]);
          }
          if (!availTypes.length) {
            availTypes.addUnique(["Error: Click for library page. You can check by searching manually." , "red"]);
          }
          libraryLookup.insertLinks (isobune, availTypes, hope, isAlternate);
        };
      };
      for (var i = 0; i < isbns.length ; i++) {
        var isbn = checkISBN(isbns[i]);
        if (isbn && !libraryLookup.donefor[isbn]) {
          libraryLookup.donefor[isbn] = 1;
          GM_xmlhttpRequest ({method : 'GET', url : libraryLookup.libraryUrlPattern + isbn, onload : makeCallback(isbn, false)});
          GM_xmlhttpRequest({
            method:  'GET',
            url:     libraryLookup.xisbnQuery + isbn,
            onload:  function(results) {
              var page = results.responseText;
              var isbnx = page.match(libraryLookup.isbnREplain);
              for (var i = 0; i < isbnx.length; i++) {
                var isbnalt = checkISBN(isbnx[i]);
                if (isbnalt && !libraryLookup.donefor[isbnalt]) {
                  GM_xmlhttpRequest ({method : 'GET', url : libraryLookup.libraryUrlPattern + isbnalt, onload : makeCallback(isbnalt, true)});
                }
              }
            },
          });
        }
      } // for
    } // doLookup
  } // var libraryLookup =




  try {
    libraryLookup.doLookup(thisisbn);
    var head = document.getElementsByTagName('head');
    if (head && head[0]) {
      var s = document.createElement('script');
      s.language='javascript';
      s.type = 'text/javascript';
      s.text = 'function closePLS(){try{document.getElementById("plsdiv").style.display="none"}catch(e){}}';
      head[0].appendChild(s);
    }
  } catch (e) {
    if (GM_getValue('DEVELOPER', 0)) {
      unsafeWindow.confirm(e);
    }
    return;
  }
}


}
)();