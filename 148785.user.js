// ==UserScript==
// @name           Boycott YouTube GooGle by MHK
// @namespace      Boycott YouTube GooGle by MHK
// @include        *
// @version	       0.1.2
// @run-at         document-start
// ==/UserScript==

var str=document.location.hostname;


if((str.indexOf('google') != -1) || (str.indexOf('youtube') != -1) || (str.indexOf('blogger.com') != -1) || (str.indexOf('blogspot.com') != -1))
{
	document.location="http://www.bing.com/";
}

function Boycott_gy()
{
	l=0;
	while (document.getElementsByTagName("embed")[l])
	{
		try
		{
			if(document.getElementsByTagName("embed")[l].src.indexOf("youtube.com/") != -1)
				{
				document.getElementsByTagName("embed")[l].parentNode.removeChild(document.getElementsByTagName("embed")[l]);
				}
		}
		catch(ex)
		{}
				l++;	
	}
	
	l=0;
	while (document.getElementsByTagName("param")[l])
	{
		if(document.getElementsByTagName("param")[l].value.indexOf("youtube.com/") != -1)
			{
			document.getElementsByTagName("param")[l].parentNode.parentNode.removeChild(document.getElementsByTagName("param")[l].parentNode)
			}
		l++;
	}

}

var intrvl2=self.setTimeout(function(){Boycott();},3000);

function Boycott()
{
	var obj = document.createElement("script");
	obj.type = "application/javascript";
	obj.innerHTML = Boycott_gy+'Boycott_gy();';
	document.body.appendChild(obj);
	var intrvl=self.setInterval(function(){Boycott_gy()},2000);
}