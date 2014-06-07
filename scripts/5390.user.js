/* vim: ts=4 noet ai :
$Id: exifthumbnailfetcher.user.js $



LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.20
	- Fix: apply styles only when running the app

Version 1.19
	- more styles make unvisited directories stand out
	- added feature to add viewed image links to browser history ("mark read")

Version 1.18
	- enlarge thumbnails to 260px height
	- set siteIcon to loading / done symbol

Version 1.17
	- added .JPE extension
	- NOTE: doesn't work with NoScript scripts disabled, switch (temporarily) on for now

Version 1.16
	- changed to work with page scripts disabled by NoScript extension

Version 1.15
	- Changed 'no exif' image to something less obtrusive
	- Don't display EXIF button if there aren't any JPG/JPEG files
	- Work on pages where the title is "Directory listing"

Version 1.14
	- Added "loading" icon
	- Added "No exif thumbnail" image when appropriate

Version 1.13
	- Added convenient "EXIF" button to Apache index listings

Version 1.12
	- More robust in case a thumbnail is missing from exif data
	- This was a problem for "JFIF standard 1.02" images

Version 1.11
	- Use request queue to avoid browser jamming
	- Start through GM Command key
	- Disabled GM logging

Version 1.10
	- Completely rewritten for asynchronous loading

Version 1.00
	- Initial version
	- Proof of concept, not optimized in any way


*/
// ==UserScript==
// @name           Exif Thumbnail Fetcher
// @namespace      http://joe.lapoutre.com/BoT/Javascript
// @description    Load embedded EXIF thumbnails for quick image preview
// @include        *
// @version	       1.19
// ==/UserScript==


const SOI_MARKER = 0xFFD8;  // start of image
const SOS_MARKER = 0xFFDA;  // start of stream
const EXIF_MARKER = 0xFFE1; // start of EXIF data

const INTEL_BYTE_ORDER = 0x4949;

// these are the EXIF fields we're interested in
const TAG_THUMBNAIL_OFFSET  = 0x0201;
const TAG_THUMBNAIL_LENGTH  = 0x0202;
const TAG_DATETIME          = 0x0132;
const TAG_MAKE              = 0x010F;
const TAG_MODEL             = 0x0110;

// EXIF data formats
const FMT_BYTE      = 1;
const FMT_STRING    = 2;
const FMT_USHORT    = 3;
const FMT_ULONG     = 4;
const FMT_URATIONAL = 5;
const FMT_SBYTE     = 6;
const FMT_UNDEFINED = 7;
const FMT_SSHORT    = 8;
const FMT_SLONG     = 9;
const FMT_SRATIONAL = 10;
const FMT_SINGLE    = 11;
const FMT_DOUBLE    = 12;


