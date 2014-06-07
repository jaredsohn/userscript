// Version 0.1
//
// ==UserScript==
// @name          LinkBack
// @namespace     http://hyperphor.com
// @description   For any page, show some of the pages that point to it.
// @include       *
// @exclude       *.google.*
// @exclude       *.gmail.*
// @exclude       *.yahoo.*

// ==/UserScript==
// Based on Peninsula Library lookup
// Version 0.1 - First release


function debug(aMsg) {
    // uncomment for debugging messages
    //   setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);
}

function getElementText(node) {
    return node.firstChild.nodeValue;
}

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

  var appID = 'LinkBack';  // assigned through Yahoo
  var nResults = 10;

  function makeQueryUrl(pageUrl) {
      return 'http://search.yahooapis.com/WebSearchService/V1/webSearch?appid='
	  + appID 
	  + "&query=" 
	  + encodeURI("link:")
	  + encodeURI(pageUrl) 
	  + "&results=" + nResults;
  }

  function makeMoreUrl(pageUrl) {
      return 'http://search.yahoo.com/search?p='
	  + encodeURI("link:")
	  + encodeURI(pageUrl); 
  }

  var linkWindow = null;
  makeWindow = function() {
      if (linkWindow == null) {

	  var body = document.getElementsByTagName('body')[0];
	  var div = document.createElement('div');
	  div.setAttribute('id', 'LinkBack');
	  div.setAttribute('style','position:absolute;top:0px;left:0px;z-index:1999;background-color:#ffff00;opacity:0.85;border:1px solid #000000;color:#000000;padding: 0px;');

	  var title = document.createElement('div');
	  var label = document.createTextNode( 'Linkback' );
	  title.appendChild(label);
	  title.setAttribute('style','background:#0000FF;cursor:move;color:white;');
	  div.appendChild(title);

	  var divStyled=document.createElement('div');
	  divStyled.setAttribute('style','border:1px solid #e4e4e4;padding:1em; background:#efefff;text-align: left');
	  
	  div.appendChild(divStyled);
	  body.appendChild(div);
	  
	  title.drag = new Drag(title, div);
	  linkWindow = divStyled;
      }
      return linkWindow;
  }

  // doesn't work. (and unused)
  relocate = function() {
      //      window.left = document.width - window.width;
      //      window.pixelLeft = document.body.clientWidth - window.offsetWidth;
      debug(window.innerWidth);
      debug(linkWindow.style.width);
      debug(linkWindow.style.left);
      debug(linkWindow.left);
      debug(linkWindow.style.pixelLeft);
      //      linkWindow.style.left = window.innerWidth - linkWindow.style.width;
      linkWindow.visibility = 'hide';
      linkWindow.style.left = (window.innerWidth - 250) + 'px';
      linkWindow.visibility = 'show';
  }


    insertLink = function(url, hrefTitle, aLabel ) {

	var container = makeWindow();

	var link = document.createElement('a');
	link.setAttribute ( 'title', hrefTitle );
	link.setAttribute('href', url);
	link.setAttribute('style','text-align: left;font: 8pt sans-serif;color: black');
	var label = document.createTextNode( hrefTitle );
	link.appendChild(label);

	container.appendChild(link);
	container.appendChild(document.createElement('br'));

    }

    doLookup = function (pageUrl) {

	debug('query url: ' + makeQueryUrl(pageUrl));

      GM_xmlhttpRequest ({
	  method : 'GET', 
	  url : makeQueryUrl(pageUrl),
	  onload : function(response) {
	      var parser = new DOMParser();
	      var responseXML = parser.parseFromString(response.responseText, "text/xml");
	      var root = responseXML.getElementsByTagName("ResultSet");
	      var results = root[0].getElementsByTagName("Result");
	      for (var i=0; i<results.length; i++) {

		  var result = results[i];
		  var url = getElementText(result.getElementsByTagName("Url")[0]);
		  var title = getElementText(result.getElementsByTagName("Title")[0]);
		  var displayUrl = getElementText(result.getElementsByTagName("DisplayUrl")[0]);
		  insertLink(url, title, displayUrl);
	      }
	      
	      if (results.length > 0) {
		  insertLink(makeMoreUrl(pageUrl), "More...", "More...");
		  //		  relocate();
	      }

	  }
      });
    }

    doLookup(document.location.href);

}
)();


