// ==UserScript==
// @name        for_cuchuoitay
// @namespace   for_cuchuoitay
// @include     http://an-hoang-trung-tuong.blogspot.com/*
// @require     http://code.jquery.com/jquery.min.js
// @version     1
// @grant       GM_setValue 
// @grant       GM_getValue
// ==/UserScript==
(function() {
    
        var comments = $('.comment-body');
        comments.each(function(i,comment){
            $div_tag = $(comment).find('div');	
			$font_tag = $(comment).find('font');
			var font_element;
            $font_tag.each (function(j,item){ 
			     item.size = 3;
			});
			
			
			
		});
        

})();