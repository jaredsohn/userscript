// ==UserScript==
// @name           Codeleakers stop admin song
// @version        1.0
// ==/UserScript==


function replacesignature(selector, content) {
	var nodeList = document.querySelectorAll(selector);
	for (var i = 0, length = nodeList.length; i < length; i++)
	{
		var sig = nodeList[i].innerHTML;
		if( sig.indexOf("autoplay=1") != -1 )
			nodeList[i].innerHTML = content;
	}
}

if( window.location.href.indexOf("codeleakers") != -1 )
{
	replacesignature(".signaturecontainer", "<p style='color:red;text-align:center;font-weight:bold;font-size:40px;'>Signaure Removed Due To Music</p>");
}

