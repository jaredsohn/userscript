// ==UserScript==
// @name           Multiply album via Slideslow
// @namespace      MultiplySlideShow_User3274647385
// @description    View large image of an album using the slideslow page on Multiply.com
// @include        http://multiply.com/slideshow/*
// @require        http://ajax.microsoft.com/ajax/jQuery/jquery-1.3.2.min.js
// @version        0.0.1
// ==/UserScript==



var $ = jQuery;
var src = unsafeWindow.Slideshow.OrigSrcs;

var g = $('body').prepend('<div id="GM_Gallery">Show All Images</div>');
g.css('color', 'white');
g.css('cursor', 'pointer');
g.css('text-decoration', 'underline');

$('#GM_Gallery').live('click', function () 
{
	var out='From <a href="' + window.location + '">' + window.location + '</a><br/>';
	for (var i in src)
	{
		var v = src[i];
		if(v=="") continue;
		out += '<img src="' + v + '"/>';
	}
	$('html').html(out);
});
