// ==UserScript==
// @name           Blackhatworld custom theme
// @namespace      http://*blackhatworld.com*
// @description    Make your custom blackhatworld theme
// @include        http://*blackhatworld.com*
// ==/UserScript==



// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (
        typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    $('td').css( {
	'background-color' : 'rgb(200,200,200)' //general background color
    });

    $('td').css({
	'color' : 'black' //text color
    });
	
    $('a:link').css({	
	'color' : 'black' //link color
    });
	
    $('pre')
    .css({
	'background-color' : 'rgb(200,200,200)' //quotes color
    });
	
    $('.normal')
    .css({
	'color' : 'white' //post date color
    });
	
    $('.thead a:link, .thead_alink')
    .css({
	'color' : 'white' //post number(#) color
    });

    $('div.sdmenu div a')
    .css({
	'background-color' : 'rgb(200,200,200)' //Main menu(left) color
    });
	
    $('td.thead, th.thead, div.thead')
    .css({
	'color' : 'white' //Columns headers color
    });
	
	$('.tcat a:link, .tcat_alink,.tcat')
    .css({
	'color' : 'white' //"View First Unread" color
    });
	
	
	
    op = $('A[class=bigusername]:first').html();
    $('A[class=bigusername]').each(function(i) {
        if ($(this).html()==op) {
            $(this).parents('table:first')
            .css({
			'background-color' : 'yellow' //thread author color
            });
            $(this).parents('TD[nowrap=nowrap]')
            .css(
            {
				'background-color' : 'grey'
            });
        }
    });
}

