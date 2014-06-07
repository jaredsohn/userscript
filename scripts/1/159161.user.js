// ==UserScript==
// @name       Contrast Hotkey
// @namespace  http://use.i.E.your.homepage/
// @grant          GM_addStyle
// @version    0.1
// @description  Use Shift + 1 to switch between 5 states: Normal, Greyscale:Contrast 100%, Greyscale:Contrast 200%, Greyscale:Contrast 400%, Greyscale:Contrast 800%
// @include      http://*/*
// @include      https://*/*
// @copyright  2012+, You
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
;(function($){

	var state = 0;
    GM_addStyle('.gm_greyContrast1{-webkit-filter:grayscale(100%) contrast(1);}');
    GM_addStyle('.gm_greyContrast2{-webkit-filter:grayscale(100%) contrast(2);}');
    GM_addStyle('.gm_greyContrast4{-webkit-filter:grayscale(100%) contrast(4);}');
    GM_addStyle('.gm_greyContrast8{-webkit-filter:grayscale(100%) contrast(8);}');
    GM_addStyle('.gm_greyContrast16{-webkit-filter:grayscale(100%) contrast(16);}');
    
    $(document).on('keydown', function(event) {
		var index = -1;
		var type = event.target.nodeName.toLowerCase();
		if(type === 'input' || type === 'textarea' || type === 'select')
			return true;
    
        if(event.originalEvent.shiftKey) {
            switch(event.which){
                case 49:
                  state = (state + 1) % 5;
                  $('body').removeClass('gm_greyContrast1').removeClass('gm_greyContrast2').removeClass('gm_greyContrast4').removeClass('gm_greyContrast8').removeClass('gm_greyContrast16');
                      if(state > 0) {
                      	$('body').addClass('gm_greyContrast' + Math.pow(2, state - 1));
                      }
              	break;
			}
        }
      
    })


})(jQuery);