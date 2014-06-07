// ==UserScript==
// @name		Quick Img Browsing
// @description Browse the images in the page easier, with shortcut keys and floating buttons.
// @author		kraml 
// @version		2.2.6 
// @note        fix compatibility by lastdream2013 for firefox22+
// @homepage	http://userscripts.org/scripts/show/83311
// @namespace	http://github.com/kraml/quick_image_browsing
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @include		*
// @exclude		http*://www.google.com/reader/*
// @exclude		http*://mail.google.com/*
// ==/UserScript==

// User customizable preferences. These are default values. If different values are set by setCfgValue() then these will be overrided
var userprefs = {
	// Show debug information or not
	debug : false,

	// Two different modes for enumerate all img elements in the page
	// 0: according to current position of images, keyDown jump to the image that is just below top edge
	// 1: totally ignore image position, loop always start from first/last image, by index in the list
	// Mode 1 should work on more sites than mode 0. While mode 0 always start from the current view port so is more intuitive
	mode : 0,

	// Shortcut key object definition: shortCutKey(charCode, ctrlKey, altKey)
	keyUp		: new shortCutKey(107, false, false), // k
	keyDown		: new shortCutKey(106, false, false), // j
	keyFit		: new shortCutKey(102, false, false), // f
	keyOrig		: new shortCutKey(111, false, false), // o
	keyNatural	: new shortCutKey(110, false, false), // n
	keyZoomOut	: new shortCutKey(122, false, false), // z
	keyZoomIn	: new shortCutKey(105, false, false), // i
	keyRotate	: new shortCutKey(114, false, false), // r
	keyViewInNewTab : new shortCutKey(118, false, false), // v
	keySave		: new shortCutKey(115, false, false), // s

	// When scroll to next image, the margin between image top edge to window top edge
	margin : 30,

	// Minimal image size. Image with smaller size will be skipped when browsing
	minH : 300,
	minW : 300,
	ignoreSmallImg : true,

	// For zoom in and out
	zoomOutStep : 1.25,
	zoomInStep : 0.8,

	// The border color for highlighting current image
	curBorderColor : "#33AF44", //"#7F8F9C",
	// The border color for hightlighting images that has been resized when browsing
	resizedBorderColor : "#FF6666",
	// The border width
	borderWidth : 5,

	// Bring the current viewing image to the most front z-index so when zooming it will keep visible
	// Alert: it will interfere with some other scirpts/extensions as they may also display a floating icon/message on the image,
	// Alert: which may be covered by the image with higher z-index
	bringToFront : true,
	// z-index to set when bring to front
	zIdx: 100,
};

// Max image size. Image with larger size(either larger height or width) will be reduced
var maxH, maxW;

// For display alert / debug messages
var sizeNoticeDIV, fitBtnSpan, naturalBtnSpan, origBtnSpan, zoomOutBtnSpan, zoomInBtnSpan, rotateBtnSpan, viewBtnSpan, saveBtnSpan, cfgBtnSpan;
var alertDIV, debugDIV, cfgBoxDIV;
var alertTimeoutID, debugTimeoutID;

var imgList, curImg, lastImg;

// Used in mode 1
var curIdx = null;

var initialized = false;

GM_registerMenuCommand("Quick Img Browsing - Configuration", cfgBtnClick);

