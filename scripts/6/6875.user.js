// Version 0.1
//
// ==UserScript==
// @name          Amazon->WorldCat Lookup
// @namespace     http://hyperphor.com
// @description   Puts a link to Worldcat on Amazon book pages
// @include       *.amazon.*/*

// ==/UserScript==
// Based on Peninsula Library lookup script.  But doesn't actually do a lookup, because
// WorldCat always returns SOMETHING. So we just provide a handy link.
//
// Version 0.1 - First release

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

  var libraryUrlPattern = 'http://worldcat.org/isbn/'
  var libraryName = 'WorldCat';
  var iconUrl = 'http://outgoing.typepad.com/photos/uncategorized/worldcat48.gif';

  var libraryLookup = {

    insertGLink: function(isbn) {
	var body = document.getElementsByTagName('body')[0];
	var div = document.createElement('div');
	div.setAttribute('style','left:200px;top:0px;z-index:999;color:#000000;padding: 0px;position: absolute;');

      var title = document.createElement('div');
	var label = document.createTextNode( 'WorldCat' );
	title.appendChild(label);
	title.setAttribute('style','background:#FFFF99;cursor:move;color:black;border:1 px;');
	div.appendChild(title);

	var link = document.createElement('a');
	link.setAttribute('href', libraryUrlPattern + isbn);

	var img = document.createElement('img');	
	img.setAttribute('src', iconUrl);	
	link.appendChild(img);
	div.appendChild(link);
	body.appendChild(div);

      title.drag = new Drag(title, div);
    }
  }

  try {
    var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])(\/|$)/)[1];
  } catch (e) {
      // window.alert("Could not locate ISBN");
    return;
  }

  libraryLookup.insertGLink(isbn);

}
)();


