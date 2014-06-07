// ==UserScript==
// @name           Youtube Prevent Search
// @namespace      http://userscripts.org/users/1331
// @description    Prevents youtube videos from displaying the search bar
// @include        http://*
// @include        https://*
// ==/UserScript==

embeds = document.getElementsByTagName("embed")
for (i = 0; i < embeds.length; i++)
{
	console.log("Embed: %o", embeds[i])
	var srcAttribute = embeds[i].getAttribute("src")
	console.log("src: %o", srcAttribute)
	if (srcAttribute.indexOf("youtube.com/") != -1)
	{
		console.log("replaced attrib")
		embeds[i].setAttribute("src", srcAttribute + ";&showsearch=0")
	}
}


