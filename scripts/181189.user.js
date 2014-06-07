// ==UserScript==
// @name        vineyarddailyreflections
// @namespace   http://www.studiocasey.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include     http://vineyarddailyreflections.wordpress.com/*
// @version     1.0
// @grant       none
// @copyright   2013, David Casey
// ==/UserScript==

(function($){

	$('body, .container, #footer-wrap, #top div.main-nav, caption, th, .postmetadata').css({'background':'none #fff'});
	$('h2, h3, p, #masthead h4 a, #masthead span.description, #top div.main-nav a, #sidebar ul li a, ul.txt li, caption, th').css({'color':'#333'});

})(jQuery);
