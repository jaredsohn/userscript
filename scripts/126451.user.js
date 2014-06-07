// ==UserScript==
// @name           Manga Reader Full Chapter Loader
// @namespace      sillymokona
// @include        http://www.mangareader.net/*/*
// ==/UserScript==

var imageHolder = document.getElementById("imgholder");
var pageMenu = document.getElementById("pageMenu");

// Check if image container and page select is existing
if(imageHolder && pageMenu)
{
	while(imageHolder.firstChild) imageHolder.removeChild(imageHolder.firstChild)

	for(var pageIndex = 0; pageIndex < pageMenu.options.length; pageIndex++)
	{
		var pageMenuOption = pageMenu.options[pageIndex];
		var path = pageMenuOption.value;
		var url = path;
		var image = document.createElement("img");
		image.style.cssText = "margin: 10px";
		imageHolder.appendChild(image);
		getPage(url, image);
	}
}

// Remove ads if present
var adTop = document.getElementById("adtop");
if(adTop)
{
	adTop.parentNode.removeChild(adTop);
}

var adFooter = document.getElementById("adfooter");
if(adFooter)
{
	adFooter.parentNode.removeChild(adFooter);
}

function getPage(url, image)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var responseText = xhr.responseText;
			var matches = responseText.match("<img[^>]+id[^>]+\"img\"[^>]+>");
			if(matches && matches.length > 0)
			{
				var match = matches[0];
				var imageURL = match.match("\"(http://[^\"]+)\"");
				if(imageURL && imageURL.length > 1)
				{
					imageURL = imageURL[1];
					image.src = imageURL;
				}
			}
		}
	};
	xhr.open("GET", url, true);
	xhr.send(null);
}