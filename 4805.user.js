/* vim: ts=4 noet ai :
$Id: microsummarygenerator.user.js 52 2006-07-22 07:58:31Z joe $

Microsummary Generator - (c) 2006 J.Q. la Poutre

This script lets you select an element on a web page, which then will
be used as the source for a Microsummary Generator.

The Generator code (XML) is opened in a new Firefox tab.

For more info on Microsummaries, see 
http://wiki.mozilla.org/Microsummaries


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

Version 1.10
	- improvement: user interface to choose between using
	  an element's ID as start point, or simple XPath components

Version 1.02
	- fix: escape chars in title (now for real)
	- fix: use ID attribute if selected element has one
	- enhancement: stop events after generating XML

Version 1.01
	- fix: escape chars in title

Version 1.00
	- initial release

*/

// ==UserScript==
// @name          Microsummary Generator
// @namespace     http://joe.lapoutre.com/BoT/Javascript
// @description   Create Microsummary Generators for Firefox 2.x
// @include       *
// @version       1.01
// ==/UserScript==


// -------------------- XPath Component Object ----------------
function XPathComp(path, id) {
	this.path = path;      // XPath component
	this.id = id || null;  // ID attribute
	this.pos = 1;          // position amongst siblings of same type
	this.useId = false;
}
XPathComp.prototype.incrementPos = function() {
	this.pos++;
}
XPathComp.prototype.useId = function(b) {
	this.useId = b;
}
XPathComp.prototype.toString = function() {
	var str = "/" + this.path;
	if (this.id && this.useId) {
		str += "[@id='" + this.id + "']";
	} else if (this.pos > 1) {
		str += "[" + this.pos + "]";
	}
	return str;
}
XPathComp.prototype.toDOMObj = function() {
	return this._select();
}
XPathComp.prototype._select = function() {
	if (! this.id) {
		return document.createTextNode(this.toString());
	}
	var _this = this;
	var sel, opt0, opt1;
	sel = document.createElement('select');
	sel.addEventListener('change', function(evt) {
			_this.useId = (evt.target.selectedIndex == 1);
		}, true);
	this.useId = false;
	opt0 = document.createElement('option');
	opt0.appendChild(document.createTextNode(this.toString()));
	sel.appendChild(opt0);
	if (this.id) {
		opt1 = document.createElement('option');
		opt1.setAttribute("selected", "selected");
		this.useId = true;
		opt1.appendChild(document.createTextNode(this.toString()));
		sel.appendChild(opt1);
	}
	return sel;
}

// ------------------- XPath Builder Object ----------------
function XPathBuilder() {
	this.aComps = [];
}
XPathBuilder.prototype.add = function(component) {
	this.aComps.push(component);
}
// XPathBuilder.prototype.toString = function() {
//	return this.aComps.reverse().join(""); // join invokes toString()
// }
XPathBuilder.prototype.toString = function() {
	var res = [];
	for (var i = 0; i< this.aComps.length; i++) {
		var xpc = this.aComps[i];
		res.push(((xpc.useId) ? "/" : "") + xpc.toString());
		if (xpc.useId) break;
	}
	return res.reverse().join("");
}
XPathBuilder.prototype.toDOMObj = function() {
	var fm = document.createElement("form");
	for (var i = this.aComps.length - 1; i >=0; --i) {
		fm.appendChild(this.aComps[i].toDOMObj());
	}
	fm.appendChild(this._okBtn());
	fm.style.position = "fixed";
	fm.style.top = "10px";
	fm.style.left = "10px";
	fm.style.zIndex = "999999";
	fm.style.padding="10px";
	fm.style.backgroundColor = "white";
	fm.style.color = "black";
	fm.style.border = "1px solid black";
	return fm;
}
XPathBuilder.prototype._okBtn = function() {
	var _this = this;
	var ok = document.createElement("input");
	ok.setAttribute("value", "OK");
	ok.setAttribute("type", "button");
	ok.addEventListener('click', function(evt) {
			MSG.processXpath(_this.toString());
		}, true);
	return ok;
}

