// ==UserScript==

// @name           ˀ twitter counter link

// @namespace      http://userscripts.org

// @description    Adds link to ˀ Twitter.Counter profile from Twitter profile pages. Is a modification of script by Abhisek. If you do better one I'll delete.

// @include        http*://twitter.com/*

// ==/UserScript==

window.addEventListener('load', function()

	{

	if(document.body.id=='profile')

	{

	h2s = document.getElementsByTagName("h2");

	loc = window.location;

	tmparr = loc.toString().split("/");

	uName=tmparr[3];

	for(i=0;i<h2s.length;i++)

		{

		if(h2s[i].className=='thumb')

			{

			thumb = h2s[i];

			break;

			}

		}

		img = document.createElement("img");

		img.setAttribute("src", "data:image/png, ");

		img.setAttribute("width", "20");

		img.setAttribute("height", "20");

		an = document.createElement("a");

		an.href="http://www.twittercounter.com/?username="+uName;

		an.appendChild(img);

		an.innerHTML+="÷tCntr ";

		thumb.parentNode.insertBefore(an, thumb.nextSibling);

	}

		}, true);