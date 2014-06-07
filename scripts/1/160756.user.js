// ==UserScript==
// @name        9GAG Next & Previous Buttons
// @namespace   ducu
// @include     http://9gag.com/hot*
// @include     http://9gag.com/trending*
// @include     http://9gag.com/vote*
// @version     1
// ==/UserScript==

{
	// checks if object is function
	var isFunction = function(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	// fast clone
	var fastClone = function(obj) {
		var newObj = {};
		for (var i in obj) {
			newObj[i] = obj[i]
		}
		return newObj;
	}; 
	
	// copies css from one element to the other
	// properties names are retrieved via getComputedStyle()
	// properties values via MooTools
	var copyCSS  = function(idApplyTo, idFrom, ignore) {
		
		var mtS = $(idFrom);
		var mtT = $(idApplyTo);
		var s = document.getElementById(idFrom);
		var t = document.getElementById(idApplyTo);
		var cStyles = document.defaultView.getComputedStyle(s, "");
        for(var i=0;i<cStyles.length;++i) {
			var prop = cStyles[i];
			if( prop && !isFunction(prop) && ignore.indexOf(prop)==-1) {
				var v = mtS.getStyle(prop);
				if(v) {
					mtT.setStyle(prop, v);
				}
			}
		}
	};
	
	// width, margin, right
	var W = 50, M = 35, R = 100;
	
	var stylesBase = {position: 'fixes', width: W, bottom: -2,
	'-webkit-user-select': 'none', '-moz-user-select': 'none', 'user-select' : 'none'};
	var nextStyles = fastClone(stylesBase);
	nextStyles.right = R;
	var prevStyles = fastClone(stylesBase);
	prevStyles.right = R + W + M;
	
	// flags for jumps
	var JN = "JUMP_NEXT";
	var JP = "JUMP_PREV";
	
	// actual jump with some navigation corrections
	var doJump = function(direction) {
		if(direction == JP) {
			window.scrollBy(0,-1);
		} else if (direction == JN) {
			window.scrollBy(0,1);
		}
		GAG.Keyboard.jump(direction);
	}
	
	// create elements
	var next = new Element('a',{
	 id: 'next-please',
	 html:'<strong>Next</strong><span></span>',
	 class: 'WhiteButton',
	 events: {
		click: function() { doJump(JN); }
	 }
	});
	var previous = new Element('a', {
	 id:'previous-please',
	 html:'<strong>Previous</strong><span></span>',
	 class: 'WhiteButton',
	 events: {
		click: function() { doJump(JP); }
	 }
	});
	// add the buttons to container
	$('footer-back-to-top').getParent().adopt([next, previous]);
	
	// even though i remove it with stylish...
	$('jsid-sidebar-footer').setStyle('bottom', 60);
	
	// copy style from footer back to top button; keep look and feel
	var ignore = ['width', 'height', 'top', 'left', 'right', 'bottom', '-moz-user-select', '-webkit-user-select', 'user-select'];
	next.setStyles(nextStyles);
	previous.setStyles(prevStyles);
	copyCSS('next-please','footer-back-to-top', ignore);
	copyCSS('previous-please','footer-back-to-top', ignore);
};