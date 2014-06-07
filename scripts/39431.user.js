// ==UserScript==
// @name           FlashbackLogo
// @namespace      FlashbackLogo
// @description    FlashbackLogo
// @include	http://www.flashback.info*
// @include	http://flashback.info*
// @include	https://www.flashback.info*
// @include	https://flashback.info*
// ==/UserScript==

var replaceLoggo =	 	true;
var BytLogo = document.getElementsByTagName('img');
if (replaceLoggo)
	ReplaceLoggo();	

function ReplaceLoggo()
{	
	try
	{

		for (var i=0; i<BytLogo.length; i++)
		{
			if ((BytLogo[i].src.indexOf("img/misc/fb/logo.gif") != -1) )
			{
				BytLogo[i].src = "http://i40.tinypic.com/2v0frqd.jpg" ;
				break;
			}	
		}
	}
	catch (e)
	{
		GM_log("Fel i ReplaceLogo\n" + e);
	}
}