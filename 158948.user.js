// ==UserScript==
// @name           Enlarge profile images on OKCupid match results
// @description    Enlarge profile images on OKCupid match results
// @include        http://www.okcupid.com/match?*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

GM_addStyle("a.user_image { width: auto !important; height: auto !important; }");

window.setInterval(enlargeImages,200);

function enlargeImages()
{
	$("img").each(function()
	{
		if ($(this).attr("width") == "82")
		{
			$(this).attr("width","250");
			$(this).attr("height","250");
			$(this).attr("src", $(this).attr("src").replace(/82x82/g,"250x250"));
		}
	});
}