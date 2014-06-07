// ==UserScript==
// @name          YouTube Link Preview
// @description	  Provides a three thumbnail previews of text links to YouTube videos.
// @namespace     http://www.erik-rasmussen.com/blog/
// @include       *
// @exclude       http://*.youtube.com/*

// By Erik Rasmussen (erikwordpressplugins AT gmail)
// ==/UserScript==
(function()
{
	window.addEventListener('load', function()
	{
		var regex = /https?:\/\/(www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_\-]+)&?.*/;
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
				var id = 'youTubeLinkPreview' + idCount++;
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
		var rotate = function(images)
		{
			for (var i = 0; i < images.length; i++)
				images[i].style.display = 'none';
			var shown = images.length - 1;
			var next = function()
			{
				images[shown].style.display = 'none';
				shown = (shown + 1) % images.length;
				images[shown].style.display = 'block';
				images.indexSpan.innerHTML = shown + 1;
			};
			next();
			return window.setInterval(next, 500);
		};
		var listen = function(link, videoId)
		{
			identify(link);
			link.style.position = 'relative';
			var offset = cumulativeOffset(link);
			var reposition = function(event)
			{
				var div = document.getElementById(link.id + '_youTubeLinkPreview');
				if(div && event.target == link)
				{
					div.style.left = (event.pageX - offset.left) + 'px';
					div.style.top = (event.pageY - offset.top) + 'px';
				}
			};
			link.addEventListener('mousemove', reposition, false);
			link.addEventListener('mouseover', function(event)
			{
				var div = document.getElementById(link.id + '_youTubeLinkPreview');
				if (!div)
				{
					div = document.createElement('div');
					div.id = link.id + '_youTubeLinkPreview';
					div.style.position = 'absolute';
					div.style.font = 'normal 0.7em verdana, arial, helvetica, sans-serif';
					div.style.zIndex = 1000;
					div.style.background = 'white';
					div.style.border = '1px solid #cccccc';
					var thumbnailsDiv = document.createElement('div');
					thumbnailsDiv.style.position = 'relative';
					div.appendChild(thumbnailsDiv);
					var thumbnails = [];
					for (var i = 0; i < 3; i++)
					{
						thumbnails[i] = document.createElement('img');
						thumbnails[i].src = 'http://i.ytimg.com/vi/' + videoId + '/' + (i + 1) + '.jpg';
						thumbnails[i].alt = 'Thumbnail #' + (i + 1);
						thumbnails[i].style.display = 'none';
						thumbnails[i].style.border = 'none';
						thumbnails[i].style.margin = '0';
						thumbnails[i].style.padding = '0';
						thumbnailsDiv.appendChild(thumbnails[i]);
					}
					thumbnails.indexSpan = document.createElement('span');
					thumbnails.indexSpan.innerHTML = '1';
					thumbnails.indexSpan.style.position = 'absolute';
					thumbnails.indexSpan.style.color = '#333333';
					thumbnails.indexSpan.style.backgroundColor = '#ffffff';
					thumbnails.indexSpan.style.padding = '3px';
					thumbnails.indexSpan.style.bottom = '0';
					thumbnails.indexSpan.style.left = '0';
					thumbnailsDiv.appendChild(thumbnails.indexSpan);
					// add footer
					var footer = document.createElement('div');
					footer.style.textAlign = 'center';
					footer.style.padding = '2px';
					footer.style.backgroundColor = '#eeeeee';
					var footerLink = document.createElement('a');
					footerLink.href = 'http://www.erik-rasmussen.com/blog/2008/12/28/flickr-link-preview-a-greasemonkey-script/';
					footerLink.style.color = '#000000';
					footerLink.appendChild(document.createTextNode('YouTube Link Preview'));
					footer.appendChild(footerLink);
					div.appendChild(footer);
					try
					{
						link.insertBefore(div, link.firstChild);
					}
					catch(e)
					{
						alert(e);
					}
					div.interval = rotate(thumbnails);
				}
				else
					div.style.display = 'block';
				reposition(event);
			}, false);
			link.addEventListener('mouseout', function()
			{
				var div = document.getElementById(link.id + '_youTubeLinkPreview');
				if (div)
				{
					div.style.display = 'none';
					if(div.interval)
						window.clearInterval(div.interval);
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
