// KeyNav
// version 0.1.1 beta
// Itamar Benzaken
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "KeyNav", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          KeyNav
// @description   Enables keyboard navigation
// @namespace     tag:itamar.benzaken@gmail.com,2008-09-10:KeyNav
// @include       *
// ==/UserScript==

/*

@what

The script enables keyboard navigation.

@how

Pressing a hotkey displays a (or hides the) label near each clickable element.
Pressing the shortcut triggers the "click" for the associated element.

@structure

- A Map object: enables mapping of a String (the shortcut) to an Object (the DOM element).
- A Configuration object: contains anything that can be "externalized" (preferences, actual label generation, etc).
- A KeyNav object: the main object that handles all the messy stuff.

@changelog

0.1
	initial
	
0.1.1
	- added labels index for faster looking up of labels
	- moved creation of labels to initialization
	- added event handler for invalidating labels when document changes
*/

//javascript.options.strict = true;
//browser.dom.window.dump.enabled = true;

function Map() {
	function LOG(message) {
		//window.dump( "[Map] " + message + "\n");
	}
	
	// internal map
	var map;
	
	var bEmpty;
	
	/* returns the value associated with the given key
	* 
	* @param key
	* @return the associated value, or null if none
	*/
	this.getValue = function (key) {
		if (key in map)
		return map[key];
		
		return null;
	}
	
	/* returns a set of values whose keys pass a certain filter
	*
	* @param predicate a filter Function [key->Boolean] that returns True
	*        iff the key's value should be included in the result set
	* @return a values Array 
	*/
	this.getValuesByPredicate = function (predicate) {
		var values = new Array(0);
		
		for (key in map) {
			if ( predicate(key) ) {
				values.push( map[key] );
			}
		}
		
		return values;
	}
	
	/* add a key=value binding
	*
	* @param val
	* @param key
	*/
	this.setValue = function (key, val) {
		bEmpty = false;
		map[key] = val;
		LOG( "bound \"" + key + "\" to " + val);
	}
	
	this.clear = function () {
		map = new Object();
		bEmpty = true;
	}
	
	this.isEmpty = function() {
		return bEmpty;
	}
	
	this.keys = function () {
		var keys = new Array();
		
		for ( var key in map ) {
			keys.push(key);
		}
		
		return keys;
	}
	
	this.values = function () {
		var values = new Array();
		
		for ( var key in map ) {
			values.push( map[key] );
		}
		
		return values;
	}
	
	this.clear();
}

