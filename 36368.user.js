// ==UserScript==
// @name          Preview
// @namespace     http://jeffpalm.com/preview/
// @description   Creates a preview pane out of selected links
// @include       http://*
// ==/UserScript==

/*
 * Copyright 2008 Jeffrey Palm.
 */

var nodesInTheBox = null;
var down = false;
var previewLink = null;
var startPoint = null;

function $n(tag,on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
	return e;
}

function getWindowWidth() {
  if (navigator.appName.indexOf("Microsoft")!=-1) {
    return document.body.offsetWidth;
  }
  return window.innerWidth;
}

/** A Simple 2-d Point with 'x' and 'y' coordinates. */
function Point(x,y,node) {
  var _x = x;
  var _y = y;
   return { 
   getX: function() {return _x;},
       getY: function() {return _y;},
       };
}

/** Returns a new Point given the MouseEvent e.  */
function newPoint(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
	}
  return Point(posx,posy);
}


/** Returns the node under the mouse during MouseEvent e. */
function getNode(e) {
  var n = e.target;            // FF, et al.
  if (!n) n = e.srcElement;    // IE
  return n;
}

/** Note that we're selecting text. */
function mouseDown(e) {
  down = true;
  startPoint = newPoint(e);
}

/** Note that we're finished selecting text. */
function mouseUp(e) {
  down = false;
  if (nodesInTheBox && nodesInTheBox.length>0) {
    showPreviewLink(e);
  } else {
    hidePreviewLink();
  }
}

function hidePreviewLink() {
  if (previewLink) {
    previewLink.style.display = 'none';
  }
}

function showPreviewLink(e) {
  var p = newPoint(e);
  if (!previewLink) {
    previewLink = $n('a',document.body);
    previewLink.href = '#';
    previewLink.innerHTML = 'preview';
    previewLink.style.position = 'absolute';
    previewLink.addEventListener('click',showPreview,true);
  }
  
  // Determine the correct offsets
  var x0 = startPoint.getX();
  var y0 = startPoint.getY();
  var x1 = p.getX();
  var y1 = p.getY();
  var dx = (x1-x0<0 ? -1 : 1) * 20;
  var dy = (y1-y0<0 ? -1 : 1) * 20;
  previewLink.style.display = 'inline';
  previewLink.style.left = (p.getX()+dx) + 'px';
  previewLink.style.top = (p.getY()+dy) + 'px';
}

/** Collect any links under the mouse move. */
function mouseMove(e) {
  if (!down) return;
  if (!nodesInTheBox) nodesInTheBox = [];
  var n = getNode(e);

  // Skip null and non-A nodes
  if (!n || n.nodeName != 'A') return;

  // Don't include thep preview link
  if (n == previewLink) return;

  // Make sure this array is a set... indexOf(node) doesn't seem to be
  // working, so I have to use this shitty method of keeping the array
  // of nodes a set
  for (var i=0; i<nodesInTheBox.length; i++) {
    if (nodesInTheBox[i] == n) return;
  }
  nodesInTheBox.push(n);
}

/** Returns a new function to open 'href' in the right pane. */
function newClickFunction(href,id) {
  var _href = href;
  var _id = id;
  return function(e) {
    document.getElementById(_id).src = _href;
  }
}

/** Remove all the nodes and set up the preview. */
function showPreview() {
  // Make sure we've been selecting text
  if (!nodesInTheBox || nodesInTheBox.length == 0) return;

  hidePreviewLink();

  // Remove all children of body
  var body = document.body;
  while(body.childNodes.length>1) {
    body.removeChild(body.firstChild);
  }

  // Create two panes
  //  - left  : for the preview
  //  - right : for the main content
  function newDiv(id,type,left,width,rightBorder) {
    var div = $n(type,body);
    div.id = id;
    div.style.position = 'absolute';
    div.style.top = '0px';
    div.style.left = left + 'px';
    div.style.width = width + 'px';
    div.style.height = '100%';
    div.style.padding = '5px';
    var border = '1px solid black';
    if (rightBorder) {
      div.style.bordeRight = border;
    } else {
      div.style.frameBorder = '0';
      div.frameBorder = '0';
      div.style.border = '0';
      div.style.borderLeft = border;
    }
    return div;
  }
  var leftWidth = 200;
  var rightId = 'right';
  var left  = newDiv('left','div',0,leftWidth,true);
  var right = newDiv(rightId,'iframe',leftWidth,getWindowWidth()-leftWidth,false);

  // Collect all the links
  for (var i=0; i<nodesInTheBox.length; i++) {
    var n = nodesInTheBox[i];
    var a = $n('a',left);
    a.innerHTML = n.innerHTML;
    a.href = '#';
    a.addEventListener('click',newClickFunction(n.href,rightId),true);
    $n('br',left);
  }

  // We're done
  try { delete nodesInTheBox; } catch (ignore) {}
  nodesInTheBox = null;
}

function main() {
  window.addEventListener('mousedown' , mouseDown , true);
  window.addEventListener('mousemove' , mouseMove  , true);
  window.addEventListener('mouseup'   , mouseUp   , true);
  GM_registerMenuCommand("Show preview", showPreview);
}

main();
