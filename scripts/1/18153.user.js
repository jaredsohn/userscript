// ==UserScript==
// @name           iichan.ru popup
// @namespace      ('__'X)
// @description    iichan.ru popup
// @include        http://*.iichan.ru/*
// @include        http://iichan.ru/*
// @encoding       utf-8
// ==/UserScript==

if (location.hostname.match(/iichan\.ru$/))
{

	var zoomOutImgSrc = 'data:image/gif;base64,R0lGODdhDgAOAIQYAIwLC48ODpISEpcWFpsbG6AfH6UkJKopKa8uLp8zM7QzM6Q5Obg3N7w7O78+' +
			'PsFAQMdbW8tfX8WEhMaGht6ent+fn72+5P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAA' +
			'DgAOAAAFXKBVRU9pllFlUU7rvi0FNXR93XcDMXzf4zyFcCjEXYSIpBKBYyYP0CgOeoEaDJcr7so1' +
			'FAoX8O1L/hIIxrNaPRjg2vD4QmC8CO74xSTA7/v5ExYSCQCFhoUJEhYhADs=';
	var zoomInImgSrc = 'data:image/gif;base64,R0lGODdhDgAOAIQYAIwLC48ODpISEpcWFpsbG6AfH6UkJKopKa8uLp8zM7QzM6Q5Obg3N7w7O78+' +
			'PsFAQMdbW8tfX8WEhMaGht6ent+fn72+5P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAA' +
			'DgAOAAAFW6BVRU9pllFlUU7rvi0FNXTdXDbE7Px+9QyFcCi8EBWIpBJxaTaTh6jUKY0arlcnFlso' +
			'OJvdcJdAJl/KaMJgvb6w34OFYC640O+LSWDP7+8nFhIJAISFhAkSFiEAOw==';

	var waitImgSrc = 'data:image/gif;base64,R0lGODlhKwALAPEAAP///wAAAIKCggAAACH5BAEKAAAAIf4VTWFkZSBieSBBamF4TG9hZC5pbmZv' +
			'ACH/C05FVFNDQVBFMi4wAwEAAAAsAAAAACsACwAAAjKEjgjLltnYg/PFChveVvPLheA2hlhZoWYn' +
			'fd6avqcMZy1J14fKLvrEs/k+uKAgMkwVAAAh+QQBCgAAACwAAAAAKwALAAACPcSOCMsgD2FjsZqE' +
			'x6x885hh3veMZJiYn8qhSkNKcCy4B2vNsa3pJA6yAWUUGm9Y8n2Oyk7T4posYlLHrwAAIfkEAQoA' +
			'AAAsAAAAACsACwAAAj2EjgjLMA9hY6maalvcb+IPChO3eeF5jKTUoKi6DqYLwutMYzaJ58nO6flS' +
			'mpisNcwwjEfK6fKZLGJSqK4AACH5BAEKAAAALAAAAAArAAsAAAJAhI4Iy5bZ2JiUugcbfrH6uWVM' +
			'qDSfRx5RKnQnxa6p+w6xNpu1nY/9suORZENd7eYrSnbIRRMQvGAizhAV+gIUAAA7';

	var savedThumbs = [];

	function getElementsBy(f, tagName, root)
	{
		var i, candidateElements = root.getElementsByTagName(tagName);
		var matchElements = [];
		for (i in candidateElements)
		{
			if (f(candidateElements[i]))
				matchElements.push(candidateElements[i]);
		}
		return matchElements;
	}

	function $(id)
	{
		return document.getElementById(id);
	}

	function dump(o)
	{
		var s = '';
		for (prop in o)
		{
			s += prop + ':' + o[prop] + "\n";
		}
		alert(s);
	}

	function zoomOutImage(e)
	{
		var zoomOutButton = e.target;
		var zoomInButton = getElementsBy(function(el) { return el.name == 'zoomIn'}, 'img', zoomOutButton.parentNode)[0];
		var zoomedImage = getElementsBy(function(el) { return el.className == 'thumb'}, 'img', zoomOutButton.parentNode)[0];
		var link = getElementsBy(isThumbLink, 'a', zoomOutButton.parentNode)[0];
		savedThumbs[link.href] = zoomedImage.src;
		zoomedImage.src = link.href;
		zoomedImage.removeAttribute('height');
		zoomedImage.removeAttribute('width');
		zoomInButton.style.display = 'block';
		zoomOutButton.style.display = 'none';
	}

	function zoomInImage(e)
	{
		var zoomInButton = e.target;
		var zoomOutButton = getElementsBy(function(el) { return el.name == 'zoomOut'}, 'img', zoomInButton.parentNode)[0];
		var zoomedImage = getElementsBy(function(el) { return el.className == 'thumb'}, 'img', zoomInButton.parentNode)[0];
		zoomedImage.src = savedThumbs[zoomedImage.src];
		zoomInButton.style.display = 'none';
		zoomOutButton.style.display = 'block';
	}

	function setHintMessage(messageId, contentNode)
	{
		var tipTd = $('tiptd' + messageId);

		while (tipTd.firstChild)
		{
			tipTd.removeChild(tipTd.firstChild);
		}

		for (var childIndex = 0; childIndex < contentNode.childNodes.length; childIndex++)
		{
			var child = contentNode.childNodes[childIndex];
			if (child.tagName)
			{
				tipTd.appendChild(child.cloneNode(true));
				if (child.tagName.toLowerCase() == 'blockquote')
					break;
			}
		}

		addTipsToChildLinks(tipTd);
		addZoomButtonsToThumbs(tipTd);
	}

	function getMessageBodyFromOpMessage(href, messageId)
	{
		if ($('thread-' + messageId))
		{
			setHintMessage(messageId, $('thread-' + messageId));
			return;
		}

		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if (request.readyState == 4)
			{
				var responseXML = request.responseXML ?
						request.responseXML.document :
						(new DOMParser()).parseFromString(request.responseText, "text/xml");  // fix for fuckin' firefox
				setHintMessage(messageId, document.importNode(responseXML.getElementById('thread-' + messageId), true));
			}
		}
		request.open('GET', href, true);
		request.setRequestHeader('User-Agent', navigator.userAgent);
		request.setRequestHeader('Referer', href);
		request.setRequestHeader('Accept', 'application/xhtml+xml,application/xml,text/xml');
		request.setRequestHeader('X-Extension-UUID', 'ec9e3abf-72c1-45f1-ae32-d683f9a8a92a');
		request.send(null);
	}

	function getMessageBodyFromReply(href, messageId)
	{
		if ($('reply' + messageId))
		{
			setHintMessage(messageId, $('reply' + messageId));
			return;
		}

		var request = new XMLHttpRequest();
		request.onreadystatechange = function(evt)
		{
			if (request.readyState == 4)
			{
				var responseXML = request.responseXML ?
						request.responseXML.document :
						(new DOMParser()).parseFromString(request.responseText, "text/xml");  // fix for fuckin' firefox
				setHintMessage(messageId, document.importNode(responseXML.getElementById('reply' + messageId), true));
			}
		}

		request.open('GET', href, true);
		request.setRequestHeader('User-Agent', navigator.userAgent);
		request.setRequestHeader('Referer', href);
		request.setRequestHeader('Accept', 'application/xhtml+xml,application/xml,text/xml');
		request.setRequestHeader('X-Extension-UUID', 'ec9e3abf-72c1-45f1-ae32-d683f9a8a92a');
		request.send(null);
	}

	// function to calculate the coordinates of tip to be displayed
	function calculateTipPosition(e, table)
	{
		return { x: e.pageX + 'px', y: (e.pageY + 10) + 'px'};
	}

	function showTip(e)
	{
		var link = e.target;	// the mouseovered link

		// get message number from link
		var matchResult = link.href.match( /\/(\d+)\.html#?(\d+)?$/ );
		var messageId = matchResult[2] ? matchResult[2] : matchResult[1];

		// if this message is already being displayed - move it to above the current link
		if ($('tip' + messageId))
		{
			var table = $('tip' + messageId);
			var tipPos = calculateTipPosition(e, table);
			table.style.left = tipPos.x;
			table.style.top = tipPos.y;
			return;
		}

		var table = document.createElement('table');
		table.id = 'tip' + messageId;
		var tipPos = calculateTipPosition(e, table);
		table.setAttribute('style', 'position: absolute; top: '+tipPos.y+'; left: '+tipPos.x);
		table.setAttribute('cellspacing', '0');
		var tr = document.createElement('tr');

		var messageTd = document.createElement('td');
		messageTd.id = 'tiptd' + messageId;
		messageTd.setAttribute('class', 'reply');
		messageTd.setAttribute('style', 'border-color: black; border-right-width: 0; padding: 4px; -moz-border-radius-topright: 0; -moz-border-radius-bottomright: 0;');
		messageTd.innerHTML = '<img src="' + waitImgSrc + '">';

		var closeTd = document.createElement('td');
		closeTd.setAttribute('class', 'reply');
		closeTd.setAttribute('style', 'border-color: black; border-left-width: 0; vertical-align: top; padding: 4px;  -moz-border-radius-topleft: 0; -moz-border-radius-bottomleft: 0;');

		var closeA = document.createElement('button');
		closeA.addEventListener(
			'click',
			function()
			{
				var t = $('tip'+messageId);
				t.parentNode.removeChild(t);
			},
			false
		);
		closeA.setAttribute('style', 'width: 20px; height: 20px; font-weight: bold; padding: 0');

		closeA.appendChild(document.createTextNode('x'));
		closeTd.appendChild(closeA);
		tr.appendChild(messageTd);
		tr.appendChild(closeTd);
		table.appendChild(tr);
		document.body.appendChild(table);

		matchResult[2] ?
				getMessageBodyFromReply(link.href, matchResult[2]) :
				getMessageBodyFromOpMessage(link.href, matchResult[1]);
	}

	function addMouseEventListeners(link)
	{
		link.addEventListener('mouseover', showTip, false);
	}

	function isMessageLink(a)
	{
		if(!a.href) return false;
		if(!a.href.match( /iichan\.ru.*\/\d+\.html(#\d+)?$/ )) return false;
		return a.firstChild.data.match(/^>>\d+$/);
	}

	function addTipsToChildLinks(el)
	{
		// fetch all links to threads or messages
		var i, messageLinks = getElementsBy(isMessageLink, 'a', el);
		for (i in messageLinks)
		{
			addMouseEventListeners(messageLinks[i]);
		}
	}

	function createZoomButton(src, name, onclick)
	{
		var button = document.createElement('img');
		button.src = src;
		button.height = 14;
		button.width = 14;
		button.className = 'thumb zoomBtn';
		button.name = name;
		button.addEventListener('click', onclick, false);
		return button;
	}

	function refreshZoomButtonHandlers(span)
	{
		getElementsBy(function(el) { return el.name == 'zoomIn'}, 'img', span)[0].
				addEventListener('click', zoomInImage, false);
		getElementsBy(function(el) { return el.name == 'zoomOut'}, 'img', span)[0].
				addEventListener('click', zoomOutImage, false);
	}

	function isThumbLink(el)
	{
		if (!el.getElementsByTagName)
			return false;
		var imgs = getElementsBy(function(el) { return el.className == 'thumb' }, 'img', el);
		return imgs.length > 0;
	}

	function addZoomButtonsToThumbs(contextNode)
	{
		allImageLinks = getElementsBy(isThumbLink, 'a', contextNode);
		for (var i = 0; i < allImageLinks.length; i++)
		{
			var link = allImageLinks[i];
			// check if this image already has zoom buttons
			if (link.parentNode.className != 'expandSpan')
			{
				var span = document.createElement('span');
				span.className = 'expandSpan';
				span.style.cssFloat = 'left';

				var zoomOutButton = createZoomButton(zoomOutImgSrc, 'zoomOut', zoomOutImage);
				var zoomInButton = createZoomButton(zoomInImgSrc, 'zoomIn', zoomInImage);
				zoomInButton.style.display = 'none';

				link.parentNode.insertBefore(span, link);
				link.parentNode.removeChild(link);
				span.appendChild(zoomOutButton);
				span.appendChild(zoomInButton);
				span.appendChild(link);
			}
			else
			{
				refreshZoomButtonHandlers(link.parentNode);
			}
		}
	}

	function applyFeatures()
	{
		addTipsToChildLinks(document);
		addZoomButtonsToThumbs(document);
	}

	window.addEventListener(
		'load',
		function()
		{
			style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = '.expandSpan {float: left;} .expandSpan .thumb {float: none} .zoomBtn {display: block;}';
			document.body.appendChild(style);
			applyFeatures();
			setInterval(applyFeatures, 3000);
		},
		false
	);
}