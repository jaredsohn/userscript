// ==UserScript==
// @name           MangaHere Full Chapter Loader
// @namespace      sillymokona
// @include        http://www.mangahere.com/manga/*/*/*
// ==/UserScript==

var selects = document.getElementsByTagName("select");
var select = null;
for(var i = selects.length; --i >= 0; )
{
	if(selects[i].id == "")
	{
		select = selects[i];
	}
}
var container = document.getElementById("image").parentNode.parentNode;
while(container.firstChild) container.removeChild(container.firstChild);

if(select)
{
	for(var i = 0; i < select.options.length; i++)
	{
		var option = select.options[i];
		var url = option.value;
		var image = document.createElement("img");
		image.style.cssText = "margin: 10px";
		container.appendChild(image);
		getPage(url, image);
	}
}

// attempt to remove ads
var ad = document.getElementById("google_ads_div_MH-ROS-T-728x90_ad_container");
if(ad) ad.parentNode.removeChild(ad);
ad = document.getElementById("google_ads_div_MH-ROS-TR-160x600_ad_container");
if(ad) ad.parentNode.removeChild(ad);

function getPage(url, image)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var responseText = xhr.responseText;
			var matches = responseText.match(/<[^>]+id[^>]+"image"[^>]+>/);
			if(matches.length > 0)
			{
				var imgTag = matches[0];
				matches = imgTag.match(/"([^"]+)"/);
				if(matches.length > 1)
				{
					var src = matches[1];
					image.src = src;
				}
			}
		}
	};
	xhr.open("GET", url, true);
	xhr.send(null);
}