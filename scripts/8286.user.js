// ==UserScript==
// @name          Google Books - Peninsula Library System Lookup
// @namespace     http://www.japaninyourpalm.com
// @description   Display the availability of Google Books search result in the San Francisco Peninsula Library System and add hyperlinks to maps & hours on Peninsula Library results page
// @include       http://books.google.com/books?vid*
// @include       http://books.google.com/books?id*
// @include       http://catalog.plsinfo.org/search/i?SEARCH*

// ==/UserScript==
// Version 1.7 - altered amazon isbn search pattern
// Version 1.6 - indicate if book is avail as on online book - Jan 2008
// Version 1.5 - Updates to find book title on google - December 2007
// Version 1.4 - updated ISBN finder again - now just seeks any amazon ink 
// Version 1.3 - updated my ISBN finder on google's book page
// Version 1.2 - improved the book DUE reg expression & looser books.google url test

// Version 1.1 - tidy and remove GM_log statements
// Version 1.0 -
// Integrated into Google Print book search results to let you know if the book you're paging through is 
// available at a San Francisco Peninsula library.  The script puts a small yellow box in the corner of 
// your Google Print book search. Box includes job title. The script also linkifies the library names, 
// on the library lookup results page, to point to the library's streetmap, hours and phone.
// (this GM script acts on 2 completely seperate pages)
// 
// Based on Junk Blocker's Peninsula Library System Amazon Lookup
// http://userscripts.org/scripts/show/1072
// which is based on...
// Library Lookup
// http://userscripts.org/scripts/source/886
//
// Note:
// Google Print has a "Find this book in a library" link, which I found often uses an ISBN number 
// which  doesn't match the book I'm looking at.
// The floating div approach used here is much nicer anyway in that it tells me immediately if the
// book is avalable locally.
//
// To Do: 
// - add Santa Clara County library lookup to the same div
// - add web service xISBN to search on alternate ISBN #s, since libraries usually carry older
//   hard cover versions of the more recent book/ISBN you find on google print. 

