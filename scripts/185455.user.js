// ==UserScript==
// @name        virtex_joke
// @namespace   weirdly.net
// @description A practical joke on the cavirtex page
// @include     cavirtext.com
// @include	/.*cavirtex.*/
// @version     1
// @grant       none
// ==/UserScript==
$(document).ready(function(){
	$('div,span,p,img,a').each(function(){
		$(this).data('ang', 0);
		var me = $(this);
		
		var f = function(){
			var ai = me.data('angi')
			//$('#debug').append(me.data('ang') + ', ');
			var ang = 1.0 * me.data('ang') + ai;
			me.data('ang', ang);
			me.css('transform', 'rotate(' + ang + 'rad)');
		}
		me.data('angi', Math.random() * 0.0004 - 0.0002);
		var f2 = function(){f();};
		setInterval(f2, 100);
	});
});

