// Tour Loader for Shape Cms
// @version 0.2
/*

(C) 2006 Jonas Lundberg
License: Creative Commons "Attribution-ShareAlike 2.0"
http://creativecommons.org/licenses/by-sa/2.0/

Also based on Book Burro by the authors below:

 (C) 2005 Johan Sundstr?m (0.13 .. 0.18)
 License: Creative Commons "Attribution-ShareAlike 2.0"
 http://creativecommons.org/licenses/by-sa/2.0/

 Skeletal parts of DOM-Drag by Aaron Boodman, 2001
 http://www.youngpup.net/2001/domdrag
 License: Creative Commons "Attribution-ShareAlike 2.0"
 http://creativecommons.org/licenses/by-sa/2.0/

 (C) 2005 Reify (0.11r .. 0.12r)
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/

 (C) 2005 Jesse Andrews, Britt Selvitelle under cc-by-sa (0.01 .. 0.11)
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/

 Snipits used from RSS Reader for GreaseMonkey
 http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel/
 Version: 1.03 (C) 2005 Johannes la Poutre
 THANKS!

 What is this?
 This is a floating, moveable text area, which "remembers" contents loaded into it, when you move to other pages. 
 You can load your own contents into the text area, for instance guided tours, or your blog into it. The user then has your comments as help when moving about the pages you link to in your tour.
  
 How do I load contents into it?
 You place links to XHTML pages to load, in the page HEAD of your page. Currently, one tour is supported for one page.
 Example: <link href="http://www.ida.liu.se/~jonlu/indextour/tour.html" rel="alternate" media="tour" type="application/xhtml+xml">
 The key is the attribute media="tour"
 You find an example page with a tour here: http://www.ida.liu.se/~jonlu/index.htm
 Contents are discovered in the function findTour().
 
 How do I unload contents?
 Just click the "quit tour" link.
  
What kind of contents can I load into it?
 The contents must be valid XHTML - because the XHTML is parsed and integrated into the page DOM (no use of InnerHTML).
 If you use hyperlinks in the XHTML, then the links to the current page are given the id "shapeTourCurrentPage".
 Styles for these hyperlinks, are set in function navi(mytour). This is used here to indicate the current page.
 The text area is only visible either when contents are loaded, or when contents are present to load.
 You find an example XHTML tour page here: http://www.ida.liu.se/~jonlu/indextour/tour.html
 (The same page which is linked in the <link> tag above)
 
 What do you need?
 An XHTML page to load, and a web page to link from.
 
 Can I take it and modify it?
 Yes, but notice the share-alike license...
 
 Changelog:
  *  2006-07-01  *
  Added support for several tours on the same page
  The sidebar now remembers its state
 
  *  2006-07-01  *
  Added style
  
  *  2006-04-15  *
  Loads XHTML tours



*/

// ==UserScript==
// @name          Stickynote Tour loader - your guide to the Internet
// @namespace     http://shapecms.sourceforge.net
// @description   Contains the skeleton for a tour note. The actual contents are loaded from your (X)HTML file, install, and go to http://www.ida.liu.se/~jonlu/index.htm for a sample tour.
// @include       http://*
// ==/UserScript==


// typical marker for an xhtml tour:
// <link href="http://www.ida.liu.se/~jonlu/indextour/tour.html" rel="alternate" media="tour" type="application/xhtml+xml">
// To add: support for RSS tours

// Execution:
// First get links to all tours: findTour()
// If we are in a top frame, execute the script: start()
// If there are tours on this page, Load all tours found on the page: load()
// Then, Store the title and body of all tours in tourBody and tourTitle: cutout()
// When all tours are loaded OR if there is already an active tour, Set up the note: tour()

var notLoaded = 'true';
var tourTitle;
var tourBody;
var alltours = 0;
var destination;
findTour();
GM_log('Tour found:'+ destination);

