// ==UserScript==
// @name	- GrooveShark Permanent Alive
// @author	- FFFUUUFOX, cremoso, based on the adammw snippet
// @include http://grooveshark.com/*
// @include http://*grooveshark.com/*
// ==/UserScript==

// This snippet will prevent Grooveshark from pausing every 30 minutes, and tell it that you are alive,
// restoring the old Flash-player behaviour.
// Please note: This "alive" check is done only to non-VIP users, and may be a way of ensuring idle users
// don't waste server resources. Please only use if you are actually listening to Grooveshark, or purchase VIP

window.addEventListener('load', function snippet_grove() {
	GS.lightbox.open_=GS.lightbox.open;
	GS.lightbox.open=function(a,b){if(a=='interactionTime'){GS.player.resumeSong();return}GS.lightbox.open_(a,b)}
} , false );

GS.Models.User.getCached(GS.getLoggedInUserID()).set('IsPremium', 1);
user = GS.Models.AuthUser.getCached(GS.getLoggedInUserID());
user.get('subscription').get = function (e){if(e=='type') return 1; else return this.attributes[e];}