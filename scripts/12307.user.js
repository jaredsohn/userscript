// ==UserScript==
// @name           Google Note Book RTL
// @namespace      googleNotebookRtl
// @include        http://www.google.com/notebook/*
// @include        http://mail.google.com/notebook/*
// ==/UserScript==

function getStyleClass (className) {
	for (var s = 0; s < document.styleSheets.length; s++)
	{
		if(document.styleSheets[s].rules)
		{
			for (var r = 0; r < document.styleSheets[s].rules.length; r++)
			{
				if (document.styleSheets[s].rules[r].selectorText == '.' + className)
				{
					return document.styleSheets[s].rules[r];
				}
			}
		}
		else if(document.styleSheets[s].cssRules)
		{
			for (var r = 0; r < document.styleSheets[s].cssRules.length; r++)
			{
				if (document.styleSheets[s].cssRules[r].selectorText == '.' + className)
					return document.styleSheets[s].cssRules[r];
			}
		}
	}
	
	return null;
}

var alreadyAdded=false;
rtlFrames=function () {
	//var iframes = document.getElementsByTagName("IFRAME"); 
	//alert(iframes.length);
	//var alreadyAdded;
	if (alreadyAdded==false) {
		iframes=window.frames;
		for (var i = 0; i < iframes.length; i++) { 
			iframe=iframes[i];
			if (iframe) if (iframe.document) {
				//iframe.document.body.style.direction='rtl';
				//alert(iframe.document);
				var s=iframe.document.styleSheets[0];
				s.insertRule("body,font,.editorBody,ul {direction:rtl;font-family:tahoma}", 0);
				//alreadyAdded=true;
			}
		}
		
	}
}

window.addEventListener("load", function(e) {
	//document.getElementById('gn3_2').style.direction='rtl';
	//var cssObject=getStyleClass('frame');
	//if (!cssObject) {
	var s=document.styleSheets[0];
	s.insertRule("ul,.ub,.sc,.ba lc,iframe {direction:rtl;font-family:tahoma}", 0);
	
	//setTimeout(rtlFrames,5000);
	window.addEventListener("click", function(e) {
		rtlFrames();
	},false);
	//}
	//cssObject.style.direction='rtl';
}, false);