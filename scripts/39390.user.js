// ==UserScript==
// @name          Flickr Link Preview
// @description	  Provides a thumbnail preview of text links to Flickr photos.
// @namespace     http://www.erik-rasmussen.com/blog/2008/12/28/flickr-link-preview-a-greasemonkey-script/
// @include       *
// @exclude       http://*.flickr.com/*

// By Erik Rasmussen (erikwordpressplugins AT gmail)
// ==/UserScript==
(function()
{
	window.addEventListener('load', function()
	{
		var regex = /https?:\/\/(www\.)?flickr\.com\/photos\/[A-Za-z0-9]+\/([0-9]+)\//;
		var matches = function(element)
		{
			if (element && element.href && element.nodeName.toLowerCase() == 'a' && regex.test(element.href))
			{
				// contains children, but no img tags
				if (element.firstChild)
				{
					for (var i = 0; i < element.childNodes.length; i++)
					{
						var child = element.childNodes[i];
						if (child.nodeName && child.nodeName.toLowerCase() == 'img')
							return false;
					}
					return true;
				}
			}
			return false;
		};
		var idCount = 0;
		var identify = function(element)
		{
			while (!element.id)
			{
				var id = 'flickrLinkPreview' + idCount++;
				if (!document.getElementById(id))
					element.id = id;
			}
			return element.id;
		};
		var isAbsolute = function(element)
		{
			var value = element.style['position'];
			if (!value && element.currentStyle)
				value = element.currentStyle['position'];
			return value == 'absolute';
		};
		var cumulativeOffset = function(element)
		{
			var valueT = 0, valueL = 0;
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				if (element.offsetParent == document.body)
					if (isAbsolute(element))
						break;
				element = element.offsetParent;
			}
			while (element);
			return {left:valueL, top:valueT};
		};
		var listen = function(link, photoId)
		{
			identify(link);
			link.addEventListener('mouseover', function(event)
			{
				var div = document.getElementById(link.id + '_flickrLinkPreview');
				if (!div)
				{
					var indicator = document.createElement('img');
					indicator.id = link.id + '_indicator';
					indicator.src = 'http://farm4.static.flickr.com/3212/3141841918_f296b97a2c_o.gif';
					indicator.width = 16;
					indicator.height = 16;
					indicator.alt = 'Loading...';
					indicator.style.position = 'absolute';
					indicator.style.left = (event.pageX - 1) + 'px';
					indicator.style.top = (event.pageY - 1) + 'px';
					indicator.style.marginTop = '20px';
					indicator.style.border = 'none';
					document.body.appendChild(indicator);
					var parentOffset = cumulativeOffset(link.offsetParent);
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = 'http://erikinspain.com/flickr-link-preview/?id=' + photoId + '&element=' + link.id + '&x=' +
					             event.pageX + '&offsetX=' + parentOffset.left + '&y=' + event.pageY + '&offsetY=' +
					             parentOffset.top;
					document.body.appendChild(script);
				}
			}, false);
		};
		var recurse = function(element)
		{
			if (element && element.childNodes && element.childNodes.length)
			{
				for (var i = 0; i < element.childNodes.length; i++)
				{
					var child = element.childNodes[i];
					if (matches(child))
						listen(child, regex.exec(child.href)[2]);
					recurse(child);
				}
			}
		};
		recurse(document);
	}, 'false');
})();