/* Configuration object */
function Configuration() {
	function LOG(message) {
		//window.dump( "[Configuration] " + message + "\n");
	}
	
	this.getPreference = function (key) {
		if ( key=="activationKeyCode" ) {
			return 0x7B; //F12
		}
		else if ( key=="deactivationKeyCode" ) {
			return 0x7B; //F12
		}
		else
			return null;
	}
	
	/* returns a UNIQUE shortcut calculated using `ndx`
	*
	* @param ndx a non negative integer Number
	* @return a unique (in terms of ndx) String
	*/
	this.generateShortcut = function (ndx) {
		return ndx;
	}
	
	this.createLabel = function(element,shortcut) {
		var overlay = getElementOverlay(element);
		var overlayId = "keynav.shortcut["+shortcut+"]";
		
		// no overlay at all yet? create one
		if (!overlay) {
			LOG("creating a new empty, hidden overlay");
			
			overlay = document.createElement("span");
			overlay.style.position = "absolute";
			overlay.style.background = "lightyellow";
			overlay.style.fontSize = "small";
			overlay.style.fontColor = "black";
			overlay.style.border = "1px dashed darkgray";
			overlay.style.fontColor = "black";
			overlay.style.visibility = "hidden";
			overlay.style.padding = "1px";
			
			// insert as a sibling, because the element itself might not be able
			// to have children (like a Button, for example)
			element.parentNode.insertBefore(overlay,element);
		}
		
		// new/wrong shortcut? fix shortcut
		if ( (!overlay.id) | (overlay.id!=overlayId) ) {
			LOG("changing overlay id from '" + overlay.id + "' to '" + overlayId + "'");
			
			overlay.id = overlayId;
			overlay.innerHTML = "<font color=\"black\">" + shortcut + "</font>";
			element.setAttribute( "keynav:shortcut", shortcut );
		}
		else {
			LOG("overlay already exists for id: " + overlayId);
		}
		
		return overlay;
	}
	
	/** Returns the shortcut overlay of the specified element
	* 
	* @param element
	* @return 
	*/
	function getElementOverlay(element) {
		if ( element.hasAttribute("keynav:shortcut") ) {
			var shortcutElementId = "keynav.shortcut[" + 
					element.getAttribute("keynav:shortcut") + "]";
			
			var shortcutElement = document.getElementById(shortcutElementId);
			
			return shortcutElement;
		} else {
			return null;
		}
	}
	
	/** highlights (or dims) the element's shortcut.
	*
	* @param element the Element whose shortcut is to be highlighted/dimmed
	* @param on a Boolean - true to highlight, false to dim.
	*/
	this.highlightShortcut = function (element,on) {
		var overlay = getElementOverlay(element);
		
		if (overlay) {
			overlay.style.background = on ? "lightgreen" : "lightyellow";
			overlay.style.border = on ? "1px solid black" : "1px dashed darkgray";
		}
	}
	
	/** Selects the elements of the document to assign shortcuts to
	*
	* @return an array of Elements
	*/
	this.getClickableElements = function() {
		var ems = new Array(0);
		
		function addClickableElementsIn( parent ) {
			
			for (var i=0; i<parent.childNodes.length; ++i) {
				var node = parent.childNodes[i];
				
				if (node.nodeType!=1) {
					continue;
				}
				
				var clickable = node.nodeName.toLowerCase()=="input" |
						node.nodeName.toLowerCase()=="select" |
						node.hasAttribute("href") |
						node.hasAttribute("onclick");
				
				if ( clickable ) {
					ems.push(node);
				}
				
				addClickableElementsIn(node);
			}
		}
		
		addClickableElementsIn(document);
		
		return ems;
	}
	
	/** Simulates a user-click on an element
	* 
	* @param element the element that should be "clicked"
	*/
	this.simulateClick = function (element) {
		
		if ( element.nodeName.toLowerCase()=="input" ) {
			// only INPUT elements implement the click() method
			
			element.focus();
			element.click();
		}
		if ( element.nodeName.toLowerCase()=="select" ) {
			element.focus();
		}
		else if (element.hasAttribute("onclick")) {
			// must come before checking "href" because links may have a
			// pseudo "href" but a real "onclick"
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0,
   0, 0, 0, 0, false, false, false, false, 0, null);
   element.dispatchEvent(evt);
		}
		else if (element.hasAttribute("href")) {
			window.location = element.getAttribute("href");
		}
		
	}
}

