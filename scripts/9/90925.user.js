// ==UserScript==
// @name           Flickr unspaceballer
// @namespace      gm
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

var sizes = [
	{ caption: 'Square', suffix: 'sq' },
	{ caption: 'Thumbnail', suffix: 't' },
	{ caption: 'Small', suffix: 's' },
	{ caption: 'Medium 500', suffix: 'm' },
	{ caption: 'Medium 640', suffix: 'z' },
	{ caption: 'Large', suffix: 'b' },
	{ caption: 'Original', suffix: 'o' }
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
	var ms = txt.match(/src="(http:\/\/farm.*\.static.flickr.com\/[^"]*)"/);
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

var substitute = function()
{ 
	var elms = document.getElementsByClassName('photo-div');
	var photoDiv = elms[0];
	var img = photoDiv.children[0];

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
	appendLink(links, img.src + '?zz=1', 'Current (larger)');
	for (var i in sizes) {
		var a = document.createElement('a');
		var href = imgBase  + '_' + sizes[i].suffix + '.jpg';
		if (sizes[i].suffix == 'o')
			href = imgurl(user, pid, 'o');
		appendLink(links, href, sizes[i].caption + ' ');
	}

	photoDiv.appendChild(links);
}

function createButton() {
	var button = document.createElement('a');
	button.innerHTML = "<h2>Click here to load sizes</h2>";
	button.href = '#';
	button.addEventListener('click', function() {
		try {
			substitute();
		} catch (e) {
			console.error('error: ' + e);
		}
	}, true);

	var elms = document.getElementsByClassName('photo-div');
	var photoDiv = elms[0];
	photoDiv.appendChild(button);
}

createButton();