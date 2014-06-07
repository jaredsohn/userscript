// ==UserScript==
// @name           reddit don't like
// @namespace      http://reddit.com
// @include        http://*.reddit.com/r/*
// @include        http://*.reddit.com/
// ==/UserScript==

var config = { label: "don't like" };

$ = unsafeWindow.jQuery; 
$(document).ready(function(){
    var label = config.label;
    $('#siteTable > .thing').each(function(){
        var entry = $(this);
        var buttons = entry.find('.entry > ul');
        var dontlike = $('<a href="javascript:"></a>').text(label);
        buttons.append($('<li>').append(dontlike));
        dontlike.click(function(){
            // Down vote it
            entry.find('div > .down').vote();
            // Hide it
            entry.find('.entry > ul > li > .hide-button > span > a').each(function(){
                unsafeWindow.change_state(this, 'hide', unsafeWindow.hide_thing);
            });
        });
    });
});