function init()
{
	if (!initialized) {
		GM_addStyle(["img.QIB_focus { border-style: solid !important;",
										"border-width: ", getCfgValue("borderWidth"), "px", " !important;", 
										"border-color: ", getCfgValue("curBorderColor"), " !important;}",
					"img.QIB_focus.QIB_resized { border-style: solid !important;", 
										"border-width: ", getCfgValue("borderWidth"), "px", " !important;",
										"border-color: ", getCfgValue("resizedBorderColor"), " !important;}",
					"div.QIB_sizeNoticeDIV { position: absolute !important;",
										"z-index: 2147483647 !important;",
										"float: none !important;",
										"font-family: Arial, Helvetica !important;",
										"font-size: 9pt !important;",
										"height: auto !important;",
										"width: auto !important;",
										"line-height: 16px !important;",
										"padding: 3px 2px 4px 1px!important; ",
										"margin: 0px !important;",
										"border: 0 none !important;",
										"text-align: left !important;",
										"color: #666666 !important;",
										"background-color: ", getCfgValue("curBorderColor"), " !important;}",
					"span.QIB_sizeBtnSpan { cursor: pointer !important;",
										"height: auto !important;",
										"width: auto !important;",
										"line-height: 16px !important;",
										"background-color: #F1F1F1 !important;",
										"border: 0 none !important;",
										"margin: 2px 1px 2px 2px !important;",
										"padding: 1px 3px 1px 2px !important;}",
					"div.QIB_debugDIV { position: fixed !important;",
										"z-index: 2147483647 !important;",
										"float: none !important;",
										"font-family: Arial, Helvetica !important;",
										"font-size: 12px !important;",
										"line-height: 16px !important;",
										"padding: 2px 5px 2px 5px !important;",
										"background-color: #AF9C90 !important;",
										"border: none !important;",
										"text-align: left !important;",
										"color: #303030 !important;",
										"right: 0 !important;",
										"bottom: 0 !important;}",
					"div.QIB_alertDIV { position: fixed !important;",
										"z-index: 2147483647 !important;",
										"float: none !important;",
										"font-family: Arial, Helvetica !important;",
										"font-size: 16px !important;",
										"padding: 2px 8px 2px 8px !important;",
										"border: none !important;",
										"text-align: left !important;",
										"color: black !important;",
										"left: 0 !important;",
										"bottom: 0 !important;",
										"background-color: ", getCfgValue("curBorderColor"), " !important;}",
					"div.QIB_cfgBoxDIV { position: fixed !important;",
										"height: auto !important;",
										"width: auto !important;",
										"z-index: 2147483647 !important;",
										"float: none !important;",
										"line-height: 16px !important;",
										"padding: 3px 5px 0px 5px !important;",
										"background-color: #AF9C90 !important;",
										"border: none !important;",
										"text-align: left !important;",
										"left: 0 !important;",
										"bottom: 0 !important;",
										"color: #303030 !important;}",
					"#QIB_div { padding: 0px !important;",
										"margin: 2px !important;}",
					"#QIB_div select, #QIB_div input, #QIB_div label, #QIB_div span {",
										"display: inline !important;",
										"font-family: Arial, Helvetica !important;",
										"font-size: 12px !important;",
										"color: #303030 !important;",
										"padding: 0px !important;",
										"margin: 1px !important;",
										"vertical-align: bottom !important;}",
					"#QIB_div > select > option { padding-left: 3px !important;}"].join(""));

		initialized = true;
	}
}

