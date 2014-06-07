/*
 ==UserScript==
@name QuickGallery
@namespace http://www.vandenoever.info
@description Load all pictures from a thumbnail gallery at once and navigate them with arrow keys or mouse. Images may be zoomed with 'z'.
@include *

==/UserScript==
*/

/*
  Author: Jos van den Oever ( jos@vandenoever.info )

  License: GPL

  Version history:
    2006-01-22: revert links when QuickGallery is 'closed' and test images
    2006-01-13: assigned 'z' to zoom (bugfix), improved image finding, added close button
    2005-12-02: updated the script to work with GreasMonkey 0.5.3 and newer
    2005-06-08: fixed RegExp problem and improved Opera key bindings
    2005-06-04: updated the script so that it works with Opera 8
    2005-06-03: added support for normal links to images
    2005-06-02: 90% rewrite. Added images as overlay, tooltip, and zooming.
    2005-06-01: Initial write.

  Possible future enhancements:
    - allow for delayed loading of images by first putting a string in the array imgs and
      replacing it with an img element when the url is requested

*/

// wrap the entire functionality in an anonymous function
(function() {
window.addEventListener("load", function(ev) {

// define variable that remembers the current image position
var i;
// the variable holding the state of the zoom toggle
var zoom = false;

var quickgallery_on = true;

var dialog_initialized = false;

// function definitions

var setVisible = function(img, mouseevent) {
	i = img.n;
	img.style.display='block';
	img.style.position='absolute';
	img.style.zIndex = 100;
	doZoom(img);
	// try to show the middle of the img under the middle of the cursor
	if (mouseevent) {
		centerMouse(img, mouseevent);
	} else {
		centerScreen(img);
	}
}
// resize the image if we are in zoom mode
var doZoom = function(img) {
	if (!img.owidth) {
		img.owidth=img.width;
		img.oheight=img.height;
	}
	if (zoom) {
		var sw = window.innerWidth;
		var sh = window.innerHeight;
		if (img.owidth/sw < img.oheight/sh) {
			img.style.height = sh+"px";
			img.style.width = 'auto';
		} else {
			img.style.width = sw+"px";
			img.style.height = 'auto';
		}
	} else {
		img.style.width = 'auto';
		img.style.height = 'auto';
	}
}
// display the image as close as possible to the mouse as possible
// and also try to keep it inside of the browser window
var centerMouse = function(img, e) {
	var iw = img.width;
	var sw = window.innerWidth;
	var mx = e.pageX;
	var sx = window.pageXOffset;
	var left;
	if (iw > sw) {
		left = sx + (sw-iw)/2;
	} else {
		left = mx-iw/2;
		if (left+iw > sw+sx) {
			left = sw+sx-iw;
		} else if (left < sx) {
			left = sx;
		}
	}
	img.style.left = ((left>=0)?left:0)+"px";
	var ih = img.height;
	var sh = window.innerHeight;
	var my = e.pageY;
	var sy = window.pageYOffset;
	var top;
	if (ih > sh) {
		top = sy + (sh-ih)/2;
	} else {
		top = my-ih/2;
		if (top+ih > sh+sy) {
			top = sh+sy-ih;
		} else if (top < sy) {
			top = sy;
		}
	}
	img.style.top = ((top>=0)?top:0)+"px";
}
// display the image at the center of the screen
var centerScreen = function(img) {
	var sx = window.pageXOffset;
	var sy = window.pageYOffset;
	var sw = window.innerWidth;
	var sh = window.innerHeight;
	var iw = img.width;
	var ih = img.height;
	var top = sy + (sh-ih)/2;
	var left = sx + (sw-iw)/2;
	img.style.top = ((top>=0)?top:0)+"px";
	img.style.left = ((left>=0)?left:0)+"px";
}
var setInvisible = function(img) {
	img.style.display='none';
}
// show the image at position pos in the imgs array
var showImg = function(pos) {
	for (var j in imgs) {
		if (j==pos && quickgallery_on) {
			setVisible(imgs[j]);
		} else {
			setInvisible(imgs[j]);
		}
	}
}
// make the images clickable
var setToggle = function(a, bigimg) {
	var f1 = function(event) {
		if (quickgallery_on && a.valid) {
			setVisible(bigimg, event);
			event.preventDefault();
		}
		// return 'false' so that the hyperlink is not followed
		return !quickgallery_on;
	}
	a.addEventListener('click', f1, true);
	var f2 = function(event) {
		setInvisible(bigimg, event);
		i = imgs.length;
		event.preventDefault();
		return false;
	}
	bigimg.addEventListener('click', f2, true);
}
var first_mismatch = true;
var valid_images = 0;
var testImage = function(a, src) {
	if (src.indexOf("file:") == 0) {
		a.valid = true;
		if (++valid_images > 1) {
			showDialog();
		}
		return;
	}
	GM_xmlhttpRequest( { method:"HEAD", url:src,
	headers:{"Referer":src},
	onload:function(details) {
		var re = new RegExp('content-type:.*image/', 'i');
		if (re.test(details.responseHeaders)) {
			a.valid = true;
			if (++valid_images > 1) {
				showDialog();
			}
		}
	}
	});
}
var addImage = function(a, src) {
	var bigimg = document.createElement('img');
	bigimg.src = src;
	bigimg.style.display='none';
	// make the background red for user feedback that the image
	// hasnt been loaded yet
	bigimg.style.backgroundImage
		='url("http://e0.extreme-dm.com/s9.g?login=quickgal&j=y&jv=n")';
	body.appendChild(bigimg);
	setToggle(a, bigimg);
	bigimg.n = imgs.length;
	imgs[imgs.length] = bigimg;
	testImage(a, src);
}

// handle user clicks: go one further
var forward = function(event) {
	i++;
	if (i>imgs.length) {
		i = 0;
	}
	showImg(i);
}
// go one image back
var backward = function(event) {
	i--;
	if (i < 0) {
		i = imgs.length;
	}
	showImg(i);
}
var keyHandler = function(event) {
	if (!quickgallery_on) {
		return true;
	}
	// ignore keys if modifiers are used
	if (event.altKey || event.ctrlKey || event.shiftKey) {
		return true;
	}
	var key = String.fromCharCode(event.which);
	var c = event.keyCode;
	var more = false;
	if (typeof window.opera == 'undefined') { // greasemonkey mode
		if (c == 39 || key == ' ') { // arrow right
			forward();
		} else if (c == 37 || key == 'b') { // arrow left
			backward();
		} else if (c == 27) { // escape
			showImg(imgs.length);
		} else if (key == 'n' || key == 'z') {
			zoom = !zoom;
			showImg(i);
		} else {
			more = true;
		}
	} else { // opera mode
		if (key == 'm') { // arrow right
			forward();
		} else if (key == 'b') { // arrow left
			backward();
		} else if (c == 27) { // escape
			showImg(imgs.length);
		} else if (key == 'n') {
			zoom = !zoom;
			showImg(i);
		} else {
			more = true;
		}
	}
	// signal if the event needs more processing
	if (!more) {
		event.preventDefault();
	}
	return more;
}

var showDialog = function() {
	// if links to images were found, install the keyhandler and show a tooltip
	if (!dialog_initialized && imgs.length > 1) {
		dialog_initialized = true;
		// handle arrow keys an 'z' for navigation
		document.addEventListener('keypress', keyHandler, true);
	
		// show a note with instructions
		var div = document.createElement('div');
		div.style.display='block';
		div.style.position='fixed';
		div.style.bottom='5px';
		div.style.right='5px';
		div.style.width='15em';
		div.style.background='#FFFFFF';
		div.style.color='#000000';
		div.style.opacity='0.8';
		div.style.border='1px solid black';
		div.style.padding='1em';
		div.style.fontFamily='sans-serif';
		div.style.fontSize='smaller';
		div.style.textAlign='justify';
		var x = document.createElement('div');
		x.style.background='black';
		x.style.cssFloat = 'right';
		x.style.color = 'white';
		x.style.width='1em';
		x.style.textAlign='center';
		x.style.marginTop = '-1em';
		x.style.marginRight = '-1em';
		x.style.cursor = 'pointer';
		div.appendChild(x);
		var title = document.createElement('em');
		var msg = "QuickGallery: ";
		title.appendChild(document.createTextNode(msg));
		div.appendChild(title);
		if (typeof window.opera == 'undefined') {
			msg = " Use the arrow keys to navigate the images and 'z' "
			+"to zoom.";
		} else {
			msg = " Use 'm' for next image, 'n' to zoom, and 'b' for the "
				+"previous image.";
		}
		var t = document.createTextNode(msg);
		div.appendChild(t);
		x.innerHTML = 'x';
		div.style.zIndex=50;
		// exit quickgallery when one clicks on it's box
		x.addEventListener('click', function() {
			quickgallery_on = false;
			body.removeChild(div);
		}, true);
		body.appendChild(div);
	}
}

// main functionality

// regexp for filtering on jpeg extension
var re = new RegExp('(.*\\.(jpe?g|png|bmp|gif))$', 'i');
// regexp for extracting direct links to images
var re2 = new RegExp('((ht|f)tp:[^&]*)[&\'"]');
var imgs = new Array();
// add all full-size images to the page as hidden img elements
// this loop should be fast because it is performed for _every_ webpage
var body = document.body;
for (var a in document.links) {
	a = document.links[a];
	var match = re2.exec(a.href);
	if (match == null) {
		match = re.exec(a.href);
	} else {
		match = re.exec(match[0]);
	}
	if (match != null) {
		addImage(a, match[0]);
		if (imgs.length > 32) {
			break;
		}
	}
}
i = imgs.length;

// end of the anonymous function
 }, false);
})();
