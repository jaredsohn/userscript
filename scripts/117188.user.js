// ==UserScript==
// @name           Google Reader - Fix Folder Contrast
// @namespace      JimEJim
// @description    Fixes the contrast between read and unread folders and tags so it's easier to see.
// @include        http*://www.google.*/reader/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @version 	   1.2
// ==/UserScript==

/**
* Updates: 
* 
* 9/6/2012
*   - added @grant options to fix an issue that popped up in recent reader updates.
*
* 11/9/2011 
*   - added the filter for subscription links and not just folders and tags.
*   - added variables so people can change things easier if they want
*   - changed the polling value to 3 seconds.
*
*/

//
// this function will fire periodically to look for changes in the folder tree
//
(function(){

    // Change these 3 values if you want
    var folder_opacity_value = 0.3;
    var tag_opacity_value = 0.3;
    var sub_opacity_value = 0.3;
    
    // resets the opacity every few seconds (checks for updates)
    $('.folder-name-text').parent().css('opacity','1.0');
    $('.folder-name-text').not('.name-unread').parent().css('opacity', folder_opacity_value);
	
	$('.tag-name-text').parent().css('opacity','1.0');
	$('.tag-name-text').not('.name-unread').parent().css('opacity', tag_opacity_value);
    
    $('.link').find('.sub-name-text').parent().css('opacity','1.0');
    $('.link').find('.sub-name-text').not('.name-unread').parent().css('opacity', sub_opacity_value);
	

	setTimeout(arguments.callee, 3000);
})();

