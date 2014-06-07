// ==UserScript==
// @name        test123
// @author      
// @version     10.1.1
// @date        
// @description Remove ads, make the site responsive, spans video and thumbs for a better view, include download links
// @run-at      document-end
// @include     *xvideos.com/*
// @require     http://code.jquery.com/jquery.min.js
// ==/UserScript==
setTimeout(function() {
location.href = "javascript: try{enterSiteDisclamer()}catch(e){}; void(0);"
},1000);
// ==UserScript==
// @name        XVideos Enhanced
// @author      segaway
// @version     1.1.1
// @date        Aug 31, 2012
// @namespace   http://userscripts.org/users/483268
// @description Remove ads, make the site responsive, spans video and thumbs for a better view, include download links
// @run-at      document-end
// @include     *xvideos.com/*
// @require     http://code.jquery.com/jquery.min.js
// ==/UserScript==

(function () {
	var SITE_RESPONSIVE = true, /* true if you wanna avoid horizontal scrollbars */
		SITE_MAX_WIDTH = 1256,
		SITE_MIN_WIDTH = 250,
		THUMB_WIDTH = 185;

	var is_video = window.location.pathname.match(/^\/video*/) !== null;

	/* Remove ads */
	$('#video-ad').remove();
	$('#ads').remove();
	$('#ad-bottom').remove();

	/* Resizing page */
	$('#page').css('width', SITE_RESPONSIVE === true ? '100%' : SITE_MAX_WIDTH);
	//$('#page').css('max-width', SITE_MAX_WIDTH);
	$('#page').css('min-width', SITE_MIN_WIDTH);
	
	/* Color */
	$('.whiteStripe.clearfix').css('position', 'fixed');
	$('.whiteStripe.clearfix').css('background', 'none repeat scroll 0 0 black');
    $('.whiteStripe.clearfix').css('height', '36px');
    $('.whiteStripe.clearfix').css('top', '-8px');
    $('.whiteStripe.clearfix').css('width', '100%');
    $('.whiteStripe.clearfix').css('z-index', '10000');
	function color() {
	   $('a').css('color', 'white');
        $('.thumbBlock').css('color', 'white');
        $('.thumbBlock').css('background-color', 'black');
        $('body').css('background-color', 'black');
        $('.tabsContainer .tabs .tab').css('background-color', 'black');
        $('.tabsContainer .tab .tabHeaderForm').css('background-color', 'black');
        $('body').css('color', 'white');
        $('.thumbBlock').css('border-top', 'none');
        $('.thumbBlock').css('border-bottom', 'none');
    }
    color();
	if (is_video) {
		var regex, url;

		/* Resizing video */
		$('#player').css('width', '100%');
		$('#player embed').attr('width', '100%');

		/* Include download link */
		regex = /flv_url=(.*)&url/;
		url = unescape($('embed').attr('flashvars').match(regex)[1]);

		$('<a>')
			.css({
				'background': 'url("../img/xv-button-bg.png") repeat-x scroll left top #F7F7F7',
				'border': '1px solid #918E8C',
				'cursor': 'pointer',
				'font-size': '14px',
				'padding': '3px 10px',
				'float': 'left',
				'margin': '0 10px 0 0',
				'text-decoration': 'none'
			})
			.attr('href', url)
			.text('Download')
			.insertAfter('li[data-ref="tabEmbed"]');
	}

	$('.thumbBlock').css('width', THUMB_WIDTH);

	$(window).resize(function () {
		var w = $('#page').width();

		$('#player embed').attr('height', w * 0.5625);

		/* Updates padding to centralize thumbnails into mozaique */
		var padding = (w - (Math.floor(w / THUMB_WIDTH) * THUMB_WIDTH)) / 2;
		$('.mozaique, #relatedVideos').css('padding-left', Math.floor(padding));
	});
	$(window).trigger('resize');
	element = $('#categories');
    loading = false;
    if(element.offset()) {
        onscroll = function() {
            if(loading)
                return;
            if(element.offset().top - $(window).scrollTop() - $(window).height() * 2.5 < 0) {
                loading = true;
                url = $('.nP:contains(Next)')[0].href;
                $.get(url, function(data) {
                    a = $('.mozaique > *', $(data));
                    try{
                    data = data.replace(/<sc.ipt>.*?<\/sc.ipt>/g, $($('script', a)[0]).html().replace(/thumbcastDisplayRandomThumb\('([^']+)'\);/, '$1'));
                    a = $('.mozaique > *', $(data));
                    }catch(e){}
                    $('script', a).html('');
                    a.each(function(i, e) {
                        if(document.getElementById($('img', e)[0].id))
                            return;
                        var html = $(e).html();
                        $(e).html('');
                        e = $(e.outerHTML).appendTo('.mozaique');
                        e[0].style.width = '185px'
                        e.html(html);
                    });
                    $('#content > .pagination, .pagination.small').html($('.pagination', $(data)).html());
                    location.href = "javascript: try{xvideos.thumbsSlide.init()}catch(e){}; void(0);";
                    color();
                    loading = false;
                });
            }
        };
        onscroll();
    }
})();