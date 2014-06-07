// ==UserScript==
// @name           Reddit Continuity Lines Scrolling
// @version        1.0
// @namespace      Reddit
// @description    Allows you to scroll to the next thread by clicking on a continuity line
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

/*
 * Using:
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
*/

(function() {
	if(typeof unsafeWindow.$ !== undefined) {
		$ = unsafeWindow.$;
		jQuery = unsafeWindow.jQuery;
		//Color Animations Plugin
		(function(e){e.each(["backgroundColor"],function(b,c){e.fx.step[c]=function(d){if(!d.colorInit){d.start=f(d.elem,c);d.end=a(d.end);d.colorInit=true}d.elem.style[c]="rgb("+[Math.max(Math.min(parseInt((d.pos*(d.end[0]-d.start[0]))+d.start[0]),255),0),Math.max(Math.min(parseInt((d.pos*(d.end[1]-d.start[1]))+d.start[1]),255),0),Math.max(Math.min(parseInt((d.pos*(d.end[2]-d.start[2]))+d.start[2]),255),0)].join(",")+")"}});function a(b){var c;if(b&&b.constructor==Array&&b.length==3){return b}if(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)){return[parseInt(c[1]),parseInt(c[2]),parseInt(c[3])]}if(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)){return[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55]}if(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)){return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)]}}function f(b,d){var c;do{c=e.curCSS(b,d);if(c!=""&&c!="transparent"||e.nodeName(b,"body")){break}d="backgroundColor"}while(b=b.parentNode);return a(c)}})(jQuery);
		(function() {
			var lines = $(".listing");
			var over = function(evt) {
				if(evt.clientX - $(this).offset().left < 3)
					this.style.cursor = "pointer";
				else {
					this.style.cursor = "default"; }
			};
			lines.mousemove(over);
			lines.mouseenter(over);
			lines.mouseout(function(evt) {
				this.style.cursor = "default";
			});
			lines.click(function(evt) {
				if(evt.clientX - $(this).offset().left < 3) {
					var $next = $(this).parent().parent().next().next();
					if(typeof $next[0] == "undefined") return;
					$('html, body').animate({scrollTop:$next.offset().top - 50}, 'slow');
					$next.animate({backgroundColor: "#FFFED4"}, 1000, function() {
						$next.animate({backgroundColor: "#FFFFFF"}, 500);
					});
				}
			});
		})();
	}
})();