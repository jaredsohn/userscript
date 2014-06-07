// ==UserScript==
// @name		Pardus Toolbar Minimizer
// @version		v3
// @namespace	marnick.leau@skynet.be
// @description	Semi-hides the toolbars to create some vertical screen real estate.
// @icon		http://i1135.photobucket.com/albums/m626/TheRealFaziri/Pardus/Scripts/Icon.png
// @include		http*://*.pardus.at/game.php
// @include		http*://*.pardus.at/msgframe.php
// @grant		GM_addStyle
// ==/UserScript==

var minimenu = 6;	// menu bar height in px
var minimsg = 15;	// message bar height in px
var buffer = 50;	// time in ms cursor must stay on either bar to make them larger (prevents twitching but makes less snappy)

if (location.href.indexOf("/msgframe.php") === -1) {
	var frameset = document.getElementsByTagName('frameset')[0];
	var heights = {
		maxmax:frameset.getAttribute('rows').split(',')
	}
	for (var i = 0;i < 2;i++) {
		heights.maxmax[i] = parseInt(heights.maxmax[i]);
	}

	function setheights(h) {
		frameset.setAttribute('rows',h.join(','));
	}

	heights.minmin = [minimenu,minimsg,heights.maxmax[2]];
	// heights.maxmin = [heights.maxmax[0],minimsg,heights.maxmax[2]];
	// heights.minmax = [minimenu,heights.maxmax[0],heights.maxmax[2]];

	var mouseonbar = [0,0];
	function minimize(bar) {
		mouseonbar[bar] = 0;
		void setTimeout(function() {
			if (mouseonbar[0] + mouseonbar[1] === 0) {
				setheights(heights.minmin);
			}
		},1);
	}

	function maximize(bar) {
		mouseonbar[bar] = 1;
		void setTimeout(function() {
			if (mouseonbar[0] + mouseonbar[1] !== 0) {
				setheights(heights.maxmax);
			}
		},buffer);
	}

	minimize(0);

	document.getElementById('menu').addEventListener('mouseover',function(event) {
		maximize(0);
	},false);

	document.getElementById('menu').addEventListener('mouseout',function(event) {
		minimize(0);
	},false);

	document.getElementById('msgframe').addEventListener('mouseover',function(event) {
		maximize(1);
	},false);

	document.getElementById('msgframe').addEventListener('mouseout',function(event) {
		minimize(1);
	},false);
} else {
	GM_addStyle("html body table tbody tr td {vertical-align: top;} html body table tbody tr td * {margin-top: 2px;}");
}