var _exifImgs = {
	nothumb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAPUlEQVQokWP8%2F%2F%2F%2FfwYSAAsDAwNDY%2BcMFMH68gwGXOJMyByYQnRFyOJMGCqIcRI263GJM5LqafKcNNJCCQDOdymK85vM%2BQAAAABJRU5ErkJggg%3D%3D",
	loading: "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPr6+paWlr6+vnx8fIyMjOjo6NDQ0ISEhLa2tq6urvDw8MjIyODg4J6enqampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+FU1hZGUgYnkgQWpheExvYWQuaW5mbwAh+QQACgAAACH/C05FVFNDQVBFMi4wAwEAAAAsAAAAABAAEAAABVAgII5kaZ6lMBRsISqEYKqtmBTGkRo1gPAG2YiAW40EPAJphVCREIUBiYWijqwpLIBJWviiJGLwukiSkDiEqDUmHXiJNWsgPBMU8nkdxe+PQgAh+QQACgABACwAAAAAEAAQAAAFaCAgikfSjGgqGsXgqKhAJEV9wMDB1sUCCIyUgGVoFBIMwcAgQBEKTMCA8GNRR4MCQrTltlA1mCA8qjVVZFG2K+givqNnlDCoFq6ioY9BaxDPI0EACzxQNzAHPAkEgDAOWQY4Kg0JhyMhACH5BAAKAAIALAAAAAAQABAAAAVgICCOI/OQKNoUSCoKxFAUCS2khzHvM4EKOkPLMUu0SISC4QZILpgk2bF5AAgQvtHMBdhqCy6BV0RA3A5ZAKIwSAkWhSwwjkLUCo5rEErm7QxVPzV3AwR8JGsNXCkPDIshACH5BAAKAAMALAAAAAAQABAAAAVSICCOZGmegCCUAjEUxUCog0MeBqwXxmuLgpwBIULkYD8AgbcCvpAjRYI4ekJRWIBju22idgsSIqEg6cKjYIFghg1VRqYZctwZDqVw6ynzZv+AIQAh+QQACgAEACwAAAAAEAAQAAAFYCAgjmRpnqhADEUxEMLJGG1dGMe5GEiM0IbYKAcQigQ0AiDnKCwYpkYhYUgAWFOYCIFtNaS1AWJESLQGAKq5YWIsCo4lgHAzFmPEI7An+A3sIgc0NjdQJipYL4AojI0kIQAh+QQACgAFACwAAAAAEAAQAAAFXyAgjmRpnqhIFMVACKZANADCssZBIkmRCLCaoWAIPm6FBUkwJIgYjR5LN7INSCwHwYktdIMqgoNFGhQQpMMt0WCoiGDAAvkQMYkIGLCXQI8OQzdoCC8xBGYFXCmLjCYhADsAAAAAAAAAAAA=",
	xparent: "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
};

function exifLog(msg) {
	GM_log(msg);
}

var __q;  // raw images queue
var __ok = []; // successfully processed images

function hitch(obj, methodName) {
  return function() { obj[methodName].apply(obj, arguments); };
}

// Create an object type "ExifException"
function ExifException (message) {
	this.message = message;
	this.name="ExifException";
	this.toString = function() {
		return this.message;
	};
}

