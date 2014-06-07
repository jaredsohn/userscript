// ==UserScript==
// @name           TV Azteca videos
// @namespace      http://www.invitrodigital.com/
// @description    TV Azteca videos, telenovelas, programas, etc.
// @include        http://www.tvazteca.com/*
// @include        http://tvazteca.com/*
// ==/UserScript==



 window.setTimeout(function() 
						{
							document.getElementById("nav1divbanner").style.display="none"; /* QUITAMOS EL BANNER SUPERIOR*/
							
							document.getElementById("boxBanner").style.display="none";
							document.getElementById("oasX72").style.display="none";
							document.getElementById("oasX73").style.display="none";
							document.getElementById("oasX74").style.display="none";
							document.getElementById("oasX75").style.display="none";
						}, 60);


						
var obj = document.getElementsByTagName("object");
var i=0;
for (i=0;i<=obj.length;i++)
	{
		if (obj[i].width == "950")
			{
				obj[i].width = 1700;
				obj[i].height= 1300;
				obj[i].style.left="-500px";
				break;
			}
	}
