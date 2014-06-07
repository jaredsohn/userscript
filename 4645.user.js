/*

 (C) 2005 Johan Sundström (0.13 .. 0.18)
 License: Creative Commons "Attribution-ShareAlike 2.0"
 http://creativecommons.org/licenses/by-sa/2.0/

 Skeletal parts of DOM-Drag by Aaron Boodman, 2001
 http://www.youngpup.net/2001/domdrag
 License: Creative Commons "Attribution-ShareAlike 2.0"
 http://creativecommons.org/licenses/by-sa/2.0/

 (C) 2005 Jesse Andrews, Britt Selvitelle under cc-by-sa
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/

 Snipits used from RSS Reader for GreaseMonkey
 http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel/
 Version: 1.03 (C) 2005 Johannes la Poutre
 THANKS!

 Changelog:

  *  2006-07-10  *

 0.2 - Adopted into a tiny user script for cross-browsing the 43* sites.

  *  2006-06-02  *

 0.1 - Refactored BookBurro 0.18 into a generic *-burro UI component
     / Johan Sundström, oyasumi+43sites@gmail.com

*/

// ==UserScript==
// @name          43sites
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   Adds a crosslinking panel between the various 43* sites.
// @include       http://*.43people.com/*
// @include       http://*.43places.com/*
// @include       http://*.43things.com/*
// @include       http://*.allconsuming.net/*
// @include       http://*.listsofbests.com/*

// ==/UserScript==

var debug = 0;

var Icons =
{
  carrotRight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCR020Q08hgAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAiklEQVQY07XPIQoCURSF4e8NAzYxGicNuAa1WlyCO3AlZnfiNgwahQFxikkcBIsGfaZpzgODJ/4c/nMvPyR8g7EsephgH6q6aXnWIelhjkUsi0EL88TqFUfMYlnscMoS5wUccMYS4yxhfuGNPho88oQ5xxQjrHHpKkcMccMqVPU99eATG2zb4n/zAS4OHrV1hIB/AAAAAElFTkSuQmCC',
  carrotDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCRoeq/kCuwAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAmElEQVQY083QMUoDARSE4W92U2xhkxSpAgY0AXMQ29zCM3iSXEXQTrCws44Im85CkO1jnq2KKQWnGxiY+Yd/oXw1tTrr7D86CYdD5Xk3HA8vTi8la7xW1T5Jg8IEN6PvPXnEAkOa5l5Viwuc4yk/d9VyfoLrqnpIMmCGu2z79/wGUsv5FFcYY5Nt/wKjI+BvuEWnbfu///kTargo75QVC5oAAAAASUVORK5CYII=',
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDcSg6d+SAAAAPBJREFUKM+Fkr1qAkEURs9dnWBrJT5IHkEw4gtEsBQs/AlpkiKlJGnEJlqIjRbrPoAQYhPio1hGsPAHFoW5KSIxo7J7qvlgDty534j6Rolgt987OQnA7XuEsTuegwIeMYiIkx2hVnsjCL7+su9/0mz2Lox0oNOpUiw+kc2mUVWGww8mkxYiYK09F4xJMho9kMs9IiJMpy8Y83vFWkUTCVcAWCxWLJcrRIT1OiSTOczuCXieK2y3IeXyK4PBPZtNSKn0zGzWJpW6uvyGer1LpVIgn78GYD7/ptHo0e/fHbemvtHIHv4zvonv4ayXuK9xyg8qt0tfe9qKPAAAAABJRU5ErkJggg==',
};


// document.getElementById, but ask for several ids for an array of those nodes
function $( ids, /* optional: */ doc )
{
  if( typeof ids == 'string' )
    return (doc || document).getElementById( ids );
  for( var i=0; i<ids.length; i++ )
    ids[i] = (doc || document).getElementById( ids[i] );
  return ids;
}

