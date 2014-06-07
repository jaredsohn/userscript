// ==UserScript==
// @name          Smooth scroll when clicking in-page links
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description	  When clicking a link in a page that moves focus to another part of the same page, this script will make the page scroll, rather than just snap into view. This gives a somewhat better perception of how the in-page links have moved you in the document.
// ==/UserScript==

smoothScrollInpageLinks();

// Smooth scroll between in-page links; idea originating from:
// http://www.sitepoint.com/article/scroll-smoothly-javascript
var ss_STEPS, ss_DELTA;

function smoothScrollInpageLinks( steps, delta )
{
  ss_STEPS = steps || ss_STEPS || 15;
  ss_DELTA = delta || ss_DELTA || 10;
  for( var i=0; i<document.links.length; i++ )
  {
    var link = document.links[i];
    if( link.hash && isSameDocument( link ) )
      addEvent( link, 'click', smoothScroll );
  }
}

function makeScrollTo( x, y )
{
  return function(){ window.scrollTo( x, y ); };
}

function makeGoto( anchor )
{
  return function() { location.hash = anchor; };
}

function smoothScroll( e )
{
  var target = window.event ? window.event.srcElement : e && e.target;
  if( !target ) return true;
  var anchor = target.hash.substr(1);
  if( !(target = document.getElementById( anchor ) ||
		 document.anchors.namedItem( anchor )) ) return true;
  var src = getScreenCoordinates();
  var dst = getScreenCoordinates( target );
  if( src.y == dst.y ) return true;

  for( var i=1; i<ss_STEPS; i++ )
  {
    var percent = i / ss_STEPS;
    var smooth = (1-Math.cos( Math.PI * percent )) / 2;
    var x = parseInt( src.x + (     0-src.x) * smooth );
    var y = parseInt( src.y + ( dst.y-src.y) * smooth );
    setTimeout( makeScrollTo( x, y ), ss_DELTA * i );
  }
  setTimeout( makeGoto( anchor ), ss_DELTA * ss_STEPS );

  // stop the browser handling the event as normal and opening the link
  // kills the bubble
  if( window.event )
  {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if( e && e.preventDefault && e.stopPropagation )
  {
    // hmmm, safari gets inside here, but then fails to stop the event, and so
    // a 'jump' rather than a 'scroll' takes place. I can't figure it out...
    e.preventDefault();
    e.stopPropagation();
  }
  return true;
}

function isSameDocument( a, b )
{
  if( !b )
    if( a.href == a.hash )
      return true;
    else
      b = location;
  if( b.protocol.toLowerCase() != a.protocol.toLowerCase() )
    return false;
  if( b.hostname.toLowerCase() != a.hostname.toLowerCase() )
    return false;
  if( b.search != a.search )
    return false;
  if( (b.pathname != a.pathname ) &&
      (b.pathname != '/'+a.pathname) )
    return false;
  return true;
}

function addEvent( node, eventType, callback, useCapture )
{
  if( node.addEventListener )
    return !node.addEventListener( eventType, callback, useCapture ) || true;
  if( node.attachEvent )
    return node.attachEvent( 'on'+ eventType, callback );
}

// Returns the screen coordinates for NODE in pixels from the window viewport.
// If no node is passed, returns the scroll position of the viewport itself.
function getScreenCoordinates( node )
{
  var x, y;
  if( !node ) // get current scroll position of viewport
  {
    y = (document.body && document.body.scrollTop) || // ie5(|.5)
      (document.documentElement && document.documentElement.scrollTop) ||// ie6
      window.pageYOffset || 0; // others
    x = (document.body && document.body.scrollLeft) ||
      (document.documentElement && document.documentElement.scrollLeft) ||
      window.pageXOffset || 0;
  }
  else
  {
    x = node.offsetLeft;
    y = node.offsetTop;
    while( (node = node.offsetParent) && (node != document.body) )
    {
      x += node.offsetLeft;
      y += node.offsetTop;
    }
  }
  return { x:x, y:y };
}
