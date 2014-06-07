// ==UserScript==
// @name        PornTube Enhanced
// @author      segaway
// @version     1.0.5
// @date        Dec 15, 2012
// @description Remove ads, spans video and thumbs for a better view, include download links
// @run-at	    document-end
// @include	    *porntube.com*
// @require	    https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

(function () {

	var ads, player, link, li,
		is_video = window.location.pathname.match(/^\/video*/) !== null;

	/* Remove ads */
	ads = [
		'#at20mc', '.banner-left', '#chatWindow', '#ad_video_abovePlayer',
		'.pict-area', '#adx_ad', '#publisherBanner', '#ad_popup', '#ad_im',
		'#taskbar', '#closeChatArea', '#closeArea', '#at20mc', '#adx_ad',
		'#ad_video_belowPlayer', '#ad_container', '#ad-container',
		'#ad_video_watchHD', '.advertisement', '#FFN_Banner_Holder',
		'div.title-box+div.videos-area', 'div.relax+div.title-box'];

	$(ads).each(function () { $(this + '').remove(); } );
	$('#footer').css({ 'background-position': '0 -280px' });


	if (is_video) {
		/* Resizing page */
		$('.video-top').css('width', '100%');
		$('.video-top-l').css('width', '100%');
		player = $('embed[name=mpl]');
		player.width('100%');
		player.height(player.width() * 0.5625); /* hd */

		$('.details-top').css({background: 'none', width: '100%'});
		$('.details-bt').css({background: 'none', width: '100%'});


		/* Add download button */
		link = decodeURIComponent($(player).attr('flashvars')).match(/file=(.*)/)[1];
		li = $('li.last').removeClass('last');
		$('<li class="last">').append(
			$('<a>')
				.html('Download this video')
				.attr('href', link)
		).insertAfter(li);
	}
}());