function maketag( name, attr, content, styles )
{
  var tag = document.createElement( name ), child;
  if( attr )
    for( name in attr )
      tag.setAttribute( name, attr[name] );
  if( !(content instanceof Array ) )
    content = [ content ];
  while( child = content.shift() )
  {
    if( typeof child == 'string' )
      child = document.createTextNode( child );
try{
    tag.appendChild( child );
}catch(e){prompt(e,(child?child.nodeName||'child was a '+(typeof child)+'='+child.toSource():'no child')+" in "+tag.nodeName);}
  }
  if( styles )
    for( name in styles )
      tag.style[name] = styles[name];
  return tag;
}

function A( a, c, s ) { return maketag( 'a', a, c, s ); }
function DIV( a, c, s ) { return maketag( 'div', a, c, s ); }
function SPAN( a, c, s ) { return maketag( 'span', a, c, s ); }
function IMG( a, s ) { return maketag( 'img', a, null, s ); }

function link( url, txt, id, title )
{
  var a = { target:'_top', href:url };
  if( id ) a.id = id;
  if( title ) a.title = title;
  return A( a, txt, {color:'#00A', textDecoration:'none', fontWeight:'bold'} );
}

function tableRow( url, title, loc_id )
{
  var tr_style = {}, id = 'burro-'+ loc_id;
  var tl_style = { paddingLeft:'3px' };
  var tr_style = { paddingRight:'5px' };
  if( document.all ) // IE only
  {
    tr_style.position = 'relative';
    tr_style.textAlign = 'right';
    tr_style.position = 'absolute';
    tr_style.left = '10em';
    tr_style.width = '4em';
  }
  else // other browsers
  {
    tr_style.display = 'table-row';
    tl_style.display = 'table-cell';
    tr_style.display = 'table-cell';
  }
  var a = link( url, title, id+ '-toggle' );
  var td_left = SPAN( {}, a, tl_style );
  var td_right = SPAN( { id:id }, '', tr_style );
  return DIV( {}, [td_left, td_right] );
}

function randomPick( what )
{
  if( typeof what == 'number' )
    return Math.round( Math.random() * what );
  if( !(what instanceof Array ) )
    throw( 'Can only randomize numbers and arrays.' );
  return what[randomPick( what.length-1 )];
}

function removeEventHandler( target, eventName, eventHandler )
{
  if( target.addEventListener )
    target.removeEventListener( eventName, eventHandler, true );
  else if( target.attachEvent )
    target.detachEvent( 'on' + eventName, eventHandler );}


function addEventHandler( target, eventName, eventHandler, scope )
{
  var f = scope ? function(){ eventHandler.apply( scope, arguments ); }
		: eventHandler;
  if( target.addEventListener )
    target.addEventListener( eventName, f, true );
  else if( target.attachEvent )
    target.attachEvent( 'on' + eventName, f );
  return f;
}


var Drag = function(){ this.init.apply( this, arguments ); };

Drag.fixE = function( e )
{
  if( typeof e == 'undefined' ) e = window.event;
  if( typeof e.layerX == 'undefined' ) e.layerX = e.offsetX;
  if( typeof e.layerY == 'undefined' ) e.layerY = e.offsetY;
  return e;
};

Drag.prototype.init = function( handle, dragdiv )
{
  this.div = dragdiv || handle;
  this.handle = handle;
  if( isNaN(parseInt(this.div.style.right )) ) this.div.style.right  = '0px';
  if( isNaN(parseInt(this.div.style.bottom)) ) this.div.style.bottom = '0px';
  this.onDragStart = function(){};
  this.onDragEnd = function(){};
  this.onDrag = function(){};
  this.onClick = function(){};
  this.mouseDown = addEventHandler( this.handle, 'mousedown', this.start, this );
};

Drag.prototype.start = function( e )
{
  // this.mouseUp = addEventHandler( this.handle, 'mouseup', this.end, this );
  e = Drag.fixE( e );
  this.started = new Date();
  var y = this.startY = parseInt(this.div.style.bottom);
  var x = this.startX = parseInt(this.div.style.right);
  this.onDragStart( x, y );
  this.lastMouseX = e.clientX;
  this.lastMouseY = e.clientY;
  this.documentMove = addEventHandler( document, 'mousemove', this.drag, this );
  this.documentStop = addEventHandler( document, 'mouseup', this.end, this );
  if( e.preventDefault ) e.preventDefault();
  return false;
};