function KeyNav() {
	function LOG(message) {
		//window.dump( "[KeyNav] " + message + "\n");
	}
	
	/** displays information that most users will find useful
	*
	* @param message a String to display to the user
	*/
	var displayOverlay;
	function display(message) {
		if (!displayOverlay) {
			displayOverlay = document.createElement("div");
			
			displayOverlay.style.position = "fixed";
			displayOverlay.style.display = "block";
			displayOverlay.style.left = "40%";
			displayOverlay.style.top = "40%";
			displayOverlay.style.background = "lightgreen";
			displayOverlay.style.border = "1px dashed black";
			displayOverlay.style.padding = "2px";
			displayOverlay.style.zorder = 500;
			displayOverlay.style.opacity = 0.8;
			displayOverlay.setAttribute("align","center");
			
			document.getElementsByTagName("body")[0].appendChild( displayOverlay );
		}
		
		if (message=="") {
			displayOverlay.style.visibility = "hidden";
		} else {
			displayOverlay.style.visibility = "visible";
			displayOverlay.innerHTML = message;
		}
	}
	
	var conf = new Configuration();
	var bindings = new Map(); //maps Strings (shortcuts) to Elements
	
	var acceptInput = false; //off by default
	
	// last searched shortcut.
	// the shortcut is searched incrementally
	var lastShortcut = "";
	
	/** highlights the overlays for the specified elements. Dims all other
	*  elements
	*
	* @param targets an Elements array whose overlays should be highlighted
	*/
	function highlightOverlays( targets ) {
		//TODO use _labels instead of bindings.values()
		
		// trivial implementation: dims all elements and highlights the
		// specified ones
		
		// dim all elements
		var allTargets = bindings.values();
		for (var i=0; i<allTargets.length; ++i) {
			conf.highlightShortcut( allTargets[i], false );
		}
		
		// highlight specified elements
		for (var i=0; i<targets.length; ++i) {
			conf.highlightShortcut( targets[i], true );
		}
	}
	
	var _labels = new Array(0);
	var _labelsValid = false;
	
	function invalidate() {
		_labelsValid = false;
		LOG("invalidated");
	}
	
	function isValid() {
		return _labelsValid;
	}
	
	function createLabels() {
		_labels = new Array(0);
		bindings.clear();
		
		var clickableElements = conf.getClickableElements();
		
		for (var i=0; i<clickableElements.length; ++i) {
			var element = clickableElements[i];
			var shortcut = conf.generateShortcut(i);
			var label = conf.createLabel(element,shortcut);
			
			bindings.setValue( shortcut, element );
			_labels.push( label );
		}
		
		_labelsValid = true;
		LOG("labels are now valid");
	}
	
	function showLabels() {
		for (var i=0; i<_labels.length; ++i) {
			_labels[i].style.visibility = "visible";
		}
	}
	
	function hideLabels() {
		for (var i=0; i<_labels.length; ++i) {
			_labels[i].style.visibility = "hidden";
		}
	}
	
	/* toggles keyboard navigation on/off for the current document
	*
	* @param en a Boolean
	*/
	function toggle(en) {
		if (en) {
			// suspend the event handler until all labels are created (and 
			// inserted to the document)
			document.removeEventListener("DOMNodeInserted",invalidate,true);
			
			if (!isValid()) {
				createLabels();
			}
			
			showLabels();
			
			acceptInput = true;
			display("");
			
			// whenever the document changes, invalidate the labels
			document.addEventListener("DOMNodeInserted",invalidate,true);
			
			LOG("enabled");
		}
		else {
			acceptInput = false;
			hideLabels();
			display("");
			LOG("disabled");
		}
	}
	
	function onKeyPress(evt) {
		if (!acceptInput) return;
		
		// append pressed character to the shortcut we are going to lookup
		var ch = String.fromCharCode(evt.charCode).toLowerCase();
		lastShortcut += ch;
		
		// lookup targets starting with the shortcut
		var targets = bindings.getValuesByPredicate( function(key){
			if ( key.substring(0,lastShortcut.length)==lastShortcut )
			return true;
			else
				return false;
		} );
		
		highlightOverlays( targets );
		
		if ( targets.length==0 ) {
			// no targets at all - start a new search next time
			display("");
			
			LOG(lastShortcut + " is unbound. clearing");
			lastShortcut = "";
		}
		else if ( targets.length==1 ) {
			// exactly one match - navigate to target, and start a new search
			// next time
			display("");
			
			LOG(lastShortcut + " bound to 1 target. clearing. navigating");
			
			if (targets[0]) {
				toggle(false);
				conf.simulateClick(targets[0]);
			}
			else {
				LOG("no target for sequence: " + lastShortcut);
			}
			
			lastShortcut = "";
		}
		else {
			// more than one match - do nothing. next search will be appended
			display("Keep typing.. " + targets.length +
					" elements match so far<br>(or press Enter to \"click\" " +
					lastShortcut + ")");
			
			LOG(lastShortcut + " bound to " + targets.length + " targets");
		}
	}
	
	function onKeyDown(evt) {
		// activation
		if (!acceptInput & evt.keyCode==conf.getPreference("activationKeyCode")) {
			toggle(true);
		}
		// deactivation
		else if (acceptInput & evt.keyCode==conf.getPreference("deactivationKeyCode")) {
			toggle(false);
			return;
		}
		
		if (!acceptInput) return;
		
		switch (evt.keyCode) {
			//case KeyEvent.DOM_VK_RETURN:
			case 0x0D: //KeyEvent.DOM_VK_ENTER:
					// match the exact shortcut typed so far
					
					var target = bindings.getValue(lastShortcut);
			LOG("match for exact shortcut " + lastShortcut + ": " + target);
					
			if (target) {
				toggle(false);
				conf.simulateClick(target);
			}
			
			lastShortcut = "";
			
			break;
		}
	}
	
	function installEventListeners() {
		window.addEventListener("keydown",onKeyDown,true);
		window.addEventListener("keypress",onKeyPress,true);
	}
	
	createLabels();
	installEventListeners();
}

var keynav = new KeyNav();