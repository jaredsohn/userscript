// ==UserScript==
// @name           getlinks
// @namespace      getlinks
// @author         seyit konukcu
// @include        *
// @version        1.2.1
// ==/UserScript==
try
{
	var Links = document.links;
	var linkSayisi = Links.length;
	var downloadLinks = new Array();
	var stil = "position:fixed;top:0px;font:1.0em Verdana,Helvetica,sans-serif;padding:10px;height:auto;width:auto;z-index:99;background:#FFF8C6;";

	for (var i=0; i<linkSayisi; ++i)
	{
		if(Links[i].href.match(/http(s)?\:\/\/(www\.)?rapid|netload|uploaded|ul.to|freakshare|safelinking|bit|rockdizfile.+/g) 
		&& (!Links[i].href.match(/.+ref|register|folder|partner.+/g)))
		{
			downloadLinks.push(Links[i]);		
		}
	}

	var downloadLinksSayi = downloadLinks.length;
	
	if ( downloadLinksSayi > 0)
	{
		var d = document.createElement('div');
		d.setAttribute("style", stil);
		d.innerHTML += document.getElementsByTagName('title')[0].innerHTML+"<br />\n";
		d.innerHTML += document.location.href+"<br /><br />\n";
		for (var j=0; j<downloadLinksSayi; ++j)
		{
			d.innerHTML += downloadLinks[j] + "<br />\n";
		}
		document.body.appendChild(d);
	}
	
	

}
catch(e)
{
//	alert(e);
}