Drag.prototype.drag = function( e )
{
  e = Drag.fixE( e );
  var ey = e.clientY;
  var ex = e.clientX;
  var y = parseInt(this.div.style.bottom);
  var x = parseInt(this.div.style.right );
  var nx = x - ex + this.lastMouseX;
  var ny = y - ey + this.lastMouseY;
  this.div.style.right	= nx + 'px';
  this.div.style.bottom	= ny + 'px';
  this.lastMouseX	= ex;
  this.lastMouseY	= ey;
  this.onDrag( nx, ny );
  if( e.preventDefault ) e.preventDefault();
  return false;}
;

Drag.prototype.end = function()
{
  removeEventHandler( document, 'mousemove', this.documentMove );
  removeEventHandler( document, 'mouseup', this.documentStop );
  var time = (new Date()) - this.started;
  var x = parseInt(this.div.style.right),  dx = this.startX - x;
  var y = parseInt(this.div.style.bottom), dy = this.startY - y;
  this.onDragEnd( x, y, dx, dy, time );
  if( (dx*dx + dy*dy) < (4*4) && time < 1e3 )
    this.onClick( x, y, dx, dy, time );
};


function burro( burro_contents )
{
  try{
  if( debug > 1 ) GM_log( 'adding burro' );
  var carrot = IMG( { src:Icons.carrotRight, id:'toggle-burro-carrot' },
		    { top:'-10px' } );
  var title = DIV( {}, '43 sites',
		   { top:'3px', left:'16px', position:'absolute' } );
  var close = IMG( { src:Icons.close, title:'Click to remove' },
		   { position: 'absolute',
		     right: '2px',
		     top: '2px',
		     margin: '2px',
		     width: '12px',
		     height: '12px',
		     backgroundColor: '#FFB',
		     border: 'none',
		     lineHeight: '8px',
		     textAlign: 'center'
		   } );
  var handle = DIV( { title:'Click title to expand, collapse or drag' },
		    [carrot, title, close],
		    { padding:'4px 1px', fontWeight:'bold', position:'relative' } );
  var table = DIV( { id:'burro-contents' }, burro_contents,
		   { marginTop: '1px',
		     marginBottom: '3px',
		     padding: '0',
		     width: '100%',
		     font: '10pt sans-serif',
		     display: 'none'} );
  var box = DIV( {}, [handle, table], {
    position: 'relative',
    zIndex: '1000',

    backgroundColor: '#FFC',
    border: '1px solid orange',
    padding: '0px',
    textAlign: 'left',
    font: '8pt sans-serif',
    width: '94px',
    marginBottom: '15px',

    opacity: '0.80',
    filter: 'alpha(opacity=80)'
  } );
  var root = DIV( {}, box, { position:'absolute', top:'15px', right:'15px' } );
  var kill = function(){ document.body.removeChild( root ); };
  var zip = function()
  {
    var list = $( 'burro-contents' );
    var carrot = $( 'toggle-burro-carrot' );
    if( box.opened = !box.opened )
    {
      list.style.display = document.all ? 'block' : 'table';
      carrot.src = Icons.carrotDown;
    }
    else
    {
      list.style.display = 'none';
      carrot.src = Icons.carrotRight;
    }
  };
  addEventHandler( close, 'click', kill );
  document.body.appendChild( root );
  handle.drag = new Drag( handle, box );
  handle.drag.onClick = zip;
  if( debug > 1 ) GM_log( 'added burro' );
}catch(e){prompt('burro error:',e)}
}

function init()
{
  var rows = [ { title:'43 people', url:'http://www.43people.com/' },
	       { title:'43 places', url:'http://www.43places.com/' },
	       { title:'43 things', url:'http://www.43things.com/' },
	       { title:'allconsuming', url:'http://www.allconsuming.net/' },
	       { title:'listsofbests', url:'http://www.listsofbests.com/' },
	       ];
  var row, url, title, id;
  for( var i = 0; i < rows.length; i++ )
  {
    row = rows[i];
    url = row.url;
    title = row.title;
    id = row.id;
    rows[i] = tableRow( url, title, id );
  }
  burro( rows );
}

// addEventHandler(document, 'load', init);
init();

