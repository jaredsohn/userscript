// ==UserScript==
// @name           Flicking Scrolling
// @namespace      http://dttvb.yi.org/
// @include        *
// ==/UserScript==

//
// Flicking Scrolling...
//

(function() {

//
// The scrolling variables.
//
var scEnabled = 0;
var scTimer = 0;
var scDragging = 0;
var scSpeed = 0;

//
// Mouse position variables.
//
var mPosition = 0;
var mLastPosition = 0;
var mLastDragPosition = 0;
var mOriginal = 0;

//
// This will create a GM_registerMenuCommand callback function.
//
function createEnableDisable(n, x) {
	return function() {
		scEnabled = x;
		clearTimeout (scTimer);
		GM_setValue (n, x);
	};
}
GM_registerMenuCommand('Disable Flicking Scrolling',                createEnableDisable('isenabled', 0));
GM_registerMenuCommand('Enable Flicking Scrolling (Line Effect)',   createEnableDisable('isenabled', 1));
GM_registerMenuCommand('Enable Flicking Scrolling (Scroll Effect)', createEnableDisable('isenabled', 2));
createEnableDisable ('isenabled', GM_getValue('isenabled', 0))();

//
// The mouse position variables for using in canvas.
//
var ms = [0, 0];
var mp = [0, 0];

//
// Create the canvas.
//
var cvs = document.createElement('canvas');
cvs.style.position = 'fixed';
cvs.style.top = '0';
cvs.style.left = '0';
cvs.style.zIndex = '999999';
var cvsd = 0;

//
// This function draws a line into the canvas.
//
function drawCanvas() {

	//
	// Make sure the canvas context is available.
	//
	if (cvs.getContext && scEnabled == 1) {

		//
		// Minimum value and maximum value.
		//
		var mn = [ms[0] < mp[0] ? ms[0] : mp[0], ms[1] < mp[1] ? ms[1] : mp[1]];
		var mx = [ms[0] > mp[0] ? ms[0] : mp[0], ms[1] > mp[1] ? ms[1] : mp[1]];

		//
		// Width and height.
		//
		var wh = [mx[0] - mn[0], mx[1] - mn[1]];
		cvs.width  = wh[0] + 16;
		cvs.height = wh[1] + 16;

		//
		// Left and top.
		//
		cvs.style.left = (mn[0] - 8) + 'px';
		cvs.style.top  = (mn[1] - 8) + 'px';

		//
		// Get the context and draw the line.
		//
		var ctx = cvs.getContext('2d');
		ctx.clearRect (0, 0, window.innerWidth, window.innerHeight);
		ctx.strokeStyle = '#ff9900';
		ctx.lineWidth = 8;
		ctx.lineCap = 'round';
		ctx.beginPath ();
		ctx.moveTo (8 + ms[0] - mn[0], 8 + ms[1] - mn[1]);
		ctx.lineTo (8 + mp[0] - mn[0], 8 + mp[1] - mn[1]);
		ctx.stroke ();

		//
		// Append to document.
		//
		document.body.appendChild (cvs);
		cvsd = 1;

	}

}

//
// The scrolling function.
//
setInterval (function() {

	//
	// We need it to be enabled!
	//
	if (!scEnabled)
		return;

	//
	// OK. It's running. Do the scroll. But don't scroll when dragging.
	//
	if ((scSpeed > 0.5 || scSpeed < -0.5) && !scDragging) {
		scSpeed *= 0.96;
		var sc = Math.round(scSpeed);
		var os = window.scrollY;
		window.scrollBy (0, sc);
		var ns = window.scrollY;
		//
		// Edge detected. Bounce!
		//
		if (ns - os != sc) {
			scSpeed *= -1;
		}
	}

}, 20);

//
// On mousedown.
//
window.addEventListener ('mousedown', function(e) {

	//
	// Again, needed to be enabled.
	//
	if (!scEnabled)
		return;

	//
	// Get the element you click
	//
	var ct = e.target;

	//
	// If you click on the link, input, textarea, select, or button.
	// This doesn't apply when the page is scrolling.
	// Click once to stop current scrolling.
	//
	if (Math.abs(scSpeed) < 0.5) {
		if (!e.altKey)
			return;
		while (ct.nodeName != 'BODY' && ct.nodeName != 'HTML') {
			if (ct.nodeName == 'A' || ct.nodeName == 'INPUT' || ct.nodeName == 'TEXTAREA' || ct.nodeName == 'BUTTON' || ct.nodeName == 'SELECT')
				return;
			ct = ct.parentNode;
		}
	}

	//
	// We're dragging so don't scroll!
	//
	scDragging = 1;

	//
	// Reset speed.
	//
	scSpeed = 0;

	//
	// Set mouse variables.
	//
	mLastPosition = e.clientY;
	mPosition = e.clientY;
	mLastDragPosition = e.clientY;
	mOriginal = e.clientY;

	//
	// Prevent something normal to be happened.
	//
	e.preventDefault ();

	//
	// Canvas variable.
	//
	ms = [e.clientX, e.clientY];

}, false);

//
// Now, when mouse is moving.
//
window.addEventListener ('mousemove', function(e) {

	//
	// It must be enabled and you must be dragging!
	//
	if (!scEnabled)
		return;
	mPosition = e.clientY;
	if (!scDragging)
		return;

	//
	// Scroll effect.
	//
	if (scEnabled == 2)
		window.scrollBy (0, mPosition - mLastDragPosition);

	//
	// Set mouse variables.
	//
	mLastDragPosition = e.clientY;
	mPosition = e.clientY;

	//
	// Prevent something normal to be happened.
	//
	e.preventDefault ();

	//
	// Canvas variable.
	//
	mp = [e.clientX, e.clientY];

	//
	// Draw canvas.
	//
	drawCanvas ();

}, false);

//
// On mouse up, a.k.a. released.
//
window.addEventListener ('mouseup', function(e) {

	//
	// It must be enabled and you must be dragging!
	//
	if (!scEnabled)
		return;
	if (!scDragging)
		return;

	//
	// You released the mouse! You're not dragging anymore!!!
	//
	scDragging = 0;

	//
	// Calculate the speed.
	//
	var ps = (mPosition - mOriginal) / 292;
	scSpeed = (444 * ((ps < 0 ? -1 : 1) * Math.abs(Math.pow(ps, 2)))) * -0.79;

	//
	// Delete the canvas.
	//
	e.preventDefault ();
	try {
		if (cvsd) {
			document.body.removeChild (cvs);
			cvsd = 0;
		}
	} catch (e) {
	}

	//
	// From now on, let the things scroll.
	//

}, false);

})();