document.addEventListener("keypress", function(event) {
	// If currently key pressed in a input, select or textarea, do nothing
	var curElement = document.activeElement.tagName.toLowerCase();
	if (curElement == "input" || curElement == "select" || curElement == "textarea"
		|| document.activeElement.contentEditable == "true" || document.activeElement.contentEditable == "") {
		return;
	}

	if (testKeyEvent(event, getCfgValue("keyDown")) || testKeyEvent(event, getCfgValue("keyUp"))) {
		init();

		// Initialize the imgList every time when key pressed so if page changed(like with autopager) we will find the new images.
		imgList = document.getElementsByTagName("img");
		if (imgList.length == 0) {
			alertMsg("No Image Found");
			return;
		}
		if (!curImg) { curImg = imgList[0]; }
	}

	if (testKeyEvent(event, getCfgValue("keyDown"))) { // Browsing from top to bottom
		if (getCfgValue("mode") == 1) {
			if (curIdx == null || curIdx < 0) {
				curIdx = 0;
			} else if (curIdx < imgList.length - 1) {
				curIdx++;
			} else {
				curIdx = imgList.length - 1;
			}
		}

		var idxStart = (getCfgValue("mode") == 1 ? curIdx : 0);
		for (imgIdx = idxStart; imgIdx < imgList.length; imgIdx++) {
			var img = imgList[imgIdx];

			if (imgIdx == imgList.length - 1) {
				alertMsg("Last Image Reached");

				if (getCfgValue("mode") == 1) {
					// When already at the end of the list, move it back to avoid out of index
					curIdx--;
				}
			}

			if (isValidImg(img, true)) {
				jumpToImg(img, imgIdx);

				// Found the image, exit from the loop, wait for next keypress event
				break;
			}
		}
	} else if (testKeyEvent(event, getCfgValue("keyUp"))) { // Browsing from buttom to top
		if (getCfgValue("mode") == 1) {
			if (curIdx == null || curIdx > imgList.length - 1) {
				curIdx = imgList.length - 1;
			} else if (curIdx > 0) {
				curIdx--;
			} else {
				curIdx = 0;
			}
		}

		var idxStart = (getCfgValue("mode") == 1 ? curIdx : imgList.length - 1);
		for (imgIdx = idxStart; imgIdx >= 0; imgIdx--) {
			var img = imgList[imgIdx];

			if (imgIdx == 0) {
				alertMsg("First image Reached");

				if (getCfgValue("mode") == 1) {
					// When already at the beginning of the list, move it back to avoid out of index
					curIdx++;
				}
			}

			if (isValidImg(img, false)) {
				jumpToImg(img, imgIdx);

				// Found the image, exit from the loop, wait for next keypress event
				break;
			}
		}
	} else if (testKeyEvent(event, getCfgValue("keyFit"))) { // Set the size of current image to adequate size
		fitBtnClick();
	} else if (testKeyEvent(event, getCfgValue("keyOrig"))) { // Set the size of current image to original size
		origBtnClick();
	} else if (testKeyEvent(event, getCfgValue("keyNatural"))) { // Set the size of current image to natural size
		naturalBtnClick();
	} else if (testKeyEvent(event, getCfgValue("keyZoomOut"))) { // Zoom out current image
		zoomOutBtnClick();
	} else if (testKeyEvent(event, getCfgValue("keyZoomIn"))) { // Zoom in current image
		zoomInBtnClick();
	} else if (testKeyEvent(event, getCfgValue("keyRotate"))) { // Rotate current image
		rotateBtnClick();
	} else if (testKeyEvent(event, getCfgValue("keyViewInNewTab"))) { // Open image in a new tab
		viewBtnClick();
	} else if (testKeyEvent(event, getCfgValue("keySave"))) { // Save image
		saveBtnClick();
	}
}, true);

function isValidImg(img, fwd)
{
	// img: The image to check
	// fwd: The direction of the movement. true: forward; false: backward
	var valid;

	// Check size
	valid = getCfgValue("ignoreSmallImg") ? ((img.offsetHeight * img.offsetWidth) > (getCfgValue("minH") * getCfgValue("minW"))) : true;

	// Check position
	if (getCfgValue("mode") == 0) {
		if (fwd) {
			// Jump direction is forward(top to bottom), find the first image that top edege is just below current viewport top edge
			valid = valid && (getY(img) > (window.scrollY + getCfgValue("margin")));
		} else {
			// Jump direction is backward(bottom to top), find the first image that top edege is just above current viewport top edge
			valid = valid && (getY(img) < (window.scrollY + getCfgValue("margin")));
		}
	}

	return valid;
}

function calMaxSize(img)
{
	// Image with larger size(either larger height or width) will be reduced
	// If the image is in a frame, "self" get the size of the frame. If use window.innerHeight will get size of top level window

	// Since the image is always positioned "margin" pixels lower than the top edge, maxH is just window(frame) height minus margin
	maxH = self.innerHeight - 2 * getCfgValue("margin");
	// maxW is a bit complexer, as image is not horizontally positioned "margin" pixels right to the left edge, may from center of a page
	// innerWidth include the scrollbar width so it is actually a bit larger than the page area
	maxW = window.scrollX + self.innerWidth - getX(img) - getCfgValue("margin") - 15;
}

