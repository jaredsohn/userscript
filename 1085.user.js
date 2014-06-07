/* vim: ts=4 noet ai :
 RSS Reader for GreaseMonkey http://greasemonkey.mozdev.org/
 works with RSS versions 0.91 .. 2.0

 
 Changelog:
 
 version 2.00
 	- compatibility with Firefox 1.5 and GM 0.6.4 (release candidate)
 	- enhanced security model: used XPCNativeWrapper to access
 	  native DOMParser object
 	- added "check for updates" functionality; had to remove
 	  top level wrapper function to do this in a clean way.
 	- Fix: apparently GM_XMLHttpRequest now needs fully qualified url.
 	- reset margin on divs (some CSS sheets define a non zero value for
 	  every plain div, don's ask me why).
 	- replace missing title and links with 'Untitled item #X" and
 	  #RSS_MISSING_LINK respectively.

 Version 1.18
 	- fix for Firefox 1.5x; all events implemented in a W3C compliant way.
 	  Some code taken from "DOM-Drag" by Aaron Boodman, 2001
	  http://www.youngpup.net/2001/domdrag
	  Final version from Book Burro:
	  http://www.lysator.liu.se/~jhs/userscript/bookburro/0.16.user.js

 Version 1.17
	- work around for Turnabout where GM_XMLHttpRequest returns
	  resultXML as text string (= alias for resultText), Aaargh!
	- minor design tweaks for MSIE's CSS box model
	NOTE:
	- XMLHttpRequest is still very fragile under Turnabout ;-(

 Version 1.16
	- minor fixes to restore MSIE compatibility
	  Welcome back, turnabout users!
	- fix with GM_log
	- call document as property of window (global) object
	  (waiting for new GM version)

 Version 1.15
	- use GM_xmlhttpRequest() if available (GM 0.2.6+): 
	  loads any RSS feed, regardless of originating domain
	  this means for instance that feedburner feeds are working.

 Version 1.14
	- logging through GM_Log if available (GM 0.3.3+)
	- namespace now points at the script's home page

 Version 1.13
	- fix for RSS feeds missing elements
	Thanks to Andy Dustman for hhis patch.

 Version 1.12
	- fix character encoding again (pure ASCII)

 Version 1.11
	- minior fix with character encoding (UTF-8)
	- generated GUID for Greasemonkey Compiler
	  http://www.letitblog.com/greasemonkey-compiler/
	- GUID: {821ac008-72db-4ccd-94b9-722ccba5b28a}

 Version 1.10
	- Changed license to GPL
	Added by Brandan Lloyd:
	- Added title bar to make it draggable, 
	- Allow the user to double-click to open and close so that 
	  clicking on a link doesn't toggle the view state, 
	- Added a little icon for opening and with a single-click, 
	- Added a scroll bar so that if the Reader is longer
	  than the page the user can scroll.
	
 Version 1.03
	- Added a link to the discovered RSS feed (suggested by Nathan Howell)
 
 Version 1.02
	- Moved link to RSS home to mottom of list (suggested by Neil Kandalgaonkar)

 Version 1.01
	- Initial release
 
*/

// ==UserScript==
// @name		  RSS Panel
// @namespace	 http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel
// @description   Displays RSS directly from originating website
// @include	   *
// @exclude	   
// ==/UserScript==

// GM "global" scope variables
RSSPanelVersion = "2.00";
gReq            = null; // "native" XHR object
gRss_src        = '';   // RSS feed source

/* ************************** bel ***************************** 
 *   COLOR & OPACITY Constants for the RSS Reader.
 **************************************************************/
