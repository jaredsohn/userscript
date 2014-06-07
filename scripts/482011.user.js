// ==UserScript==
// @name       OWA 2014 Today's Unread Emails in Title
// @namespace  blah
// @version    0.1
// @description  enter something useful
// @match      */owa/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require    https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @copyright  2012+, You
// ==/UserScript==

var setTitleMailReminder = function(){
    var newEmails = $($('div[autoid="_lv_b"] > div[id^="_aria"]')[0]).nextUntil('div[role="heading"]').andSelf().find('>div:not(._lv_v) ._lv_y').length,
        title = $('head title');
    
    if (!title.data('old')) title.data('old', title.html());
    title.html((newEmails ? '[' + newEmails + '] ' : '') + title.data('old'));
}

setInterval(setTitleMailReminder, 2000);