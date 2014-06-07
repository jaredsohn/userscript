	// ==UserScript==
	// @name Follow me !
	// @namespace 
	// @description hover over linkslinks for 1.5 seconds to open in a new tab
	// @include http://*
	// ==/UserScript==

	var _clickTarget = null;
	var _autoClickTimeoutID = null;

	function mouseover(event) {
		_clickTarget = event.currentTarget;
		_autoclickTimeoutID = window.setTimeout(autoclick, 1500);
	}

	function mouseout(event) {
		_clickTarget = null;
		if (_autoclickTimeoutID) {
			window.clearTimeout(_autoclickTimeoutID);
		}
	}

	function clear(elmLink) {
		if (!elmLink) { return; }
		elmLink.removeEventListener('mouseover', mouseover, true);
		elmLink.removeEventListener('mouseout', mouseout, true);
		elmLink.removeEventListener('click', click, true);
	}

	function click(event) {
		var elmLink = event.currentTarget;
		if (!elmLink) { return false; }
		clear(elmLink);
		mouseout(event);
	}

	function autoclick() {
		if (!_clickTarget) { return; }

		GM_openInTab(_clickTarget.href);
		clear(_clickTarget);
	}

	for (var i = document.linkslinks.length - 1; i >= 0; i--) {
		var elmLink = document.links[i];
		if (elmLink.href && elmLink.href.indexOf('javascript:') == -1) {
			elmLink.addEventListener('mouseover', mouseover, true);
			elmLink.addEventListener('mouseout', mouseout, true);
			elmLink.addEventListener('click', click, true);
		}
	}