function fitImg(img)
{
	var newH, newW;
	// Scale according to the H/W ratio comparing to the max size ratio
	if ((img.naturalHeight / img.naturalWidth) > (maxH / maxW)) {
		newH = maxH;
		newW = maxH * img.naturalWidth / img.naturalHeight;
	} else {
		newW = maxW;
		newH = maxW * img.naturalHeight / img.naturalWidth;
	}

	img.style.setProperty("max-height", newH + "px", "important");
	img.style.setProperty("max-width", newW + "px", "important");
	img.height = newH;
	img.width = newW;

	img.classList.add("QIB_resized");
}

function zoomImg(img, step)
{
	// Some site use javascript to ensure proportional scaling of the image. So need to save the current H/W first before change any of them
	// If the code is like this:
	// img.height *= getCfgValue("zoomOutStep");
	// img.width  *= getCfgValue("zoomOutStep");
	// Then when height is changed first the width actually is increased accordingly, and then get increased again, thus give a non-proportional scaled image
	var newH = img.height * step;
	var newW = img.width * step;

	img.style.setProperty("max-height", newH + "px", "important");
	img.style.setProperty("max-width", newW + "px", "important");
	img.height = newH;
	img.width  = newW;

	img.classList.add("QIB_resized");

	displaySizeNotice(true, getX(img), getY(img));
	debugMsg();
}

function processImg(img)
{ 
	// Save the oringal H & W first for resize back by the resize buttons
	if ($('img').data("origH") == null) { $('img').data("origH", img.height); }
	if ($('img').data("origW") == null) { $('img').data("origW", img.width); }

	calMaxSize(img);
	// Reduce size only if image is bigger than the view area
	if (img.height > maxH || img.width > maxW) {
		fitImg(img);
	}

	img.classList.add("QIB_focus");

	// Bring the image to front
	if (getCfgValue("bringToFront")) {
		img.style.setProperty("position", "relative", "important");
		img.style.setProperty("z-index", getCfgValue("zIdx"), "important");
	}

	// Add event listener for mouse over and out event
	img.addEventListener("mouseover", sizeNoticeMouseOver, false);
	img.addEventListener("mouseout", sizeNoticeMouseOut, false);

	// Setup the size buttons but do not display them untill mouse over
	displaySizeNotice(false, getX(img), getY(img));
}

function jumpToImg(img, imgIdx)
{
	// Mark current and last image
	lastImg = curImg;
	curImg = img;
	curIdx = imgIdx;

	cleanUpImg(lastImg);

	// Handle image size, add border, event listener etc.
	processImg(curImg);

	// Scroll to the proper position
	window.scrollTo(0, getY(curImg) - getCfgValue("margin"));

	debugMsg();
}

function cleanUpImg(img)
{
	// This function should only take the last img as an argument
	try	{
		img.classList.remove("QIB_focus");
		img.removeEventListener("mouseover", sizeNoticeMouseOver, false);
		img.removeEventListener("mouseout", sizeNoticeMouseOut, false);
	} catch(err) {
	}
}

