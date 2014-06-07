// ==UserScript==
// @name           Mako VOD
// @namespace      http://novik.ca
// @description    Allows Mac users to watch Mako VOD
// @include        http://www.mako.co.il/*
// ==/UserScript==

/*
	Basically, this script will replace the embedded video plugin with a link to the actual movie. Simply copy-paste that link into VLC and you can watch the show.
	If anyone knows how to make VLC open this link automatically without any need to copy-paste it - please let me know.
	
	- Gilad Novik
	
	
	Credits: I got the idea from One Vids Enabler by ZoRAXE, I give him credits for my script :)

*/

(function()
{
	var res = document.evaluate("//iframe[contains(@src,'clipurl=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (res.snapshotLength == 1)
	{
		var iframe = res.snapshotItem(0);
		var src = unescape(iframe.src.split("clipurl=")[1]);
		var host = src.split("?")[0];
		var clip = src.match(/(ClipMediaID=[\d]+)/i)[1];
		var url = host + "?" + clip;
		//alert(url);
		
		var vidDiv = document.createElement("div");
		vidDiv.id = "videoDiv";
		vidDiv.style.height = iframe.height;
		vidDiv.style.width = iframe.width;
		vidDiv.style.cssText += "text-align:center; background-color: #5A7DB5; margin-top: 15px";
		vidDiv.innerHTML +=
			"<div style='background-color: #38639A; color: white; border-bottom: 1px solid white; height: 20px'>" +
			"<h1 style='font-size: 15px; margin: 0 auto; padding-top: 3px'>" +
			"Mako VOD" + 
			"</h1></div>";

		var vidObj = document.createElement("a");
		vidObj.id = "videoLink";
		vidObj.href = url;
		vidObj._target = "_blank";
		vidObj.innerHTML = "Click here to start playing...";
		vidDiv.appendChild(vidObj);

		iframe.parentNode.replaceChild(vidDiv, iframe);

	}
})();