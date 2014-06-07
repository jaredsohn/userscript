// CougarBoard Ajaxifier
// version 0.1!
// 2009-06-17
// Copyright (c) 2009, Jason Weir
// Released under the Creative Commons Attribution 3.0
// http://creativecommons.org/licenses/by/3.0/us/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CougarBoard Ajaxifier", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CougarBoard Ajaxifier
// @description   This script changes the cougarboard's click-load-click format into a nice ajaxified UI. Clicking on another thread will load the text content of that thread into a nice jQuery UI dialog box. That box can be moved around, resized or closed. Or you can continue on to the to the page for that specific thread. This is only made to work on the noframes style of cougarboard. It gives a similar function to the frames style, but a little more... shall we say... updated.
// @include       http://*cougarboard.com/noframes/*
// ==/UserScript==


    var GM_JQ = document.createElement('script');
    var GM_JQ_UI = document.createElement('script');
    var GM_JQ_THEME = document.createElement('link');
    
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    GM_JQ_UI.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js';
    GM_JQ_THEME.href = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css';
    
    GM_JQ.type = 'text/javascript';
    GM_JQ_UI.type = 'text/javascript';
    GM_JQ_THEME.type = 'text/css'; GM_JQ_THEME.rel = 'stylesheet'; GM_JQ_THEME.media = 'all';
    
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    document.getElementsByTagName('head')[0].appendChild(GM_JQ_UI);
    document.getElementsByTagName('head')[0].appendChild(GM_JQ_THEME);

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined'){
        	window.setTimeout(GM_wait,100);
        }else{
        	$ = unsafeWindow.jQuery; letsJQuery();
        }
    }
    GM_wait();

    function letsJQuery() {
    	var CBurl = 'http://www.cougarboard.com/frames/';
		var contentDiv = '<div id="message" title="This is our new message holder"></div>';
		$('body').append(contentDiv);
		
		$(function() {
			$("#message").dialog({ autoOpen: false, position: 'left', width: '75%', hide: 'slide', show: 'slide' });
		});

		$('a.thread').each(function(i){
			
			var appendable = $(this).parent().parent().parent();
			var href = CBurl + $(this).attr('href');
			$(this).after(' <a href="'+href+'">(go)</a>');
			
			$.get(href, function(data){
				var header = $(data).find('td.header').html();
				var message = $(data).find('td.message div div').html();
				appendable.append('<tr style="display: none;" id="thread'+i+'"><div>'+header+'</div><p>'+message+'</p></tr>');
			});
			
			$(this).click(function(){
				var id_message = 'tr#thread'+i+' p';
				var id_title = 'tr#thread'+i+' div';
				$('div#message').html($(id_message).html());
				$("#message").dialog('option', 'title', $(id_title).text());
				$("#message").dialog('open');
				return false;
			});
		});
    }