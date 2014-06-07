// ==UserScript==
// @name           126 email remove ad
// @description   Automatically close ad.
// @author         gqy117
// @include        http://*.mail.126.com/
// @version        1.0
// ==/UserScript==



function CloseADS()
{
	var adsClose = document.getElementById($(".oI").children("a").eq(2).attr("Id"));
	if(adsClose != null)
	{
		adsClose.click();
	}
}

setTimeout(CloseADS, 3000);