BACKGROUND       = "#ffc";
TEXT             = "#000"; 
BORDER           = "orange"; 
TITLE_BACKGROUND = "orange";
TITLE_BORDER     = "#ffc";
TITLE_TEXT       = "#fff";
OPACITY          = "0.85";

	function dbg(msg, lvl) {
		if (typeof(GM_log) == "function") {
			GM_log(msg);
		} else {
			window.status = msg;
		}
	}
	// initialize XHR object
	function rss_init() {
		// read rss if a feed is discovered (gRss_src is not null)
		gRss_src = rss_discover();
		rss_req(gRss_src);
	}

	function rss_discover() {
		var src = '';
		var rss = window.document.getElementsByTagName("link");
		for (var i=0; i<rss.length; i++) {
			var type = rss[i].getAttribute("type");
			if (type && type.toLowerCase() == "application/rss+xml") { 
				src = rss[i].getAttribute("href");
			}
			if (src) break;
		}
		if (! src) return '';
		// Slashdot link looks like HREF="//slashdot.org/index.rss"
		if (src.indexOf('//') == 0) {
			src = 'http:' + src;
		}
		// absolute path, missing host name
		if (src.indexOf('/') == 0) {
			src = window.location.protocol + '//' + window.location.host + src;
		}
		// GM_XMLHttpRequest needs fully qualidied URL as of 0.6.4
		if (src.indexOf('http') != 0) {
			var base = window.location.href;
			base = base.substring(0, base.lastIndexOf('/') + 1);
			src = base + src;
		}
		// dbg("src=" + src);
		return src;
	}
	function rss_req(src) {
		if (! src) return;
		// http://diveintogreasemonkey.org/api/gm_xmlhttprequest.html		
		if (typeof(GM_xmlhttpRequest) == 'function') {
			// dbg('XHR: GM');
			GM_xmlhttpRequest(
				{
					method: 'GET', 
					url: src,
					headers: {
							'User-agent': 'Mozilla/5.0 (compatible) GM RSS Panel'
					},
					onload: rss_response
				});
		} else {
			// handle feed through "native" XHR object
			if (window.XMLHttpRequest) {
				try {
					gReq = new window.XMLHttpRequest();
					} catch(e) {
					dbg((e.message) ? e.message : e.toString());
					gReq = false;
				}
			// branch for IE/Windows ActiveX version
			} else if (window.ActiveXObject) {
					try {
					gReq = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					dbg("Msxml2.XMLHTTP: "+(e.message) ? e.message : e.toString());

					try {
						gReq = new ActiveXObject("Microsoft.XMLHTTP");

					} catch(e1) {
						dbg("Microsoft.XMLHTTP: "+(e.message) ? e.message : e.toString());
						gReq = false;
					}
				}
			}

		}
		if (gReq) {
			try {
				gReq.onreadystatechange = rss_response;
				gReq.open("GET", src);
				gReq.send(null);
			} catch(e) {
				dbg((e.message) ? e.message : e.toString());
			}
		}
	}
	function rss_response(res) {
		if (res) gReq = res; // for GM_XHR
		// dbg('XHR status: ' + gReq.status);
		// only if req is "loaded"
		if (gReq.readyState == 4) {
			// only if "OK"
			if (gReq.status == 200) {
				// handle result
				// rss_render(gReq.responseXML);
				// responseXML is not available with GM_XHR
				// http://www.mozilla.org/xmlextras/parseserialize.html
				// Aaargggg!
				// Turnabout sets responseXML to the same string as resultText
				if (gReq.responseXML && typeof(gReq.responseXML) != "string") {
					// dbg("parsing Native XHR " + typeof(gReq.responseXML));
					rss_render(gReq.responseXML);
				// next try parsing the resultText with DOMParser;
				// first the safe route through XPCNativeWrapper
				} else if (typeof(XPCNativeWrapper) == "function") {
					var dp = new XPCNativeWrapper(window, "DOMParser()");
					// dbg('XPC Wrapped DOM Parser: '+typeof(dp));
					var parser = new dp.DOMParser();
					// dbg('DOM Parser: '+typeof(parser));
					var DOM = parser.parseFromString(gReq.responseText, "application/xhtml+xml");
					rss_render(DOM);
				// fallback to content window object; this would fail
				// in GM 0.6.4+ but the safe option has succeeded already.
				} else if (typeof(window.DOMParser) == "object") {
					// dbg("parsing DOMParser");
					var parser = new win.DOMParser();
					var DOM = parser.parseFromString(gReq.responseText, "application/xhtml+xml");
					rss_render(DOM);
				} else {
					// dbg("parsing msxml2");
					var DOM = new ActiveXObject("msxml2.DOMDocument");
					DOM.loadXML(gReq.responseText);
					if (DOM.parseError.errorCode != 0) {
						dbg(DOM.parseError.reason);
						return;
					}
					rss_render(DOM);
				}
			} else {
				dbg("XHR response error: " + gReq.statusText + "\nURL: " + gRss_src);
			}
		}
	}
	function dom_setStyle(elt, str) {
		elt.setAttribute("style", str);
		// for MSIE:
		if (elt.style.setAttribute) {
			elt.style.setAttribute("cssText", str, 0);
			// positioning for MSIE:
			if (elt.style.position == "fixed") {
				elt.style.position = "absolute";
			}
		}
	}
	function dom_createLink(url, txt, title) {
		var a = window.document.createElement("a");
		a.setAttribute("href", url);
		/* ************************** bel ***************************** 
		 *   Added a change here to make sure that the links created 
		 *	with our TEXT color.  
		 * ************************************************************/
		dom_setStyle(a, "color:"+TEXT+";");
		if (title) a.setAttribute("title", title);
		a.appendChild(window.document.createTextNode(txt));
		return a;
	}
	function dom_getElements(node, elt) {
		var list = node.getElementsByTagName(elt);
		return (list.length) ? list : node.getElementsByTagNameNS("*", elt); 
	}
	function dom_getFirstNodeValue(node, elt) {
		try {
			var list = dom_getElements(node, elt);
			var chld = list[0].firstChild;
			return chld.nodeValue;
		} catch (e) {
			// dbg("missing element " + elt + "\nError: " + e.message);
			return "";
		}
	}
	function rss_render(DOM) {
		/* ************************** bel ***************************** 
		 *   This on(dbl-)click function for the open object currently 
		 *	sets the RSS Reader's height appropriately, sets the overflow 
		 *	property to create a scrollbar, resets the right position 
		 *	for the open and close buttons to move them away from the 
		 *	scrollbar, and then sets the inner HTML of the open button
		 *	to the appropriate symbol for conrtact or expand.
		 * ************************************************************/
		var expander = function() {
			// closed state
			if (box.style.height == "15px") {
				box.style.height = "auto";
				box.style.overflow = "auto";
				close.style.right = "13px";
				open.style.right = "27px";
				open.firstChild.nodeValue = "<";
			} else {
				box.style.height = "15px";
				box.style.overflow = "hidden";
				close.style.right = "3px";
				open.style.right = "17px";
				open.firstChild.nodeValue = ">";
			}
		};

		var box = window.document.createElement("div");
		dom_setStyle(box,
"position:fixed;z-index:998;top:1px;left:1px;margin:0px;background-color:" +
BACKGROUND + ";border:1px solid " + BORDER +
";padding:4px;text-align:left;opacity:" + OPACITY + ";font:8pt sans-serif;overflow:hidden;width:250px;height:15px;max-height:100%;margin-bottom:15px;");

		/* ************************** bel ***************************** 
		 *   Create a title (titlebar) element for dragging.
		 *	Set title attribute and style.
		 *	Add a space then the current title of the document.
		 *	Set the pointer on the title bar to be a move pointer.
		 * ************************************************************/
		var title = window.document.createElement("div");
		title.setAttribute("title","Double-Click title to expand/collapse");
		dom_setStyle(title,
"position:absolute;top:1px;left:1px;z-index:999;margin:0px;background-color:" +
TITLE_BACKGROUND + ";border:1px solid " + TITLE_BORDER +
";padding:4px;text-align:left;font:8pt sans-serif;width:246px;height:11px;overflow:hidden;margin-bottom:15px;cursor:move;font-weight:bold;color:"
+ TITLE_TEXT + ";");
		title.appendChild(window.document.createTextNode(
			dom_getFirstNodeValue(DOM, "title")));

		/* ************************** bel ***************************** 
		 *   Set the pointer on the close button to cursor so that it 
		 *	looks like you can do something with it.
		 * ************************************************************/
		var close = window.document.createElement("div");
		dom_setStyle(close,
"margin:0px;position:absolute;top:3px;right:3px;width:10px;height:10px;border:1px solid " + TITLE_BORDER +
";line-height:8px;text-align:center;cursor:pointer;");
		close.setAttribute("title","Click to close panel");
		close.addEventListener('click', function() { this.parentNode.parentNode.style.display = "none"; }, true);
		close.appendChild(window.document.createTextNode("x"));

		/* ************************** bel ***************************** 
		 *   Create a open (expand/collapse) element for expanding and
		 *	collapsing the RSS Reader.
		 *	Set the cursor to pointer.
		 *	Set the title.
		 * ************************************************************/
		var open  = window.document.createElement("div");
		dom_setStyle(open,
"margin:0px;position:absolute;top:3px;right:17px;width:10px;height:10px;border:1px solid " + TITLE_BORDER +
";line-height:8px;text-align:center;cursor:pointer;");
		open.setAttribute("title","Click to expand/collapse");
		open.appendChild(window.document.createTextNode(">"));
		open.addEventListener('click', expander, true);
		/* ************************** bel ***************************** 
		 *   Add the open and close button to the title bar, then add
		 *	the title bar to the RSS Reader.
		 * ************************************************************/
		title.appendChild(open);
		title.appendChild(close);

		box.appendChild(title);

		var ul = window.document.createElement("ul");
		dom_setStyle(ul, "padding-left: 14px; padding-top: 20px");
		var items = [];
		try {
			items = dom_getElements(DOM, "item");
		} catch (e) {
			var li = window.document.createElement("li");
			li.appendChild(window.document.createTextNode("RSS doesn't contain any items!"));
			ul.appendChild(li);
		}
		for (var i=0; i<items.length; i++) {
			var n = items[i];
			var desc = dom_getFirstNodeValue(n, "description");
			var a  = dom_createLink(
				(dom_getFirstNodeValue(n, "link") || "#RSS_MISSING_LINK"),
				(dom_getFirstNodeValue(n, "title") || "Untitled item #" + i),
				desc);
			/* ************************** bel ***************************** 
			 *   Set the style for the link to always be our TEXT color to 
			 *   avoid clashing colors with the links on the existing page.
			 * ************************************************************/
			dom_setStyle(a, "color:" + TEXT + ";");
			var li = window.document.createElement("li");
			/* ************************** bel ***************************** 
			 *   Set the style for the list item to always be our TEXT color 
			 *   to avoid clashing colors with the list items on the 
			 *   existing page.
			 * ************************************************************/
			dom_setStyle(li, "color:" + TEXT + ";");
			li.appendChild(a);
			ul.appendChild(li);
		}
		var div = window.document.createElement("div");
		div.appendChild(ul);
		div.appendChild(dom_createLink(gRss_src, "Link to RSS feed", "RSS feed XML"));
		div.appendChild(window.document.createElement("br"));
		div.appendChild(dom_createLink("http://joe.lapoutre.com/BoT/Javascript/RSSpanel/?v="+RSSPanelVersion, "Check for RSS Panel updates", "Current version: v" + RSSPanelVersion));
		title.addEventListener('dblclick', expander, true);
		box.appendChild(div);
		dom_getElements(document, "body")[0].appendChild(box);

		title.drag = new Drag(title, box); // make draggable
	}

