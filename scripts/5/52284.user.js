// ==UserScript==
// @name          Youtube - Auto scroll page
// @namespace     -
// @description   Scroll's youtube video page to the video's title, automatically submit's age verification page, removes crome promotion, popular video, youtube logo, and promoted videos boxes, and adds some styling to the page..
// @include       http://youtube.com/watch?*
// @include       http://www.youtube.com/watch?*
// @include       http://www.youtube.com/verify_age*
// ==/UserScript==

var url = window.location.href;

function hide(id)
{
	if(document.getElementById(id))
		document.getElementById(id).style.display = 'none';
}

if(url.indexOf('verify_age') > 0)
{
	//alert("verify age");
	var submitButton = document.getElementsByName('action_confirm');
	submitButton[0].click();
}
else
{
	//alert("offset");
	var yOffset = 86 - window.pageYOffset;
	window.scrollBy(0, yOffset);
	
	hide('watch-ugc-promo');
	hide('watch-highlight-racy-box');
	hide('watch-promoted-videos-container');
	hide('watch-more-popular');
}

hide('logo');
hide('region-and-language-picker-links-wrapper');
hide('chrome-promo');
hide('copyright');

function colorize(id)
{
	if(document.getElementById(id))
	{
		document.getElementById(id).style.background = '#fff';
	}
}

colorize('watch-channel-vids-body');
colorize('playlistRows_QL');
colorize('watch-related-vids-body');

var basediv  = document.getElementById('baseDiv');
basediv.style.margin = '3px auto 3px auto';
basediv.style.width = '1024px';
basediv.style.border = '5px solid #fff';
basediv.style.outline = '1px solid #666';
basediv.style.background = '#f0f0f0';

var body  = document.getElementsByTagName('body');
body = body[0];
body.className = '';
body.style.background = '#999';
