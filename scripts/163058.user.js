// ==UserScript==
// @name        Craigslist Image Viewer
// @namespace   http://jobson.us
// @include     http://*.craigslist.org/*
// @grant       GM_addStyle
// @version     2.0
// ==/UserScript==

var $ = unsafeWindow.$;

GM_addStyle('p.row { border-top: 1px solid silver; border-bottom: 1px solid silver; }');

$('p.r0').removeClass('r0');
$('p.r1').removeClass('r1');
$('blockquote.modebtns').remove();

$('p.row').each(function() {
	var href = $(this).find('a:first').attr('href');
	var hasPic = /pic/.test($(this).find('span.p').text());
	var that = this;
	$.ajax({
		url: href,
		context: that
	}).done(function(html) {
		var p = this;
		$(html).find('div#thumbs a').each(function() {
			var img = $('<img data-pid="'+ $(p).data('pid') +'" />');
			$(img).on('load',function() {

				if (this.width > this.height) {
					$(this).attr('width','150');
				} else {
					$(this).attr('height','150');
				}

				$('p[data-pid="'+ $(this).data('pid') +'"]').append($(this));
				$('p[data-pid="'+ $(this).data('pid') +'"]').append('&nbsp;');

			});
			
			$(img).attr('src',$(this).attr('href'));
		});
	});
});