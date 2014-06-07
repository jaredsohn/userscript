// ==UserScript==
// @name         Facebook Ad Remover
// @namespace    http://www.philihp.com/
// @version      0.1
// @description  Removes the right column from Facebook
// @copyright    2012+, Philihp Busby
// @include      https://*.facebook.com/*
// @exclude      https://*.facebook.com/ajax/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(document).bind('DOMSubtreeModified',function() {
    
    //timeline
    $('#pagelet_side_ads').hide();
    
    //messaging
    $('#MessagingMainContent').css('width','100%');
    $('#MessagingNetegoSidebar').hide();
    $('.MessagingContentBorder').css('width','759px');
    $('#MessagingMessages').find('.content').css('width','auto');
    $('#MessagingShelf').css('width','auto');
    
    $('#fbPhotoSnowliftAdsSide').hide();
    
    $('.UIStandardFrame_SidebarAds').hide();
    $('.UIStandardFrame_Content').css('width','980px');

    //normal operation
    $('#pagelet_ego_pane_w').css('visibility','hidden');
    $('#pagelet_reminders').css('visibility','hidden');
    $('#pagelet_rhc_footer').css('visibility','hidden');
    $('#rightCol').css('width','0');
    $('#contentArea').css('width','759px');
    
});
