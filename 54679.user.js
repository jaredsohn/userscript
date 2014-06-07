// reddit commentroversy
// Shows up and down votes for reddit comments
// version 0.3.0 BETA
// 2009−01−30
// Copyright (C) 2008-2009, frantk
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Modified by trex279 on 2009-07-29
// Version 0.3.0 BETA released on 2009-10-23
// 
// This is a Opera user script.
// 
// To install, go to Preferences -> Content -> Javascript Options
// and choose a directory for "User Javascript files"
// Then put this js file in the directory you selected above.
// Then reload the page.
// 
// To uninstall, delete the this js file.
// 
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// ==UserScript==
// @name          reddit commentroversy
// @description   Shows up and down votes for reddit comments
// @include       http://www.reddit.com/r/*/comments/*
// @include       http://www.reddit.com/user/*
// ==/UserScript==

var showPermanently = /*@Show up/down votes permanently@bool@*/false/*@*/;

if( location.href.match(/^http:\/\/www\.reddit\.com\/r\/.*\/comments\/.*/) || location.href.match(/^http:\/\/www\.reddit\.com\/user\/.*/)) {
	$(document).ready(function(){
		function addVotes(items) {
			$.each(items, function(i, item) {
				var data = item.data;
				
				var votesText = '(+'+data.ups+'/-'+data.downs+')';
				var votes = $('<span></span>').addClass('votes').text(votesText);
				
				var tagline = $('.id-'+data.name+' > .entry .tagline');
				
				if (showPermanently) {
					votes.css({ 'margin' : '0 0.4em' });
					votes.insertAfter(tagline.find('.unvoted'));
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
	});
}