// Put links to all tours (found in the <link media="tour" href="yourtour"/> in the tourlink Array. Prepare the tourTitle and tourBody variables to hold the tours.
// The alltours variable holds the amount of tours found, default is 0.
function findTour() {

	var mytours = xpath("//link[@media='tour']");
	if(mytours.lenght != 0) { 
	          alltours = mytours.snapshotLength;
	          var tourlinks = new Array(alltours+1);
	          tourTitle =  new Array(alltours+1);
	          tourBody =  new Array(alltours+1);
	          for (var i = 1; i < alltours+1 ; i++) {
	          var mytour = mytours.snapshotItem(i-1);
                tourlinks[i] = mytour.getAttribute("href");
                var newlink;
                if(startsWith(tourlinks[i], 'http://')  == false) {
                        newlink = 'http://'+location.hostname;
                        if(location.port  != '80') {
                                newlink = newlink +':' + location.port;
                        }
                        pathname = location.pathname.substring(0, location.pathname.lastIndexOf("/"));
                        tourlinks[i] = newlink+pathname+'/'+tourlinks[i];
                }
                
              }  
	      destination = tourlinks;
        }
}

function xpath(query) {
	return document.evaluate(query, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var Icons =
{
   title:
   'data:image/gif;base64,R0lGODlheAAOAPf/AAAAAEhIOXR0XJycfL+/mN/fsv//zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAB4AA4AAAi0AA0IHEiwoMGDCBMqXMiwocOHECNKnEix4kJ//gZi1JhR4UaLIEOK/GiAJEmEJw1iXNlRpEuXJlumVNky4cyXOCnG5MhxJU+fB1OylElU4EagOS3uNNpxKdCbJ50WLTk0KcilVJnyzKqVJkGpW29anYj141CzUwtGnQp2bMiyTWtu5aq2ZluuYt1ChNu17tyvdtkK1ns1bdqSfaEGDjuYcMWzLOsiPYtSbtWeT+U63sy5M8WAADs=',
   about: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDkprC+64gAAAOdJREFUKM+FkrFOAkEURc9ddrJZCgsqCwtCIiUFJa2df2CwNXRS8AmGisLEaGGs3VhTYDUtxZaED/AriGHjPhuEDC5wq3l5czL3vjeyzBlHtC6KoI4BuPk8Qqx3549rov3+YPBIp3NHq3VLlnkkBf0AWK2+6fevWCze8H7CaPRKUfzgnKsG0jSh272kLEuWyy/a7QvSNKnIsJEk6vWE2SxnPH5nOn3YWopjh9VqIbDBGA5fyPNnGo2znZVIEEWhJTNDgmbzfHvZzA6H/pP3k3/TqQQkIYle7z6oT74wnz8d3KNOfY19/QKFiTrWqbiPtAAAAABJRU5ErkJggg==',
  carrotRight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCR020Q08hgAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAiklEQVQY07XPIQoCURSF4e8NAzYxGicNuAa1WlyCO3AlZnfiNgwahQFxikkcBIsGfaZpzgODJ/4c/nMvPyR8g7EsephgH6q6aXnWIelhjkUsi0EL88TqFUfMYlnscMoS5wUccMYS4yxhfuGNPho88oQ5xxQjrHHpKkcMccMqVPU99eATG2zb4n/zAS4OHrV1hIB/AAAAAElFTkSuQmCC',
  carrotDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCRoeq/kCuwAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAmElEQVQY083QMUoDARSE4W92U2xhkxSpAgY0AXMQ29zCM3iSXEXQTrCws44Im85CkO1jnq2KKQWnGxiY+Yd/oXw1tTrr7D86CYdD5Xk3HA8vTi8la7xW1T5Jg8IEN6PvPXnEAkOa5l5Viwuc4yk/d9VyfoLrqnpIMmCGu2z79/wGUsv5FFcYY5Nt/wKjI+BvuEWnbfu///kTargo75QVC5oAAAAASUVORK5CYII=',
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDcSg6d+SAAAAPBJREFUKM+Fkr1qAkEURs9dnWBrJT5IHkEw4gtEsBQs/AlpkiKlJGnEJlqIjRbrPoAQYhPio1hGsPAHFoW5KSIxo7J7qvlgDty534j6Rolgt987OQnA7XuEsTuegwIeMYiIkx2hVnsjCL7+su9/0mz2Lox0oNOpUiw+kc2mUVWGww8mkxYiYK09F4xJMho9kMs9IiJMpy8Y83vFWkUTCVcAWCxWLJcrRIT1OiSTOczuCXieK2y3IeXyK4PBPZtNSKn0zGzWJpW6uvyGer1LpVIgn78GYD7/ptHo0e/fHbemvtHIHv4zvonv4ayXuK9xyg8qt0tfe9qKPAAAAABJRU5ErkJggg=='
 };


  

function unHTML( html )
{
  return html.replace( /&(amp|lt|gt|quot|apos|#(\d+));/g, function( match, character, code )
  {
    return { amp:'&', lt:'<', gt:'>', quot:'"', apos:'\'' }[character] || String.fromCharCode( code );
  });
}

// document.getElementById() on steroids (ask for several ids, and you get them back as an array)
function $( ids, doc )
{
  if( typeof ids == 'string' )
    return (doc || document).getElementById( ids );
  for( var i=0; i<ids.length; i++ )
    ids[i] = (doc || document).getElementById( ids[i] );
  return ids;
}

function str2xml( strXML )
{
  if( window.ActiveXObject )
  {
    var domdoc = new ActiveXObject( 'Microsoft.XMLDOM' );
    domdoc.async = 'false';
    domdoc.loadXML( strXML );
    return domdoc;
  }
  else
  {
    var objDOMParser = new DOMParser();
    return objDOMParser.parseFromString( strXML, 'text/xml' );
  }
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
  return false;
};

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

function removeEventHandler( target, eventName, eventHandler )
{
  if( target.addEventListener )
    target.removeEventListener( eventName, eventHandler, true );
  else if( target.attachEvent )
    target.detachEvent( 'on' + eventName, eventHandler );
}

function addEventHandler( target, eventName, eventHandler, scope )
{
  var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
  if( target.addEventListener )
    target.addEventListener( eventName, f, true );
  else if( target.attachEvent )
    target.attachEvent( 'on' + eventName, f );
  return f;
}

function tour()
{
  GM_log('tour note added for location:'+location.href);
  
  var handle = document.createElement( 'div' );
  var root = document.createElement( 'div' );
  var box = document.createElement( 'div' ), i, h;
  with( root.style )
  {
    position = 'absolute';
    top = right = '15px';
  }
  handle.style.padding = '4px';
  handle.title = 'Click title to expand, collapse or drag';
  handle.id = 'shapetours-handle';
  with( box.style )
  {
    position = 'relative';
    zIndex = '1000';

    backgroundColor = '#FFC';
    border = '1px solid orange';
    padding = '0px';
    textAlign = 'left';
    font = '8pt sans-serif';
    width = '220px';
    marginBottom = '15px';

    opacity = '0.93';
    filter = 'alpha(opacity=90)';
  }
  var flipbox = document.createElement( 'div' );
  with( flipbox.style )
  {
    position = 'absolute';
    zIndex = '1001';
    backgroundColor =  '#FFC';
    border = '1px solid orange';
    padding = '0px';
    textAlign = 'left';
    font = '8pt sans-serif';
    width = '220px';
    marginBottom = '15px';
    marginLeft = '0';
    opacity = '0.93';
    filter = 'alpha(opacity=90)';
    display = 'none';
  }
  flipbox.id = 'shapetours-flipbox';
  box.id = 'shapetours-box';
  box.appendChild( flipbox );
  var state = GM_getValue('state', 'none');
  if(state != 'none') box.opened = state;
  
  var carrot = document.createElement( 'img' );
  carrot.style.top = '-10px';
  carrot.src = Icons.carrotRight;
  carrot.id = 'hide_show_carrot';
  handle.appendChild( carrot );
 
  var title_image = document.createElement( 'img' );
  title_image.style.marginLeft = '6px';
  title_image.src = Icons.title;
  handle.appendChild( title_image );

  var close = document.createElement( 'img' );
  close.src = Icons.close;
  with( close.style )
  {
    position = 'absolute';
    right = '3px';
    top = '3px';
    margin = '2px';
    width = '12px';
    height = '12px';
    backgroundColor = '#FFB';
    border = 'none';
    lineHeight = '8px';
    textAlign = 'center';
  }
  close.setAttribute( 'title', 'Click to remove' );
  addEventHandler( close, 'click', function(){ document.body.removeChild( root ); } );
  handle.appendChild( close );

  var about = document.createElement( 'a' );
  var about_img = document.createElement( 'img' );
  about_img.src = Icons.about;
  about_img.style.border = 'none';
  about.appendChild( about_img );
  with( about.style )
  {
    position = 'absolute';
    right = '18px';
    top = '3px';
    margin = '2px';
    width = '12px';
    height = '12px';
    backgroundColor = '#FFB';
    lineHeight = '12px';
    textAlign = 'center';
    textDecoration = 'none';
  }
  about.title = 'StickyNotes By Jonas Lundberg';
  about.href = 'http://shapecms.sourceforge.net';
  handle.appendChild( about );
  box.appendChild( handle );


 

 var noteFront = document.createElement( 'div' );
 noteFront.id = 'shapetours-notefront';
 with( noteFront.style )
  {
    marginTop = '1px';
    marginBottom = '3px';
    padding = '0';
    width = '100%';
    font = '10pt sans-serif';
    display = 'none';
  } 
  
  box.appendChild(noteFront);
  root.appendChild( box );
  document.body.appendChild( root );
  handle.drag = new Drag( handle, box );
  
  var quitTourImg = document.createElement( 'b' );  
  quitTourImg.style.marginLeft = '6px';
  quitTourImg.appendChild(document.createTextNode('Quit tour'));
  quitTourImg.id = 'quitTour';
  quitTourImg.setAttribute( 'title', 'Click to quit current tour');
  
  // Create links to all tours found
   
  var foundTourImages; 
  if(alltours != 0) 
  {
foundTourImages = new Array(alltours+1);
  for (var i = 1; i < alltours+1 ; i++) {
  var foundTourImg = document.createElement( 'p' );
  {
	  foundTourImg.appendChild(document.createTextNode(tourTitle[i]));
	  foundTourImg.appendChild(document.createElement( 'br' ));
  }
  
  var foundB = document.createElement( 'b' );
  foundB.appendChild(document.createTextNode('Begin tour'));
  foundTourImg.appendChild(foundB);
  foundTourImg.style.marginLeft = '6px';
  foundTourImg.id = i;
  foundTourImg.setAttribute( 'title', 'Click to begin tour!');
  foundTourImages[i] = foundTourImg;
  }
  }
  
  addStyle('div#shapetours-notefront {font:x-small Verdana,Sans-serif ! important;}');
  addStyle('#shapetours-notefront h3 {font:small Verdana,Sans-serif ! important; margin-bottom: 0px ! important;  padding-left: 15px  ! important; padding-right: 15px ! important; text-indent: 0px ! important; text-decoration: none ! important; font-weight: bold ! important;}');
  addStyle('#shapetours-notefront p {color:black; font:x-small Verdana,Sans-serif !important; margin-top: 0px ! important; padding-left: 15px  ! important; padding-right: 15px ! important; text-indent: 0px ! important;}');
  addStyle('#shapetours-notefront a {text-decoration: none ! important;}');
  addStyle('#shapetours-notefront a:visited {color: #444444 ! important;}');
  addStyle('#shapetours-notefront a:link {color: blue ! important;}');

  var zip = function()
  {
    
    box.opened = !box.opened;
    GM_setValue('state', !box.opened);
    var toursTableFront = document.getElementById( 'shapetours-notefront' );
    var carrot = document.getElementById( 'hide_show_carrot' );
    if( box.opened ) 
    {
	  var storedTour = navi(GM_getValue('tour', 'none'));
	  var storedTitle = GM_getValue('tourTitle', 'none');
	  var storedHome = GM_getValue('tourHome', 'none');
	  if(notLoaded == 'true' && storedTour == 'none' && alltours != 0) 
	   for (var i = 1; i < alltours+1 ; i++) {
	  toursTableFront.appendChild(foundTourImages[i]);
	  }
	  else if(notLoaded == 'true'&& storedTour != 'none') {
		 if( alltours != 0) 
		 for (var i = 1; i < alltours+1 ; i++) {
	       toursTableFront.appendChild(foundTourImages[i]);
	     }
		 
	   if(storedTitle != 'none') {
	            toursTableFront.appendChild(document.createTextNode(storedTitle));
	            toursTableFront.appendChild(document.createElement( 'br' ));
           }
	         var goHome = document.createElement( 'a' );
		 goHome.setAttribute("href", storedHome);
		 goHome.appendChild(document.createTextNode('Go to tour start page'));
		 toursTableFront.appendChild(goHome);
             simpleXMLtoDOM(storedTour, toursTableFront);
	         notLoaded = 'false';
		 toursTableFront.appendChild(quitTourImg);
	 }
	 else if(notLoaded == 'true'){ 
		 simpleXMLtoDOM('<b>No tour on this page</b>', toursTableFront);
		 notLoaded = 'false';
	 }
	 
      toursTableFront.style.display = document.all ? 'block' : 'table';
      carrot.src = Icons.carrotDown;
    }
    else
    {
      toursTableFront.style.display = 'none';
      carrot.src = Icons.carrotRight;
    }
  };
  
  handle.drag.onClick = zip;

  // For earch tour, set up a tour function, for starting the tour. This will be associated with an event handler for each tour.
  // Using the setTour() function
  var quitTour = function() {
	var toursTableFront = document.getElementById( 'shapetours-notefront' );	                
        removeChildrenFromNode(toursTableFront);
        if(alltours != 0) for (var i = 1; i < alltours+1 ; i++) {
	       toursTableFront.appendChild(foundTourImages[i]);
	     }
	else {
		simpleXMLtoDOM('<b>No tour on this page</b>', toursTableFront);
		root.style.display = "none";
	}
	GM_setValue('tour', 'none');
	GM_setValue('state', 'none');
	GM_setValue('tourTitle', 'none');
	GM_setValue('tourHome', 'none');
        handle.drag.onClick();	
  };    
  addEventHandler( quitTourImg, 'click', quitTour );
  var beginTour = function(no) {
	  var nos = no.currentTarget;
          setTour(quitTourImg, nos.id);
          notLoaded = 'false';	  
  };
  // ADD the handler, for each tour, which allows it to be started.
  if( alltours != 0) for (var i = 1; i < alltours+1 ; i++) {
	  	 
    addEventHandler( foundTourImages[i], 'click', beginTour, i);
    
  }
  handle.drag.onClick();  



}

function insertInto(text, before, after, toInsert) {
        var firstpos = text.indexOf(before);
        var firstcut = text.substring(0, firstpos + before.length);
        var secondpos = text.indexOf(after);
        var secondcut = text.substring(secondpos, text.length);
        var result = firstcut+toInsert+secondcut;
      // alert(result);
return(result);        
}

function navi(mytour) {
var currentPage = '"'+document.location.href+'"';
var before = substringBefore(mytour, currentPage);
var after = substringAfter(mytour, currentPage);
var result;
if(before) result = before+currentPage+'id="shapeTourCurrentPage"'+after;
else result = mytour;
addStyle('a#shapeTourCurrentPage {padding-left: 12px ! important;  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCR020Q08hgAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAiklEQVQY07XPIQoCURSF4e8NAzYxGicNuAa1WlyCO3AlZnfiNgwahQFxikkcBIsGfaZpzgODJ/4c/nMvPyR8g7EsephgH6q6aXnWIelhjkUsi0EL88TqFUfMYlnscMoS5wUccMYS4yxhfuGNPho88oQ5xxQjrHHpKkcMccMqVPU99eATG2zb4n/zAS4OHrV1hIB/AAAAAElFTkSuQmCC) left center no-repeat ! important;}');

return(result);
}

// http://diveintogreasemonkey.org/patterns/add-css.html
function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ========  PROCESS submitted xhtml ======== :)                         
// Ported from xQuery
// Recursive algorithm for processing xhtml :)
//                 (:1. If there are tags in the xhtml :) 
//                         (: a) divide into: text before the next tag, next tag with contents incuding subtags, remainder after next tag :)
//                           (: a) If there is text before the next tag: print the text before the next tag :)
//                           (: b) process the next tag :)
//                                   (: i) print the tag name, and the attributes :)
//                                   (: ii) if the tag has contents, call this function with the contents :)
//                           (: c) if there are more tags after this one: call this function with the remainder after the next tag :)
//                            
//                     (:2. If there are no tags, print the text :)
                     
function simpleXMLtoDOM(stringtofix, node)  {         
             //       (:DIVIDE INTO: text before the next tag, next tag with contents incuding subtags, remainder after next tag :)
             //       (:next tag except "<" :)
             var nextTag = substringAfter(stringtofix, '<');
             // (: Text before next tag, if there is a next tag - the text before NextTag in Stringtofix :)
             var textbefore;
             if(nextTag) textbefore = substringBefore(stringtofix, '<'+nextTag);
             //(: Text after next tag - INCLUDING embedded tags :)
             var rest = XMLtoDOMrest(nextTag, 0);
             
             // (: NEXT TAG NAME, and next tag name with attributes :)
             // (:The next tag name including attirbutes etc -  the text before the end of the start-tag in NextTag:)
             var currname = substringBefore(nextTag, ">");             

             // (: The nextt tag name, except all attributes :)
             var cleantag = XMLtoDOMcleanTagName(currname);        
             // (: CONTENT INSIDE the NEXT TAG :)
             // (:Get the contents inside the current tag, if there is one. Step 1. Get rid of everyting after the end tag :)
             // (: put the "<" back first in the nextTag. Then keep everything before the content after. Mark the end with <endtag> first, otherwise a space in the end will often math a space within the nextTag and cut to early. :)
             var current;
             if(currname) current = substringBefore('<'+nextTag+'<endtag>', rest+'<endtag>');
             // (:Get the contents inside the current tag. Step 2 Get rid of the start and end tags :)
             var inner;
             if(nextTag  && current  && currname && endsWith(normalizeSpace(currname), "/") == false)  
                                    inner = substringAfter(current, ">").substring(0, substringAfter(current, ">").length-3-cleantag.length);          
             
             //
             // process the node
             //
             var toAppend;
             
              // (: ALWAYS if there is a next tag, and text before - print the text before :) 
              if(textbefore) node.appendChild(document.createTextNode(textbefore));
              
           // (: IF THERE IS A NEXT TAG :) 
           // (: If the next tag contains nothing but name and maybe attributes :)
            if(endsWith(currname, "/"))
            {
                    toAppend = XMLtoDOMtagAttributes(document.createElement(cleantag), currname);
            }
            // (: If the next tag has contents and maybe attributes :)
            else if(currname) {     
                    toAppend = XMLtoDOMtagAttributes(document.createElement(cleantag), currname);
                    simpleXMLtoDOM(inner, toAppend);
            }
              // (: IF THERE IS NO NEXT TAG - print the text:)
            else if(stringtofix) 
                    {
                            node.appendChild(document.createTextNode(stringtofix));
                    }
          // If something to append has been found above, add it to the DOM.
          if(toAppend) node.appendChild(toAppend); 
          
          
          // (: ALWAYS if there are remaining tags or text, process it :) 
          if(rest) simpleXMLtoDOM(rest, node);       



}

// (: support function: print attributes: 1. get the attributes from the tag :)
function XMLtoDOMtagAttributes(node, stringtofix)   {
   var cleantag;
   if(endsWith(stringtofix, "/")) cleantag = stringtofix.substring(0,stringtofix.length-1);
  else cleantag = stringtofix;
  
  // Check if there are any attributes - if so, then they are after the tag name, that is after the first space
  var attributes = normalizeSpace(substringAfter(cleantag, ' '));
  // Process attributes, if there are any
 // if(attributes) alert('myAttributes:'+cleantag+':'+attributes);
 // else alert('NoAttributes:'+cleantag+':'+substringAfter(cleantag), ' ');
  if(attributes)  XMLtoDOMtagAttributesProcess(node, attributes);
  return(node);
}

// (: support function: print attributes: 2. print the attributes :)
function XMLtoDOMtagAttributesProcess(node, stringtofix)   {
   
   //In XML, all atributes have some value, for instance "".
   var firstAttributeName = normalizeSpace(substringBefore(stringtofix, "="));
   var rest;
   if(firstAttributeName) rest = normalizeSpace(substringAfter(substringAfter(stringtofix, '"'), '"'));
   
   var currentContent;
  currentContent = normalizeSpace(substringBefore(substringAfter(stringtofix, '"'), '"')); 
   
   if(firstAttributeName) {
           if(currentContent) {
            node.setAttribute(firstAttributeName, currentContent);   
           }
           else {
                   node.setAttribute(firstAttributeName, "");
           }
   }  
   if(rest) { 
         XMLtoDOMtagAttributesProcess(node, rest);
   }
}


// (: support function: get the tag name (without attributes, etc ) :)
function XMLtoDOMcleanTagName(stringtofix)   {
   var cleantag;
   if(endsWith(stringtofix, "/")) cleantag = stringtofix.substring(0, stringtofix.length-1);
  else cleantag = stringtofix;
  
  var tag;
  if(substringBefore(normalizeSpace(cleantag), ' '))
          tag = substringBefore(normalizeSpace(cleantag), ' ');
          else tag = normalizeSpace(cleantag);
   return(tag);
}

// support function:  strip leading and trailing white-space
function normalizeSpace(stringtofix) {
      var result;
        if(stringtofix) result = stringtofix.replace(/^\s*|\s*$/g, "");
     return(result);
}

// support function: get the remainter, after one tag and its sub tags
 function XMLtoDOMrest(stringtofix, no) {
          var nextTagName = substringBefore(stringtofix, ">");
          
          if(startsWith(stringtofix, "/") == true) 
                  {
                          no=no-1;
                  }
          else if(endsWith(nextTagName, "/")) 
          {
                  no=no;
          }
          else if(nextTagName) 
          {
                  no=no+1;
          }
                
         var result;
          if(no == 0) result = substringAfter(stringtofix,">");
          else if(no > 0 && nextTagName) result = XMLtoDOMrest(substringAfter(stringtofix, '<'), no);
          
          return(result);
 }

// helper function: ends-with
function endsWith(text, token) {
        var result = false;
        if(text && token) {
        var firstpos = text.indexOf(token);
        if(firstpos+token.length == text.length) result = true; else result = false;
        if(!text) result = false;
        if(!token) result = false;
        }
        return(result);
}
 
 // helper function: starts-with
function startsWith(text, token) {
        var result = false;
        if(text && token) {
        var firstpos = text.indexOf(token);
        if(firstpos == 0) result = true; else result = false;
        }
        return(result);
}

 // helper function: substring-after
function substringAfter(text, token) {
        var result;
        if(text && token) {
        var firstpos = text.indexOf(token);
        if(firstpos != -1) result = text.substring(firstpos+token.length, text.length);
        }
        return(result);
}
 // helper function: substring-before
function substringBefore(text, token) {
        var result;
        if(text && token) {
        var firstpos = text.indexOf(token);
        if(firstpos != -1) result = text.substring(0, firstpos);
        }
        return(result);
}
function simpleReplace(text, token, subst) {
        var result = text;
        var firstpos = text.indexOf(token);
        if(firstpos != -1) result=simpleReplace(result.replace(token, subst),token, subst) ;
        return result;
}

// Load all destinations, and store the body and title.
function start() {
  var existsTour = GM_getValue('tour', 'none');
  if(alltours != 0) 
  for (var i = 1; i < alltours+1 ; i++) { 
  load(destination[i], i);	
  }
  else if(existsTour != 'none') tour();	
}

// THE SCRIPT STARTS EXECUTION HERE, but only in the "top" (i)frame.
if(top == self) start();



// http://weblogs.macromedia.com/mesh/archives/2006/01/removing_html_e.cfm
function removeChildrenFromNode(node)
{
   if(node == undefined || node == null)
   {
      return;
   }
   
   var len = node.childNodes.length;
  // GM_log('L:'+len);
	while (node.hasChildNodes())
	{
	  node.removeChild(node.firstChild);
	}
}

function cutout(text, tourno) {
	 var body = substringBefore(substringAfter(text,'<body>'), '</body>');
         var title = substringBefore(substringAfter(text,'<title>'), '</title>');
	 if(body) {   
            tourTitle[tourno] = title;
	    tourBody[tourno] = body;
	    if(tourno == alltours) tour();
	 }
       }
       
       // Set up the tour: Add the tour to the page, and store the tour as a GM_value, so that it can be opened on other pages.        
function setTour(quitTourImg, tourNo) {
         var changeStickiesTableFront = document.getElementById( 'shapetours-notefront' );       
         removeChildrenFromNode(changeStickiesTableFront);	
	 if(tourBody != 'none') {
	    GM_setValue('tour', tourBody[tourNo]);
	    GM_setValue('tourTitle', tourTitle[tourNo]);
	    GM_setValue('tourHome', document.location.href);
            var para = document.createElement( 'p' );
	      if(tourTitle[tourNo] != 'none') {
	        para.appendChild(document.createTextNode(tourTitle[tourNo]));
           }  
            changeStickiesTableFront.appendChild(para);	 
	    simpleXMLtoDOM(tourBody[tourNo], changeStickiesTableFront);
	    para.appendChild(quitTourImg);
	 }


       }
       
       
    function load(destination, tourno)             {
    GM_xmlhttpRequest({
    method: 'GET',
    url: destination,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/xml',
    },
    onload: function(responseDetails) {
            var ok = '200';
            if(responseDetails.status == ok) {
              GM_log(responseDetails.responseText);
              cutout(responseDetails.responseText, tourno);
            }
    }
}) };    

