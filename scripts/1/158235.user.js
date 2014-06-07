// ==UserScript==
// @name       Mohatu is a noob
// @namespace  prash/changeuserbar
// @version    0.1
// @description Will change the userbar of any given user. Edit below.
// @match      http://*hackforums.net/*
// @copyright  2012+, You
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js

// ==/UserScript==

$(document).ready(function() {
    
    /*
     * Change this
     * 
     * Format:
     * 123123 : 'LINK TO IMAGE',
     * 234234 : 'LINK TO IMAGE'
     * 
     * */
    
    var replace = {
    	
	};
	
    if ($(location).attr('pathname') == '/showthread.php') {
		
        $('.post_author').each(function(){
			var regex = /uid=(.*?)"/;
            var match = regex.exec($(this).html());
            var uid = match[1]
            if (replace[uid] != undefined)  {
                $(this).find('.smalltext img:last').attr('src', replace[uid]);
            }
        });
        
    }
    
});