// central exif processing utility
function ExifProcessor(url) {
	this.dataSource = url;
	this.exifInfo = {
			isValid: false,
			status: "uninitialized"
		};

	this.setDataSource = function(url) {
		this.dataSource = url;
	};

	this.execute = function(func) {
		// load first block and handle with parseHeader
		this.getData(0, 1023, this.parseHeader);
		// function to call after all exif work is done
		this.onLoad = func;
	};

	// get data through binary clean XHR, asynchonous mode
	this.getData = function(start, end, callback) { 
		this.req = new XMLHttpRequest();
		this.callback = callback;
		this.req.open('GET', this.dataSource);
		// binary charset opt by Marcus Granado 2006 [mgran.blogspot.com]
		this.req.overrideMimeType('text/plain; charset=x-user-defined');
		// add Range header to only retrieve a data chunk
		this.req.setRequestHeader("Range", "bytes=" + start + "-" + end);
		var _this = this;
		this.req.onreadystatechange = hitch(this, "doCallback"); 
		this.req.send(null);
	};
	
	this.doCallback = function() {
		if (this.req.readyState != 4) return;
		stat = this.req.status;
		if (! (stat == 200 || stat == 206)) {
			// exifLog("Error - req.status: " + this.req.status);
			// call onload func with invalid exifInfo
			this.exifInfo.status = "Request error; status code: " +
				this.req.status
			this.onLoad(this.exifInfo);
			return;
		}
		var data = this.req.responseText;
		var arr = new byteArray();
		for (var i=0; i<data.length; i++) {
			var c = data.charCodeAt(i);
			arr.push((c > 255) ? c - 63232 : c);
		}
		this.callback(arr);
	}

	// finds start and length of Exif block
	// data is array of bytes
	this.parseHeader = function(data) {
		var marker = data.read16();
		var len;
		if (marker == SOI_MARKER) {
			try {
				marker = data.read16();
				// reading SOS marker indicates start of image stream
				while(marker != SOS_MARKER && data.hasNext()) {
					// length includes the length bytes
					len = data.read16() - 2;
					if (marker == EXIF_MARKER) { // bingo!
						// skip 6 bytes, 'Exif\0\0'
						data.skipBytes(6);
						// offset of exifdata from start of file
						var exifStart = data.getOffset();
						// get exif data and call parser from callback handler
						this.getData(exifStart, exifStart + len - 6,
							hitch(this, "parseExif"));
							// exifLog("Exif bytes: " + (len - 6));
						return;
					} else {
						// read and discard data...
						// exifLog("Skipping " + len);
						data.skipBytes(len);
					}
					marker = data.read16();
				} // while
			} catch (e) {
				this.exifInfo.status = "Format error; no valid EXIF data found";
				this.onLoad(this.exifInfo);
			}
		} else {
			this.exifInfo.status = "Format error; no JPEG header found";
			this.onLoad(this.exifInfo);
		}
		this.exifInfo.status = "Format error; no EXIF header found";
		this.onLoad(this.exifInfo);
	};
	
	// parse exif data block
	this.parseExif = function(exifData) {
		// 8 byte TIFF header
		// first two determine byte order
		var bi = exifData.read16();
		if (bi == INTEL_BYTE_ORDER) {
			exifData.swapBytes = true;
		}
		// exifLog(exifData.swapBytes);
		// next two bytes are always 0x002A
		// offset to Image File Directory (includes the previous 8 bytes)
		var ifd_ofs = exifData.read32(4);
		// parse actual EXIF data
		this.readExifDir(exifData, ifd_ofs);
		if (this.exifInfo.thumbOffset && this.exifInfo.thumbLength) {
			// finally: keep a reference to exifData
			this.exifInfo.exifData = exifData;
			this.exifInfo.isValid = true;
		} else {
			this.exifInfo.status = "Exif error; no thumbnail found";
		}
		// and kick off the onLoad function
		this.onLoad(this.exifInfo);
		
	};
	
	// in this method we read the relevant EXIF fields
	this.readExifDir = function(exifData, dirstart) {
		try {
			// exifLog(dirstart);
			var numEntries = exifData.read16(dirstart);
			// exifLog(numEntries);
			var entryOffset;
			for (var i=0; i<numEntries; i++) {
				entryOffset = dirstart + 2 + 12*i;
				var tag = exifData.read16(entryOffset);
				switch(tag) {
					case TAG_THUMBNAIL_OFFSET:
						this.exifInfo.thumbOffset = 
							this.readTag(exifData, entryOffset);
						break;
					case TAG_THUMBNAIL_LENGTH:
						this.exifInfo.thumbLength = 
							this.readTag(exifData, entryOffset);				
						break;
					case TAG_DATETIME:
						this.exifInfo.dateTime = 
							this.readTag(exifData, entryOffset);				
						break;
					case TAG_MAKE:
						this.exifInfo.cameraMake = 
							this.readTag(exifData, entryOffset);				
						break;
					case TAG_MODEL:
						this.exifInfo.cameraModel = 
							this.readTag(exifData, entryOffset);				
						break;
				} // switch tag
			} // for entries
		} catch(e) {
			this.exifInfo.status = e.toString();
			return;
		}
		
		// from jhead:
		// In addition to linking to subdirectories via exif tags, 
		// there's also a potential link to another directory at the 
		// end of each directory. 
		// This has got to be the result of a committee!
		entryOffset = dirstart + 2 + 12*numEntries;
		if (entryOffset < exifData.getLength() - 4)  {
			var offset = exifData.read32(entryOffset);
			if (offset) this.readExifDir(exifData, offset);
		}
	};
	
	this.readTag = function(exifData, entryOffset) {
		// number of bytes per format
		var BytesPerFormat = [0,1,1,2,4,8,1,1,2,4,8,4,8];
		var format = exifData.read16(2 + entryOffset);
		var components = exifData.read32(4 + entryOffset);
		var nbytes = components * BytesPerFormat[format];
		var valueoffset;
		if(nbytes <= 4) { // stored in the entry
			valueoffset = entryOffset + 8;
		}
		else {
			valueoffset = exifData.read32(entryOffset + 8);
		}
		return exifData.exifFormat(format, valueoffset, nbytes);
	}

};

