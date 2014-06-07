// ==UserScript==
// @name           VKDL
// @namespace      download
// @description    Downloads VK music
// @include        http://vk.com/gsearch.php?*
// ==/UserScript==

function addDownloadButtons()
{
	var p=document.getElementsByClassName("playimg"),i,h,r,t;
	for(i=0;i<p.length;i++)
	{
		h=p[i].parentNode;
		var data=p[i].getAttribute("onclick");
		r=data.match(/operate\(\d+,(\d+),(\d+),'(\w+)'/);
		if(!r) continue;
		var t=r[2].toString();
		while(t.length<5) t="0"+t;
		var url="http://cs"+r[1]+".vk.com/u"+t+"/audio/"+r[3]+".mp3"
		var link=document.createElement("a");
		var img=document.createElement("img");
		img.setAttribute("src","data:image/gif;base64,R0lGODlhEAARAJEAAFp5nJy2xv///////yH5BAEAAAMALAAAAAAQABEAAAInXICpGLafDpxPWEEzvVhzDXwTR3ZLaW2kd4Gh6UIS2MxUM+T6zg8FADs=");
		link.appendChild(img);
		link.setAttribute("href",url);
		h.appendChild(link);
		h.style.width="auto";
	}
}

var w,u;
try{w=unsafeWindow;}
catch(e){w=window;}
u=w.updatePage;
w.updatePage=function()
{
	u.apply(this,arguments);
	addDownloadButtons();
}

addDownloadButtons();