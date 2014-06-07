// ==UserScript==
// @name           Bring Back The Status Bar
// @namespace      BBTSB
// @description    Miss being able to see the good old window.status?  This userscript will pop up the status in the corner of the page.
// @include        *
// ==/UserScript==

// Firefox: To allow scripts change the the status bar text, the user must set the dom.disable_window_status_change preference to false in the about:config screen.

// TODO: Hide it when mouse is in that corner.
// TODO: Show "..." when text is too long to fit.

var autoCloseMs = 8000;
var checkMs = 1000;

var lastStatus = null;
var statusDisplayer = null;
var hideTimer = null;

function startNextTimer() {
	setTimeout(checkStatus,checkMs);
}

function checkStatus() {
	if (window.status != lastStatus) {
		lastStatus = window.status;
		setStatusDisplayer(window.status);
	}
	startNextTimer();
}

function hideDisplayer() {
	if (statusDisplayer) {
		statusDisplayer.style.display = 'none';
	}
}

function setStatusDisplayer(msg) {
	if (!statusDisplayer) {
		statusDisplayer = document.createElement('div');
		statusDisplayer.style.position = 'fixed';
		statusDisplayer.style.right = '-4px';
		statusDisplayer.style.textAlign = 'right';   // Just to match with element's page alignment
		statusDisplayer.style.bottom = '-4px';
		statusDisplayer.style.backgroundColor = '#ffff88';
		statusDisplayer.style.color = 'black';
		statusDisplayer.style.padding = '3px 7px 8px 5px';
		statusDisplayer.style.border = '1px solid #A0A000';
		statusDisplayer.style.fontSize = '12px';
		// statusDisplayer.style.maxHeight = '15px';
		statusDisplayer.style.borderRadius = '4px';
		statusDisplayer.style._mozBorderRadius = '4px';
		statusDisplayer.style.zIndex = 100;
		document.body.appendChild(statusDisplayer);
	}
	statusDisplayer.textContent = msg;
	statusDisplayer.style.display = 'block';
	if (autoCloseMs > 0) {
		if (hideTimer) {
			clearTimeout(hideTimer);
		}
		hideTimer = setTimeout(hideDisplayer, autoCloseMs);
	}
}

startNextTimer();

