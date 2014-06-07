// ==UserScript==
// @name           Detect jQuery
// @namespace      http://www.top-info.de/thein
// @description    Detect jQuery on every page
// @include        *
// ==/UserScript==

window.addEventListener('load', function() {
	if(unsafeWindow.jQuery) {
		var $j = unsafeWindow.jQuery;
		
		var $newimg = $j('<img src="http://www.top-info.de/thein/jquery.png" title="jQuery ' + $j().jquery + ' enabled page"/>').appendTo('body').css({
			"position" : "fixed",
			"top" : "0",
			"left" : "0",
			"border" : "1px solid #eeeeee",
			"border-radius" : "5px",
			"box-shadow" : "2px 2px 5px 2px black",
			"z-index" : "100000"
		}).click(function() {
			$j(this).remove();
		});
		
		var mytimeout = window.setTimeout(function() {
			$newimg.hide('slow');
		}, 4000);
		
		$newimg.hover(function() {
			if(mytimeout!=0) {
				window.clearTimeout(mytimeout);
				mytimeout=0;
			}
		}, function() {
			mytimeout = window.setTimeout(function() {
				$newimg.hide('slow');
			}, 2000);
		});
	}
}, false);