// exif data store with utility methods
function byteArray(arr) {
	this.arr = arr || [];
	this.hex = "0 1 2 3 4 5 6 7 8 9 a b c d e f".split(/\s/);
	this.pos = 0;
	this.swapBytes = false;
	this.push = function(a) {
		this.arr.push(a);
	};
	this.getLength = function() {
		return this.arr.length;
	};
	this.hasNext = function() {
		return (this.pos < this.arr.length - 1);
	};
	this.next = function() {
		return (this.hasNext()) ? this.arr[this.pos++] : null;
	};
	this.read16 = function(offset) {
		this._check(2);
		if (! offset) {
			offset = this.pos;
			this.pos += 2;
		}
		var b1 = this.arr[offset];
		var b2 = this.arr[offset + 1];
		return (this.swapBytes) ? (b2 << 8) | b1 : (b1 << 8) | b2;
	};
	this.read32 = function(offset) {
		var data = this.arr;
		if(!this.swapBytes)
			return (data[offset] << 24) | 
				(data[offset+1] << 16) | 
				(data[offset+2] << 8) | 
				data[offset+3];
		return data[offset] | 
			(data[offset+1] << 8) | 
			(data[offset+2] << 16) | 
			(data[offset+3] << 24);
	};
	this.skipBytes = function(n) {
		this._check(n);
		this.pos += n;
	};
	// checks for availability of N bytes, throws error
	this._check = function(n) {
		if (this.pos + n > this.arr.length) {
			throw(new ExifException("Attempt to read past array index"));
		}
	};
	this.getOffset = function() {
		return this.pos;
	};
	this.toString = function(offset, num) {
		if (! offset) offset = 0;
		if (! num) num = this.arr.length;
		var s = "";
		for (var i=offset; i<offset+num; i++) {
			if(this.arr[i] == 0) continue; // skip null bytes
			s += String.fromCharCode(this.arr[i]);
		}
		return s;
	};
	this.toHexString = function(offset, num) {
		if (! offset) offset = 0;
		if (! num) num = this.arr.length;
		var s = "";
		for (var i=offset; i<offset+num; i++) {
			s += "%";
			s += this.hex[Math.floor(this.arr[i] / 16)];
			s += this.hex[Math.floor(this.arr[i] % 16)];
		}
		return s;
	};
	this.exifFormat = function(format, offset, numbytes) {
		var data = this.arr;
		switch(format) {
		case FMT_STRING:
		case FMT_UNDEFINED: // treat as string
			return this.toString(offset, numbytes);
			break;
	
		case FMT_SBYTE:
			return data.charCodeAt(offset);
		case FMT_BYTE:
			return data.charCodeAt(offset);
	
		case FMT_USHORT:
			return this.read16(offset);
		case FMT_ULONG:
			return this.read32(offset);
	
		case FMT_URATIONAL:
		case FMT_SRATIONAL:
			var Num, Den;
			Num = this.read32(offset);
			Den = this.read32(offset+4);
			return (Den == 0) ? 0 : Num/Den;
	
		case FMT_SSHORT:
			return this.read16(offset);
		case FMT_SLONG:
			return this.read32(offset);
	
		  // ignore, probably never used
		case FMT_SINGLE:
		case FMT_DOUBLE:
			return 0;
		}
		return 0;
	}
}


