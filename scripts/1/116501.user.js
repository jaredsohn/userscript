// ==UserScript==
// @name           Flash Scroll Page Stopper
// @namespace      http://userscripts.org/user/AlmightyJu
// @description    Stops the browser scrolling the page when on flash objects
// ==/UserScript==
//credit should go to http://www.nbilyk.com/flash-prevent-browser-scroll !

function isOverSwf(mEvent)
{
	var elem;
	if (mEvent.srcElement) {
		elem = mEvent.srcElement;
	} else if (mEvent.target) {
		elem = mEvent.target;
	}
	if (elem.nodeName.toLowerCase() == "object" || elem.nodeName.toLowerCase() == "embed") {
			if (elem.getAttribute("classid") == "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000") {
				return true;
			}
			if (elem.getAttribute("type") == "application/x-shockwave-flash") {
				return true;
			}
	}
	return false;
}

function onMouseWheel(event)
{
	if (!event)
		event = window.event;

	if (isOverSwf(event)) {
		return cancelEvent(event);
	}

	return true;
}

function cancelEvent(e)
{
	e = e ? e : window.event;
	if (e.stopPropagation)
		e.stopPropagation();
	if (e.preventDefault)
		e.preventDefault();
	e.cancelBubble = true;
	e.cancel = true;
	e.returnValue = false;
	return false;
}
if (window.addEventListener) window.addEventListener('DOMMouseScroll', onMouseWheel, false);
window.onmousewheel = document.onmousewheel = onMouseWheel;