// ==UserScript==
// @name           Undertexter.se Url Fix
// @namespace      http://www.fixadatorn.nu/monkeyscripts
// @description    Changes ut.se's subtitle urls to get direct downloads.
// @include        http://www.undertexter.se*
// ==/UserScript==

urls = document.getElementsByTagName('a');

for(i=0;i<urls.length;i++)
{
	var oldUrl = urls.item(i).href;
	if(oldUrl.match(/p=subark&/))
	{
	    var orginal=urls.item(i);
		var newUrl = oldUrl.replace("?p=subark&","txt.php?");
		var a = document.createElement('a');
		var img = document.createElement('img');
		a.setAttribute("href", newUrl);
		img.setAttribute("border","0");		
		img.setAttribute("src","http://tbn0.google.com/images?q=tbn:Se9VoBn_4ujmWM:http://www.ces.philips.com/graphic/icon-download-small.gif");
		a.appendChild(img);
		orginal.parentNode.appendChild(a);
	}
}


