// ==UserScript==
// @name           PWI Forums - Cleanup
// @description    Just hide the damn signatures...
// @include        http://pwi-forum.perfectworld.com/*
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        1.1
// ==/UserScript==
(function(){	//START jQuery CODE

// Message View
var message = $('.p_postbit div[id|="post"]');
message.each(function(){
  $(this).parent().html($(this));
});

}());			//END jQuery CODE