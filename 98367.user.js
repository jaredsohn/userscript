// ==UserScript==
// @name           adf.ly Killer
// @namespace      adf.ly-killer
// @author         Mohamed Elkholy
// @description    Remove adf.ly waiting time and instantly redirect to the specified url.
// @include        http://adf.ly/*
// @include        http://u.bb/*
// @include        http://9.bb/*
// ==/UserScript==


var $;
$ = unsafeWindow.jQuery;
(function(){
	unsafeWindow.showSkip();
        __TagetLink = $('#skip_button').attr('href');
        __ReplaceHtml = '<div style="width: 100%; background: #FFFFFF;" id="fuck-adfly"><div style="margin: 30px; font-size: 18px;">You Are Being redirected to:<a href="'+__TagetLink+'" style="display: block; width: 600px; font-size: 17px; color: #3399FF;">'+__TagetLink+'</a></div></div>';
	$('body').html(__ReplaceHtml);
	document.location.href = __TagetLink;
})();