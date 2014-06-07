// ==UserScript==
// @name           Flickr allsizesX
// @description    Adds all the links needed right under the flickr image. 
// @version        20121120
// @namespace   
// @include        http://www.flickr.com/photos/*
// @website        http://userscripts.org/scripts/show/103073
// @creator        ofsahin
// ==/UserScript==

var sizes = [
	{ caption: 'Square', suffix: 's', size: 'sq' },
	{ caption: 'Thumbnail', suffix: 't', size: 't' },
	{ caption: 'Small', suffix: 'm', size: 's' },
	{ caption: 'Medium 500', suffix: '', size: 'm' },
	{ caption: 'Medium 640', suffix: 'z', size: 'z' },
	{ caption: 'Large', suffix: 'b', size: 'l' },
	{ caption: 'Original', suffix: 'o', size: 'o' }
];

function wget(url)
{
	try {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", url, false);
		xmlHttp.send(null);
		return xmlHttp.responseText;
	} catch (e) {
		return "error: " + e;
	}
}

function imgurl(user, pid, size)
{
	var url = 'http://www.flickr.com/photos/' + user + '/' + pid + '/sizes/' + size;
	var txt = wget(url);
	var ms = txt.match(/src="(http:\/\/farm.*\.staticflickr.com\/[^"]*)"/);
	if (ms)
		return ms[1];
	else
		return 'about:blank';
}

function appendLink(elm, href, text)
{
	var a = document.createElement('a');
	a.style.margin = '2px';
	a.style.padding = '2px';
	a.href = href;
	a.innerHTML = text;
	elm.appendChild(a);
}

function substitute()
{ 
	var elms = document.getElementsByClassName('photo-div');
	var photoDiv = elms[0];
	var img = photoDiv.children[1];

	var ms = img.src.match(/^(.*)(_.)?\.jpg/);
	if (!ms)
		console.error('img.ms is null!');
	var imgBase = ms[1];

	var url = window.location + '';
	var ms = url.split('/');
	var user = ms[4];
	var pid = ms[5];

	var links = document.createElement('div');
	links.setAttribute('class','Paginator');
	
	appendLink(links, img.src, 'Current');

	for (var i in sizes) {
		var a = document.createElement('a');
		var href = imgurl(user, pid, sizes[i].size);
		appendLink(links, href, sizes[i].caption + ' ');
	}

	photoDiv.appendChild(links);
}

try {
	substitute();
} catch (e) {
	console.error('error: ' + e);
}