function displaySizeNotice(display, left, top)
{
	if (!sizeNoticeDIV) {
		// The float message displayed at the top left corner when mouse is over a image
		sizeNoticeDIV = document.createElement("div");
		sizeNoticeDIV.className = "QIB_sizeNoticeDIV";
		document.body.appendChild(sizeNoticeDIV);
		sizeNoticeDIV.addEventListener("mouseover", sizeNoticeMouseOver, false);
		sizeNoticeDIV.addEventListener("mouseout", sizeNoticeMouseOut, false);

		// The buttons in the float message
		fitBtnSpan		= createBtn("<u>F</u>it", fitBtnClick); // Fit image to adequate
		origBtnSpan		= createBtn("<u>O</u>rig", origBtnClick); // Scale to original size appointed in web page
		naturalBtnSpan	= createBtn("<u>N</u>atual", naturalBtnClick); // Scale to its natural size
		zoomOutBtnSpan	= createBtn("<u>Z</u> Out", zoomOutBtnClick); // Zoom out by zoomOutStep
		zoomInBtnSpan	= createBtn("Z <u>I</u>n", zoomInBtnClick); // Zoom n by zoomInStep
		rotateBtnSpan	= createBtn("<u>R</u>otate", rotateBtnClick); // Rotate 90 degrees clockwise
		viewBtnSpan		= createBtn("<u>V</u>iew", viewBtnClick); // View image in a new tab
		//saveBtnSpan		= createBtn("<u>S</u>ave", saveBtnClick); // Save image as
		cfgBtnSpan		= createBtn("<u>C</u>fg", cfgBtnClick); // Config options
	};

	sizeNoticeDIV.style.setProperty("left", left + "px", "important");
	sizeNoticeDIV.style.setProperty("top", top + "px", "important");
	sizeNoticeDIV.style.setProperty("display", (display ? "block" : "none"), "important");
}

function sizeNoticeMouseOver()
{
	sizeNoticeDIV.style.setProperty("display", "inline", "important");
}

function sizeNoticeMouseOut()
{
	sizeNoticeDIV.style.setProperty("display", "none", "important");
}

function createBtn(html, func)
{
	// html: button label
	// func: the function to call when clicked
	var btn = document.createElement("span");
	btn.className = "QIB_sizeBtnSpan";
	btn.innerHTML = html;
	btn.addEventListener("click", func, false);
	sizeNoticeDIV.appendChild(btn);

	return btn;
}

function fitBtnClick()
{
	if (curImg) {
		calMaxSize(curImg);
		fitImg(curImg)
		displaySizeNotice(true, getX(curImg), getY(curImg));
		debugMsg();
	}
}

function origBtnClick()
{
	if (curImg) {
		if ($('curImg').data("origH") != null && $('curImg').data("origW") != null) {
			curImg.style.setProperty("max-height", $('curImg').data("origH") + "px", "important");
			curImg.style.setProperty("max-width", $('curImg').data("origW") + "px", "important");
			curImg.height = $('curImg').data("origH");
			curImg.width = $('curImg').data("origW");

			curImg.classList.remove("QIB_resized");

			displaySizeNotice(true, getX(curImg), getY(curImg));
			debugMsg();
		}
	}
}

function naturalBtnClick()
{
	if (curImg) {
		curImg.style.setProperty("max-height", curImg.naturalHeight + "px", "important");
		curImg.style.setProperty("max-width", curImg.naturalWidth + "px", "important");
		curImg.height = curImg.naturalHeight;
		curImg.width = curImg.naturalWidth;

		displaySizeNotice(true, getX(curImg), getY(curImg));
		debugMsg();
	}
}

function zoomOutBtnClick()
{
	if (curImg) {
		zoomImg(curImg, getCfgValue("zoomOutStep"));
	}
}

function zoomInBtnClick()
{
	if (curImg) {
		zoomImg(curImg, getCfgValue("zoomInStep"));
	}
}

function rotateBtnClick()
{
	if (curImg) {
		// Rotate 90 degrees clockwise each time
		if (curImg.style.getPropertyValue("-moz-transform") == "rotate(90deg)") {
			curImg.style.setProperty("-moz-transform", "rotate(180deg)", "important");
		} else if (curImg.style.getPropertyValue("-moz-transform") == "rotate(180deg)") {
			curImg.style.setProperty("-moz-transform", "rotate(270deg)", "important");
		} else if (curImg.style.getPropertyValue("-moz-transform") == "rotate(270deg)") {
			curImg.style.removeProperty("-moz-transform");
		} else {
			curImg.style.setProperty("-moz-transform", "rotate(90deg)", "important");
		}

		displaySizeNotice(true, getX(curImg), getY(curImg));
		debugMsg();
	}
}

