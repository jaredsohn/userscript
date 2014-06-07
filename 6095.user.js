// ==UserScript==
// @name           OnClick Warning
// @description    Add warning image to a link when it runs a script onclick, onmousedown or onmouseup
// @include        http://*
// @include        https://*
// ==/UserScript==

var protocol = window.location.protocol;
if (protocol.indexOf("http") == -1)
	return;			// do not handle non-web requests

// Image
var scriptImg = "data:image/png;base64,"+
"iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0"+
"U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGBSURBVHjaLFDPKwRxHH2z853VYGll/YhC"+
"a/xuFYVaHFiROLjsyUVSbpuDk+Ls7OhvcCGE7EErB4qkZJNld7ZtjZkd1uyssTNjZterV6/3eb0+"+
"PcowDNigKAo8H0coFFoUxayYSLweJ5N80bdBVFUtCULw+anUN3scq9BUOabjyrJl/INEo9GSoghu"+
"by62tpbdfiElYH4tu1HQsc6Q0pkOBAJQFAWx2Nu0r/FlW3p/JpKYQjX74wtfyxFd1+MWAbtxb2+/"+
"Yndn88rk18yZsUZzoNNpxg76TB/HRqwyl93o4DgOv4V8sKdZGgGTgYs1UFdThlYvi5UFj58h1Fwx"+
"eB6+KM+m75aHuC/r9RQmB1mMD1gleQOz/ir0etkVK+d0fIjCcIcnMURoCdBkHF5mcBj5Qi5nwF1F"+
"IzjlHrUmGqVbmmqXuhviE9q3AD75ja42Fv5+FxRVh5CxKOl0+Dr7SO4fnk5Pjm69lU61HRTNOhkw"+
"9sQ/mlnIa6bMp7WoVjDO/gQYAGCapsqO4grKAAAAAElFTkSuQmCC";

function main()
{	
	var input = document.evaluate('//a[@href]',
									document,
									null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null);
									
	if (input)
	{
		var link;
		for (var i = 0; i < input.snapshotLength; ++i)
		{		
			a = input.snapshotItem(i);
			if(a.getAttribute("onClick")!=null 
				|| a.getAttribute("onmousedown")!=null
				|| a.getAttribute("onmouseup")!=null 
				|| a.getAttribute("href").substring(0,10) == "javascript")
			{					
				a.style.background = "url(" + scriptImg + ") right center no-repeat";
				a.style.paddingRight = "10px";								
			}						
		}		
	}	
}
main();