// callback function to append the thumbnail image
function nailer(obj, queue) {
	return function(ex) {
		var imgName = obj.href;
		imgName = imgName.substring(imgName.lastIndexOf("/") + 1);
		var thumb = obj.firstChild;
		if (ex.isValid) {
			// success
			thumb.src = "data:image/jpeg," + 
				ex.exifData.toHexString(ex.thumbOffset, ex.thumbLength);
			var t = [];
			if (ex.dateTime) t.push("Date: " + ex.dateTime);
			if (ex.cameraMake) t.push(ex.cameraMake);
			if (ex.cameraModel) t.push(ex.cameraModel);
			if (t.length) thumb.setAttribute("title", t.join(" | "));
			exifLog("Ready: " + imgName);
			thumb.setAttribute('class', 'exifThumb');
			
			__ok.push(obj.href); // add to successfully processed queue
			
			// markVisited(obj.href); // Mark image link as visited and persist in browser history
		} else {
			thumb.src = _exifImgs.nothumb;
			exifLog(ex.status + " " + imgName);
		}
//		window.scrollTo(0, thumb.offsetTop - 300); // scroll image into view
		queue.done();
	}
}

// queue runner
function exQueue() {
	this.queue = [];
	this.MAX_PARALLEL = 4;
	this.ptr = 0;
	this.reqs = 0;
	this.stopped = false;
	this.init = function(allatonce) {
		var imgs = document.getElementsByTagName("a");
		for (var i=0; i<imgs.length; i++) {
			var im = imgs[i];
			if (im.href && im.href.match(/\.jpe?g?$/i)) {
				var thumb = document.createElement("img");
				thumb.src = _exifImgs.xparent;
				thumb.style.border = "0px";
				im.insertBefore(thumb, im.firstChild);
				if (allatonce) {
					var ep = new ExifProcessor(im.href);
					ep.execute(nailer(im, this));
				} else {
					this.queue.push(im);
				}
			// mark directories
			} else if (im.href && im.href.match(/\/$/i)) {
				im.className = "isDir";
			}
		}
		return this.queue.length;
	};
	this.next = function() {
//		if (this.reqs > 2) return;
		this.reqs++;
		if (this.ptr >= this.queue.length) {
			this.stop();
			return;
		}
		var img = this.queue[this.ptr++];
		// image "loading"...
		var thumb = img.firstChild;
		thumb.src = _exifImgs.loading;
		var ep = new ExifProcessor(img.href);
		ep.execute(nailer(img, this));
		var len = this.queue.length - this.ptr;
		exifLog("Queue length: " + (len) +
			" req: " + img.href);
		document.getElementById("btnExifFetcher").innerHTML = "EXIF (" + len + ")";
		
		// show DONE button and add mark read action
		if (len == 0) {
			_exDone();
		}

	};
	this.stop = function() {
		exifLog("Stopped.");
		this.stopped = true;
		
		replaceSiteIcon(_exifImgs.nothumb, "image/png");
	};
	this.done = function() {
		this.reqs--;
		if (this.stopped) return;
		for (var i=this.reqs; i<this.MAX_PARALLEL; i++) {
			this.next();
		}
	};
	this.start = function() {
		this.stopped = false;
		for (var i=this.reqs; i<this.MAX_PARALLEL; i++) {
			this.next();
		}
	};
}

// execute "get exif thumbnails"...
function _exExec() {

	addGlobalStyle("a.isDir { color: #c00; }");
	addGlobalStyle("a.isDir:visited { color: #e8e;; }");
	addGlobalStyle("a {color: #00d; } ");
	addGlobalStyle("a:visited { color: #e8e; }");
	addGlobalStyle(".exifThumb { height:260px; border:1px solid black }");

	var bdy = document.getElementsByTagName("body")[0].firstChild;
	bdy.parentNode.style.backgroundColor = "silver";

	var b = document.getElementById("btnExifFetcher");
	if(! __q) {
		__q = new exQueue();
		var len = __q.init(false);
		exifLog("Queue length: " + len);
		b.innerHTML = "EXIF (" + len + ")";
	}
	__q.start();
	b.removeEventListener("click", _exExec, false);
	b.addEventListener("click", _exStop, false);

	replaceSiteIcon(_exifImgs.loading, "image/gif");
}

