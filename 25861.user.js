// ==UserScript==
// @name           GameFaqs image thing
// @namespace      http://www.gamefaqs.com
// @description    hop to next image
// @include        http://www.gamefaqs.com/*/*/image/*.html?g*
// ==/UserScript==

var mainColDiv = document.getElementById('main_col');
if (mainColDiv) {
	var href = window.location.href.replace(/(^.*g.=)[0-9]+/, '$1');
	var id = parseInt(window.location.href.replace(/^.*g.=([0-9]+)/, '$1'));
	var nextId = id + 1;
	var prevId = id - 1;
	var allDivs = mainColDiv.getElementsByTagName("div");
	var prevImage = document.createElement("a");
	prevImage.setAttribute('href',  href+prevId);
	prevImage.appendChild(document.createTextNode("<<< Previous")); 
	var nextImage = document.createElement("a");
	nextImage.setAttribute('href',  href+nextId);
	nextImage.appendChild(document.createTextNode("Next >>>")); 
	var para = document.createElement("p");
	para.setAttribute("align", "center");
	if (prevId > 0)
	{
		para.appendChild(prevImage);
		para.appendChild(document.createTextNode(" --- "));
	}
	para.appendChild(nextImage);
	for (var i = 0; i < allDivs.length; i++)
	{
		var thisdiv = allDivs[i];
		if (thisdiv.className == "body")
		{
			// here
			thisdiv.appendChild(para);
			break;
		}
	}
}
