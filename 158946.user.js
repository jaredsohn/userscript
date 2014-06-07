// ==UserScript==
// @name           Enlarge profile images on onlyu.co.il match results
// @description    Enlarge profile images on onlyu.co.il match results
// @include        http://www.onlyu.co.il/i_partner_search.asp*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

enlargeImages();

function enlargeImages()
{
	$("img").each(function()
	{
		if (this.id && this.id.substr(0,3) == "Big")
		{
			$(this).removeAttr("width");
			$(this).removeAttr("height");
		}
	});
}