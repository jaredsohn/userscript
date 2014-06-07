// ==UserScript==
// @name        endhome
// @namespace   http://hextomino.net/
// @description scroll to top or bottom of the page when double click.
// @author      NAGATA Hiroaki
// @include     http://*
// @include     https://*
// ==/UserScript==


(function() {
	var scrollPos;          // Current scroll position
	var mousePos;           // Position of mouse cursor when double clicked
	
	var scrollDiv = 40;     // Divide num of scroll
	var scrollSpeed = 0.6;  // Scroll speed
	var prevScroll;         // Previous scroll position
	var prevScrollType;     // Previous scroll type
	var finishFlag = false; // Is immediately after scroll
	
	var to = 0;
	
	///// When double clicked
	document.body.addEventListener('dblclick', function(evt) {
		///// Get scroll position
		scrollPos =
			document.body.scrollTop ||
			document.documentElement.scrollTop;
		
		///// Get position of mouse cursor
		if(evt) mousePos = evt.pageY - scrollPos;
		else    mousePos = event.y;
		
		///// Check cursor position
		var whichHalf = mousePos < (innerHeight / 2) ? 'upper' : 'lower';
		
		///// Rewind scroll
		///// 1. is immediatery after scroll
		///// 2. Double clicked area is same with previous
		if(finishFlag &&
			((whichHalf == 'upper' && prevScrollType == 'home') ||
			(whichHalf == 'lower' && prevScrollType == 'end'))) {
			to = prevScroll;
			finishFlag = false;
		}
		///// First scroll, or imediately after rewind scroll
		else {
			prevScroll = scrollPos;
			
			if(whichHalf == 'upper') {
				to = 0;
				prevScrollType = 'home';
			}
			else {
				var height =
					document.body.scrollHeight ||
					document.documentElement.scrollHeight;
				to = height - innerHeight;
				prevScrollType = 'end';
			}
			
			finishFlag = true;
		}
		
		easyScroll(to);
		
		return false;
	}, false);
	
	document.body.addEventListener('DOMMouseScroll', function() {
		finishFlag = false;
	}, false);
	
	///// Scroll with easing
	function easyScroll(to) {
		for(var i = 0; i <= scrollDiv; i++) {
			var ratio = i / scrollDiv;
			var go =
				scrollPos - (scrollPos - to) *
				Math.sin(ratio * Math.PI / 2);
			setTimeout('window.scrollTo(0, ' + go + ')', i * 5);
		}
		
		return false;
	}
	
	return false;
})();
