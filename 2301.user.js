// ==UserScript==
// @name           Element Resizer
// @namespace      http://userscripts.org/people/336
// @description    Makes user-specifiable elements resizable by mouse and keyboard, either in or out of the page flow or "maximized" above it.
// @source         http://userscripts.org/scripts/show/2301
// @identifier     http://userscripts.org/scripts/source/2301.user.js
// @version        0.3.1
// @date           2006-10-13
// @creator        Richard Gibson <@gmail.com>
// @include        *
// ==/UserScript==
//
// **COPYRIGHT NOTICE**
// 
// I, Richard Gibson, hereby establish my original authorship of this
// work, and announce its release into the public domain.  I claim no
// exclusive copyrights to it, and will neither pursue myself (nor
// condone pursuit by others of) punishment, retribution, or forced
// compensation for its reproduction in any form.
// 
// That being said, I would like to receive credit for this work
// whenever it, or any part thereof, is reproduced or incorporated into
// another creation; and would also like compensation whenever income is
// derived from such reproduction or inclusion.  At the very least,
// please let me know if you find this work useful or enjoyable, and
// contact me with any comments or criticisms regarding it.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// 
// **END COPYRIGHT NOTICE**
//
//
// Changelog:
// 0.3.1 (2006-10-13)
// 	Fixed: issue with wrapping elements of the invalid <TABLE><FORM>...</FORM></TABLE> construct
// 		(first reported by private_lock on 2006-10-04; found on http://single.de/msg.html)
// 0.3 (2006-06-02)
// 	New: allowed differentiation of input tags by type (input:text, input:password, etc.)
// 	Improved: changed out of flow horizontal keyboard resizing to free up control+left and
// 		control+right
// 0.2.1 (2005-12-07)
// 	Updated: changes for compatibility with Gmail
// 0.2 (2005-12-07)
// 	New: added automatic updating
// 0.1 (2005-11-22)
// 	original release
//
// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -----------------------------------------------------------------------------

