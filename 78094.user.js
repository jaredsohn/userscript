// ==UserScript==
// @name           Ajax Cd Key Display (Skip survey)
// @namespace      youserials
// @description    Display CD KEY directly in search results
// @include        http://www.youserials.com/*
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @author         Sebondus

// @version 1.6
// @history 1.6    Fixed Container Width
// @history 1.5    Fixed Auto Update
// @history 1.4    New purified layout (Removed footer, left column, and banner)
// @history 1.3    Changed link "VIEW SERIAL" font-size to 10px
// @history 1.2    Added Check Update
// @history 1.1    Bug Fixed
// @history 1.0    First Version
// ==/UserScript==

var $;

	// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
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
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }
	
	

	
// All your GM code must be inside this function
	function letsJQuery() {
		autoUpdate (78094, "1.6");

		$('#sidebar').remove();
		$('#footer').remove();
		$('#header .left').remove();
		$('#mainbody').css('width', '100%');
		$('#container').css('width', '100%');
		$('#rtable').css('width', 'auto');
		$('#rtable').css('margin', '5px 0');
		$('#filter-form').remove();
		
		$('#rtable').find('td:first-child').before('<td class="cd_key" style="text-decoration: underline;font-weight: bold;text-align:left;font-size:10px;"><span>VIEW SERIAL</span><img style="display:none;border: none;" src="http://www.youserials.com/i/loading2.gif"/></td>');
		$('#rtable').find('th:first-child').before('<th>CK KEY</th>');
		
		$('.cd_key').click(function(z) {
			href = $(this).parent().find('a').attr('href').match('^/serial/.*/([0-9]*)$');
			td = $(this);
			if(href)
			{
				td.ajaxStart(function() {
					$(this).find('span').remove();
					$(this).find('img').show();
				});

				$.get('http://www.youserials.com/jq_serial.php?id='+href[1], function(data) {
					td.html(data);
					td.die( "click" );
				});
			}
		});
	}