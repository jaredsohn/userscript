// ==UserScript==// @name          Google Keys// @namespace     http://evain.net/greasemonkey/// @description	  Navigate google results using keys up and down, go with enter.// @include       http://google.*// @include       http://www.google.*
// ==/UserScript==

// based on http://userscripts.org/scripts/show/756

const NORMAL_KLASS = "g";
const HOVER_KLASS = "ghover";
const HOVER_CSS = ".ghover {margin-top: 1em;margin-bottom: 1em;font-weight:bold;padding:10px;-moz-border-radius: 10px;-moz-opacity:0.9;background-color:#fad163;}";

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const KEY_G = 71;(function () {
	var nodes = document.evaluate("//p[@class='g']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var results = new Array();	for (var i = 0; i < nodes.snapshotLength; i++)		results.push (nodes.snapshotItem (i));

	var index = -1;

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
	}

	function highlight (pos) {
		for (var i = 0; i < results.length; i++)
			if (pos == i)
				results [i].className = HOVER_KLASS;
			else
				results [i].className = NORMAL_KLASS;
	}	function keypress_handler (e) {
		switch (e.which) {
		case KEY_UP:
			if (index <= 0)
				index = results.length - 1;
			else
				index--;
			highlight (index);
			break;
		case KEY_DOWN:
			if (index >= results.length - 1)
				index = 0;
			else
				index++;
			highlight (index);
			break;
		case KEY_ENTER:
			if (index == -1)
				return false;

			document.location = results [index].firstChild.nextSibling.getAttribute ("href");
			break;
		case KEY_G:
			if (e.ctrlKey)
				searchField.focus ();
			break;
		}
		return false;	}

	document.addEventListener ('keydown', keypress_handler, true);

	var style = document.createElement ("style");	document.body.appendChild (style);	var ss = document.styleSheets [document.styleSheets.length - 1];	ss.insertRule (HOVER_CSS, 0);
}) ();