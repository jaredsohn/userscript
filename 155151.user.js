// ==UserScript==
// @name       DU Troll Alert
// @namespace  localhost
// @version    1.0
// @description  Adds an icon next the usernames of posters blocked from replying to a thread.
// @match      http://*.democraticunderground.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}
var usernames = new Array();
	
$('.hidden-deleted').each(function() {
	var name = $('p.post-author a.author', this).text();
		
	if (usernames.contains(name) == false) {
	        usernames.push(name);
    }
});
$('#placeop').each(function() {
    if ($('.alert-box .hidden', this).is('*')) {
     	var name = $('p.post-author2 a.author2', this).text();
        
        if (usernames.contains(name) == false) {
	        usernames.push(name);
        }
    }
});
$('.reply-border').each(function() {
    if (usernames.contains($('.author2', this).text())) {
       $('.author2',this).after('<img src="http://d.pr/i/bvXk.png" alt="Blocked from thread">');
       
        if ($(this).attr('id') == 'placeop' && $(this).has('.alert-box .hidden').length === 0) {
            $('.post-message',this).append('<div style="width:100%; height:26px; background-color:#ffd6d6; border:1px solid #ab0303; font-size:0.9em; padding:3px; line-height:26px; margin-top:10px;">This poster can no longer reply to the thread because one or more of their posts in the thread has been hidden by a jury.</div>');
        }
    }
});
if (usernames.length > 0) {
	$('#placeop').after('<br/><div id="blocked" style="margin-top:3px;"><span style="font-weight:bold;">Blocked from thread:</span>&nbsp;</div>');
	for (var i = 0; i < usernames.length; i++) {
    	var length = usernames.length;
    	if (i == length-1) {
     		var punc = '';   
	    } else {
    	 	var punc = ', ';   
    	}
    
    	$('#blocked').append(usernames[i] + punc);   
	}
}