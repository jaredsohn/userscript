// ==UserScript==
// @name           GMX Menu Entry Remover
// @namespace      http://service.gmx.net
// @description    removes useless menu entries
// @include        http://service.gmx.net/*
// ==/UserScript==


var imgs = document.getElementsByTagName('li');

for (i=0; i<imgs.length; i++)
{

if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.attributes != null && imgs[i].childNodes[0].firstChild.attributes.length > 0 && imgs[i].childNodes[0].firstChild.attributes[0].nodeValue == "Produkte")
	{
		imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
	}
	
else	if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.attributes != null && imgs[i].childNodes[0].firstChild.attributes.length > 0 && imgs[i].childNodes[0].firstChild.attributes[0].nodeValue == "Themen")
		{
			imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
		}

else	if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.attributes != null && imgs[i].childNodes[0].firstChild.attributes.length > 0 && imgs[i].childNodes[0].firstChild.attributes[0].nodeValue == "Shopping")
		{
				imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
		}		

else	if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.attributes != null && imgs[i].childNodes[0].firstChild.attributes.length > 0 && imgs[i].childNodes[0].firstChild.attributes[0].nodeValue == "Entertainment")
		{
			imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
		}		
		
else if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.nodeValue == "MultiMessenger")
{
	imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
}
else if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.nodeValue == "Internet-Zugang")
{
	imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
}
else if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.nodeValue == "MailDomain")
{
	imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
}
else if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.nodeValue == "SicherheitsPaket")
{
	imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
}
else if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.nodeValue == "HomeBanking")
{
	imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
}
else if(imgs[i].childNodes[0].firstChild != null && imgs[i].childNodes[0].firstChild.nodeValue == "FotoService")
{
	imgs[i].childNodes[0].parentNode.removeChild(imgs[i].childNodes[0]);
}


}
