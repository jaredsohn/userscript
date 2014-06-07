// ==UserScript==
// @name           Allnight.ru comment height fix
// @namespace      contuper
// @description    It fixes comment window in Firefox
// @include        http://allnight.ru/*
// @include        http://*.allnight.ru/*
// ==/UserScript==

	
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://yandex.st/jquery/1.4.2/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { jQuery = unsafeWindow.jQuery; letsJQuery(); }
}
    GM_wait();
	
	
  function letsJQuery() {
	jQuery.noConflict();
	
	jQuery(function(){ 
		
			
		// чиним каменты
		
			function cmxCommentsFix () {
						
				if ( jQuery('#comment___Frame').length ){
				
					jQuery('#comment___Frame').height(340);
					jQuery('#popLayer').height(480);
				}	
					jQuery('#popLayer').css("top", ( jQuery(window).height() - jQuery('#popLayer').height() ) / 2+jQuery(window).scrollTop() + "px");
					jQuery('#popLayer').css("left", ( jQuery(window).width() - jQuery('#popLayer').width() ) / 2+jQuery(window).scrollLeft() + "px");
				
			}
			
			setInterval(cmxCommentsFix, 3000); //вызываем починку каждые 3 секунды. Ебанутый способ, но уж как могу :)
			
		// чисто для прикола закругляем углы всех всплывающих окон и приделываем бордюрчик поизящнее
				
				jQuery('#popLayer').css("-moz-border-radius", "4px");
				jQuery('#popLayer').css("-webkit-border-radius", "4px");

				jQuery('#popLayer').css("padding", "4px").css("border", "4px solid #B8B8B8");
						

				
		
			
			
	});	
}	 