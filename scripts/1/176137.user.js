// ==UserScript==
// @name douban_filter
// @namespace http://www.douban.com
// @include http://www.douban.com/people/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version 1.0
// ==/UserScript==

(function () {

  	var title = $('html head title').text();
	var user = title.replace( '的广播', '' ).trim();
	
	var html_body = '<a id="type_say" style="">'+ user + '的\"我说\"' +'</a>';

	$('.xbar div:first-child').prepend(html_body);

	var say = document.getElementById("type_say");
	say.addEventListener("click", function() {
		$(".status-item").css('display', 'block');
		$(".status-item p.text").each(function(index){
				if ( $(this).html().indexOf('说：') === -1 || $(this).parents('.status-item').html().indexOf('由'+user+'转播') !=-1){
					 $(this).parents('.status-item').slideToggle("fast");
				}
		});
	}, false);  

}())