// ==UserScript==
// @name       AO3 Incomplete Work Script
// @namespace  http://random.fangirling.net/fun/ao3/
// @version    1.2
// @description  Makes it more obvious when works are incomplete.
// @match      http://*.archiveofourown.org/*
// @copyright  2012+, Flamebyrd
// ==/UserScript==
(function($) {
	$('.work.blurb .text:contains(Work in Progress)').parents('li.work').css({ 'opacity': 0.5 }); 
	alert_css = {'color': '#900', 'font-size': '140%'};
	if ($('.work.meta.group').length) {
		chapters = $('.work.meta dl.stats > dt:contains(Chapters) + dd').text();
		if ( chapters.indexOf('?') > -1 )  {
			$('dl.stats').css(alert_css);
		}
		else {
			chapters_match = /(\d*)\/(\d*)/.exec(chapters);
			if ( chapters_match && Number(chapters_match[1]) < Number(chapters_match[2]) ) {
				$('dl.stats').css(alert_css);   
			}
		}
	}
})(unsafeWindow.jQuery);