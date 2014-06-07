// ==UserScript==
// @name      京东团签到
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://tuan.jd.com/*
// @copyright  2012+, You
// ==/UserScript==

jQuery('body').delegate('p.scode>input','focus',function(){
		var $=jQuery;
		var $gimg=$('.goods>img'),
		gsrc=$gimg.attr('src');
		var imgs = $('.p-img');
		$.each(imgs, function (i, e) {
			var $e = $(e),
			img = $e.find('img'),
			$p = $e.next().next(),
			p = $p.find('.size'),
			price = p.text();
			src=img.data('lazyload');
			if(gsrc && gsrc==src){
				$('.jbox-content .field>input').val(price);
				$('.scode>input').focus();
			}
			})
		});