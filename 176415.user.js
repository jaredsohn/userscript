// ==UserScript==
// @name        freeweibo button
// @namespace   http://weibo.com/p/1002061642909335
// @include     http://*.weibo.com/*
// @include     http://weibo.com/*
// @version     0.2
// @run-at         document-end
// @grant       none
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
            var $dels = $('.WB_deltxt');
            $this.each(function (){
                if (!$(this).data('wb-undel-button')){
                    var omid = $(this).attr("omid");
                    if($(this).find($dels).length > 0)
                    {
                    	var button = $('<em class="S_txt3">|</em><a href="javascript:;" class="S_link2 Up_to_Imgur">Freeweibo</a>')
                    				.on('click', function(){
                    				window.open('https://freeweibo.com/en/weibo/' + omid);
                                    });
                    	$(this).find('.hover').append(button);
                	}
                    
                    $(this).data('wb-undel-button', true);
                }
            });
            
            $this = $('.WB_detail');
            $this.each(function (){
                if (!$(this).data('wb-undel-button')){
                    var omid = $(this).children('div').first().attr("omid");
                    if(omid && $(this).find($dels).length > 0)
                    {
                    	var button = $('<em class="S_txt3">|</em><a href="javascript:;" class="S_link2 Up_to_Imgur">Freeweibo</a>')
                    				.on('click', function(){
                    				window.open('https://freeweibo.com/en/weibo/' + omid);
                                    });
                    	$(this).find('.WB_from').append(button);
                	}
                    
                    $(this).data('wb-undel-button', true);
                }
            });
            
            setTimeout(timer, 250);
        }());
    }
    inject(script);
}());