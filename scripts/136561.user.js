// ==UserScript==
// @name          Auto Expander 
// @description   Expands visible  comments
// @include       http://*.livejournal.com/*.html
// @include       http://*.livejournal.com/*.html?page=*
// @include       http://*.livejournal.com/*.html#comments
// @exclude       http://*__rpc_lj_times_string*
// @namespace     Herwin Ariwin
// ==/UserScript==

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

function isVisible(elem) {

	var coords = getCoords(elem);
	var windowTop = window.pageYOffset || document.documentElement.scrollTop;
	var windowBottom = windowTop + document.documentElement.clientHeight;
	coords.bottom = coords.top + elem.offsetHeight;
	var topVisible = coords.top > windowTop && coords.top < windowBottom;
	var bottomVisible = coords.bottom < windowBottom && coords.bottom > windowTop;
	return topVisible || bottomVisible;
}

function showVisible() {
	var EXPAND_CONTAINER_SELECTORS = '.b-leaf-actions-item.b-leaf-actions-expand > a, .b-leaf-seemore-expand > a, .comment-wrap.partial > span[id] > a, span.ljuser ~ span > a';
	var commentboxes = document.querySelectorAll(EXPAND_CONTAINER_SELECTORS);
	for(var i=0; i<commentboxes.length; i++) {
		var cmntbx = commentboxes[i];
		if (isVisible(cmntbx)) {
			cmntbx.click();
		}
	}
}

showVisible();
window.onscroll = showVisible;