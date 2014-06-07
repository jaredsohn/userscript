// ==UserScript==
// @name           Weibo Upload to Imgur
// @namespace      http://japanfan48.blogspot.com/
// @version        0.01
// @description    Upload pics in a post to Imgur
// @match          http://www.weibo.com/u/*
// @copyright      CYB
// @run-at         document-end
// ==/UserScript==

(function () {

    function inject(str) {
        var jq = document.createElement("script");
        jq.setAttribute('src', 'http://code.jquery.com/jquery.min.js');
        document.body.appendChild(jq);
		
        var lastNode = document.body.childNodes[document.body.childNodes.length - 1];
		lastNode.addEventListener('load', function(){
			var elem = document.createElement("script");
        	elem.textContent = '(function(){(' + str + '());}());';
        	document.body.appendChild(elem);
		}, false);
    }

    function script() {
        (function timer() {
            var $this = $('.WB_feed_type');
            
            $this.each(function (){
                if (!$(this).data('wb-up-button')){
                    var links = [];
                    
                    $(this).find('ul.WB_media_list.clearfix').find('img.bigcursor').each(function(){
                        var path = $(this).attr('src');
                        path = path.replace('square', 'large');
                        path = path.replace('thumbnail', 'large');
                    	links.push(path);
                	});
                    
                    if (links.length > 0) {
                    	var button = $('<em class="S_txt3">|</em><a href="javascript:;" class="S_link2 Up_to_Imgur">Upload</a>')
                    				.on('click', function(){
                                        for (var i = 0; i < links.length; i+= 1) {
                                	        window.open('http://imgur.com/upload?url=' + encodeURIComponent(links[i]));
                                        }
                                    });
                    	$(this).find('.hover').append(button);
                    }
                    $(this).data('wb-up-button', true);
                }
            });
            
            setTimeout(timer, 250);
        }());
    }
    inject(script);
}());