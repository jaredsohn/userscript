// ==UserScript==
// @name Starfleet Commander Delete "Probe Interception Report" Messages
// @namespace http://www.callmegavin.com
// @require http://code.jquery.com/jquery-1.11.0.min.js
// @include http://playstarfleet.com/messages*
// @include https://ssl.fb.playstarfleet.com/messages*
// @include http://playstarfleetextreme.com/messages*
// @include https://ssl.fb.playstarfleetextreme.com/messages*
// @include http://uni2.playstarfleet.com/messages*
// @include https://ssl.fb.uni2.playstarfleet.com/messages*
// @include http://uni2.playstarfleetextreme.com/messages*
// @include https://ssl.fb.uni2.playstarfleetextreme.com/messages*
// @include http://nova.playstarfleet.com/messages*
// @include https://ssl.fb.nova.playstarfleet.com/messages*
// @include http://stardriftempires.com/messages*
// @include https://ssl.fb.stardriftempires.com/messages*
// @include http://nova.stardriftempires.com/messages*
// @include https://ssl.fb.nova.stardriftempires.com/messages*
// @include http://tournament.playstarfleet.com/messages*
// @include https://ssl.fb.tournament.playstarfleet.com/messages*
// @include http://conquest.playstarfleet.com/messages*
// @include https://ssl.fb.nova.playstarfleet.com/messages*
// @include http://guns.playstarfleet.com/messages*
// @include https://ssl.fb.guns.playstarfleet.com/messages*
// @version 1.0
// @grant none
// ==/UserScript==

// Only use jQuery defined in @require above
this.$ = this.jQuery = jQuery.noConflict(true);

// The start of the url for message deleting via ajax call
var ajax_delete_url_start = '/messages/delete?category=all&amp;current_planet=' + $('#notifications_check_form').attr('action').match(/\d*$/) + '&amp;message_ids=';

$('tr td.subject').each(function(index) {
    if($(this).html().match(/Probe Interception Report/))
    {
        var ajax_delete_url = ajax_delete_url_start + $(this).parent().attr('id').match(/\d*$/);
        new Ajax.Request(ajax_delete_url, { asynchronous: true, evalScripts: true });
    }
});