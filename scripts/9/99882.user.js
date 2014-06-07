// ==UserScript==
// @name           Meetup UX Declusterfuck
// @namespace      declusterfuck.ux.meetup
// @description    Re-arrange meetup panels
// @include        http://www.meetup.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

var regex = new RegExp('http[s]*://.*meetup.com/[^/]*/(#.*|)', 'i');
var loc = regex.exec(window.location.href);

//only apply to group's top-level page
if (loc[0] == window.location.href) {

    var elem = $('#C_document div:first');
    if (elem.attr('id') == 'moduleBoxParent') {
        //hide intro panel
        elem.hide();
        elem = elem.next()
    }
    var upcoming = elem;
    var activity = upcoming.next();

    //move upcoming to the bottom
    upcoming.detach();
    upcoming.appendTo('#C_document');

    //select calendar tab
    setTimeout("$('[data-op=calendar]').click()", 0);
}