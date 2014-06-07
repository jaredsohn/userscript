// ==UserScript==
// @name           Bypass YouTube Age Verification (Embedded Version)
// @description  Bypass YouTube age verification by simply embedding the video on the youtube.com domain,without redirecting to any external site
// @author         Mr. Comedian
// @include        *youtube.com*
// ==/UserScript==

if(document.getElementById('watch7-player-age-gate-content')) {
	var iframe=document.createElement('iframe');
	iframe.style.height="100%";
	iframe.style.width="100%";
	iframe.src=window.location.href.split('/watch')[0] + '/embed/' + window.location.href.split('v=')[1].split('&')[0];
                  var toReplace=document.getElementById('watch7-player-unavailable');
	toReplace.parentNode.replaceChild(iframe, toReplace);
	}
if(document.getElementById('verify-details')) {
	var iframe=document.createElement('iframe');
	iframe.style.height="62%";
	iframe.style.width="52%";
	iframe.style.position="absolute";
	iframe.style.top="75px";
	iframe.style.left="300px";
	iframe.src=window.location.href.split('/verify_age?next_url=/watch')[0] + '/embed/' + window.location.href.split('%3Fv%3D')[1].split('&')[0];
                  var toReplace=document.getElementById('content');
	toReplace.parentNode.replaceChild(iframe, toReplace);
	}