var MSG = {
	loaded: false,
	lastStyle: null,
	currentElt: null,

	// Funcs
	getXPathComponent: function(elt) {
		var type = elt.nodeName.toLowerCase();
		var xpc = new XPathComp(type, elt.id);
		for (;;) {
			elt = elt.previousSibling;
			if (! elt) break;
			if (type == elt.nodeName.toLowerCase()) xpc.incrementPos();
		}
		return xpc;
	},

	testXPath: function(xpath) {
		try {
			var res = document.evaluate(xpath, 
				document, null, XPathResult.ANY_TYPE, null);
			return res.stringValue;
		} catch (e) {
			return "Error: " + e.toString();
		}
	},

	XMLString: function(str) {
		return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
	},

	processXpath: function(xpath) {
		xpath = "normalize-space(string(" + xpath + "))";
		var str = this.testXPath(xpath);			
		if(window.confirm('Microsummary:\n' + str + "\n\nResult opens in a new tab.")) {
			this.buildTemplate(xpath);
			// unmark selected element by simulating a mouseout event
		}
	},

	buildTemplate: function(xpath) {
		var title = document.getElementsByTagName('title');
		if (title.length) {
			title = title[0].textContent;
		} else {
			// title element missing? Use host name.
			title = window.location.hostname;
		}
		var str = '<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<generator xmlns="http://www.mozilla.org/microsummaries/0.1" ' +  
		'name="Microsummary for ' + this.XMLString(title) + '">\n' +
	
		' <pages>\n' +
		'   <include>^' + window.location.href.replace(/\./g, '\\.') + '</include>\n' +
		' </pages>\n' +
	
		' <template>\n' +
		'   <transform xmlns="http://www.w3.org/1999/XSL/Transform" version="1.0">\n' +
		'     <output method="text"/>\n' +
	
		'     <template match="/">\n' +
		'       <value-of select="' + xpath + '"/>\n' +
		'     </template>\n' +
		'   </transform>\n' +
		' </template>\n' +
	
		'</generator>\n';
	
		GM_openInTab("data:text/plain;charset=UTF-8," + encodeURI(str));
	},

	handleOnclick: function(elt) {	
		var xpBuild = new XPathBuilder();
		
		xpBuild.add(this.getXPathComponent(elt));
		
		for(;;) {
			// make element with ID start point (as an ID is unique)
			elt = elt.parentNode;
			if (! elt) break;
			// fill in root part, avoids GM clutter
			if ("body" == elt.nodeName.toLowerCase()) {
				xpBuild.add(new XPathComp("body"));
				xpBuild.add(new XPathComp("html"));
				break;
			}
			try {
				xpBuild.add(this.getXPathComponent(elt));
			} catch (e) {
				// aElts.push(e.toString());
			}
		}
		// User interface to select ID/Path components
		var panel = xpBuild.toDOMObj();
		document.getElementsByTagName("body")[0].appendChild(panel);
		if (this.currentElt) {
			var outevt = document.createEvent("MouseEvents");
			outevt.initMouseEvent("mouseout", true, true, window,	
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			this.currentElt.dispatchEvent(outevt);
		}
		this.exit(); // stop it.
	},

	handleMouseover: function(elt) {
		this.lastStyle = elt.style.border; // store for later
		this.currentElt = elt;
		// mark with border around the elt
		elt.style.borderWidth = '2px';
		elt.style.borderStyle = 'solid';
		elt.style.borderColor = 'lime';
	},

	handleMouseout: function(elt) {
		elt.style.border = this.lastStyle;
		this.currentElt = null;
	},

	init: function() {
		document.addEventListener("mouseover", MSG_onMouseOver, true);
		document.addEventListener("mouseout", MSG_onMouseOut, true);
		document.addEventListener("click", MSG_onClick, false);
		document.addEventListener("unload", MSG.exit, true);
		this.loaded = true;
	},

	exit: function() {
		// runs from event scope, so global MSG needed
		MSG.loaded = false;
		document.removeEventListener("mouseover", MSG_onMouseOver, true);
		document.removeEventListener("mouseout", MSG_onMouseOut, true);
		document.removeEventListener("click", MSG_onClick, false);
	}


};


// Event handlers
function MSG_onMouseOver(evt) {
	elt = evt.target;
	MSG.handleMouseover(elt);
}


function MSG_onMouseOut(evt) {
	elt = evt.target;
	MSG.handleMouseout(elt);
}


function MSG_onClick(evt) {
	var elt = evt.target;
	MSG.handleOnclick(elt);
	evt.preventDefault();
	return false;
}


GM_registerMenuCommand("Generate Microsummary Generator", MSG.init, "g", "shift alt", "G");
