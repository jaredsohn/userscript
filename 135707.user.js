// ==UserScript==
// @name          pixiv direct original image link
// @namespace     pixiv
// @version       1.2
// @updateURL     http://userscripts.org/scripts/source/135707.user.js
// @homepage      http://userscripts.org/scripts/show/135707
// @match         http://www.pixiv.net/member_illust.php*id*
// @match         http://*.pixiv.net/img*
// @run_at        document_end
// @run-at        document-end
// @grant         none
// ==/UserScript==

if(document.location.hostname != "www.pixiv.net") // manga fix
{
	if(document.referrer.indexOf("http://www.pixiv.net/member_illust.php?id=") == 0 && document.body.innerHTML.indexOf("This Page is Not Found") == 4)
	{
		var newpage = document.location.href.substr(document.location.href.lastIndexOf("/")+1);
		newpage = newpage.substring(0, newpage.indexOf('.'));
		document.location.replace("http://www.pixiv.net/member_illust.php?mode=manga&illust_id=" + newpage);
	}
	return false;
}

var allImgs, thisImg, src, txt, elmNewContent, profIMG, mangafix = false;

profIMG = document.evaluate("//img[@class='user-image']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.src;
if(profIMG.indexOf("http://source.pixiv.net") == -1)
{
	profIMG = profIMG.substring(0, profIMG.lastIndexOf('/')) + "/";
	profIMG = profIMG.replace('profile', 'img');
}
else // no avatar, use BG
{
	var fn;
	var f = document.getElementsByTagName("style");
	for(c=0;c<f.length;c++) 
	{
		fn = f[c].innerHTML.indexOf('url(');
		if(fn != -1)
		{
			profIMG = f[c].innerHTML.substr(fn+5, f[c].innerHTML.indexOf(')', fn+6)-fn-6);
			profIMG = profIMG.replace('/profile/', '/img/');
			profIMG = profIMG.substring(0, profIMG.lastIndexOf('/')+1);
			break;
		}
	}
}

allImgs = document.evaluate("//img[@class='_thumbnail']", document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null); 

for (var i = 0; i < allImgs.snapshotLength; i++) 
{
    var thisImg = allImgs.snapshotItem(i);
	var number = thisImg.src.substr(thisImg.src.lastIndexOf("/")+1);
	number = number.replace('_s', '');
	
	var src = profIMG + number;
		
	var link = thisImg.parentNode.href;
	
	thisImg.parentNode.href = src;
	thisImg.parentNode.target = "_blank";
	
	var txt = thisImg.nextSibling.textContent;
	thisImg.nextSibling.textContent = "";
	
	var elmNewContent = document.createElement('a');
	elmNewContent.textContent = txt;
	elmNewContent.href = link;
	elmNewContent.target = "_blank";
	thisImg.parentNode.parentNode.appendChild(elmNewContent)
}
