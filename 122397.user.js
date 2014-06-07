// ==UserScript==
// @name           Kwejk.pl ∞ Scroller
// @description    Rawr! Allows you to scroll kwejk down and down... neverending!
// @author         Informatic
// @email          admin[@]tastycode.pl
// @namespace      kwejk.userscripts@tastycode.pl
// @include        http://kwejk.pl/*
// @include        http://www.kwejk.pl/*
// ==/UserScript==


function init_kwejkscroller() {
	var scroller_loading = false;
	$(window).scroll(function() {
		if($("body").scrollTop() > $("body").height()-$(window).height()-4000)
		{
			if(!scroller_loading)
			{
				$.get($("div.pagination .current").next().attr("href"), function(data) {
					$(data).find('.obrazki').children().appendTo($('.obrazki'));
					scroller_loading = false;
					$("div.pagination").replaceWith($(data).find('div.pagination'));
				});
				scroller_loading = true;
			}
		}
		//$("div.pagination .current").next().attr("href")
	});
}


/* This hack to support Google Chrome is as dirty as
 * http://soundcloud.com/plast-c-youth/plast-c-youth-underground-3 ... ;)
 * It's even working on Firefox 4.0 - it will stay like this.
 */
var script = document.createElement("script");
script.setAttribute('type', 'text/javascript');
script.innerHTML = init_kwejkscroller.toString()+"\ninit_kwejkscroller()";
document.getElementsByTagName('head')[0].appendChild(script);
