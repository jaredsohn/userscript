// ==UserScript==
// @name         Start Last.fm
// @namespace    http://use.i.E.your.homepage/
// @version      0.1
// @description  This will automatically start last.fm with the last station you listened to if you go to www.last.fm/listen
// @description  It will then check every 10 seconds to see if the Resume Button exists and click if it does.
// @description  This help restore some of the functionality I was used to from the stand alone last.fm player with out paying for the premium subscription
// @description  If you install AdBlock it will remove ads during play back restoring even more of the functionality without the premium subscription
// @match        http://www.last.fm/listen*
// @copyright    2012+, Ben Johnsen
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$('form :input').each(function(i){
    if($(this).val() == 'Play') {
        $(this).click();
    }
});

setInterval(function () {
    $('form :input').each(function(i){
        if($(this).val() == 'Resume') {
            $(this).click();
        }
    });
}, 10000);