// ==UserScript==
// @name        Hackforum userbar change 
// @author 	beginnerhackingsection
// @namespace   http://userscripts.org/users/BeginnerHackingSection
// @include     http*://www.hackforums.net/*
// @version     1.2
// @description changes HF userbar
// @grant none
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==
    var replace = {
992989 : 'http://i.imgur.com/3vlare6.gif'
	};
	
    if ($(location).attr('pathname') == '/showthread.php') {
		
        $('.post_author').each(function(){
			var regex = /uid=(.*?)"/;
            var match = regex.exec($(this).html());
            var uid = match[1];
            if (replace[uid] != undefined)  {
                $(this).find('.smalltext img:last').attr('src', replace[uid]);
            }
        });
        
    }
    


    