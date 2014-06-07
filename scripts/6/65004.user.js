// ==UserScript==
// @name           	Plain Image Host Gallery
// @version	0.1b
// @include http://insert.your/gallery-here/*
// @namespace	http://userscripts.org/users/123919
// @description 	Extracts thumbnails of popular imagehosts and displays them in a plain gallery.
// ==/UserScript==

/*
Tired of bloated image galleries with intermediate sites like urlcash.net?
Then Plain Image Host Gallery is your user script!

HOW TO
Enable the script only on pages which display thumbnail galleries. 

FEATURES
- extract thumbnails  of popular image hosts and display them in a plain gallery
- bypass intermediate sites (e.g. urlcash.net, ...)
- display links to full images as plain text

SUPPORTED IMAGE HOSTS
- Imagevenue.com
- Imagebam.com
- Imageshack.us

CHANGE LOG

* 2009-12-26	0.1b
	- fix default include (*)

* 2009-12-26	0.1
	- initial version

*/

/*
BEGIN LICENSE BLOCK
Copyright (C) 2009 Dirk Schubert

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

var imageHosters = new Array();

imageHosters.push({ 
	"prefix"  : /imagevenue.com/i,
	"fullImg" : function(url) { return url.replace(/loc\w*\/th_/gi,"img.php?image="); }
});

imageHosters.push({
	"prefix"  : /imagebam.com/i,
	"fullImg" : function(url) { 
		url = url.replace(/thumbnails\w*\.imagebam\.com\/\w.*\//gi,"www.imagebam.com/image/");
		url = url.replace(/\.gif/, "/");
		return url;
	}
});

imageHosters.push({
	"prefix"  : /imageshack.us/i,
	"fullImg" : function(url) { 
		url = url.replace(/\.us\/img\w.*\/\w.*\//gi,".us/i/");
		url = url.replace(/\.th\.jpg/, ".jpg");
		return url + "/";
	}
});

function processPage()
{
	var doc = window.document;
	var body = doc.getElementsByTagName('body')[0];
	var allImages = doc.getElementsByTagName('img');
	
	var plainBody = doc.createElement('body');
	var linksAsImages = doc.createElement('div');
	var linksAsPlainText = doc.createElement('div');
	
	// traverse all images
	for each(var image in allImages)
	{
		var thumbnailSrc = image.src;
		
		for each(var host in imageHosters)
		{
			// is image a thumbnail of popular image host?
			if ( thumbnailSrc.search(host.prefix) != -1 )
			{
				thumbnail = doc.createElement('img');
				thumbnail.setAttribute('src', thumbnailSrc);
				thumbnail.setAttribute('border', 0);
				
				link = doc.createElement('a');
				link.setAttribute('target', '_blank');
				
				// extract link to full image directly from thumbnail to bypass intermediate sites
				link.href = host.fullImg(thumbnailSrc);
				link.appendChild(thumbnail);
				
				// add image with (text) link to result
				linksAsImages.appendChild(link);
				linksAsImages.appendChild(doc.createTextNode(" "));
				
				linksAsPlainText.appendChild(doc.createTextNode(link.href));
				linksAsPlainText.appendChild(doc.createElement('br'));
				break;
			}
		}
	}
	
	plainBody.appendChild(linksAsImages);
	plainBody.appendChild(linksAsPlainText);

	// replace body to get rid of bloated sites
	body.parentNode.replaceChild(plainBody, body);
}

processPage();
