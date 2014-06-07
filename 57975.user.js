// ==UserScript==
// @name           Luscious Enhancement
// @namespace      Zed
// @include        http://lu.scio.us/hentai/albums/*
// ==/UserScript==
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
	
function strpos (haystack, needle, offset) {
    var i = (haystack+'').indexOf(needle, (offset ? offset : 0));
    return i === -1 ? false : i;
}


// All your GM code must be inside this function
    function letsJQuery() {
		
		$('#navigation').attr('rel', 'facebox');
		//$('#navigation').css({float:'left', marginLeft: '-245px', marginRight: '20px' });
		//
		$('#wrapper').css({margin:0});
		$('#content, .picture').css({float:'left', width:'auto', padding:'10px', position: 'relative', zIndex: '2', margin:0});
		
		$('#navigation').css({position:'absolute', right:0});
		
		source = $('.picture img').attr('src');
		//source = 'http://static2' + source.substring(strpos(source, '.'));
		source = source.replace("normal__", '');
		$('.picture img').attr('src', source);
		
		$(window).bind('keypress', function(e){
			switch (e.keyCode)
			{
			case 37:
				  window.open($('div.picturenav li a[title^=Previous]').attr('href'), "_self");
		          return false; 
				  break;
			case 39:
				window.open($('div.picturenav li a[title^=Next]').attr('href'), "_self");
	            return false;
				break;
			}
		});
	}