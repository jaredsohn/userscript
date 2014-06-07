// ==UserScript==
// @name        Youjizz Enhanced
// @author      segaway
// @version     1.0.3
// @date        Oct 23, 2012
// @description Include download links, remove ads, make the site responsive and spans video for a better view
// @run-at      document-end
// @include     *youjizz.com/*
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(function () {
	var ads, player_iframe, player_container, link,
		is_video = window.location.pathname.match(/^\/video*/) !== null;

	/* Remove ads */
	ads = [
		'div[id=fotter] > div.contener',
		'#video_text > div.row',
		'#wrap > h2',
		'#wrap > table',
		'#links',
		'#baner_top',
		'.advertisement',
		'#menu li:nth-child(n+5)'
	];
	$(ads).each(function () { $(this + '').remove(); } );
	$('#right-ad').parent().remove();
	$('#search').css('margin-top', 0);

	if (is_video) {
		player_container = $('#main td > div.contener');
		player_iframe = $('iframe[width=704]');

		/* resizing video and content... */
		player_container.css({
			width: 'auto',
			padding: '0px 10%'
		});
		player_iframe.css('margin-bottom', '30px');

		$(window).resize(function () {
			player_iframe.attr('width', player_container.width());
			player_iframe.attr('height', player_container.width() * 0.5625); /* 16:9 */
		}).trigger('resize');

		/* including download button */
		player_iframe.load(function () {
			link = player_iframe.contents().find('#xmoov-flv-player_va embed').attr('flashvars').match(/file=(.*)/)[1];
			link = decodeURIComponent(link);
			$('<a href="' + link + '">').html($('<button>').text('Download')).insertAfter('.video-actions > input');
    	});
	}
});
