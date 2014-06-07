// reddit commentroversy
// version 0.2.0 BETA
// 2009−01−30
// Copyright (C) 2008-2009, frantk
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// 
// This is a Greasemonkey user script.
// 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "reddit commentroversy", and click Uninstall.
// 
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// 
// ==UserScript==
// @name          reddit commentroversy
// @description   Shows up and down votes for reddit comments
// @include       http://www.reddit.com/r/*/comments/*
// @include       http://www.reddit.com/user/*
// ==/UserScript==


var showPermanently = GM_getValue('showPermanently', true);

var commandText;
if (showPermanently) {
	commandText = "reddit - show comment votes on mouseover";
} else {
	commandText = "reddit - always show comment votes";
}
GM_registerMenuCommand(commandText, function () {
  GM_setValue('showPermanently', !showPermanently)
});


$ = unsafeWindow.jQuery;

function addVotes(items) {
    $.each(items, function(i, item) {
        var data = item.data;
        
        var votesText = '(+'+data.ups+'/-'+data.downs+')';
        var votes = $('<span></span>').addClass('votes').text(votesText);
        
        var tagline = $('.id-'+data.name+' > .entry .tagline');
        
        if (showPermanently) {
            votes.css({ 'margin' : '0 0.4em' });
            votes.insertAfter(tagline.find('.score'));
        } else {
            votes.css({ 'color' : '#03F', 'font-weight' : 'bold' });
            votes.hide();
            tagline.hover(
                function() { $(this).find('.votes').show(); },
                function() { $(this).find('.votes').hide(); }
            )
            votes.appendTo(tagline);
        }
        
        if (data.replies) {
            addVotes(data.replies.data.children);
        }
    });
}

$.getJSON(
	window.location.href.split('?')[0]+'.json',
	function(listing) {
	    if (listing[1]) {
	        addVotes(listing[1].data.children);
	    } else {
	        addVotes(listing.data.children);
	    }
    }
);