(function() {
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
    if( isNaN(parseInt(this.div.style.right)) ) this.div.style.right  = '0px';
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
    var x = this.startX = parseInt(this.div.style.right);
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
    var x = parseInt(this.div.style.right);
    var nx = -ex + x + this.lastMouseX;
    var ny = ey + y - this.lastMouseY;
    this.div.style.right = nx + 'px';
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
    var x = parseInt(this.div.style.right),  dx = x - this.startX;
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

  // Define library search URL/API and book status regular expressions
  var libraryUrlPattern = 'http://catalog.plsinfo.org/search/i?SEARCH=';
  var libraryUrlPatternSuffix = '&searchscope=1';
  var libraryName = 'Peninsula Library System';
  var libraryAvailability = /In Library|Check Shelf/i;
  var libraryRecentlyReturned = /Recently Returned/i;
  var libraryRecentAvailability = /Recent Checkin/i;
  var libraryStorage = /Storage/i;
  var libraryOnHold = /(On Hold Shelf|[Bb]eing [Hh]eld|holds? on \w+ copy returned of \d+ cop|In transit \+\d+ hold)/i;
  var libraryTransit = /In Transit/i;
//  var libraryDueBack = /(\d{2} [A-Z][A-Z][A-Z] \d{2}|DUE \d{2}-\d{2}-\d{2})/i;  
  var libraryDueBack = /DUE (\d{2}-\d{2}-\d{2})/i;
  var libraryReordered = /REORDERED/i;
  var libraryInternet = /INTERNET/;  
  var notFound = /No matches found; nearby STANDARD NOS are/

  var libraryLookup = {
    insertLink: function(isbn, titleText, hrefTitle, aLabel, color ) {
      var body = document.getElementsByTagName('body')[0];
      var div = document.createElement('div');
      div.setAttribute('style','right:92px;top:2px;width=170px;z-index:999;padding:3px 3px 3px 3px; background-color:#FFC; text-align:center;border:1px solid green;color:#000000;opacity:0.86;font-family:san-serif;font-size:small;position: absolute;');
                 
      var title = document.createElement('div');
      var label = document.createTextNode( 'Peninsula Library System' );
      title.appendChild(label);
      title.setAttribute('style','background:#008000;cursor:move;color:white;');
      div.appendChild(title);

      var divStyled=document.createElement('div');
	  divStyled.setAttribute('style','border:0px;padding:1em; background:#FFC');


      var bookTitleShort = titleText.substring(0,26) + " ...";
      var bookTitle = document.createTextNode(bookTitleShort);	    
      var link = document.createElement('a');
      link.setAttribute ( 'title', hrefTitle );
      link.setAttribute('href', libraryUrlPattern + isbn + libraryUrlPatternSuffix);
      link.setAttribute('target','_blank');
      link.setAttribute('style','color: ' + color);

      var label = document.createTextNode( aLabel );

      link.appendChild(label);
      divStyled.appendChild(bookTitle);
      divStyled.appendChild(document.createElement("br"));      

      divStyled.appendChild(link);
      
      div.appendChild(divStyled);
      body.appendChild(div);

      title.drag = new Drag(title, div);
    },

    doLookup : function (isbn, titleText) {
      GM_xmlhttpRequest ({
        method : 'GET', url : libraryUrlPattern + isbn + libraryUrlPatternSuffix, onload : function(results) {
          page = results.responseText;
          if (notFound.test(page)) {
            var due = page.match(notFound)[1];
            libraryLookup.insertLink (isbn, titleText, "Not carried", "Not in Library", "red");
          } else if (libraryAvailability.test(page)) {
            libraryLookup.insertLink (isbn, titleText, "On the shelf now!", "In Library", "green");
          } else if (libraryRecentAvailability.test(page)) {
            libraryLookup.insertLink (isbn, titleText, "Recent Checkin", "New In Library", "green");
          } else if ( libraryRecentlyReturned.test(page) ) {
            libraryLookup.insertLink (isbn, titleText, "Recently Returned", "Recently Returned", "green");
          } else if ( libraryStorage.test(page) ) {
            libraryLookup.insertLink (isbn, titleText, "In Storage", "In Storage", "green");
          } else if ( libraryOnHold.test(page) ) {
            libraryLookup.insertLink (isbn, titleText, "Being Held", "On Hold", "green");
          } else if ( libraryTransit.test(page) ) {
            libraryLookup.insertLink (isbn, titleText, "In Transit", "In Transit", "#AA7700");
          } else if ( libraryDueBack.test(page) ) {
            var due = page.match(libraryDueBack)[1];
            libraryLookup.insertLink ( isbn, titleText, "Due back " + due, "Due back " + due, "#AA7700");
          } else if ( libraryReordered.test(page) ) {
            libraryLookup.insertLink (isbn, titleText, "Reordered", "Reordered", "#AA7700");
          } else if ( libraryInternet.test(page) ) {
            libraryLookup.insertLink (isbn, titleText, "Internet Book", "Available as an online book", "#AA7700");            
          } else {
            libraryLookup.insertLink (isbn, titleText, "Error: Click for library page", "Error checking " + libraryName + " Library", "orange");
					}
        }
      });
    }
  }

  
  try { 	
  	// note this script only runs on Google Print results or Peninsula library system results pages
  	
  	// OLD var isbnPattern = /books.google.com\/books\?vid\=ISBN(\d+)[A-Z]*/;  // Google Print's ISBN pattern
  	var booksGooglePattern = /books.google.com\/books\?id/; //Google Print's URL
  	
  	// Check if we're on Google Print
  	if (booksGooglePattern.test(document.location)) {  // find Amazon link's ISBN #
  		// var isbnXPath = "/html/body/table[@id='viewport_table']/tbody/tr[2]/td[@id='menu_td']/div[@id='menu_container']/div[@id='menu']/div[8]/div/div[@id='buy_content']/div[@id='buy_v']/table/tbody/tr[1]/td/div/a";
  		var isbnXPath = "//a[contains(@href, 'amazon')]";

        var isbnNode = document.evaluate(isbnXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;  		
  		
  		var isbnPatternAmazonURL = /ASIN\/([A-Z0-9]+)&/;  // find isbn at end of amazon url

        var isbn = isbnNode.href.match(isbnPatternAmazonURL)[1];

        // 12/13/2007, i noticed Google changed the page's structure a little
        // so I'll start using the html page title for extracting a book title
           
        var pageTitleText =  document.title;
        var titleExpression = /(.*?)\s- Google/;
        var titleRE = titleExpression.exec(pageTitleText);
        var titleText = titleRE[1];
        libraryLookup.doLookup(isbn, titleText);  
          
  	}
  	else { // We must be on Peninsula library results page
  	
        var library_id = new Array(); // library name and id hash table - for building url later
        
        library_id["Atherton"] = 18;
        library_id["Belmont"] = 19;
        library_id["Bookmobile"] = 44;
        library_id["Brisbane"] = 20;
        library_id["Burlingame"] = 5;
        library_id["Burlingame Easton"] = 6;
        library_id["Cañada College"] = 36;
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
        
  	} // end else on Peninsula library page
  	
  } catch (e) {
      // window.alert("Could not locate ISBN or something else not right");
    return;
  }


}
)();