function _exStop() {
	__q.stop();
	var b = document.getElementById("btnExifFetcher");
	b.innerHTML = "EXIF (paused)";
	b.addEventListener("click", _exExec, false);
	b.removeEventListener("click", _exStop, false);
}

function _exDone() {
	var b = document.getElementById("btnExifFetcher");
	b.innerHTML = "DONE (mark all visited)";
	b.addEventListener("click", markRead, false);
	b.removeEventListener("click", _exStop, false);
}


// b.addEventListener("click", _exExec, false);

function _clean_free() {
	// for free.fr:
	var mydiv = document.getElementById('mydiv');
	if (mydiv) {
		unsafeWindow.repositionit = function() {
			var mydiv = document.getElementById("mydiv");
			mydiv.style.left = '-3000px';
		};
		mydiv.parentNode.removeChild(mydiv);
		GM_log('_clean_free');
	}
}


function replaceSiteIcon(source, type) {
	var _links = document.getElementsByTagName('link');
	for (var i = _links.length - 1; i >= 0; i--) {
		var _l = _links[i];
		if (_l.getAttribute('rel').indexOf('icon') > -1) {
			_l.parentNode.removeChild(_l);
			_l = null;
		}
	}

	setTimeout( function() {
		var head = document.getElementsByTagName("head")[0].firstChild;
		var link = document.createElement("link");
		link.setAttribute('rel', 'icon');
		link.setAttribute('href', source);
		link.setAttribute('type', type);
		link.setAttribute('id', 'exifImgsSiteIcon');
		head.parentNode.insertBefore(link, head);
	}, 1);
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function markRead() {
	current_url = window.location.href;
	for (var i = __ok.length; i >= 0; --i) {
		history.replaceState({},"",__ok[i]);
	}
	history.replaceState({},"",current_url);
}

function markVisited(link) {
	// store the current URL
	current_url = window.location.href;

	// use replaceState to push a new entry into the browser's history
	history.replaceState({},"",link);

	// use replaceState again to reset the URL
	history.replaceState({},"",current_url);
}



// init
try {
	GM_registerMenuCommand("EXIF Thumbnails", _exExec, 
		"e", "shift control", "e");
	_clean_free();

	var t = document.getElementsByTagName("title");
	var links = document.getElementsByTagName ('a');
	var foundJPG = false;
	for (var i in links) {
		if (/\.jpe?g?$/i.test (links[i].href)) {foundJPG = true; break};
	}
	if (t.length && ((0 == t[0].firstChild.nodeValue.indexOf("Index of")) || (0 == t[0].firstChild.nodeValue.indexOf("Directory listing"))) && foundJPG) {
		addGlobalStyle(".exifBtn { float:left;padding:6px;display:inline-block;border:1px solid white;margin:5px;background-color:teal;color:white;font-family:sans-serif;font-weight:bold;font-size:8pt;cursor:pointer; }");

		var b = document.createElement("a");
		b.appendChild(document.createTextNode("Exif"));
// 		b.style.padding = "6px";
// 		b.style.display = "block";
// 		b.style.border = "1px solid white";
// //		b.style.position = "absolute";
// //		b.style.top = "5px";
// //		b.style.left = "5px";
// 		b.style.cssFloat = "left";
// 		b.style.marginRight = "5px";
// 		b.style.backgroundColor = "teal";
// 		b.style.color = "white";
// 		b.style.opacity = 0.8;
// 		b.style.fontWeight = "900";
// 		b.style.fontFamily = "Arial,Helvetica";
// 		b.style.fontSize = "8pt";
// 		b.style.cursor = "pointer";
		b.setAttribute("title", "Get EXIF Thumbnails");
		b.setAttribute("id", "btnExifFetcher");
		b.setAttribute("class", "exifBtn");
		b.addEventListener("click", _exExec, false);

		var bdy = document.getElementsByTagName("body")[0].firstChild;
		bdy.parentNode.insertBefore(b, bdy);
		b.focus();
	}
} catch (e) {
	// failed, no Apache index?
	//GM_log(e);
}

