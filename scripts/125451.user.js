// ==UserScript==
// @name           replace youtube
// @namespace      http://userscripts.org/users/214841
// @description    Reescreve todos os links que possuem youtube.com para outro aceito pelo proxy.
// @include        *
// @exclude        (http://)?(www.)?youtube[(.com(.br)?)|(.be)]
// @exclude        (http://)?(www.)?youtu.be
// @grant           none
// ==/UserScript==

var re = new RegExp("(www\.)?youtube\.com(\.br)?", "gi");
var youtubeAlternativo = "youtu.be.";

var links = document.links;

for(var i=0; i<links.length; i++) 
{
	//window.alert(re.test(links[i].href) + " - " + links[i].href );
	if(re.test(links[i].href))
	{
		links[i].href = links[i].href.replace(re, youtubeAlternativo);
	}
}

var iframes = document.getElementsByTagName('iframe');

for (var i=0; i<iframes.length; i++)
{
	if(re.test(iframes[i].src))
	{
		iframes[i].src = iframes[i].src.replace(re, youtubeAlternativo);
	}
}