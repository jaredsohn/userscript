// ==UserScript==
// @name        Parachat full window
// @namespace   https://userscripts.org/scripts/show/162621
// @include     http*//chat.parachat.com*
// @version     1.03
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @updateURL   https://userscripts.org/scripts/source/162621.meta.js
// @downloadURL https://userscripts.org/scripts/source/162621.user.js
// @homepageURL https://userscripts.org/scripts/show/162621
// ==/UserScript==

$(document).ready(function(){

	$('div#paraDivBottomAd').remove();
	$('iframe[src^="http://www.webpage.com/c/index.html"]').remove();
	$('div#paraDivBottomLinks').remove();
	$('title').text('Parachat');
	
	var i = setInterval(function(){setSize(true)}, 1000); 
	
	$(window).resize(function(){setSize(false)});

	function setSize(initial){
		$('applet')
			.attr('height', $(window).height() - 15)
			.attr('width', $(window).width() - 15);
			
		if ((initial) && ($('applet').length > 0)){
			$('applet').prepend('<param name="ui.UsersWidth" value="80">');
			$('iframe[src^="https://www.parachat.com/faq/javajs"]').remove();
			$('div#_atssh').remove();
			window.clearInterval(i);
		}
	}

});