// ==UserScript==
// @name          Gmail Resize Left Column (for Chrome)
// @namespace     http://userscripts.org/users/482947
// @description   User script that allows the labels column in Gmail to be resized
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @version       0.1
// @history       0.1 Initial release
// ==/UserScript==

// All credit to Dan http://www.codecouch.com/author/dan/
// See http://www.codecouch.com/2011/11/how-to-enable-resizing-of-the-left-hand-labels-column-in-gmail/

var loadGmailResizer = function() {
	if (typeof(gmonkey) != 'object' || !('load' in gmonkey)) return;
 

	// Use the Gmail Greasemonkey API to reliably find the 2 main elements (the left- and right-hand columns). You do not need Greasemonkey installed 
	// to use this API. See http://code.google.com/p/gmail-greasemonkey/wiki/GmailGreasemonkey10API for details (note: the documentation is out of date)
	//
	// Load the API. It will run our callback function when loaded, passing a GmailAPI object
	gmonkey.load(2, function(o) {

		// Custom pixel width to set the label column to initially
		var initialWidth = 155;
		// Whether to do this (1=yes, 0=no)
		var startAtInitialWidth = 1;
		
		/*
			Set up variables. To keep the code size down, some are re-used. There should be no global namespace pollution
	 
			i		initially points to the parent element of the left-hand nav, ultimately points to the parent element of the grab bar
			l		initially used as a loop counter, ultimately points to the element that is resized to change the left-hand column width
			r		initially used as a temporary loop variable, ultimately points to the style object of the element that is resized in the right-hand column
			c		initially points to the parent element of the active view, then parent element of all columns, then used to hold the width of columns 3-n (if present)
			d		this points to the document in the frame we use
			b		this points to the body
			t		this is used to calculate the top coordinate of the grab bar
			x		this holds the initial x delta between mouse click and left-hand column width
			w		initially used to point to the left-hand and main column elements, then during dragging, this holds the new width of the left-hand column
			n		initially holds pointers to all the columns elements, then the left-hand nav, then holds the string 'addEventListener'
			g		this points to the grab bar element
			Q		this holds the string 'querySelector'
			W		this holds the string 'width'
			U		used for many things, most notably holding the strings 'parentNode', 'childNodes', and 'cssText'
			P		this holds the string 'px'
			S		this holds the string 'style'
			k		this is the function that sets the width of the right-hand column
		*/		
	 
		var i=o.getNavPaneElement(), l, r, c=o.getActiveViewElement(), d=c.ownerDocument, b=d.body, t=0, x, w, n, g, Q='querySelector', W='width', U='parentNode', P='px', S='style', k=function() { r[W]=b[o]-l[o]-c+P; };
	 
		// Update c and i to point to their intended elements
		while(c.compareDocumentPosition(i)&2) c=c[U];
		while(i[U]!=b) i=i[U];
	 
		// Update n to hold pointers to all the column elements (even if more than 2 are present), and w to point to just the first 2
		n=c[U='childNodes'], w=[n[0], n[1]];
	 
		// Detect if a table has been used for layout (this happens with some of the Gmail labs, e.g. Right-side chat). If present, find the first
		// element that is controlling the cell's width by finding the first element that has an explicit non-zero width style set. This isn't a
		// perfect detection method (working with all the child nodes might be better), but it's better than nothing, and works at the moment :-)
		if(c.cells)
			for(o in w) {						// Loop over the first two table cells
				for(l in r=w[o][U])				// Find all of the cell's child elements and loop over them
					if(parseInt(r[l][S][W])) {		// If the current child element has a non-zero style width explicitly set...
						w[o]=r[l];			// ... then assume it is the width-controlling element, and store in in the current item in w
						break;				// There's no point in continuing to check the children (doing a "When a stranger calls")
					}
			}
	 
		// Update l and r to point to their intended elements, and determine how much space is taken up
		// by any other columns (if present) by subtracting the label & main columns widths from the body width
		l=w[0], r=w[1][S], c=b[o='offsetWidth']-l[o]-w[1][o];
	 
		// Create the grab bar, and insert it into the page
		g=i.appendChild(d.createElement('div'));
	 
		// Copy the inline style from the "Compose" button. At present, the only inline style is a browser-specific user-select style used to prevent text selection.
		// This is applied to the right-hand column while dragging is underway to stop the text being selected. It is removed afterwards so that text can be copied.
		// This approach keeps the code size down, as the Gmail code handles the browser detection so I don't have to deal with vendor prefixes.
		// Store the inline style in a property called 'cssText2' of the right-hand column's style object
		n=l[Q]('[role^=n]');
		r[(U='cssText')+2]=n[Q]('[role]')[S][U];
	 
		// Calculate the top position for the grab bar
		while(t+=n.offsetTop, n=n.offsetParent);
	 
		// Style the grab bar
		g[S][U] = W + ':4px;position:absolute;z-index:1;left:' + (l[o]-5) + 'px;top:' + t + 'px;bottom:0;cursor:ew-resize;cursor:col-resize;background:url(data:image/gif;base64,R0lGODlhAwAEAIAAAL+/v////yH5BAAAAAAALAAAAAADAAQAAAIERGKnVwA7)';
	
		// Set the initial width to custom value
		if(startAtInitialWidth==1) {
			l[S][W]=initialWidth+P;
			g[S].left=initialWidth-5+P;
			k();
		}
	
		// Add a resize event to the window to update the size of the right-hand column when the window is resized
		// While Gmail does this anyway, it doesn't take into account any size change to the left-hand column
		top[n='addEventListener']('resize', k, 0);
	 
		// Add mouse event listeners. mousedown is added to the grab bar, mousemove and mouseup to the document
		g[n]('mousedown', function(e) {
			// Only trigger with the LMB on grab bar. Stores initial x coord and width of left-hand column
			// Save a copy of the existing right-hand column style so we can restore it later, then disable text selection
			// Call e.preventDefault() to stop a native drag operation from starting (this happens a lot in Fx)
			e.which==1 && (x=l[o]-e.pageX, r[U+3]=r[U], r[U]+=r[U+2], e.preventDefault());
		}, 0);
	 
		d[n]('mousemove', function(e) {
			// If we have the mouse button pressed, work out the x delta then update the column widths and the grab bar position
			x && (w=e.pageX+x, l[S][W]=w+P, g[S].left=w-5+P, k());
		}, 0);
	 
		d[n]('mouseup', function(e) {
			// If the LMB is released, stop the mousemove code from running and restore the right-hand column style
			// k() needs to be called again, as restoring the style could alter the width
			e.which==1 && (x=0, r[U]=r[U+3], k());
		}, 0);
	});
 
};
var d = document, s = d.createElement('script');
s.type = 'text/javascript';
s.textContent = '(' + loadGmailResizer.toString() + ')()';
d.body.appendChild(s);