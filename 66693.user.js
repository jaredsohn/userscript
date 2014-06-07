// ==UserScript==
// @name           4chan post counter
// @namespace      JYC
// @description    Counts the number of posts and images the thread has
// @include        http://boards.4chan.org/*
// ==/UserScript==

var str = document.documentElement.innerHTML.toString();
// Only in reply pages
if(str.indexOf("Posting mode") != -1)
{
	var div;

	function setupDisplay()
	{
		div = document.createElement("div");
		div.setAttribute("id", "countDisplay");
		div.setAttribute("class", "reply");
		div.style.setProperty("left", "0px", "important");
		div.style.setProperty("bottom", "0px", "important");
		div.style.setProperty("border", "1px solid", "important");
		div.style.setProperty("color", "inherit", "important");
		div.style.setProperty("padding", "10px", "important");
		div.style.setProperty("position", "fixed", "important");
		
		document.body.appendChild(div);
	}

	setupDisplay();

	function refreshPostCount()
	{
		// Number of replies, easy
		// This is the >> next to all posts except OP
		var doubledashes = document.getElementsByClassName("doubledash");
		
		// Number of replies, harder
		// Backwash's messes up the reply and image count
		// so I'll have to use a hash to count the number of unique bumps and images
		var names = document.getElementsByClassName("commentpostername");
		var bumpHash = new Array();
		for(var i = 0; i < names.length; i++)
		{
			var mail = names[i].getElementsByClassName("linkmail");
			if(mail.length > 0 && mail[0].getAttribute("href") == "mailto:sage")
				continue;
			
			var node = names[i].nextSibling;
			while(node)
			{
				if(node.nodeType == 1)
				{
					if(node.getAttribute("id") &&
						node.getAttribute("id").indexOf("norep") == 0)
					{
						bumpHash[node.getAttribute("id")] = true;
						break;
					}
				}
				node = node.nextSibling;
			}
		}
		
		// Counting hash size: http://stackoverflow.com/questions/5223/length-of-javascript-associative-array
		
		var key, numBumps = 0;
		for(key in bumpHash)
		{
			if(bumpHash.hasOwnProperty(key))
				numBumps++;
		}
		
		// Images
		var filesizes = document.getElementsByClassName("filesize");
		var imageHash = new Array();
		for(var i = 0; i < filesizes.length; i++)
		{
			var span = filesizes[i].childNodes;
			for(var j = 0; j < span.length; j++)
			{
				if(span[j].tagName == "A")
				{
					imageHash[span[j].innerHTML] = true;
				}
			}
		}
		
		// Counting hash size: http://stackoverflow.com/questions/5223/length-of-javascript-associative-array
		
		var key, numImages = 0;
		for(key in imageHash)
		{
			if(imageHash.hasOwnProperty(key))
				numImages++;
		}
		
		div.innerHTML = "<div>" + doubledashes.length + " replies / " + numBumps + " bumps / " +
							(doubledashes.length - numBumps) + " sages / " + numImages + " images</div>";
	}

	refreshPostCount();

	document.body.addEventListener('DOMNodeInserted',
		function (e)
		{
			var target = e.target;
			if(target.nodeName == 'TABLE')
				refreshPostCount();
		},
		true);
}