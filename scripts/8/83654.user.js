// ==UserScript==
// @name           Torrenter
// @namespace      http://www.google.com/search?q=mabakay
// @description    Add search links to torrent sites.
// @include        http://release24.pl/*
// @include        http://www.filmweb.pl/film/*
// @grant		   none
// @copyright      2010 - 2014, mabakay
// @date           16 March 2014
// @version        1.41
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var Engines = ["https://thepiratebay.org/search/{0}/0/7/0",
			   "http://kickass.to/usearch/{0}/?field=seeders&sorder=desc",
			   "https://www.torrentz.com/search?q={0}",
			   "http://bitsnoop.com/search/all/{0}/s/a/1/",
			   "http://www.sumotorrent.sx/en/search/{0}?order=seeders&by=down"];

var hostName = window.location.hostname;
	
if (hostName == 'release24.pl')
{
	var elemList = document.getElementById('mainwindow');
	loopCount = elemList.childElementCount > 3 ? elemList.childElementCount - 3 : 2;

	for (i = 1; i < loopCount; i++)
	{
		var elem = elemList.children[i];

		if (elem.className == 'wpis')
		{
			var title_regex = /\"(.*)\"/;
			regex_result = elem.children[0].children[0].innerHTML.match(title_regex)

			if (regex_result != null)
			{
				var title = regex_result[1];
				var span = createLinkSpan(title, 'margin-left: 50px; font-weight: normal;');

				elem.children[2].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].appendChild(span);
			}
		}
	}
}
else if (hostName == 'www.filmweb.pl')
{
	var style = 'margin-left: 50px; font-weight: normal;';
	var elemList = getElementByClass('filmTime');
	
	if (elemList == null)
	{
		if (getElementByClass('text-large caption') != null)
		{
			style = 'margin-left: 50px; font-weight: normal;';
			elemList = getElementByClass('text-large caption');
		}
		else if (getElementByClass('hdr hdr-super') != null)
		{
			style = 'margin-left: 0px; font-weight: normal;';
			elemList = getElementByClass('hdr hdr-super').parentNode;
		}
	}

	if (elemList != null)
	{
		var title = getElementByClass('text-large caption');
		
		if (title == null)
			title = getElementByClass('hdr hdr-super').children[0].children[0];
		
		var span = createLinkSpan(title.innerHTML, style);

		elemList.appendChild(span);
	}
}

function createLinkSpan(title, style)
{
	var span = document.createElement('span');
	span.setAttribute('id', 'Torrenter');
	span.setAttribute('style', style);

	for (var e in Engines)
	{
		var link = document.createElement('a');
		link.setAttribute('href', format(Engines[e], title));
		link.setAttribute('style', 'position: relative; top: 5px;');

		var url_regex = /(https?:\/\/)(.+\....)/;
		regex_result = Engines[e].match(url_regex);
		link.innerHTML = getFavIconImg(Engines[e].match(url_regex)[2]);

		if (e > 0)
		{
			var separator = document.createElement('span');
			separator.innerHTML = '&nbsp;|&nbsp;';
			
			span.appendChild(separator);
		}

		span.appendChild(link);
	}
	
	return span;
}

function getFavIconImg(url)
{
	imgurl = '<img src="http://www.google.com/s2/favicons?domain=' + url + '" width="16px" height="16px">';

	return imgurl;
}

function format(str)
{
	for (a = 1; a < arguments.length; a++)
	{
		argNum = "{" + (a - 1) + "}";
		
		str = str.replace(argNum, arguments[a]);
	}

	return str;
}

function getElementByClass(matchClass) {
    var elems = document.getElementsByClassName(matchClass);
	
    if (elems.length > 0)
	{
		return elems[0];
	}
	
	return null;
}
