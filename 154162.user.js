// ==UserScript==
// @name           SE Review Count
// @namespace      stackoverflow
// @author         Michael Mrozek (http://stackoverflow.com/users/309308)
// @include        http://stackoverflow.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://*.stackexchange.com/*
// @include        http://mathoverflow.net/*
// @include        http://area51.stackexchange.com/*
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	base_url = location.href.substring(0, location.href.indexOf("/", 7));
	$.get(base_url + "/review", function(review_data) {
		review = $(review_data);
		cnt = 0;

		// Check each review queue to see if it has items
		$('.dashboard-num', review).each(function() {
			// Make sure we actually have access to this queue
			if($('.dashboard-title a', $(this).parents('.dashboard-item')).length > 0) {
				cnt += parseInt($(this).attr('title'), 10);
			}
		});

		// Show an indicator if there are reviews pending
		if(cnt > 0) {
			indicator = $('<span class="mod-flag-indicator" style="background-color: #aaaaaa !important; color: #ffffff !important;" />').text(cnt);
			link = $('<a href="/review/">').append(indicator);
			$('#hlinks #hlinks-nav').prepend(link).prepend('<span class="lsep">|</span>');
		}
	});
});
