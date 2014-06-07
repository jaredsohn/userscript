// ==UserScript==
// @name           What.CD Ratio Stats
// @namespace      What.CD-Ratio-Stats
// @description    Adds a projected ratio next to file size
// @author         sparq
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// @version        0.1
// @date           2011-03-31
// ==/UserScript==

url = window.location.href.split("?")[0].toLowerCase();
urlSplit = url.split("/");
page = urlSplit[urlSplit.length-1];
var sizePos


if(page == "torrents.php" || page == "artist.php")
{
	if(page == "torrents.php")
		sizePos = 7;
	else
		sizePos = 3;
		
	up = document.getElementById('stats_seeding').childNodes[2].childNodes[0];
	up = up.textContent;
	upUnits = up.substr(up.length-2);
	up = up.slice(0,up.length-3);
	up = parseInt(up);
	if(upUnits == "GB")
		up = up * 1024;
	else if(upUnits == "KB")
		up = up / 1024;
	else if(upUnits == " B")
		up = up / 1048576;
	

	down = document.getElementById('stats_leeching').childNodes[2].childNodes[0];
	down = down.textContent;
	downUnits = down.substr(down.length-2);
	down = down.slice(0,down.length-3);
	down = parseInt(down);
	if(downUnits == "GB")
		down = down * 1024;
	else if(downUnits == "KB")
		down = down / 1024;
	else if(downUnits == " B")
		down = down / 1048576;

	trnTbl = document.getElementsByClassName('group_torrent');

	for(i = 0; i < trnTbl.length; i++)
	{
		if(trnTbl[i].childNodes.length > 4)
		{
			fSize = trnTbl[i].childNodes[sizePos].childNodes[0].textContent;
			fSizeUnits = fSize.substr(fSize.length-2);
			fSizeNum = parseInt(fSize.slice(0,fSize.length-3));
			if(fSizeUnits == "GB")
				fSizeNum = fSizeNum * 1024;
			else if(fSizeUnits == "KB")
				fSizeNum = fSizeNum / 1024;
			else if(fSizeUnits == " B")
				fSizeNum = fSizeNum / 1048576;
			
			trnTbl[i].childNodes[sizePos].childNodes[0].textContent = fSize + " (PR " + Math.round((up / (down + fSizeNum))*100)/100 + ")";
		}
	}
}