// Modified DOM-Drag from Book Burro 0.16
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
  if( isNaN(parseInt(this.div.style.left)) ) this.div.style.left  = '0px';
  if( isNaN(parseInt(this.div.style.top)) ) this.div.style.top = '0px';
  this.onDragStart = function(){};
  this.onDragEnd = function(){};
  this.onDrag = function(){};
  this.onClick = function(){};
  this.mouseDown = addEventHandler(this.handle, 'mousedown', this.start, this);
};

Drag.prototype.start = function( e )
{
  // this.mouseUp = addEventHandler(this.handle, 'mouseup', this.end, this);
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

Drag.prototype.drag = function( e )
{
  e = Drag.fixE(e);
  var ey = e.clientY;
  var ex = e.clientX;
  var y = parseInt(this.div.style.top);
  var x = parseInt(this.div.style.left);
  var nx = ex + x - this.lastMouseX;
  var ny = ey + y - this.lastMouseY;
  this.div.style.left	= nx + 'px';
  this.div.style.top	= ny + 'px';
  this.lastMouseX	= ex;
  this.lastMouseY	= ey;
  this.onDrag(nx, ny);
  if (e.preventDefault) e.preventDefault();
  return false;
};

Drag.prototype.end = function()
{
  removeEventHandler( document, 'mousemove', this.documentMove );
  removeEventHandler( document, 'mouseup', this.documentStop );
  var time = (new Date()) - this.started;
  var x = parseInt(this.div.style.left),  dx = x - this.startX;
  var y = parseInt(this.div.style.top), dy = y - this.startY;
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


// initialize
rss_init();