function viewBtnClick()
{
	if (curImg) {
		GM_openInTab(curImg.src);
	}
}

function saveBtnClick()
{
	// TODO: save image function
}

function cfgBtnClick()
{
	init();
	displayCfgBox(true);
}

function debugMsg(html)
{
	if (getCfgValue("debug")) {
		if (!debugDIV) {
			debugDIV = document.createElement("div");
			debugDIV.className = "QIB_debugDIV";
			document.body.appendChild(debugDIV);
		};
		debugDIV.innerHTML = "Image Idx: " + curIdx + " / " + imgList.length +
			"<br/>getX/getY: " + getX(curImg) + " / " + getY(curImg) +
			"<br/>Current(H/W): " + curImg.height + " / " + curImg.width + " (" + (curImg.height / curImg.width).toFixed(3) + ")" +
			"<br/>Original(H/W): " + $('curImg').data("origH") + " / " + $('curImg').data("origW")  + " (" + ($('curImg').data("origH") / $('curImg').data("origW")).toFixed(3) + ")" +
			"<br/>Natural(H/W): " + curImg.naturalHeight + " / " + curImg.naturalWidth  + " (" + (curImg.naturalHeight / curImg.naturalWidth).toFixed(3) + ")" +
			"<br/>Max(H/W): " + maxH + " / " + maxW + " (" + (maxH / maxW).toFixed(3) + ")";
		debugDIV.style.setProperty("display", "inline", "important");

		if (typeof debugTimeoutID == "number") {
			window.clearTimeout(debugTimeoutID);
		}
		debugTimeoutID = window.setTimeout(function() {
			debugDIV.style.setProperty("display", "none", "important");
		}, 5000);
	}
}

function alertMsg(html)
{
	if (!alertDIV) {
		alertDIV = document.createElement("div");
		alertDIV.className = "QIB_alertDIV";
		document.body.appendChild(alertDIV);
	};
	alertDIV.innerHTML = html;
	alertDIV.style.setProperty("display", "inline", "important");

	if (typeof alertTimeoutID == "number") {
		window.clearTimeout(alertTimeoutID);
	}
	alertTimeoutID = window.setTimeout(function() {
		alertDIV.style.setProperty("display", "none", "important");
	}, 2000);
}

