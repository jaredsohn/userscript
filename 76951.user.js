// ==UserScript==
// @name           FrontArmy - Simple View Gallery
// @namespace      FrontArmy_User3274647385
// @description    Allows you to isolate alt girl gallery so you can use downloadthemall
// @include        http://www.frontarmy.co.uk/*
// @version        1.0.0
// ==/UserScript==

function startWith(a,b) {
	var aa = a.substring(0, b.length);
	return aa == b;
}


var html, orgHtml;
var $=unsafeWindow.jQuery;
var g = $('.girls').closest('*').append('<div id="GM_Gallery">View Gallery</div>');
g=$('#GM_Gallery');
g.css('color', 'black');
g.css('cursor', 'pointer');
g.css('text-decoration', 'underline');
g.css('block', 'inline');
g.css('float', 'right');


$('#GM_Gallery').live('click', function () 
{
try{
	html =  '<h1 id="GM_GalleryBack">Back</h1>' + $('.gallery').html();
	orgHtml = document.body.innerHTML;
	document.body.innerHTML = html;
		g=$('#GM_GalleryBack');
		g.css('background-color', 'White');
		g.css('color', 'Black');
		g.css('cursor', 'pointer');
		g.css('text-decoration', 'underline');
		g.css('display', 'inline-block');

	}catch(e)
	{
		alert(e);
	}
});
$('#GM_GalleryBack').live('click', function () 
{
	document.body.innerHTML = orgHtml;
});

