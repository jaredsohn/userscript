// ==UserScript==
// @name           GizGallery
// @description    Finally a fancy gallery for gizmodo.de
// @namespace      gizmodo
// @include        http://www.gizmodo.de/*
// @run-at         document-end
// @version        2.0.0
// ==/UserScript==

(function () {
	var process = function ($) {

		var pages = $(".ngg-navigation a.page-numbers");


		if (pages.length > 0) {

			$('.ngg-navigation, .page-link').remove();

			for (i = 0; i < pages.length; ++i) {
				$.ajax({
					type: "GET",
					async: false,
					url: $(pages[i]).attr('href'),
					success: function (data) {
						var boxes = $(data).find('.ngg-galleryoverview > div.ngg-gallery-thumbnail-box, .ngg-galleryoverview > br');
						$('.ngg-galleryoverview').append(boxes);
					}
				});
			}
		}


		var link = $('.page-link a[href$="/2"]');
		link.text("Alle Bilder anzeigen").css({ wordSpacing: 0, fontWeight: 'bold', border: 'solid 1px #c0c0c0', borderRadius: '3px' });

		$('a > img.size-full').each(function () {
			var img = $(this);
			img.parent().attr('href', img.attr('src')).attr("rel", "fancybox");
		});


		$('a > img.size-thumbnail, a > img.size-medium').each(function () {
			var img = $(this);
			img.parent().attr('href', img.attr('src').replace(/-\d+x\d+\./, '.')).attr("rel", "fancybox");
		});


		$('p > img.size-thumbnail, p > img.alignleft').each(function () {
			var img = $(this);
			img.wrap("<a />");
			img.closest('a').attr('href', img.attr('src').replace(/-\d+x\d+\./, '.')).attr("rel", "fancybox");
		});


		var thumbs = $('.ngg-gallery-thumbnail a img');


		thumbs.each(function () {
			var img = $(this);
			img.closest('a').attr('href', img.attr('src').replace('thumbs/thumbs_', '')).attr("rel", "fancybox");
		});

		$("a:has(img.aligncenter.size-medium),a[href$='.png']:has(img.alignleft.size-thumbnail),a[href$='.jpg']:has(img.alignleft.size-thumbnail)").attr("rel", 

"fancybox");
		$("a[rel=fancybox]").fancybox({
			cyclic: true
		});

	};


	var head = document.getElementsByTagName('head')[0];

	var css = document.createElement('link');
	css.href = '//yandex.st/jquery/fancybox/1.3.4/jquery.fancybox.css';
	css.type = 'text/css';
	css.rel = 'stylesheet';
	head.appendChild(css);

	var jq = document.createElement('script');
	jq.src = '//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js';
	jq.type = 'text/javascript';
	jq.async = 'true';
	jq.onload = jq.onreadystatechange = function() {
		var rs = this.readyState;
		if (rs && rs != 'complete' && rs != 'loaded') return;

		var jQuery = unsafeWindow['jQuery'];
		var $ = jQuery;

		var script = document.createElement('script');
		script.src = '//yandex.st/jquery/fancybox/1.3.4/jquery.fancybox.min.js';
		script.type = 'text/javascript';
		script.async = 'true';
		script.onload = jq.onreadystatechange = function() {
			var rs = this.readyState;
			if (rs && rs != 'complete' && rs != 'loaded') return;

			process($);
		};
		var s2 = document.getElementsByTagName('script')[0];
		s2.parentNode.insertBefore(script, s2);
    	};
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(jq, s);

})();