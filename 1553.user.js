// ==UserScript==
// @name        Move and Size TextAreas
// @version     1.2
// @author      Rob Albin
// @namespace
// @description Places small graphical overlays on text areas, use the mouse to move, resize, or toggle between maximized/reset.  Mouse over the dots for tooltips.
// @include     *
// @exclude     *gmail.google.com*
// @exclude     *.jot.com/*
// ==/UserScript==

/*
 USAGE:
   - A small tab will appear, fixed in the lower-right of the
     browser window, on pages containing textareas.
   - Click the tab, and a red and blue dot will appear to the
     lower-right of all textareas on the page.
   - Mouse over the dots for usage tooltips.

 UPDATES:
    SEP 1, 2006 - Finally got around to fixing this greasemonkey script to
    work with new versions of Firefox...  I guess it's been broken for quite
    a while, but no one complained and I forgot about the script for a while... ;-)
    About 15 minutes to fix, the old (I guess deprecated) way of adding event
    listeners is no longer supported by Firefox, had to replace all occurances with
    the proper .addEventListener() wrappers for the various "lambda" functions.
    
 ORIGINAL CREDIT:
    Rework of David Schontzler's excellent ExpandArea script, which provided a good
    framework for extending with more movement code.  A short cleanly written script
    showing off some fairly advanced DOM manipulation techniques.

 UI CHANGES:
   - Modified the reset function to a toggle between
     semi-maximized and reset                         (click red dot)
   - Added move feature                               (drag red dot)
   - Added alternate "zoom" resize function           (press SHIFT key and drag blue dot)

 COMMENTS:
   - Added zIndex incrementing, so forum pages with
     several textareas will always flip the one
     you're using on top of others
   - Modified event trigger for copying text back to
     original textarea from 'onkeyup' to 'onblur' in
     the proxy 'txt' element.  Definitely a better choice
     as long as it works, which it does on the web mail
     and forums I tested on.
   - I can be reached at albinrw (at) yahoo (dot) com for comments/complaints.  
*/


