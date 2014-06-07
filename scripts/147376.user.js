// ==UserScript==
// @name        NoWatermark MarathonFoto Ver.
// @namespace   -
// @description Removes the watermark on MarathonFoto's images
// @include     http://www.marathonfoto.com/*
// @grant	None
// @version     1
// ==/UserScript==

s = "test = document.body.getElementsByTagName('iframe');if(test.length>0){source = test[0].contentDocument; imgs = source.getElementsByTagName('img');for(i=0;i<imgs.length;i++)if(imgs[i].className.indexOf('overlay') != -1)imgs[i].parentNode.removeChild(imgs[i]);}";

scripts = document.body.getElementsByTagName("script");
for(i = 0; i<scripts.length; i++){
	if(scripts[i].innerHTML.indexOf("doEnlarge") != -1){		//Found the right script tag
		searchW = "$.colorbox({width:\"480px\", height:\"725px\", scrolling:false, title:\"MARATHONFOTO\", iframe:true, href:myLink";
		startPos = scripts[i].innerHTML.indexOf(searchW);
		if(startPos>0){
			startPos += searchW.length;
			scripts[i].innerHTML = scripts[i].innerHTML.substring(0, startPos)+", overlayClose:false"+scripts[i].innerHTML.substring(startPos, scripts[i].innerHTML.length);
		}
	}
}

document.body.setAttribute("onKeyDown", "source = document.body.getElementsByTagName('img');for(i=0;i<source.length;i++){if(source[i].className.indexOf('overlay') != -1)source[i].parentNode.removeChild(source[i]);}  "+s);

theDiv = document.createElement("div");
theDiv.innerHTML = "Tack för att du använder <b>NoWatermark</b>.<br><br>Tryck ner valfri tangent för att dölja vattenstämpeln på bilderna som visas.<br><br><span style = 'font-size:11px;'>&copy; Matz Larsson 2012</span>";
theDiv.id = "nw_info";
tds = theDiv.style;
tds.position = "fixed";
tds.left = "1px";
tds.top = "40%";
tds.width = "12%";
tds.backgroundColor = "#DDD";
tds.border = "1px solid #000";
tds.zIndex = "10000";
tds.padding = "10px";
tds.fontFamily = "Geneva, Verdana, sans-serif";
tds.fontSize = "14px";
tds.cursor = "default";

if(document.getElementsByTagName("form").length > 0)document.body.appendChild(theDiv);