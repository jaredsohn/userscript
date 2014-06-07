// ==UserScript==
// @name           Facepunch - Thread Ratings
// @namespace      http://www.facepunch.com/
// @include        *facepunch.com/forums/*
// @include        *facepunch.com/forumdisplay.php*
// ==/UserScript==
if (!/(chrome)[ \/]([\w.]+)/ig.test(navigator.userAgent)) {
    ChromeKludge(unsafeWindow.jQuery);
}
else {
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludge + ')(jQuery);'));
    document.head.appendChild(script);
}
function ChromeKludge($) {
	$('tr.threadbit').each(function() {
		$("<a></a>").click(function() {
			var threadid = $(this).attr('id').replace('rate_thread_', '');
			var this2 = this;
			$.get('/threads/'+threadid, {}, function(d) {
				var q = $("<div></div>").css({visibility:'hidden',width:1,height:1,overflow:'scroll',position:'absolute'}).appendTo(document.body);
				var firstpost = d.substr(d.search(/id\=\"post\_/), 17).substr(9);
				
				$.get('/ajax.php?do=rate_list', {postid:firstpost}, function(r) {
					$(q).html(r.list);
					var num = $(q).find('.ratingsbox:first strong:first').text();
					var img = $(q).find('.ratingsbox:first img').attr('src');
					var alt = $(q).find('.ratingsbox:first img').attr('alt');
					$(q).remove();
					$(this2).replaceWith( img == undefined ? $("<span></span") : $("<span></span>").html('<img src="'+img+'" alt="'+alt+'" /> x <strong>'+num+'</strong>'));
				})
			})
		}).text('(click)').attr('id', 'rate_'+$(this).attr('id')).appendTo($(this).find('.threadratings')[0]);
	});
}