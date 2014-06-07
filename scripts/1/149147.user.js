// ==UserScript==
// @name           Show Link URL in Corner
// @namespace      SLUC
// @description    When hovering a link, some browsers fail to present information about the link.  This script displays the target href/URL in the bottom-left corner of the page, like Chrome and Firefox do.
// @include        *
// ==/UserScript==

// FIXED: Now works when hovering child/descendent of A, e.g. IMG or EM.
// TODO: Like Chrome's built-in popup, hide it when mouse is in that corner.
// BUG: Doesn't show "..." when URL is too long to fit.

var timer = null;
var targetElem = null;

var urlDisplayer = null;

function findRelevant(evt) {
	var elem = evt.target || evt.sourceElement;
	while (elem) {
		if (elem.tagName == 'A') {
			return elem;
		}
		elem = elem.parentNode;
	}
	return null;
}

function enteredElement(evt) {
	var elem = findRelevant(evt);
	if (elem) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(hoverDetected,30);
		targetElem = elem;
	}
}

function leftElement(evt) {
	var elem = evt.target || evt.sourceElement;
	if (elem) {
		if (timer) {
			clearTimeout(timer);
			timer = null;
			targetElem = null;
			hideDisplayer();
		}
	}
}

function hideDisplayer() {
	if (urlDisplayer) {
		urlDisplayer.style.display = 'none';
	}
}

function hoverDetected() {
	if (!urlDisplayer) {
		urlDisplayer = document.createElement('div');
		urlDisplayer.style.position = 'fixed';
		urlDisplayer.style.left = '-4px';
		urlDisplayer.style.bottom = '-4px';
		urlDisplayer.style.backgroundColor = '#E8E8E8';
		urlDisplayer.style.color = 'black';
		urlDisplayer.style.padding = '1px 3px 6px 5px';
		urlDisplayer.style.border = '1px solid #A0A0A0';
		urlDisplayer.style.fontSize = '12px';
		urlDisplayer.style.maxHeight = '15px';
		urlDisplayer.style.borderRadius = '4px';
		urlDisplayer.style._mozBorderRadius = '4px';
		urlDisplayer.style.zIndex = 100;
		document.body.appendChild(urlDisplayer);
	}
	urlDisplayer.textContent = targetElem.href;
	urlDisplayer.style.display = 'block';
}

document.body.addEventListener('mouseover',enteredElement,true);
document.body.addEventListener('mouseout',leftElement,true);

