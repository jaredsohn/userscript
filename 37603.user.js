// ==UserScript==
// @name         Mouse Gestures (Lite Version)
// @namespace    http://www.xuldev.org/
// @description  Lightweight customizable mouse gestures.
// @include      main
// @author       Gomita
// @version      1.0.20080201
// @homepage     http://www.xuldev.org/misc/ucjs.php
// ==/UserScript==

var ucjsMouseGestures = {

	_lastX: 0,
	_lastY: 0,
	_directionChain: "",

	init: function()
	{
		gBrowser.mPanelContainer.addEventListener("mousedown", this, false);
		gBrowser.mPanelContainer.addEventListener("mousemove", this, false);
		gBrowser.mPanelContainer.addEventListener("mouseup", this, false);
		gBrowser.mPanelContainer.addEventListener("contextmenu", this, true);
	},

	uninit: function()
	{
		gBrowser.mPanelContainer.removeEventListener("mousedown", this, false);
		gBrowser.mPanelContainer.removeEventListener("mousemove", this, false);
		gBrowser.mPanelContainer.removeEventListener("mouseup", this, false);
		gBrowser.mPanelContainer.removeEventListener("contextmenu", this, true);
	},

	_isMouseDown: false,
	_suppressContext: false,
	_shouldFireContext: false,	// for Linux

	handleEvent: function(event)
	{
		switch (event.type) {
			case "mousedown":
				if (event.button == 2) {
					this._isMouseDown = true;
					this._startGesture(event);
				}
				break;
			case "mousemove":
				if (this._isMouseDown) {
					this._progressGesture(event);
				}
				break;
			case "mouseup":
				if (this._isMouseDown) {
					this._isMouseDown = false;
					this._suppressContext = !!this._directionChain;
					this._stopGesture(event);
					if (this._shouldFireContext) {
						this._shouldFireContext = false;
						this._displayContextMenu(event);
					}
				}
				break;
			case "contextmenu":
				if (this._suppressContext || this._isMouseDown) {
					this._suppressContext = false;
					event.preventDefault();
					event.stopPropagation();
					if (this._isMouseDown) {
						this._shouldFireContext = true;
					}
				}
				break;
		}
	},

	_displayContextMenu: function(event)
	{
		var evt = event.originalTarget.ownerDocument.createEvent("MouseEvents");
		evt.initMouseEvent(
			"contextmenu", true, true, event.originalTarget.defaultView, 0,
			event.screenX, event.screenY, event.clientX, event.clientY,
			false, false, false, false, 2, null
		);
		event.originalTarget.dispatchEvent(evt);
	},

	_startGesture: function(event)
	{
		this._lastX = event.screenX;
		this._lastY = event.screenY;
		this._directionChain = "";
	},

	_progressGesture: function(event)
	{
		var x = event.screenX;
		var y = event.screenY;
		var distanceX = Math.abs(x - this._lastX);
		var distanceY = Math.abs(y - this._lastY);
		// minimal movement where the gesture is recognized
		const tolerance = 10;
		if (distanceX < tolerance && distanceY < tolerance)
			return;
		// determine current direction
		var direction;
		if (distanceX > distanceY)
			direction = x < this._lastX ? "L" : "R";
		else
			direction = y < this._lastY ? "U" : "D";
		// compare to last direction
		var lastDirection = this._directionChain.charAt(this._directionChain.length - 1);
		if (direction != lastDirection) {
			this._directionChain += direction;
			XULBrowserWindow.statusTextField.label = "Gesture: " + this._directionChain;
		}
		// save current position
		this._lastX = x;
		this._lastY = y;
	},

	_stopGesture: function(event)
	{
		try {
			if (this._directionChain)
				this._performAction(event);
			XULBrowserWindow.statusTextField.label = "";
		}
		catch(ex) {
			XULBrowserWindow.statusTextField.label = ex;
		}
		this._directionChain = "";
	},

	_performAction: function(event)
	{
		// These are the mouse gesture mappings. Customize this as you like.
		switch (this._directionChain) {
			// Back
			case "L": document.getElementById("Browser:Back").doCommand(); break;
			// Forward
			case "R": document.getElementById("Browser:Forward").doCommand(); break;
			// Reload
			case "UD": document.getElementById("Browser:Reload").doCommand(); break;
			// Reload (Skip Cache)
			case "UDU": document.getElementById("Browser:ReloadSkipCache").doCommand(); break;
			// Minimize Window
			case "RUD": window.minimize(); break;
			// Maximize Window or Restore Window Size
			case "RDU": window.windowState == 1 ? window.restore() : window.maximize(); break;
			// Open New Tab
			case "LR": document.getElementById("cmd_newNavigatorTab").doCommand(); break;
			// Close Tab
			case "DR": document.getElementById("cmd_close").doCommand(); break;
			// Undo Close Tab
			case "DL": document.getElementById("History:UndoCloseTab").doCommand(); break;
			// Undo Close Tab (If you are using Tab Mix Plus's Session Manager, use this instead.)
			// case "DL": gBrowser.undoRemoveTab(); break;
			// Previous Tab
			case "UL": gBrowser.mTabContainer.advanceSelectedTab(-1, true); break;
			// Next Tab
			case "UR": gBrowser.mTabContainer.advanceSelectedTab(+1, true); break;
			// Scroll Top
			case "LU": goDoCommand("cmd_scrollTop"); break;
			// Scroll Bottom
			case "LD": goDoCommand("cmd_scrollBottom"); break;
			// Page Up
			case "U": goDoCommand("cmd_scrollPageUp"); break;
			// Page Down
			case "D": goDoCommand("cmd_scrollPageDown"); break;
			// Increase Text Size
			case "LRD": document.getElementById("cmd_textZoomReduce").doCommand(); break;
			// Decrease Text Size
			case "LRU": document.getElementById("cmd_textZoomEnlarge").doCommand(); break;
			// Full Screen
			case "LDRU": document.getElementById("View:FullScreen").doCommand(); break;
			// Unknown Gesture
			default: throw "Unknown Gesture: " + this._directionChain;
		}
	}

};

// Entry Point
ucjsMouseGestures.init();
window.addEventListener("unload", function(){ ucjsMouseGestures.uninit(); }, false);