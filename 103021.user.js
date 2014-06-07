// ==UserScript==
// @name           Facepunch - Media Tag Images
// @namespace      http://www.facepunch.com/
// @include        *facepunch.com/*
// ==/UserScript==
if (typeof(google) == 'undefined') {
    ChromeKludge(unsafeWindow.jQuery);
}
else {
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludge + ')(jQuery);'));
    document.head.appendChild(script);
}
function ChromeKludge($) {
	$('.content > div a').each(function() {
		if (/.gif$|.jpg$|.png$/i.test($(this).attr('href'))) {
			$(this).replaceWith($('<div></div>').addClass('center').html('<div class="media media_image"><div class="message"><a href="#" onclick="$(this).siblings(\'.mediablock\').show(\'fast\'); $(this).hide(); return false;">View Image</a><div class="mediablock" style="display:none"><img src="'+$(this).attr('href')+'" /></div></div><div class="infobar"><a href="'+$(this).attr('href')+'">'+$(this).attr('href')+'</a></div></div>'));
		}
	});
}