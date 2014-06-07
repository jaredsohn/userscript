// ==UserScript==
// @name           kuvaton-fullscreen
// @namespace      tripflag
// @include        http://kuvaton.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

jQuery.fn.centerX = function() {
	this.css('position', 'absolute');
	this.css('left',
	(($(window).width() - this.outerWidth()) / 2)
	+ $(window).scrollLeft() + "px");
}

jQuery.fn.centerY = function() {
	this.css('position', 'absolute');
	this.css('top',
	(($(window).height() - this.outerHeight()) / 2)
	+ $(window).scrollTop() + "px");
}

var im = document.createElement('div');
im.style.fontFamily = 'sans-serif';
im.style.position = 'absolute';
im.style.background = '#000';
im.style.color = "#fff";
im.style.bottom = '0';
im.style.right = '0';
im.style.left = '0';
im.style.top = '0';
im.style.zIndex = '3';
im.style.width = '100%';
im.style.height = '400%';
document.getElementsByTagName('html')[0].appendChild(im);

var ti = document.createElement('span');
ti.style.fontSize = '.9em';
ti.innerHTML = 'hello';
im.appendChild(ti);

var page = 1;
var image = 0;
var images = [];
function parsePage()
{
	images = [];
	var ptr = 0;
	$('#kuvaboxi .kuvaboxi a+img')
	.each(function (index, para)
	{
		var obj = $(para);
		images[ptr++] = obj;
		obj.css({
			'display'  : 'block',
			'position' : 'absolute',
			'margin'   : '0 auto',
			'top'      : '1em',
			'z-index'  : '2'
		});
	});
	var url = (document.location + '').replace(/\//g,' ').trim().split(' ');
	url = url[url.length - 1];
	if (url == 'kuvaton.com')
	{
		page = 1;
	}
	else
	{
		page = parseInt(url);
	}
	showImage(0);
}
function showPage(n)
{
	//alert(page);
	im.innerHTML = "loading / Ladataan";
	im.style.textAlign = 'center';
	im.style.zIndex = 7;
	document.location = 'http://kuvaton.com/' + (page+n) + '/';
}
function showImage(n)
{
	image += n;
	window.scrollTo(0, 0);
	if (image < 0)
	{
		showPage(-1);
		return;
	}
	else if (image >= 5)
	{
		showPage(+1);
		return;
	}
	for (var a = 0; a < images.length; a++)
	{
		images[a].css('z-index', '2');
	}
	images[image].css('z-index', '4').centerX();
	var url = images[image].attr('src');
	url = url.substr(url.lastIndexOf('/') + 1);
	ti.innerHTML = url;
}
function nextImage()
{
	showImage(+1);
}
function prevImage()
{
	showImage(-1);
}
function nextPage()
{
	showImage(9001);
}
function prevPage()
{
	showImage(-9001);
}
function hotkeyhandler(e)
{
	e = e || window.event;
	switch (e.keyCode)
	{
		case "J".charCodeAt(0):
			nextImage();
			break;
		case "K".charCodeAt(0):
			prevImage();
			break;
		case "L".charCodeAt(0):
			nextPage();
			break;
		case "H".charCodeAt(0):
			prevPage();
			break;
	}
}
if (document.addEventListener)
{
	document.addEventListener('keydown', hotkeyhandler, false);
}
else if (document.attachEvent)
{
	document.attachEvent('onkeydown', hotkeyhandler);
}
else
{
	document['onkeydown'] = hotkeyhandler;
}
parsePage();