(function()	{
	
	// TESTING OPTION: (should leave at	false except to	test)
	var	autoHijack = false;
	// false: Display the script activation	tab
	// true:  Activate at page load	with no	tab
	
	function expandArea(elms) {
		//alert("running expandArea(elms) function...");
		var	oldX = 0;
		var	oldY = 0;
		var	zIndexCnt =	999;
		var	elms2 =	[];
		for(var	i =	0; i < elms.length;	i++) { 
			elms2.push(elms[i]);
		}
		for(var	i =	0; i < elms2.length; i++) {	
			applyArea(elms2[i]);
		}

		function applyArea(elm)	{
			//alert("running applyArea(elm) function...");
			var	w =	elm.offsetWidth,
				h =	elm.offsetHeight;
			var	pos	= getAbsolutePosition(elm);
			var	origPos	= {x: pos.x, y:	pos.y};

			var	overlay	= document.createElement("div");
			overlay.style.width	= w	+ "px";
			overlay.style.height = h + "px";
			overlay.style.position = "absolute";
			overlay.style.left = pos.x + "px";
			overlay.style.top =	pos.y +	"px";
			//overlay.style.padding	= "4px";
			overlay.style.zIndex = "" +	zIndexCnt;
			overlay.className =	"ExpandArea";

			var	size = document.createElement("div");
			size.style.width = size.style.height = "8px";
			size.style.background =	"#33f";
			size.style.position	= "absolute";
			size.style.right = "-12px";
			size.style.bottom =	"-12px";
			size.style.cursor =	"nw-resize";
			size.style.MozBorderRadius = "4px";
			size.style.border =	"1px solid white";
			size.style.zIndex =	"" + zIndexCnt;
			size.setAttribute("title", "Drag to size text area, or press SHIFT key and drag to zoom");
			var	offX, offY;
			size.addEventListener("mousedown", function(e) {
				raiseToTop();
				offX = e.layerX	+ 2; offY =	e.layerY + 2;
				//window.alert("e.layerX/Y:	" +	e.layerX + "/" + e.layerY);
				document.body.addEventListener("mousemove", doSize, false);	// Looks for SHIFT key
				document.body.addEventListener("mouseup", endSize, false);
			}, false);
			overlay.appendChild(size);

			var	startingPos;
			var	reset =	size.cloneNode(false);
			reset.style.background = "#c00";
			reset.style.right =	"1px";
			reset.style.cursor = "pointer";
			reset.setAttribute("title",	"Click to toggle between reset/maximized, or drag to move text area");
			reset.addEventListener("mousedown",	function(e)	{
				startingPos	= {x: pos.x, y:	pos.y};
				raiseToTop();
				offX = e.layerX; offY =	e.layerY + 2;
				document.body.addEventListener("mousemove",	doMove,	false);
				document.body.addEventListener("mouseup", endMove, false);
			}, false);
			overlay.appendChild(reset);

			var	txt	= document.createElement("textarea");
			txt.value =	elm.value;
			txt.style.width	= "100%";
			txt.style.height = "100%";
			txt.addEventListener("blur", function(e) {
				elm.value =	this.value;
			}, false);
			
			overlay.appendChild(txt);

			document.body.appendChild(overlay);
			elm.style.visibility = "hidden";

			function raiseToTop() {
				zIndexCnt++;
				size.style.zIndex	 = "" +	zIndexCnt;
				reset.style.zIndex	 = "" +	zIndexCnt;
				overlay.style.zIndex = "" +	zIndexCnt;
				//window.alert("zIndexCnt is now: "	+ zIndexCnt);
			}

			function doSize(e) {
				var	x =	e.pageX	- pos.x	- offX;
				var	y =	e.pageY	- pos.y	- offY;

				if (! e.shiftKey) {
					// standard	resize
					overlay.style.width	= x	+ "px";
					overlay.style.height = y + "px";
				}
				else {
					// Do "centered	zoom" resizing if SHIFT	key	is held	down
					if (oldX ==	0) { oldX =	x; oldY	= y; }

					pos.x =	pos.x +	(oldX-x);
					overlay.style.left = pos.x + "px";
					x =	e.pageX	- pos.x	- offX;
					overlay.style.width	= x	+ "px";

					pos.y =	pos.y +	(oldY-y);
					overlay.style.top =	pos.y +	"px";
					y =	e.pageY	- pos.y	- offY;
					overlay.style.height = y + "px";

					oldX = x; oldY = y;
				}
			}
			function endSize(e)	{
				oldX = 0; oldY = 0;
				document.body.removeEventListener("mousemove", doSize, false);
				document.body.removeEventListener("mouseup", endSize, false);
			}

			
			function doMove(e) {
				var	x =	e.pageX	- (pos.x + offX);
				var	y =	e.pageY	- (pos.y + offY);
				
				if (oldX ==	0) { oldX =	x; oldY	= y; }

				pos.x =	pos.x -	(oldX-x);
				overlay.style.left = pos.x + "px";

				pos.y =	pos.y -	(oldY-y);
				overlay.style.top =	pos.y +	"px";

				x =	e.pageX	- (pos.x + offX);
				y =	e.pageY	- (pos.y + offY);
				oldX = x; oldY = y;
			}
			function endMove(e)	{
				oldX = 0; oldY = 0;
				document.body.removeEventListener("mousemove", doMove, false);
				document.body.removeEventListener("mouseup", endMove, false);
				if (startingPos.x == pos.x && startingPos.y	== pos.y) doResetMaxToggle();
			}
			function doResetMaxToggle()	{	
				var	isInOrigPos	=
					(pos.x == origPos.x	&&
					 pos.y == origPos.y	&&
					 overlay.style.width ==	w +	"px" &&	
					 overlay.style.height == h + "px") ? true :	false ;
				if (isInOrigPos) {
					pos.x =	4;
					pos.y =	window.scrollY + 4;
					overlay.style.left = pos.x + "px";
					overlay.style.top =	pos.y +	"px";
					overlay.style.width	= (window.innerWidth - 50) + "px";
					overlay.style.height = (window.innerHeight - 50) + "px";
				}
				else { 
					pos.x =	origPos.x; pos.y = origPos.y;
					overlay.style.left = pos.x + "px";
					overlay.style.top =	pos.y +	"px";
					overlay.style.width	= w	+ "px";
					overlay.style.height = h + "px";
				}
			}
		}

		function getAbsolutePosition(elm) {
			var	x =	0, y = 0;
			while( elm && elm != document.body ) {
				x += elm.offsetLeft;
				y += elm.offsetTop;
				elm	= elm.offsetParent;
			}
			return { x:	x, y: y	};
		}
	}  // end expandArea()

	function setup() {
		//alert("entered setup() function..." );
		if(	!document.getElementsByTagName("textarea").length )	{
			//alert("no textarea elements found on page, exiting script...");
			return;
		}

		if (autoHijack)	{
			//alert("autohijacking all textarea elements found on page...");
			expandArea(document.getElementsByTagName("textarea"));
		}
		else {
			//alert("setting up trigger button...");
			var	on = document.createTextNode("Activate TextAreas Script");
			var	off	= document.createTextNode(String.fromCharCode(160) + String.fromCharCode(171) +	String.fromCharCode(160));

			var	html = "&nbsp;&laquo;&nbsp;";
			var	trigger	= document.createElement("div");
			trigger.appendChild( off );
			with(trigger.style)	{
				position = "fixed";
				right =	bottom = "0px";
				color =	"black";
				background = "white";
				border = "1px solid";
				padding	= "3px";
				font = "10px sans-serif";
				cursor = "pointer";
				MozOpacity = ".4";
				MozBorderRadiusTopleft = "8px";
				MozBorderRadiusBottomleft =	"8px";
			}
			trigger.addEventListener("mouseover", function(e) {
				//alert("running onmouseover() event function...");
				this.replaceChild(on, off);
			}, false);
			trigger.addEventListener("mouseout", function(e) {
				//alert("running onmouseout() event function...");
				this.replaceChild(off, on);
			}, false);
			trigger.addEventListener("click", function(e) {
				//alert("running onclick() event function...");
				expandArea(document.getElementsByTagName("textarea"));
				this.parentNode.removeChild(this);
			}, false);
			
			
			document.body.appendChild(trigger);
		}
	} // end setup()

	window.addEventListener("load",	setup, false);
})();


