// ==UserScript==
// @name           Odnoklassniki.ru Klass All
// @description    Press klass for all posts
// @author         Godina Nicolae
// @include        http://odnoklassniki.ru/*
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==



jQuery(document).ready(function ($) {

	$('body').append("<button style='position:fixed; bottom: 15px; left: 25px; border: 5px #333 solid; z-index:9999;' id='klassbt'>KLASS ALL</button>");

	$("#klassbt").click(function(t) {
		var num = 0;
  		$('a[href*="internalLinksVoting"] span').each(function (obj) {
			$(this).click();
      			num += 1;
    		});
		alert('A fost pus klass la '+num+' posturi.');
	});
});