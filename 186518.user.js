// ==UserScript==
// @name        Facebook Notification Page Highlighter
// @description Removes like notifications from "Your Notifications" page, highlights comments, reduces opacity of group activity
// @namespace   http://www.bekerle.com
// @include     https://www.facebook.com/notifications
// @version     0.6
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @copyright   2013+, Patrizio Bekerle <patrizio@bekerle.com>
// ==/UserScript==


GM_addStyle(".invisible { display: none; }");
GM_addStyle(".inactive { opacity: 0.4; }");
GM_addStyle(".highlight { background-color: #FFF9D1; }");
GM_addStyle(".highlight-text { color: #D60606; font-weight: bold; }");

console.log("Facebook Notification Page Highlighter Start");

function handleNotifications() {
    var items = $("ul.uiList._4kg._704._4ks li");
    $.each( items, function( key, item ) {
        var $item = $(item);
        var gt = $item.data("gt");
        var notif_type = gt.notif_type
        
        switch(notif_type)
        {
            case 'like':
                $item.addClass("invisible");
                break;
            case 'group_activity':
            case 'plan_mall_activity':
            case 'group_post_approved':
            case 'fbpage_fan_invite':
            case 'story_reshare':
                $item.addClass("inactive");
                break;
            case 'group_comment':
            case 'group_comment_reply':
            case 'photo_comment':
            case 'photo_album_comment':
            case 'photo_reply':
            case 'feed_comment':
            case 'share_reply':
            case 'share_comment':
            case 'event_mall_comment':
                $item.addClass("highlight");
                $item.find('a:contains("photo")').addClass("highlight-text");
                $item.find('a:contains("post")').addClass("highlight-text");
                break;
            default:
                console.log( notif_type );
        }
    });
}

$(document).ready(function() {  
    handleNotifications();
});

