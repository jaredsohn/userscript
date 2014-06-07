// ==UserScript==
// @name ShrinkLuciferImage
// @description 朱學恆的男子漢圖片太大了，所以把他縮小方便瀏覽
// @include http://blogs.myoops.org/lucifer.php/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author roga
// @version 1.0.0
// ==/UserScript==

(function($){
    
	var maxWidth = 900;
	/* 把寬度限制為 900 */
	
	$.each($('img'), function(roga, newImg)
	{
        var width = $(newImg).width();
        var height = $(newImg).height();
	
		if (width > maxWidth) 
		{
			$(newImg).width(maxWidth);
			$(newImg).height((maxWidth / width) * height);
		}
		
    });
})(jQuery);
