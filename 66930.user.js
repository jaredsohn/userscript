// ==UserScript==
// @name           Youtu.be (MagicRevealer09)
// @namespace      Youtu.be
// @description    YouTube url shortener
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

// All your GM code must be inside this function
    function letsJQuery() {
		if($('#watch-url-field').val()){
			var code = $('#watch-url-field').val().match(/v=([\w\-]+)/);
			//alert('http://youtu.be/' + code[1]);
			var shortUrlBox = $('#watch-url-div').clone(true);
			shortUrlBox.attr('id','short-url-div');
			shortUrlBox.css({
				'font-size':'12px',
				'margin':'0 50px',
				'padding':'1px 0 0 6px'
			});
			shortUrlBox.find('label').text('Short URL (Made By MagicRevealer09 )(Some Credit To SoftwareTutorial)');
			shortUrlBox.find('label').css({
				'clear':'left',
				'color':'#FF0000',
				'float':'left',
				'font-size':'11px',
				'font-weight':'bold',
				'line-height':'18px',
				'margin-right':'-100px',
				'min-width':'-100px',
				'text-align':'left'
			});
			shortUrlBox.find('input').val('http://youtu.be/' + code[1]);
			shortUrlBox.find('input').css({
				'clear':'left',
				'float':'left',
				'font-size':'10px',
				'width':'200px'
			});
			$('#watch-url-div').after(shortUrlBox);
			
		}
    }