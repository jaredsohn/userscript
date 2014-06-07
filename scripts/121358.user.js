// ==UserScript==
// @name           Yad2 Ad update
// @namespace      yad2
// @description    Simulates click on "kaftor3"
// @include        http://my.yad2.co.il/MyYad2/MyOrder/Yad2.php
// ==/UserScript==
// Use chromium-browser --enable-easy-off-store-extension-install to install offline 
// in Chrome


function updateAd(idNum)
{
	// Something like this "http://my.yad2.co.il/MyYad2/MyOrder/Yad2Details.php?SalesID=5406501&Up=u"
	locationHref="http://my.yad2.co.il/MyYad2/MyOrder/Yad2Details.php?SalesID="+idNum+"&Up=u";
	javascript:iframe=document.createElement("iframe");
	iframe.setAttribute("id", "iframeu"+idNum);
	iframe.setAttribute("src", locationHref);
	iframe.setAttribute("width", "100%");
	iframe.setAttribute("height", "850");
	iframe.setAttribute("src", locationHref);
	document.body.appendChild(iframe);
}

function removeAd(idNum)
{
  iframe = document.getElementById("iframeu"+idNum)
  if (iframe)
  {
	   document.body.removeChild(iframe);
  }
}

function updateAds(command)
{
	var idRegExp  =  new RegExp("Txt_([0-9]+)");
	var tds = document.getElementsByTagName("TD");
	idNumPrev = 0;
  idFirst = 1;
	idHandled = 0;
	for (var i = 0;i < tds.length; i++) 
	{
		td = tds[i];
		matchId = idRegExp.exec(td.id);
		if (!matchId)
		{
			continue;
		}
		idNum = matchId[1];
		if (!idNum)
		{
			continue;
		}
		if (idNum == idNumPrev)
		{
			continue;
		}

		if (command == "rm")
		{
			window.setTimeout("removeAd("+idNum+")", 100);
		}
		else if (command == "mk")
		{
			loadTime = idHandled*5*1000;
			window.setTimeout("updateAd("+idNum+")", loadTime);
			if (idFirst == 1)
			{
				window.setTimeout("updateAd("+idNum+")", loadTime+1000);
				idFirst = 0;
			}
		}
		else
		{
			window.setTimeout("removeAd("+idNum+")", 100);
			loadTime = idHandled*5*1000;
			window.setTimeout("updateAd("+idNum+")", loadTime);
		}
		idHandled = idHandled + 1;
		idNumPrev = idNum;
	}
}

unsafeWindow.removeAd = removeAd;
unsafeWindow.updateAd = updateAd;
unsafeWindow.updateAds = updateAds;
unsafeWindow.updateAds("rm");
unsafeWindow.updateAds("mk");