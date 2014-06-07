// ==UserScript==
// @name           douban quickview
// @namespace      www.douban.com
// @include        http://www.douban.com/
// @include        http://www.douban.com/?*
// @author         viking
// ==/UserScript==

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://img3.douban.com/js/packed_jquery.min1.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();
// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        letsJQuery(unsafeWindow.jQuery);
    }
}

// All your GM code must be inside this function
function letsJQuery($) {
    $(function(){
	//filter out the classes contains album
	var holders = $(".timeline-album:not(:has('.album_s')),.timeline-album-rec:not(:has('.album_s'))");
	holders.bind('click',function(){
		var that = $(this);
		//fix style bug under firefox
		var desc = that.parent().find('.broadsmr').css('float','left');
		var innerimg  = that.find('img');
		var source = that.find('a').attr('href');
		var src = innerimg.attr('src');
		var patten = /icon/g;
		if(patten.test(src)){
			src = src.replace(/icon/g,'photo');
			innerimg.attr('src','http://filer.blogbus.com/1439958/resource_1439958_12984471734.gif');
			var imgr = new Image();
			imgr.src = src;
			$(imgr).load(function(){
				that.append('<div class="direct"><a href="'+source+'">Source Link</a></div>');
				var dlink = that.find('.direct');				
				innerimg.attr('src',src);
				that.css('position','relative');
				dlink.css({'position':'absolute','top':'5px','left':'5px','padding':'5px 5px',
				'background':'#fff','-moz-border-radius': '5px','opacity':'0.8'	
				});
				dlink.bind('click',function(e){
					e.stopPropagation();
				})
			})
		}else{
			src = src.replace(/photo\/photo/g,'photo/icon');
			innerimg.attr('src',src);
			that.find('.direct').remove();
		}

		return false;
	})
    });
}
