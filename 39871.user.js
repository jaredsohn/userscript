// ==UserScript==

// @name           ˀ twitfave link

// @namespace      http://

// @description    Adds a button on Twitter profile pages to follow users' Twitfave profile

// @include        http*://twitter.com/*
// @author        innit4theminute
// @licence       (cc) attribution by-nc
// @version       1 (2009-01-05)
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

		img.setAttribute("src", "data:image/png");

		img.setAttribute("width", "20");

		img.setAttribute("height", "20");

		an = document.createElement("a");
		an.href="http://twitfave.com/"+uName;

		an.appendChild(img);

		an.innerHTML+="ˀtFav ";

		thumb.parentNode.insertBefore(an, thumb.nextSibling);

	}

		}, true);