function displayCfgBox(display)
{
	if (!cfgBoxDIV) {
		cfgBoxDIV = document.createElement("div");
		cfgBoxDIV.className = "QIB_cfgBoxDIV";
		document.body.appendChild(cfgBoxDIV);

	};

	cfgBoxDIV.innerHTML = [
		"<div id='QIB_div'>",
			"<span>Mode:</span>",
			"<select id='QIB_mode' title='Choose different mode for enumerate and loop image. Mode 1 should work on more sites than mode 0. While mode 0 always start from the current view port so is more intuitive'>",
				(getCfgValue("mode") == 1 ? 
					"<option value='0'>0 - By img position</option>" + 
					"<option value='1' selected>1 - By img index</option>"
				:
					"<option value='0' selected>0 - By img position</option>" + 
					"<option value='1'>1 - By img index</option>"
				),
			"</select>",
		"</div>",
		"<div id='QIB_div'>",
			"<span>Top margin:</span><input type='text' id='QIB_margin' maxlength='4' size='3' title='Top margin when jump to a image' value='", getCfgValue("margin"), "'/>",
		"</div>",
		"<div id='QIB_div'>",
			"<input type='checkbox' id='QIB_ignore_small' title='Check to ignore small images when navigating' ", (getCfgValue("ignoreSmallImg") ? "checked" : ""), "/>&nbsp;",
			"<label for='QIB_ignore_small' title='Check to ignore small images when navigating'>Ignore images smaller than</label><br/>",
			"<span>Height:</span><input type='text' id='QIB_min_h' maxlength='4' size='2' title='Height to ignore' value='", getCfgValue("minH"), "'/>",
			"<span>Width:</span><input type='text' id='QIB_min_w' maxlength='4' size='2' title='Width to ignore'  value='", getCfgValue("minW"), "'/>",
		"</div>",
		"<div id='QIB_div'>",
			"<input type='checkbox' id='QIB_debug' title='Debug information at right bottom conner about img index, position, size etc.' ", (getCfgValue("debug") ? "checked" : ""), "/>&nbsp;",
			"<label for='QIB_debug' title='Debug information at right bottom conner about img index, position, size etc.' >Show debug info.</label><br/>",
		"</div>",
		"<div id='QIB_div'>",
			"<input type='button' id='QIB_save_config' value='Save' title='Save the configuration'/>&nbsp;&nbsp;",
			"<input type='button' id='QIB_reset_config' value='Reset' title='Reset these options to default'/>&nbsp;&nbsp;",
			"<input type='button' id='QIB_cancel_config' value='Cancel' title='Cancel and don't save configuration'/>",
		"</div>",
		].join("");

	cfgBoxDIV.style.setProperty("display", (display ? "block" : "none"), "important");

	document.getElementById("QIB_save_config").addEventListener("click", saveCfg, false);
	document.getElementById("QIB_reset_config").addEventListener("click", resetCfg, false);
	document.getElementById("QIB_cancel_config").addEventListener("click", cancelCfg, false);
}

function saveCfg()
{
	setCfgValue("mode", document.getElementById("QIB_mode").value - 0); // Trick to convert string to number
	setCfgValue("margin", document.getElementById("QIB_margin").value - 0);
	setCfgValue("ignoreSmallImg", Boolean(document.getElementById("QIB_ignore_small").checked));
	setCfgValue("minH", document.getElementById("QIB_min_h").value - 0);
	setCfgValue("minW", document.getElementById("QIB_min_w").value - 0);
	setCfgValue("debug", Boolean(document.getElementById("QIB_debug").checked));

	displayCfgBox(false);
}

function resetCfg()
{
	GM_deleteValue("mode");
	GM_deleteValue("margin");
	GM_deleteValue("ignoreSmallImg");
	GM_deleteValue("minH");
	GM_deleteValue("minW");
	GM_deleteValue("debug");

	displayCfgBox(false);
}

function cancelCfg()
{
	displayCfgBox(false);
}

// Get the distance between left edge of the page to left edge of the object
function getX(obj)
{
	return obj.offsetLeft + (obj.offsetParent ? getX(obj.offsetParent) : obj.x ? obj.x : 0);
}

// Get the distance between top edge of the page to top edge of the object
function getY(obj)
{
	return (obj.offsetParent ? obj.offsetTop + getY(obj.offsetParent) : obj.y ? obj.y : 0);
}

function getCfgValue(key)
{
	// If there is customized value, return it. If there is not, return the predefined default value from userprefs
	//var value = window.localStorage ? window.localStorage.getItem(name) : getCookie(name);
	//return (value ? decodeURIComponent(value) : '');
	return GM_getValue(key, userprefs[key]);
}

function setCfgValue(key, value)
{
	//value = encodeURIComponent(value);
	//window.localStorage ? window.localStorage.setItem(setName, value) : setCookie(setName, value, 365, '/', location.hostname);
	GM_setValue(key, value);
}

function shortCutKey(charCode, ctrlKey, altKey)
{
	// The constructor for shortCutKey object
	this.charCode = charCode;
	this.ctrlKey = ctrlKey;
	this.altKey = altKey;
}

function testKeyEvent(event, key)
{
	if (event.charCode  == key.charCode
		&& event.ctrlKey== key.ctrlKey
		&& event.altKey	== key.altKey) {
		return true;
	} else {
		return false;
	}
}
