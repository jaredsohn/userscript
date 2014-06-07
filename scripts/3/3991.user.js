// ==UserScript==// @name          My Yahoo Navigator// @namespace     http://pragmaticprose.com/// @description	 Version 1.0.0 Navigate My Yahoo page using the keyboard.  Press H for keyboard mappings once the script is installed.// @include       http://my.yahoo.*// ==/UserScript==


const NORMAL_KLASS = "";
const HOVER_KLASS = "yhover";
const HOVER_CSS = ".yhover {border: medium solid rgb(139,0,0);color:#000000; margin-top: 1em;margin-bottom: 1em;font-weight:bold;padding:2px;-moz-border-radius: 10px;-moz-opacity:0.9;}";
const KEY_LEFT = 37;
const KEY_UP = 38;const KEY_RIGHT = 39;const KEY_DOWN = 40;
const KEY_ENTER = 13;const KEY_D = 68;
const KEY_G = 71;const KEY_H = 72;const KEY_I = 73;const KEY_M = 77;const KEY_N = 78;const KEY_R = 82;const KEY_S = 83;const KEY_W = 87;(function () {
			var headers = new Array();		var headerNodes = document.evaluate("//td[@class='hb t1']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	for (var i = 0; i < headerNodes.snapshotLength; i++) {		headers.push (headerNodes.snapshotItem (i));	}		var items = new Array();	var itemNodes = document.evaluate("//h3", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	for (var i = 0; i < itemNodes.snapshotLength; i++) {		items.push (itemNodes.snapshotItem (i));	}	var index = -1;

	var searchField;
	if (document.layers)
		document.captureEvents(Event.FOCUS | Event.BLUR);

	var txtboxes = document.evaluate("//input[@type='text']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < txtboxes.snapshotLength; i++) {
		var txtbox = txtboxes.snapshotItem (i);
		if (i == 0)
			searchField = txtbox;

		txtbox.addEventListener ('focus', function () { document.removeEventListener ('keydown', keypress_handler, true); }, true);
		txtbox.addEventListener ('blur', function () { document.addEventListener ('keydown', keypress_handler, true); }, true);
		}			function getDim(el){
		for (var lx=0,ly=0;el!=null;
			lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
		return {x:lx,y:ly}
	}

	function highlight (pos) {		for (var i = 0; i < items.length; i++) {
			if (pos == i) {				items [i].className = HOVER_KLASS;				var halfScreen = (window.innerHeight / 2);				var y = getDim(items[i]).y - halfScreen;				window.scroll(0, y);			}
			else
				items [i].className = NORMAL_KLASS;		}	}	function keypress_handler (e) {		switch (e.which) {
		case KEY_UP:
			if (index <= 0)
				index = items.length - 1;
			else
				index--;
			highlight (index);
			break;
		case KEY_DOWN:
			if (index >= items.length - 1)
				index = 0;
			else
				index++;
			highlight (index);
			break;
		case KEY_ENTER:
			if (index == -1)
				return false;
			else
				document.location = items[index].firstChild.getAttribute ("href");			break;		case KEY_D:
			if (didYouMeanPath != null) {				document.location = didYouMeanPath;			} 
			break;
		case KEY_G:
			if (groupSearchPath != null) {				document.location = groupSearchPath;			} 			break;
		case KEY_H:			var helpString = 'Shortcut Keys: \n\				Enter: Open highlighted item in current window \n\				N:  Open highlighted item in new window \n\				S:  Set Focus to the search field \n\				Up Arrow:  Cycle up through search results \n\				Down Arrow: Cycle down through search results \n\				';
			alert(helpString);			break;		case KEY_N:
			if (index == -1)
				return false;
			else
				window.open(items[index].firstChild.getAttribute ("href"));			break;		case KEY_S:
			searchField.focus ();			break;		case KEY_RIGHT:			document.location = next;			break;		case KEY_LEFT:			if (prev != null) {				document.location = prev;			}			break;
		}
		return false;	}

	document.addEventListener ('keydown', keypress_handler, true);

	var style = document.createElement ("style");	document.body.appendChild (style);	var ss = document.styleSheets [document.styleSheets.length - 1];	ss.insertRule (HOVER_CSS, 0);
}) ();