(function () {

// bit masks
var MODE_RESET = 0;
var MODE_RESIZED = 1;
var MODE_MAXIMIZED = 2;

// configurable constants
var SCRIPT = {
	name: "Element Resizer",
	namespace: "http://userscripts.org/people/336",
	description: 'Makes user-specifiable elements resizable by mouse and'
			+ ' keyboard, either in or out of the page flow or "maximized" above'
			+ ' it.',
	source: "http://userscripts.org"			// script homepage/description URL
			+ "/scripts/show/2301",
	identifier: "http://userscripts.org"	// script URL
			+ "/scripts/source/2301.user.js",
	version: "0.3.1",								// version
	date: (new Date(2006, 10 - 1, 13))		// update date
			.valueOf()
};
var CMD_HELP_LABEL = SCRIPT.name + ": Help";
var CMD_HELP_UNAVAILABLE = "Help is unavailable on this page";
var CMD_SETTAGS_LABEL = SCRIPT.name + ": Set Tags";
var CMD_SETTAGS_PROMPT = "Enter the comma-separated list of tags to make resizeable"
		+ "\n\nCommon tags (complete list at http://www.w3.org/TR/html4/index/elements.html):\n"
		+ "iframe\n\u00a0\u00a0\u00a0\u00a0\u00a0" + "inline subwindow\n"
		+ "img\n\u00a0\u00a0\u00a0\u00a0\u00a0" + "embedded image\n"
		+ "input:text\n\u00a0\u00a0\u00a0\u00a0\u00a0" + "single-line text field\n"
		+ "textarea\n\u00a0\u00a0\u00a0\u00a0\u00a0" + "multi-line text field";
var CMD_RESTORE_LABEL = SCRIPT.name + ": Restore All";
var MIN_SIZE_PX = 15;
var MAXIMIZED_MARGIN = "1em";
var MIN_KEY_RESIZE_INIT_DELAY = 200;	// milliseconds
var COPIED_STYLE_SUFFIX = " !important";
var RESTORE_STYLE_ATTR = "elementResizerRestoreStyles";
var RESTORE_DIM_ATTR = "elementResizerRestoreDimensions";
var REPLACEMENT_TAG = "map";	// inline content that can contain arbitrary block-level content
var REPLACEMENT_CLASS = "elementResizerReplacement";
var MAXIMIZED_CLASS = "elementResizerMaximized";
var PLACEHOLDER_TAG = "div";
var PLACEHOLDER_CLASS = "elementResizerPlaceholder";
var SHRINKWRAP_TAG = "div";
var SHRINKWRAP_CLASS = "elementResizerShrinkwrap";
var RESIZER_TAG = "span";
var RESIZER_CLASS = "elementResizerResizer";
var RESIZER_BAR_CLASS = "elementResizerBar";
var RESIZER_HANDLE_CLASS = "elementResizerHandle";
var RESIZING_CLASS = "elementResizerResizing";
var RESIZER_TITLE = ("[Shift|Ctrl|Alt]+drag:[ratio-lock|center|in-flow] resize,"
		+ "click:reset,Shift+click:maximize")
		.replace(/,/g, "\u2003")	// U+2003 Em Space (width = 1 em)
		.replace(/:/g, ":\u2006")	// U+2006 Six-Per-Em Space (width = 1/6 em)
		.replace(/ /g, "\u2008");	// U+2008 Punctuation Space (same width as ",")
var HELP_CLASS = "elementResizerHelp";
var WINDOW_CLASS = "elementResizerWindow";
var WINDOW_TITLE_CLASS = "elementResizerWindowTitle";
var WINDOW_CONTENT_CLASS = "elementResizerWindowContent";

// non-configurable constants
var REPLACEMENT_PROPERTIES = {display: "block", "float": "none", clear: "none",
		position: "static", top: 0, right: 0, bottom: 0, left: 0,
		"-moz-box-sizing": "border-box", height: "100%", width: "100%",
		"margin-top": 0, "margin-right": 0, "margin-bottom": 0, "margin-left": 0,
		"z-index": 0};
var TRIM_RE = /(^\s+)|(\s+$)/g;
var STYLE_RE = /-(.)|^(float)$/g;
var STYLE_RE_FN = function (substring, paren1, paren2) { return (paren1
		? paren1.toUpperCase()
		: "css" + paren2.charAt(0).toUpperCase() + paren2.substring(1)); };
var APPEND_PX_RE = /([0-9. ])$/;
var APPEND_PX_RE_FN = "$1px";
var REPLACEMENT_CLASS_RE = new RegExp("(^|\\s)" + REPLACEMENT_CLASS + "(\\s|$)");
var PLACEHOLDER_CLASS_RE = new RegExp("(^|\\s)" + PLACEHOLDER_CLASS + "(\\s|$)");
var SHRINKWRAP_CLASS_RE = new RegExp("(^|\\s)" + SHRINKWRAP_CLASS + "(\\s|$)");
var MAXIMIZED_CLASS_RE = new RegExp("(^|\\s+)" + MAXIMIZED_CLASS + "(\\s+|$)", "g");
var RESIZING_CLASS_RE = new RegExp("(^|\\s+)" + RESIZING_CLASS + "(\\s+|$)", "g");
	// resizer arrays (clockwise from top left; first bars and then corners:
	// 	top, right, bottom, left, top-left, top-right, bottom-right, bottom-left)
var RESIZER_DIRECTIONS = [{x:  0, y: -1}, {x: +1, y:  0}, {x:  0, y: +1},
		{x: -1, y:  0}, {x: -1, y: -1}, {x: +1, y: -1}, {x: +1, y: +1},
		{x: -1, y: +1}];
var RESIZER_SUBCLASSES = [RESIZER_BAR_CLASS, RESIZER_BAR_CLASS,
	RESIZER_BAR_CLASS, RESIZER_BAR_CLASS, RESIZER_HANDLE_CLASS,
	RESIZER_HANDLE_CLASS, RESIZER_HANDLE_CLASS, RESIZER_HANDLE_CLASS];
var RESIZER_STYLES = [
	// bars
	"top:-2px;left:0;width:100%;min-height:2px;border-top-width:2px;cursor:n-resize;",
	"right:-2px;top:0;height:100%;min-width:2px;border-right-width:2px;cursor:e-resize;",
	"bottom:-2px;left:0;width:100%;min-height:2px;border-bottom-width:2px;cursor:s-resize;",
	"left:-2px;top:0;height:100%;min-width:2px;border-left-width:2px;cursor:w-resize;",
	// corners
	"top:-4px;left:-4px;-moz-border-radius-bottomright:100%;-moz-border-radius-topleft:0;"
			+ "cursor:nw-resize;",
	"top:-4px;right:-4px;-moz-border-radius-bottomleft:100%;-moz-border-radius-topright:0;"
			+ "cursor:ne-resize;",
	"bottom:-4px;right:-4px;-moz-border-radius-topleft:100%;-moz-border-radius-bottomright:0;"
			+ "cursor:se-resize;",
	"bottom:-4px;left:-4px;-moz-border-radius-topright:100%;-moz-border-radius-bottomleft:0;"
			+ "cursor:sw-resize;"
];
var HELP_CONTENT = ['<div class="' + WINDOW_CLASS + '">',
	' <div class="' + WINDOW_TITLE_CLASS + '">',
	'  <a href="#">close</a>',
	'  <h1>Element Resizer Help</h1></div>',
	' <div class="' + WINDOW_CONTENT_CLASS + '">',
	'  <p>',
	'   Element Resizer allows you to dynamically resize page elements using',
	'   either the mouse or the keyboard.  The resizable tags can be specified',
	'   by the <kbd>Set Tags</kbd> command, available on Firefox/Greasemonkey',
	'   under <kbd>Tools &gt; User Script Commands</kbd>.  When focused (or',
	'   hovered over), resizable elements will show a resizer handle at each',
	'   corner.  A handle will grow when hovered over, and the side of a',
	'   resizable element will turn into a blue resizer bar when hovered over.',
	'  </p>',
	'  <p>',
	'   Resizes are always one of three general types, and can have up to two',
	'   special behaviors:',
	'  </p>',
	'  <dl>',
	'   <dt>In flow</dt>',
	'    <dd>The element stays in the page flow, and other elements are',
	'    moved/resized as appropriate.</dd>',
	'   <dt>Out of flow</dt><dd>The element "floats" above other content.</dd>',
	'   <dt>Maximized</dt>',
	'    <dd>The element "floats" above other content and does not scroll with',
	'    the page.</dd>',
	'   <dt>Locked aspect ratio</dt>',
	'    <dd>The aspect ratio (ratio of width to height) of the element does',
	'    not change.</dd>',
	'   <dt>Centered</dt><dd>The center of the element does not change.</dd>',
	'  </dl>',
	'',
	'  <h2>Mouse Resizing</h2>',
	'  <p>',
	'   Drag on a handle or a resizer bar to finely control the size of an',
	'   element, and end the drag to keep the resize or press <kbd>Escape</kbd>',
	'   to cancel it. This resize defaults to out of flow, and is affected by',
	'   the following modifier keys:',
	'  </p>',
	'  <dl>',
	'   <dt><kbd>Shift</kbd></dt><dd>locked aspect ratio</dd>',
	'   <dt><kbd>Control</kbd></dt><dd>centered</dd>',
	'   <dt><kbd>Alt</kbd></dt><dd>in flow</dd>',
	'  </dl>',
	'  <p>',
	'   Clicking on a handle or a resizer bar also has an effect.  If',
	'   <kbd>Shift</kbd> is held, the element is toggled to/from maximized (if',
	'   the element is already maximized, it is returned to the resized state,',
	'   or to reset if there is no non-maximized resized state).  If',
	'   <kbd>Shift</kbd> is not held, the element is toggled to/from reset (if',
	'   the element is already reset, it is returned to the resized state, or',
	'   to maximized if there is no resized state).',
	'  </p>',
	'',
	'  <h2>Keyboard Resizing</h2>',
	'  <p>(Text entry) elements can be resized with the keyboard:</p>',
	'  <dl>',
	'   <dt><kbd>Alt</kbd>+<kbd>Enter</kbd></dt>',
	'    <dd>in flow height increase</dd>',
	'   <dt><kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>Enter</kbd></dt>',
	'    <dd>in flow height decrease</dd>',
	'   <dt><kbd>Control</kbd>+<kbd>Space</kbd></dt>',
	'    <dd>in flow width increase</dd>',
	'   <dt><kbd>Shift</kbd>+<kbd>Control</kbd>+<kbd>Space</kbd></dt>',
	'    <dd>in flow width decrease</dd>',
	'   <dt><kbd>Control</kbd>+<kbd>Up</kbd></dt>',
	'    <dd>centered out of flow height increase</dd>',
	'   <dt><kbd>Control</kbd>+<kbd>Down</kbd></dt>',
	'    <dd>centered out of flow height decrease</dd>',
	'   <dt><kbd>Shift</kbd>+<kbd>Control</kbd>+<kbd>Up</kbd></dt>',
	'    <dd>centered out of flow width increase</dd>',
	'   <dt><kbd>Shift</kbd>+<kbd>Control</kbd>+<kbd>Down</kbd></dt>',
	'    <dd>centered out of flow width decrease</dd>',
	'   <dt><kbd>Alt</kbd>+<kbd>Minus</kbd></dt>',
	'    <dd>toggle reset (defaulting to maximized)</dd>',
	'   <dt><kbd>Alt</kbd>+<kbd>Plus</kbd></dt>',
	'    <dd>toggle maximized (preferring resized over reset)</dd>',
	'  </dl>',
	'',
	'  <h2>Restoring Elements</h2>',
	'  <p>',
	'   Elements can be restored to their original position and dimensions',
	'   <sup style="font-size:smaller;font-weight:bold;">\u2020</sup>. To do',
	'   so, click on a resizer handle or bar while holding <kbd>Alt</kbd>; or',
	'   alternately press <kbd>Alt</kbd>+<kbd>Backspace</kbd> or',
	'   <kbd>Alt</kbd>+<kbd>Delete</kbd> while the element has the focus.',
	'   Restore all elements with the <kbd>Restore All</kbd> command.',
	'  </p>',
	'  <p>',
	'   <sup style="font-size:smaller;font-weight:bold;">\u2020</sup>',
	'   <span style="font-size:x-small;">Dimensions may be slightly off for',
	'   elements with intrinsic dimensions, like form elements and inline',
	'   frames.</span>',
	'  </p>',
	'',
	'  <hr />',
	'  <h2>Demo</h2>',
	'  <p>The following elements are currently resizable:</p>',
	'  <table style="margin-top:1em;"><tbody></tbody></table>',
	' </div>',
	'</div>'
].join("\n");

// global variables
var defaultPrefs = {tags: "textarea"};
var maximizedProperties = null;
var wrapTemplate;
var iframeCover;
var sizeTranslator;
var helpFrame;

// update automatically
try {
	addEventHandler(window, "load", function () { try {
		(unsafeWindow || window.wrappedJSObject || window)
				.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
	} catch (ex) {} }, false);
} catch (ex) {}

// utility functions
	// math
function round (num, intPlaces) {
	var scaler = Math.pow(10, parseInt(intPlaces) || 0);
	return Math.round(num * scaler) / scaler;
}
	// tags
function getTagAndType (strTagWithType) {
	var i = strTagWithType.indexOf(":");
	return (i == -1
		? [strTagWithType, null]
		: [strTagWithType.substring(0, i), strTagWithType.substring(i + 1)]
	);
}
	// events
function addEventHandler (objElement, strEvent, fnHandler, blnUseCapture) {
	var success = false;
	try {
		objElement.addEventListener(strEvent, fnHandler, (blnUseCapture ? true : false));
		success = true;
	}
	catch (ex) {
		try { success = objElement.attachEvent("on" + strEvent, fnHandler); } catch (ex) {}
	}
	return success;
};
function removeEventHandler (objElement, strEvent, fnHandler, blnUseCapture) {
	try {
		objElement.removeEventListener(strEvent, fnHandler, (blnUseCapture ? true : false));
	}
	catch (ex) {
		try { objElement.detachEvent("on" + strEvent, fnHandler); } catch (ex) {}
	}
};
	// style
function addGlobalStyle (strCSS, blnAtFront) {
	try {
		var document = window.document, style =
			(
				document.getElementsByTagName("head")[0]
				|| (
					document.documentElement
					|| document.getElementsByTagName("html")[0]
					|| document.appendChild(document.createElement("html"))
				) // html
						.appendChild(document.createElement("head"))
						.appendChild(document.createElement("title")).parentNode
			).appendChild(document.createElement("style"));
		if (blnAtFront) {
			style.parentNode.insertBefore(style, style.parentNode.firstChild);
		}
		style.setAttribute("type", "text/css");
		style.appendChild(document.createTextNode(strCSS));
	} catch (ex) {}
};
function applyStyleString (el, strStyle) {
	for (var i = 0, styles = strStyle.split(";"), style; i < styles.length; i++) {
		try {
			style = styles[i].split(":");
			el.style[style[0].replace(TRIM_RE, "").replace(STYLE_RE, STYLE_RE_FN)] =
					(style.slice(1).join(":")).replace(TRIM_RE, "");
		} catch (ex) {}
	}
};
function getStyle (varStyles, strProperty) {
	try {
		return varStyles.getPropertyValue(strProperty);
	}
	catch (ex) {
		return (varStyles || {})[(strProperty + '').replace(STYLE_RE, STYLE_RE_FN)];
	}
};
function bringToFront (el) {
	window.setTimeout(function () {
		try {
			var	maxZ = 1,
					doc = el.ownerDocument || window.document,
					win = doc.defaultView || window,
					all = doc.getElementsByTagName("*"),
					styles;
			for (var i = all.length - 1; i >= 0; i--) {
				try {
					styles = win.getComputedStyle(all[i], "");
				}
				catch (ex) {
					styles = all[i].currentStyle || all[i].style;
				}
				maxZ = Math.max(maxZ,
						parseInt(getStyle(styles, "z-index"), 10) || 0);
			}
			el.style.zIndex = maxZ + 1;
		} catch (ex) {}
	}, 0);
};
	// elements
function isAncestorOf (objAncestor, objDescendant, blnInclusive) {
	if (!objAncestor || !objDescendant) { return null; }
	var temp;
	
	temp = (blnInclusive ? objDescendant : objDescendant.parentNode || objDescendant.parentElement);
	while (temp && temp !== objAncestor) { temp = temp.parentNode || temp.parentElement; }
	return (temp === objAncestor);
};

// preference functions
function getPref (strPref) {
	try {
		return GM_getValue(strPref, defaultPrefs[strPref]);
	}
	catch (ex) {
		return defaultPrefs[strPref];
	}
};
function setPref (strPref, varValue) {
	try {
		GM_setValue(strPref, varValue);
	}
	catch (ex) {
		defaultPrefs[strPref] = varValue;
	}
};
function getTags () {
	var tags = getPref("tags").toLowerCase().split(",");
	for (var i = tags.length - 1; i >= 0; i--) {
		tags[i] = tags[i].replace(TRIM_RE, "");
		if (tags[i] == "*" || tags[i] == "" || tags[i] == REPLACEMENT_TAG) tags.splice(i, 1);
	}
	return tags;
};
function setTags (arrTags) {
	setPref("tags", arrTags.join(","));
};
try {
	GM_registerMenuCommand(CMD_HELP_LABEL, function () {
		var helpIsElement = false;
		closeHelp();
		bringToFront(document.body.appendChild(helpFrame));
		for (var i = 0; !helpIsElement && i < helpFrame.childNodes.length; i++) {
			helpIsElement = (helpFrame.childNodes[i].nodeType == 1);
		}
		if (helpIsElement) {
			populateHelp(getTags());
		}
		else {
			closeHelp();
			alert(CMD_HELP_UNAVAILABLE);
		}
	});
	GM_registerMenuCommand(CMD_SETTAGS_LABEL, function () {
		var tags = window.prompt(CMD_SETTAGS_PROMPT, getTags().join(","));
		if (typeof(tags) == "string") setTags(tags.split(","));
	});
	GM_registerMenuCommand(CMD_RESTORE_LABEL, function () {
		var tags = getTags(), elements, length;
		try {
			if (maximizedProperties) toggleMaximized(maximizedProperties, false);
			maximizedProperties = null;
			for (var i = tags.length - 1; i >= 0; i--) {
				elements = window.document.getElementsByTagName(tags[i]);	// no need to check type
				length = elements.length;
				for (var j = 0; j < length; j++) unwrap(elements[j]);
			}
		} catch (ex) {}
	});
} catch (ex) {}

// wrapping functions
function isWrapped (el) {
	try {
		return (
			SHRINKWRAP_CLASS_RE.test(el.parentNode.className)
			&& PLACEHOLDER_CLASS_RE.test(el.parentNode.parentNode.className)
			&& REPLACEMENT_CLASS_RE.test(
					el.parentNode.parentNode.parentNode.className)
		);
	} catch (ex) {}
	return false;
};
function wrap (el) {
	var form = el.form;
	var replacement = wrapTemplate.cloneNode(true);
	var height = el.offsetHeight;
	var width = el.offsetWidth;
	var properties = {element: el, swap: null, box: replacement,
			placeholder: replacement.lastChild,
			shrinkwrap: replacement.lastChild.lastChild,
			currentMode: MODE_RESET, previousMode: MODE_RESET, resized: false,
			replaced: {},
			dimensions: {pixelsPerWidthStep: NaN, pixelsPerHeightStep: NaN},
			textInput: {potential: /^(textarea|input)$/i.test(el.nodeName),
					actual: (el.nodeName.toLowerCase() == "textarea"),
					widthProperty: null, heightProperty: null,
					originalWidth: null, originalHeight: null},
			drag: {active: false, startX: null, startY: null, movedSinceMousedown: false,
					onmousemove: null, onmouseup: null, onkeypress: null},
			key: {keydownTimestamp: 0, onkeypress: null, onkeyup: null, tmrClear: null,
					activePresses: 0}};
	var styles = null;
	var replacementStyle = "";
	var resetStyle = "";
	var restoreStyle = "";
	var textInput = properties.textInput;
	
	// add event handlers
	addElementEventHandlers(el, properties);
	for (var resizers = properties.shrinkwrap.childNodes, i = 0;
			i < RESIZER_DIRECTIONS.length; i++) {
		addResizerEventHandlers(resizers[i], RESIZER_DIRECTIONS[i], properties);
	}
	if (form) addEventHandler(form, "submit", function () {
		unwrap(el, properties, form);
	}, true);
	
	// move styles from the element to the replacement
	try {
		styles = ((el.ownerDocument || window.document).defaultView || window)
				.getComputedStyle(el, "");
	}
	catch (ex) {
		styles = el.currentStyle || el.style;
	}
	for (var s in REPLACEMENT_PROPERTIES) {
		replacementStyle += s + ":" + getStyle(styles, s) + ";";
		resetStyle += s + ":" + REPLACEMENT_PROPERTIES[s] + COPIED_STYLE_SUFFIX
				+ ";";
		properties.replaced[s.replace(STYLE_RE, STYLE_RE_FN)] =
				getStyle(el.style, s);
		restoreStyle += s + ":" + getStyle(el.style, s) + ";";
	}
	applyStyleString(replacement, replacementStyle); 
	applyStyleString(el, resetStyle);
	el.setAttribute(RESTORE_STYLE_ATTR, restoreStyle);
	
	// convert position:static to position:relative and display:inline to display:inline-block
	if (replacement.style.position == "static") {
		for (var s in {top: 0, right: 0, bottom: 0, left: 0}) {
			replacement.style[s] = "0 !important";
		}
		replacement.style.position = "relative !important";
	}
	if (replacement.style.display == "inline") {
		// hack from http://www.spartanicus.utvinternet.ie/centered_image_gallery_with_captions.htm
		replacement.style.display = "table-cell !important";
		replacement.style.display = "inline-table !important";
		replacement.style.display = "inline-block !important";
	}
	
	// apply dimensions to the replacement, persist dimensions for each mode, and perform the wrap
	// 	note: the structure is replacement > placeholder > shrinkwrap > grippies
	replacement.style.height = properties.shrinkwrap.style.height = height + "px";
	replacement.style.width = properties.shrinkwrap.style.width = width + "px";
	for (var resizers = properties.shrinkwrap.childNodes,
			map = [["height", "top"], ["width", "right"], ["height", "bottom"], ["width", "left"]],
			i = 0; i < 4; i++) {
		applyStyleString(resizers[i],
				map[i][0] + ":" + getStyle(styles, "border-" + map[i][1] + "-width"));
	}
	for (var modes = [MODE_RESET, MODE_RESIZED, MODE_MAXIMIZED], i = 0; i < modes.length; i++) {
		properties.dimensions[modes[i]] = {top: 0, left: 0,
				width: (modes[i] == MODE_MAXIMIZED ? "100%" : width),
				height: (modes[i] == MODE_MAXIMIZED ? "100%" : height),
				boxWidth: width, boxHeight: height};
	}
	if (el.nodeName.toLowerCase() == "textarea") {
		textInput.widthProperty = "cols";
		textInput.heightProperty = "rows";
		el.setAttribute(RESTORE_DIM_ATTR,
				"cols:" + (el.getAttribute("cols") || "")
				+ ";rows:" + (el.getAttribute("rows") || ""));
	}
	else {
		textInput.widthProperty = "size";
		el.setAttribute(RESTORE_DIM_ATTR,
				"size:" + (el.getAttribute("size") || ""));
	}
	textInput.originalWidth = el.getAttribute(textInput.widthProperty);
	textInput.originalHeight = el.getAttribute(textInput.heightProperty);
	el.parentNode.insertBefore(replacement, el);
	properties.shrinkwrap.insertBefore(el, properties.shrinkwrap.firstChild);
};
function unwrap (el, objProperties, elSubmittingForm) {
	if (isWrapped(el)) {
		var box = (objProperties && objProperties.box)
				|| el.parentNode.parentNode.parentNode;
		var textInput = objProperties && objProperties.textInput;
		var restoreStyle = "";
		var submitElement;
		
		if (objProperties) {
			if (objProperties.currentMode != MODE_RESET) toggleReset(objProperties);
			if (el.hasAttribute(textInput.widthProperty)) {
				el.setAttribute(textInput.widthProperty, textInput.originalWidth);
			}
			if (el.hasAttribute(textInput.heightProperty)) {
				el.setAttribute(textInput.heightProperty, textInput.originalHeight);
			}
			for (var s in REPLACEMENT_PROPERTIES) {
				restoreStyle += s + ":" + getStyle(objProperties.replaced, s) + ";";
			}
		}
		else {
			for (var dims = (el.getAttribute(RESTORE_DIM_ATTR) || "").split(";"),
					dim, i = dims.length - 1; i >= 0; i--) {
				dim = dims[i].split(":", 2);
				if (dim[1].length > 0) el.setAttribute(dim[0], dim[1]);
			}
			restoreStyle = el.getAttribute(RESTORE_STYLE_ATTR) || "";
		}
		
		applyStyleString(el, restoreStyle);
		box.parentNode.replaceChild(el, box);
		
		// make sure form data is submitted
		if (elSubmittingForm && el.name && elSubmittingForm !== el.form) {
			try { submitElement = elSubmittingForm.elements.namedItem(el.name); } catch (ex) {}
			if (!submitElement) {
				submitElement = document.createElement("input");
				submitElement.setAttribute("type", "hidden");
				submitElement.setAttribute("name", el.name);
				elSubmittingForm.appendChild(submitElement);
			}
			if (submitElement !== el) { submitElement.setAttribute("value", el.value); }
		}
	}
};

function addElementEventHandlers (el, objProperties) {
	addEventHandler(el, "keydown", function (evt) {
		evt = evt || window.event;
		var key = objProperties.key, delay = (evt.timeStamp - key.keydownTimestamp);
		
		// update the key properties and bail out on repeats (grr... why does keydown repeat?)
		key.keydownTimestamp = evt.timeStamp || 0;
		if (key.tmrClear) clearTimeout(key.tmrClear);
		if (delay < MIN_KEY_RESIZE_INIT_DELAY) return;
		
		// measure the element and add event handlers
		if (evt.ctrlKey || evt.altKey) measureIntrinsicDimensions(el, objProperties);
		if ((evt.ctrlKey || evt.altKey) && !key.onkeypress) {
			key.onkeypress = function (evt) {
				// eliminate conflicts
				var objKey = objProperties.key;
				if (objKey.activePresses++ > 0) { objKey.activePresses--; return; }
				
				evt = evt || window.event;
				var	key = evt.keyCode || evt.which,
						ctrl = evt.ctrlKey, alt = evt.altKey, shift = evt.shiftKey,
						UP = evt.DOM_VK_UP || 38, DOWN = evt.DOM_VK_DOWN || 40,
						LEFT = evt.DOM_VK_LEFT || 37, RIGHT = evt.DOM_VK_RIGHT || 39,
						shrinkwrapStyle = objProperties.shrinkwrap.style, dimensions,
						handled = false,
						inFlow = true, centered = false,
						widthStep = objProperties.dimensions.pixelsPerWidthStep,
						heightStep = objProperties.dimensions.pixelsPerHeightStep,
						dX = 0, dY = 0, width, height;
				if (objKey.tmrClear) clearTimeout(objKey.tmrClear);
				if (alt && (key == (evt.DOM_VK_RETURN || 13) || key == (evt.DOM_VK_ENTER || 14)))
					dY = (shift ? -1 : 1) * heightStep;
				if (ctrl && key == (evt.DOM_VK_SPACE || 32)) dX = (shift ? -1 : 1) * widthStep;
				if (ctrl && (key == UP || key == DOWN)) {
					inFlow = false;
					centered = true;
					if (shift) dX = (key == UP ? 1 : -1) * widthStep;
					else dY = (key == UP ? 1 : -1) * heightStep;
				}
				if (alt && (key == (evt.DOM_VK_SUBTRACT || 109) || key == 45)) {
					handled = true;
					toggleReset(objProperties);
				}
				if (alt && (key == (evt.DOM_VK_ADD || 107) || key == 43)) {
					handled = true;
					toggleMaximized(objProperties, false);
				}
				if (alt && (key == (evt.DOM_VK_BACK_SPACE || 8)
						|| key == (evt.DOM_VK_DELETE || 46))) {
					handled = true;
					unwrap(el, objProperties);
				}
				
				if (dX != 0 || dY != 0) {
					handled = true;
					enterResizableMode(objProperties);
					dimensions = objProperties.dimensions[objProperties.currentMode];
					width = Math.max(round(dimensions.width + dX, 6), MIN_SIZE_PX);
					height = Math.max(round(dimensions.height + dY, 6), MIN_SIZE_PX);
					shrinkwrapStyle.width = width + "px";
					shrinkwrapStyle.height = height + "px";
					if (centered) {
						// hold (left + width/2) and (top + height/2) constant
						shrinkwrapStyle.left = round(dimensions.left
								+ (dimensions.width - width) / 2, 6) + "px";
						shrinkwrapStyle.top = round(dimensions.top
								+ (dimensions.height - height) / 2, 6) + "px";
					}
					if (inFlow) {
						shrinkwrapStyle.left = shrinkwrapStyle.top = "0px";
						objProperties.box.style.width = shrinkwrapStyle.width;
						objProperties.box.style.height = shrinkwrapStyle.height;
					}
					for (var s in {left: 0, top: 0, width: 0, height: 0}) {
						dimensions[s] = parseFloat(shrinkwrapStyle[s]);
					}
					dimensions.boxWidth = parseFloat(objProperties.box.style.width);
					dimensions.boxHeight = parseFloat(objProperties.box.style.height);
					writeIntrinsicDimensions(el, objProperties);
				}
				if (handled) {
					bringToFront(objProperties.shrinkwrap);
					try { evt.stopPropagation(); } catch (ex) {}
					try { evt.preventDefault(); } catch (ex) {}
				}
				objKey.activePresses--;
				return (handled ? (evt.returnValue = !(evt.cancelBubble = true)) : undefined);
			};
			addEventHandler(el, "keypress", key.onkeypress, true);
		}
		if ((evt.ctrlKey || evt.altKey) && !key.onkeyup) {
			key.onkeyup = function () {
				var key = objProperties.key;
				if (key.tmrClear) clearTimeout(key.tmrClear);
				try {
					key.tmrClear = window.setTimeout(clear,
							4 * MIN_KEY_RESIZE_INIT_DELAY);
				}
				catch (ex) { clear(); }
				
				function clear () {
					try { removeEventHandler(el, "keypress", key.onkeypress, true); } catch (ex) {}
					try { removeEventHandler(el, "keyup", key.onkeyup, true); } catch (ex) {}
					key.onkeypress = key.onkeyup = null;
				}
			};
			addEventHandler(el, "keyup", key.onkeyup, true);
		}
	}, false);
};
function addResizerEventHandlers (objResizer, objResizeDirections, objProperties) {
	addEventHandler(objResizer, "mousedown", function (evt) {
		evt = evt || window.event;
		beginDrag(evt, objResizer, objResizeDirections, objProperties);
		try { evt.stopPropagation(); } catch (ex) {}
		try { evt.preventDefault(); } catch (ex) {}
		return (evt.returnValue = !(evt.cancelBubble = true));
	}, true);
	addEventHandler(objResizer, "click", function (evt) {
		evt = evt || window.event;
		if (!objProperties.drag.movedSinceMousedown) {	// filter for real clicks
			if (evt.altKey) {
				unwrap(objProperties.element, objProperties)
			}
			else if (evt.shiftKey) {
				toggleMaximized(objProperties, false);
			}
			else {
				toggleReset(objProperties);
			}
		}
		try { evt.stopPropagation(); } catch (ex) {}
		try { evt.preventDefault(); } catch (ex) {}
		return (evt.returnValue = !(evt.cancelBubble = true));
	}, true);
};

// resize functions
function measureIntrinsicDimensions (el, objProperties) {
	var	textInput = objProperties.textInput,
			isTextInput = textInput.actual = /^textarea$/i.test(el.nodeName)
				|| (textInput.potential && /^(text|password)$/.test(el.type)),
			original = {width: el.style.width, height: el.style.height},
			textInputWidth, textInputHeight,
			ratios = {from: null, to: null},
			styles,
			extra = {width: 0, height: 0},
			extraStyles = {
				width: ["border-left-width", "padding-left", "padding-right",
					"border-right-width"],
				height: ["border-top-width", "padding-top", "padding-bottom",
					"border-bottom-width"]};
	
	// read special text input dimensioning properties
	textInputWidth = (isTextInput && textInput.widthProperty
			? parseInt(el.getAttribute(textInput.widthProperty), 10) : NaN);
	textInputHeight = (isTextInput && textInput.heightProperty
			? parseInt(el.getAttribute(textInput.heightProperty), 10) : NaN);
	
	// set to intrinsic dimensions and get current styles
	el.style.width = el.style.height = "auto !important";
	try {
		styles = ((el.ownerDocument || window.document).defaultView || window)
				.getComputedStyle(el, "");
	}
	catch (ex) {
		styles = el.currentStyle || el.style;
	}
	for (var p in extraStyles) {
		for (var i = 0; i < extraStyles[p].length; i++) {
			try {
				extra[p] += styles.getPropertyCSSValue(extraStyles[p][i])
						.getFloatValue(CSSPrimitiveValue.CSS_PX);
			}
			catch (ex) {
				extra[p] += parseFloat(getStyle(styles, extraStyles[p][i])) || 0;
			}
		}
	}
	
	// append the size translator (invisible element of 10em width and 10ex height)
	try {
		el.appendChild(sizeTranslator);
		if (sizeTranslator.parentNode !== el) throw new Error();
	}
	catch (ex) {
		el.parentNode.insertBefore(sizeTranslator, el.nextSibling);
	}
	
	// set the ratio between pixels and dimension steps
		// width
	ratios.from = objProperties.dimensions.pixelsPerWidthStep;
	ratios.to = (isNaN(textInputWidth)
		? sizeTranslator.offsetHeight/10	// ex
		: Math.max(1, el.offsetWidth - extra.width) / textInputWidth
	);
	if (!(Math.abs(ratios.from - ratios.to) <= (0.05 * ratios.from))) {
		objProperties.dimensions.pixelsPerWidthStep = ratios.to;
	}
		// height
	ratios.from = objProperties.dimensions.pixelsPerHeightStep;
	ratios.to = (isNaN(textInputHeight)
		? sizeTranslator[isTextInput ? "offsetWidth" : "offsetHeight"]/10	// em/ex
		: Math.max(1, el.offsetHeight - extra.height) / textInputHeight
	);
	if (!(Math.abs(ratios.from - ratios.to) <= (0.05 * ratios.from))) {
		objProperties.dimensions.pixelsPerHeightStep = ratios.to;
	}
	
	// remove the size translator and restore the dimensions
	try { sizeTranslator.parentNode.removeChild(sizeTranslator); } catch (ex) {}
	el.style.width = original.width;
	el.style.height = original.height;
};
function writeIntrinsicDimensions (el, objProperties) {
	var	textInput = objProperties.textInput,
			isTextInput = textInput.actual = (el.nodeName.toLowerCase() == "textarea")
				|| (textInput.potential && /^(text|password)$/.test(el.type)),
			styles, extra = {width: 0, height: 0},
			extraStyles = {width: ["border-left-width", "padding-left", "padding-right",
				"border-right-width"], height: ["border-top-width", "padding-top", "padding-bottom",
				"border-bottom-width"]};
	
	// get extra width and height (from border and padding)
	try {
		styles = ((el.ownerDocument || window.document).defaultView || window)
				.getComputedStyle(el, "");
	}
	catch (ex) {
		styles = el.currentStyle || el.style;
	}
	for (var p in extraStyles) {
		for (var i = 0; i < extraStyles[p].length; i++) {
			try {
				extra[p] += styles.getPropertyCSSValue(extraStyles[p][i])
						.getFloatValue(CSSPrimitiveValue.CSS_PX);
			}
			catch (ex) {
				extra[p] += parseFloat(getStyle(styles, extraStyles[p][i])) || 0;
			}
		}
	}
	
	// set the intrinsic dimensions
	if (isTextInput && textInput.widthProperty) {
		el.setAttribute(textInput.widthProperty, Math.max(1, Math.round(
		(el.offsetWidth - extra.width)
		/ objProperties.dimensions.pixelsPerWidthStep)));
	}
	if (isTextInput && textInput.heightProperty) {
		el.setAttribute(textInput.heightProperty, Math.max(1, Math.round(
		(el.offsetHeight - extra.height)
		/ objProperties.dimensions.pixelsPerHeightStep)));
	}
};
function beginDrag (evt, objResizer, objResizeDirections, objProperties) {
	var shrinkwrap = objProperties.shrinkwrap, drag = objProperties.drag;
	
	bringToFront(shrinkwrap);
	measureIntrinsicDimensions(shrinkwrap.firstChild, objProperties);
	shrinkwrap.className = shrinkwrap.className.replace(RESIZING_CLASS_RE, " ")
			+ " " + RESIZING_CLASS;
	objResizer.className = objResizer.className.replace(RESIZING_CLASS_RE, " ")
			+ " " + RESIZING_CLASS;
	if (drag.startX === null) drag.startX = ("pageX" in evt ? evt.pageX : evt.clientX);
	if (drag.startY === null) drag.startY = ("pageY" in evt ? evt.pageY : evt.clientY);
	drag.movedSinceMousedown = false;
	if (shrinkwrap.firstChild.nodeName.toLowerCase() == "iframe") {
		shrinkwrap.insertBefore(iframeCover, shrinkwrap.firstChild.nextSibling);
	}
	
	resizeHandlers = {
		onmousemove: function (evt) {
			evt = evt || window.event;
			continueDrag(evt, objResizeDirections, objProperties);
			try { evt.stopPropagation(); } catch (ex) {}
			try { evt.preventDefault(); } catch (ex) {}
			return (evt.returnValue = !(evt.cancelBubble = true));
		},
		onmouseup: function (evt) {
			evt = evt || window.event;
			endDrag(objResizer, objProperties, false);
			try { evt.stopPropagation(); } catch (ex) {}
			try { evt.preventDefault(); } catch (ex) {}
			return (evt.returnValue = !(evt.cancelBubble = true));
		},
		onkeypress: function (evt) {
			evt = evt || window.event;
			var key = evt.keyCode || evt.which;
			if (key == (evt.DOM_VK_ESCAPE || 27) || key == (evt.DOM_VK_CANCEL || 3)) {
				endDrag(objResizer, objProperties, true);
			}
			else if (key == (evt.DOM_VK_HELP || 6) || key == (evt.DOM_VK_F1 || 112)) {
			}
		}
	};
	for (var e in {onmousemove: 0, onmouseup: 0, onkeypress: 0}) {
		if (!drag[e]) {
			addEventHandler(window.document, e.substring(2), resizeHandlers[e],
					true);
			drag[e] = resizeHandlers[e];
		}
	}
};
function continueDrag (evt, objResizeDirections, objProperties) {
	enterResizableMode(objProperties);
	var	mode = objProperties.currentMode,	// current resizing mode
			maximized =									// whether or not the element is maximized
				(mode == MODE_MAXIMIZED),
			box = objProperties.box,				// replacement box
			shrinkwrap =								// element shrinkwrap
				objProperties.shrinkwrap,
			dimensions =								// stored (end-of-resize) dimensions
				objProperties.dimensions[mode],
			drag = objProperties.drag,				// drag properties
			aspect =										// stored (end-of-resize) aspect ratio
				dimensions.width / dimensions.height,
			xDir = objResizeDirections.x,			// horizontal resize direction (marks left/right)
			yDir = objResizeDirections.y,			// vertical resize direction (marks top/bottom)
			inFlow = !maximized && evt.altKey,	// in-flow resize
			lockedRatio = evt.shiftKey,			// locked-aspect-ratio resize
			centered =									// centered resize
				maximized || (!inFlow && evt.ctrlKey),
			centeredX = centered,					// horizontally centered resize
			centeredY = centered,					// vertically centered resize
			deltaX =										// horizontal resizer movement requested by the drag
				("pageX" in evt ? evt.pageX : evt.clientX) - drag.startX
				+ (inFlow ? dimensions.left : 0),
			deltaY =										// vertical resizer movement requested by the drag
				("pageY" in evt ? evt.pageY : evt.clientY) - drag.startY
				+ (inFlow ? dimensions.top : 0),
			minWidth =									// minimum width of the element
					MIN_SIZE_PX * (lockedRatio ? Math.max(aspect, 1) : 1),
			minHeight =									// minimum height of the element
					MIN_SIZE_PX * (lockedRatio ? Math.max(1/aspect, 1) : 1);
	
	// ensure an active drag
	drag.active = drag.movedSinceMousedown = true;
	
	// adjust deltaX and deltaY for aspect ratio locking
	if (lockedRatio) {
		// new dimensions are determined by deltaX iff vertical movement is irrelevant (e.g.,
		// 	dragging an element's vertical side) or the change would widen the aspect ratio
		if ((yDir == 0) || (xDir != 0 && (
				(((dimensions.width + xDir * deltaX)/(dimensions.height + yDir * deltaY)) > aspect)
				|| ((dimensions.height + yDir * deltaY) < 0)
				))) {
			if (yDir == 0) { yDir = 0.5 * (centered ? 2 : 1); centeredY = true; }
			deltaY = xDir * Math.ceil(yDir) * deltaX / aspect;
		}
		else {
			if (xDir == 0) { xDir = 0.5 * (centered ? 2 : 1); centeredX = true; }
			deltaX = Math.ceil(xDir) * yDir * deltaY * aspect;
		}
	}
	
	// set new left and width
	shrinkwrap.style.left = dimensions.left + (xDir < 0 || centeredX
		? Math.min(-xDir * deltaX, (dimensions.width - minWidth) / (centeredX ? 2 : 1))
		: 0
	) + "px";
	shrinkwrap.style.width =
			Math.max(dimensions.width + xDir * deltaX * (centeredX ? 2 : 1), minWidth) + "px";
	
	// set new top and height
	shrinkwrap.style.top = dimensions.top + (yDir < 0 || centeredY
		? Math.min(-yDir * deltaY, (dimensions.height - minHeight) / (centeredY ? 2 : 1))
		: 0
	) + "px";
	shrinkwrap.style.height =
			Math.max(dimensions.height + yDir * deltaY * (centeredY ? 2 : 1), minHeight) + "px";
	
	// dimension the replacement box for in-flow resize
	if (inFlow) {
		shrinkwrap.style.top = shrinkwrap.style.left = "0px";
		box.style.height = shrinkwrap.style.height;
		box.style.width = shrinkwrap.style.width;
	}
	else {
		box.style.height = dimensions.boxHeight + "px";
		box.style.width = dimensions.boxWidth + "px";
	}
};
function enterResizableMode (objProperties) {
	var	shrinkwrapStyle = objProperties.shrinkwrap.style,
			resetDimensions = objProperties.dimensions[MODE_RESET],
			resizedDimensions = objProperties.dimensions[MODE_RESIZED],
			maximizedDimensions = objProperties.dimensions[MODE_MAXIMIZED];
	if (objProperties.currentMode == MODE_RESET) {
		objProperties.previousMode = objProperties.currentMode;
		objProperties.currentMode = MODE_RESIZED;
		objProperties.resized = true;
		for (var p in resetDimensions) resizedDimensions[p] = resetDimensions[p];
	}
	else if (objProperties.currentMode == MODE_MAXIMIZED
			&& shrinkwrapStyle.width.indexOf("px") == -1) {
		shrinkwrapStyle.width = objProperties.shrinkwrap.offsetWidth + "px";
		shrinkwrapStyle.height = objProperties.shrinkwrap.offsetHeight + "px";
		for (var s in {top: 0, left: 0, height: 0, width: 0}) {
			maximizedDimensions[s] = parseFloat(shrinkwrapStyle[s]);
		}
		maximizedDimensions.boxHeight = parseFloat(objProperties.box.style.height);
		maximizedDimensions.boxWidth = parseFloat(objProperties.box.style.width);
	}
};
function endDrag (objResizer, objProperties, blnCancel) {
	var	shrinkwrap = objProperties.shrinkwrap,
			dimensions = objProperties.dimensions[objProperties.currentMode],
			drag = objProperties.drag;
	
	// remove event handlers and resize properties
	for (var e in {onmousemove: 0, onmouseup: 0, onkeypress: 0}) {
		removeEventHandler(window.document, e.substring(2), drag[e], true);
		drag[e] = null;
	}
	drag.startX = drag.startY = null;
	objResizer.className = objResizer.className.replace(RESIZING_CLASS_RE, " ");
	shrinkwrap.className = shrinkwrap.className.replace(RESIZING_CLASS_RE, " ");
	try { iframeCover.parentNode.removeChild(iframeCover); } catch (ex) {}
	
	if (drag.active) {
		drag.active = false;
		if (blnCancel) {
			for (var s in {top: 0, left: 0, height: 0, width: 0}) {
				shrinkwrap.style[s] = dimensions[s] + "px";
			}
			objProperties.box.style.height = dimensions.boxHeight + "px";
			objProperties.box.style.width = dimensions.boxWidth + "px";
		}
		else {
			for (var s in {top: 0, left: 0, height: 0, width: 0}) {
				dimensions[s] = parseFloat(shrinkwrap.style[s]);
			}
			dimensions.boxHeight = parseFloat(objProperties.box.style.height);
			dimensions.boxWidth = parseFloat(objProperties.box.style.width);
			writeIntrinsicDimensions(objProperties.element, objProperties);
		}
	}
};
function toggleMaximized (objProperties, blnRestore) {
	// if not maximized, maximize; otherwise go to resized (or reset)
	var	maximizedDimensions = objProperties.dimensions[MODE_MAXIMIZED],
			resizedDimensions = objProperties.dimensions[MODE_RESIZED],
			box = objProperties.box,
			shrinkwrapStyle = objProperties.shrinkwrap.style,
			doc = box.ownerDocument || window.document;
	if (objProperties.currentMode != MODE_MAXIMIZED) {
		try {
			if (maximizedProperties) toggleMaximized(maximizedProperties, false);
			(doc.body || doc.getElementsByTagName("body")[0]
					|| (doc.documentElement || doc.lastChild).lastChild)
					.appendChild(
						box.parentNode.replaceChild(objProperties.swap = box.cloneNode(false), box)
					);
			box.className = box.className.replace(MAXIMIZED_CLASS_RE, " ")
					+ " " + MAXIMIZED_CLASS;
			maximizedProperties = objProperties;
			if (blnRestore) {
				for (var s in {top: 0, left: 0, height: 0, width: 0}) {
					shrinkwrapStyle[s] = (maximizedDimensions[s] + "")
							.replace(APPEND_PX_RE, APPEND_PX_RE_FN);
				}
			}
			else {
				objProperties.previousMode = objProperties.currentMode;
				objProperties.currentMode = MODE_MAXIMIZED;
				// set {top,left,width,height} to {0,0,100%,100%} and maximizedDimensions to match
				var dims = {top: 0, left: 0, width: "100%", height: "100%"};
				for (var s in dims) shrinkwrapStyle[s] = maximizedDimensions[s] = dims[s];
			}
		} catch (ex) {}
	}
	else {
		if (!blnRestore) {
			objProperties.previousMode = objProperties.currentMode;
			objProperties.currentMode = (objProperties.resized ? MODE_RESIZED : MODE_RESET);
		}
		box.className = box.className.replace(MAXIMIZED_CLASS_RE, " ");
		maximizedProperties = null;
		for (var s in {top: 0, left: 0, height: 0, width: 0}) {
			shrinkwrapStyle[s] = resizedDimensions[s] + "px";
		}
		box.style.height = resizedDimensions.boxHeight + "px";
		box.style.width = resizedDimensions.boxWidth + "px";
		try {
			objProperties.swap.parentNode.replaceChild(box, objProperties.swap);
			objProperties.swap = null;
		} catch (ex) {}
	}
};
function toggleReset (objProperties) {
	// if not reset, reset; otherwise toggle with last mode (default to maximized)
	var	resetDimensions = objProperties.dimensions[MODE_RESET],
			previousDimensions = objProperties.dimensions[objProperties.previousMode],
			boxStyle = objProperties.box.style,
			shrinkwrapStyle = objProperties.shrinkwrap.style;
	if (objProperties.currentMode != MODE_RESET) {
		if (objProperties.currentMode == MODE_MAXIMIZED) {
			toggleMaximized(objProperties, true);
		}
		objProperties.previousMode = objProperties.currentMode;
		objProperties.currentMode = MODE_RESET;
		for (var s in {top: 0, left: 0, height: 0, width: 0}) {
			shrinkwrapStyle[s] = resetDimensions[s] + "px";
		}
		boxStyle.height = resetDimensions.boxHeight + "px";
		boxStyle.width = resetDimensions.boxWidth + "px";
	}
	else {
		if (objProperties.previousMode == MODE_MAXIMIZED
				|| objProperties.previousMode == MODE_RESET) {
			toggleMaximized(objProperties, true);
			objProperties.previousMode = MODE_MAXIMIZED;
		}
		else {
			for (var s in {top: 0, left: 0, height: 0, width: 0}) {
				shrinkwrapStyle[s] = previousDimensions[s] + "px";
			}
			boxStyle.height = previousDimensions.boxHeight + "px";
			boxStyle.width = previousDimensions.boxWidth + "px";
		}
		objProperties.currentMode = objProperties.previousMode;
		objProperties.previousMode = MODE_RESET;
	}
};

function populateHelp (arrTags) {
	try {
		var	document = window.document,
				table = helpFrame.getElementsByTagName("tbody")[0],
				display = table.parentNode.style.display;
		while (table.firstChild) table.removeChild(table.lastChild);
		for (var tag, newRow, el, i = 0; i < arrTags.length; i++) {
			tag = getTagAndType(arrTags[i]);
			newRow = table.appendChild(document.createElement("tr"));
			newRow.appendChild(document.createElement("th"))
					.appendChild(document.createTextNode(arrTags[i].toUpperCase()));
			el = document.createElement(tag[0]);
			if (tag[1]) el.type = tag[1];
			wrap(newRow.appendChild(document.createElement("td")).appendChild(el));
		}
		table.parentNode.style.display = "none";
		table.parentNode.style.display = display;
	} catch (ex) { alert(ex); }
};
function closeHelp (evt) {
	if (maximizedProperties) toggleMaximized(maximizedProperties, false);
	maximizedProperties = null;
	try { helpFrame.parentNode.removeChild(helpFrame); } catch (ex) {}
	try { evt.preventDefault(); } catch (ex) {}
	return false;
};

// flesh out the global objects and write class styles
(function () {
	var document = window.document, tmp;
	
	// wrap
	wrapTemplate = document.createElement(REPLACEMENT_TAG);
	wrapTemplate.className = REPLACEMENT_CLASS;
		// placeholder
	tmp = wrapTemplate.appendChild(document.createElement(PLACEHOLDER_TAG));
	tmp.className = PLACEHOLDER_CLASS;
		// shrinkwrap
	tmp = tmp.appendChild(document.createElement(SHRINKWRAP_TAG));
	tmp.className = SHRINKWRAP_CLASS;
	tmp.style.top = tmp.style.left = "0px";
		// resizers
	for (var i = 0; i < 8; i++) {
		tmp.appendChild(document.createElement(RESIZER_TAG)).className =
				RESIZER_CLASS + " " + RESIZER_SUBCLASSES[i];
		applyStyleString(tmp.lastChild, RESIZER_STYLES[i]);
		tmp.lastChild.setAttribute("title", RESIZER_TITLE);
	}
	
	// iframe cover and size translator
	iframeCover = document.createElement("img");
	iframeCover.setAttribute("src", 	// 1 pixel 100% transparent PNG
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK%2FINw"
			+ "WK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAQSURBVHjaYvj%2F%2Fz8DQIABAA"
			+ "j8Av7bok0WAAAAAElFTkSuQmCC");
	iframeCover.setAttribute("alt", "");
	applyStyleString(iframeCover, [
		"position:absolute !important;top:0 !important;left:0 !important;",
		"width:100% !important;height:100% !important;",
		"margin:0 !important;border:0 !important;"
	].join(""));
	sizeTranslator = iframeCover.cloneNode(true);
	applyStyleString(sizeTranslator, "font-size:inherit !important;"
			+ "width:10em !important;height:10ex !important;");
	
	// help frame
	helpFrame = document.createElement("div");
	helpFrame.className = HELP_CLASS;
	helpFrame.style.background = "transparent "	// 1 pixel 20% transparent white PNG
			+ "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfF"
			+ "cSJAAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAxNiBOb3YgMjAwNSAxMzoxOTowMyAt"
			+ "MDUwMKTaEqIAAAAHdElNRQfVCxATHSx6OlxkAAAACXBIWXMAAB7CAAAewgFu0HU%2BA"
			+ "AAABGdBTUEAALGPC%2FxhBQAAAA1JREFUeNpj%2BP%2F%2F%2FxkACcgDyrXl4xsAAA"
			+ "AASUVORK5CYII%3D) repeat";
	helpFrame.innerHTML = HELP_CONTENT;
	addEventHandler(helpFrame.getElementsByTagName("a")[0], "click", closeHelp,
			false);
	
	// base style selectors
	var sel_REPLACEMENT = REPLACEMENT_TAG + "." + REPLACEMENT_CLASS;
	var sel_PLACEHOLDER = sel_REPLACEMENT + " > " + PLACEHOLDER_TAG + "." + PLACEHOLDER_CLASS;
	var sel_SHRINKWRAP = sel_PLACEHOLDER + " > " + SHRINKWRAP_TAG + "." + SHRINKWRAP_CLASS;
	var sel_RESIZER = sel_SHRINKWRAP + " > " + RESIZER_TAG + "." + RESIZER_CLASS;
	var sel_RESIZER_BAR = sel_RESIZER + "." + RESIZER_BAR_CLASS;
	var sel_RESIZER_HANDLE = sel_RESIZER + "." + RESIZER_HANDLE_CLASS;
	// maximized style selectors
	var sel_MAXIMIZED = sel_REPLACEMENT + "." + MAXIMIZED_CLASS;
	// dynamic style selectors
	var sel_SHRINKWRAP_HOVER_RESIZER_HANDLE = sel_SHRINKWRAP + ":hover > "
			+ RESIZER_TAG + "." + RESIZER_CLASS + "." + RESIZER_HANDLE_CLASS;
	var sel_SHRINKWRAP_RESIZING_RESIZER_BAR = sel_SHRINKWRAP + "." + RESIZING_CLASS + " > "
			+ RESIZER_TAG + "." + RESIZER_CLASS + "." + RESIZER_BAR_CLASS;
	var sel_SHRINKWRAP_RESIZING_RESIZER_HANDLE = sel_SHRINKWRAP + "." + RESIZING_CLASS + " > "
			+ RESIZER_TAG + "." + RESIZER_CLASS + "." + RESIZER_HANDLE_CLASS;
	var sel_RESIZER_BAR_HOVER = sel_RESIZER_BAR + ":hover";
	var sel_RESIZER_HANDLE_HOVER = sel_RESIZER_HANDLE + ":hover";
	var sel_RESIZER_BAR_RESIZING = sel_RESIZER_BAR + "." + RESIZING_CLASS;
	var sel_RESIZER_HANDLE_RESIZING = sel_RESIZER_HANDLE + "." + RESIZING_CLASS;
	var sel_HELP = "." + HELP_CLASS;
	var sel_WINDOW = "." + WINDOW_CLASS;
	var sel_WINDOW_TITLE = sel_WINDOW + " > ." + WINDOW_TITLE_CLASS;
	var sel_WINDOW_CONTENT = sel_WINDOW + " > ." + WINDOW_CONTENT_CLASS;
	
	// insert the base styles
	addGlobalStyle(""
		// base wrap styles
		+ sel_REPLACEMENT + " { margin: 0; border: 0 !important; padding: 0 !important;"
				+ " vertical-align: inherit !important; }\n"
		+ sel_PLACEHOLDER + " { position: relative !important;"
				+ " top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important;"
				+ " width: 100% !important; height: 100% !important;"
				+ " margin: 0 !important; border: 0 !important; padding: 0 !important;"
				+ " overflow: visible !important; }\n"
		+ sel_SHRINKWRAP + " { position: absolute !important;"
				+ " min-height: " + MIN_SIZE_PX + "px !important;"
				+ " min-width: " + MIN_SIZE_PX + "px !important;"
				+ " margin: 0 !important; border: 0 !important; padding: 0 !important;"
				+ " overflow: visible !important; }\n"
		+ sel_RESIZER + " { position: absolute !important;"
				+ " margin: 0 !important; padding: 0 !important; z-index: 1 !important; }\n"
		+ sel_RESIZER_BAR + " { border: 0px solid; border-color: transparent !important;"
				+ " background: transparent !important; opacity: 0.8; }\n"
		+ sel_RESIZER_HANDLE + " { visibility: hidden !important; height: 10px; width: 10px;"
				+ " border: 1px solid black; background: red; -moz-border-radius: 25%;"
				+ " z-index: 2 !important; opacity: 0.4; }\n"
		// maximized wrap styles
		+ sel_MAXIMIZED + " { position: absolute !important; position: fixed !important;"
				+ " top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important;"
				+ " width: auto !important; height: auto !important;"
				+ " margin: " + MAXIMIZED_MARGIN + " !important; }\n"
		// dynamic wrap styles
		+ sel_SHRINKWRAP_HOVER_RESIZER_HANDLE + ", " + sel_SHRINKWRAP_RESIZING_RESIZER_HANDLE + " {"
				+ " visibility: visible !important; }\n"
		+ sel_RESIZER_BAR_HOVER + ", " + sel_RESIZER_BAR_RESIZING + " {"
				+ " border-color: blue !important; }\n"
		+ sel_RESIZER_HANDLE_HOVER + ", " + sel_RESIZER_HANDLE_RESIZING + " {"
				+ " height: 20px; width: 20px; margin: -4px !important; z-index: 3 !important;"
				+ " opacity: 0.8; }\n"
			// reset styles on non-active resizers during a resize
		+ sel_SHRINKWRAP_RESIZING_RESIZER_BAR + ":not(." + RESIZING_CLASS + ")" + " {"
				+ " border-color: transparent !important; }\n"
		+ sel_SHRINKWRAP_RESIZING_RESIZER_HANDLE + ":not(." + RESIZING_CLASS + ")" + " {"
				+ " height: 10px; width: 10px; margin: 0 !important; z-index: 2 !important;"
				+ " opacity: 0.4; }\n"
		// help frame styles
		+ sel_HELP + " { position: absolute; position: fixed; left: 0; top: 0;"
				+ " width: 100%; height: 100%; margin: 0; border: 0; padding: 0; }"
		+ sel_WINDOW + " { position: absolute;"
				+ " top: 0; right: 0; bottom: 0; left: 0;"
				+ " width: 80%; min-width: 240px; height: 80%; min-height: 180px;"
				+ " margin: auto; border: medium solid blue; padding: 0;"
				+ " background-color: white; text-align: left; }"
		+ sel_WINDOW_TITLE + " { position: absolute; top: 0; left: 0; right: 0;"
				+ " padding: 0 0 3px 0; font: normal 14px/100% Tahoma, sans-serif;"
				+ " color: white; background-color: blue; }"
		+ sel_WINDOW_TITLE + " > h1" + " { display: inline;"
				+ " margin: 0; border: 0; padding: 0;"
				+ " font: normal 20px/120% Tahoma, sans-serif; }"
		+ sel_WINDOW_TITLE + " > a" + " { float: right; color: inherit; }"
		+ sel_WINDOW_CONTENT + " { position: absolute;"
				+ " top: 27px; bottom: 0; left: 0; right: 0; overflow: auto; }"
		+ sel_WINDOW_CONTENT + " > h2" + " {"
				+ " margin: 0.5em 0 0 0; padding: 0; font-size: 1.4em; }"
		+ sel_WINDOW_CONTENT + " > p" + " { margin: 1em 0 0 0; padding: 0; }"
		+ sel_WINDOW_CONTENT + " > dl" + " { margin: 0; padding: 0; }"
		+ sel_WINDOW_CONTENT + " > dl > dt" + " { display: compact;"
				+ " margin-right: 0; font-weight: bold; font-style: italic; }"
		+ sel_WINDOW_CONTENT + " > dl > dd" + " {"
				+ " display: inline; margin-left: 7em; }"
		+ sel_WINDOW_CONTENT + " kbd" + " { font-weight: bold; }"
		+ sel_WINDOW_CONTENT + " th" + " {"
				+ " text-align: right; vertical-align: top; }"
	, true);
})();

// pre-wrap existing elements and automatically wrap new ones
(function (evt) {
	function wrapAll () {
		var tags = getTags(), tag, elements, length;
		try {
			for (var i = tags.length - 1; i >= 0; i--) {
				tag = getTagAndType(tags[i]);
				elements = window.document.getElementsByTagName(tag[0]);
				length = elements.length;
				for (var j = 0; j < length; j++) {
					if ((!tag[1] || ("" + elements[j].type).toLowerCase() == tag[1])
							&& !isWrapped(elements[j]) && elements[j].offsetWidth > 0
							&& elements[j].offsetHeight > 0) {
						wrap(elements[j]);
					}
				}
			}
		} catch (ex) {}
	};
	function autowrap (evt) {
		evt = evt || window.event;
		var tags = getTags(), tag, target = evt.target || evt.srcElement,
				type = target.nodeName.toLowerCase(), url = null;
		if (target.nodeType == 3) {
			target = target.parentNode;
			type = target.nodeName.toLowerCase();
		}
		for (var i = 0; i < tags.length; i++) {
			tag = getTagAndType(tags[i]);
			if (type == tag[0] && (!tag[1] || ("" + target.type).toLowerCase() == tag[1])) {
				if (!isWrapped(target) && target.offsetWidth > 0
						&& target.offsetHeight > 0) {
					wrap(target);
				}
				break;
			}
		}
	};
	
	if (!addEventHandler(window, "load", wrapAll, true)) wrapAll();
	addEventHandler(window.document, "mouseover", autowrap, false);
})();

})();


