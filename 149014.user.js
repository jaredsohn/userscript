// ==UserScript==
// @name           AnyImageZoom
// @namespace      http://userscripts.org/scripts/show/149014
// @description    Enables to zoom any image on any website on mouse hover.
// @include        http://*
// @include        https://*
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {

/**
 * simpleimagehover - a plugin to show original image dimensions on hover
 * http://sarfraznawaz.wordpress.com/
 * Author: Sarfraz Ahmed (sarfraznawaz2005@gmail.com)
 */

(function ($) {

	$.fn.simpleimagehover = function (settings) {
		var opts = $.extend({}, $.fn.simpleimagehover.defaults, settings);

		return this.each(function (settings) {
			var $this = $(this), isrc = $this[0].src, ibox = null, options = null, $document = $(document);

			// make sure that element is really an image
			if (!$this.is('img')) return false;
			if (!isrc) return false;

			options = $.extend({}, opts, $(this).data());

			ibox = $('<img />')
				.attr('class', 'simpleimagehover__shidivbox__')
				.css({
					display           :'none',
					zIndex            :9999,
					MozBoxShadow      :'0 0 1em #000',
					WebkitBoxShadow   :'0 0 1em #000',
					boxShadow         :'0 0 1em #000',
					position          :'absolute',
					MozBorderRadius   :'10px',
					WebkitBorderRadius:'10px',
					borderRadius      :'10px',
					width             :options.width ? options.width : '',
					height            :options.height ? options.height : ''
				})
				.attr('src', isrc)
				.appendTo(document.body);

			$this.bind('mouseenter mousemove', function (e) {
				// hide any popup if open
				$('.simpleimagehover__shidivbox__').hide();

				var left = e.pageX + 5,
					top = e.pageY + 5,
					ww = window.innerWidth,
					wh = window.innerHeight,
					w = ibox.width(),
					h = ibox.height(),
					overflowedW = 0,
					overflowedH = 0;

				// calucation to show element avoiding scrollbars as much as possible
				if ((left + w + $document.scrollLeft()) > ww) {
					overflowedW = ww - (left + w + $document.scrollLeft());
					if (overflowedW < 0) {
						left -= Math.abs(overflowedW);
					}
				}

				// 25 is just a constant I picked arbitrarily to compensate pre-existing scrollbar if the page itself is too long
				left -= 25;
				left = left < $document.scrollLeft() ? $document.scrollLeft() : left;

				// if it's still overflowing because of the size, resize it
				if (left + w > ww) {
					overflowedW = left + w - ww;
					ibox.width(w - overflowedW - 25);
				}

				if (top + h > wh + $document.scrollTop()) {
					overflowedH = top + h - wh - $document.scrollTop();
					if (overflowedH > 0) {
						top -= overflowedH;
					}
				}

				top = top < $document.scrollTop() ? $document.scrollTop() : top;

				ibox.css({
					top :top,
					left:left
				});

				ibox.show();
			});

			$('.simpleimagehover__shidivbox__').mouseleave(function () {
				$('.simpleimagehover__shidivbox__').hide();
			});

			$document.click(function (e) {
				$('.simpleimagehover__shidivbox__').hide();
			});

			$document.mousemove(function (e) {
				if (e.target.nodeName.toLowerCase() === 'img') {
					return false;
				}

				$('.simpleimagehover__shidivbox__').hide();
			});

		});
	}

	$.fn.simpleimagehover.defaults = {
		width :0,
		height:0
	}

})(jQuery);

	
	// call the plugin now
	$('img').simpleimagehover();

});