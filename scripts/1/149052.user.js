// ==UserScript==
// @name        Short Labels
// @namespace   http://fluidapp.com
// @description Shortens Gmail hierarchical labels to the last part of the path
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @author      Scott Whittaker, Billy Gallagher
// ==/UserScript==

(function () {
	function shorten_labels() {
		// make sure we are targeting the canvas frame
		//var canvas = document.getElementById('canvas_frame').contentDocument;
		// get the labels
		var labels = document.getElementsByClassName('av');
		for (var i in labels) {
			if (!(!isNaN(parseFloat(i)) && isFinite(i)))
				continue;
			var label = labels[i];
			var shortLabel = label.innerHTML.split('/').pop();
			label.innerHTML = shortLabel;
		}
	}

	window.setInterval(shorten_labels, 5000);
})();