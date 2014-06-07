// ==UserScript==
// @name           imgsrc.ru => get all image links
// @namespace      #avg
// @include        http://*imgsrc.ru/*
// @version        0.3.6
// ==/UserScript==
GM_addStyle("body > a {clear:both;float:left;}");  // css hack to display links on new lines
var addImg=function(text) {            // generic image adder handler
		link=document.createElement("a");
		link.innerHTML=text.match(/description.+, ([^"]+)/)[1];
		link.href=text.match(/class=big src=(\S+)/)[1];
		document.body.appendChild(link);
    },
    requestPic=function(img){   // set-up single image handler
    GM_xmlhttpRequest({method: 'GET',url: img,onload:function(a) {addImg(a.responseText)}})
    };

var pix=document.evaluate("//tr//a[contains(@href,'#pic')]",document,null,6,null),i=0;
while(pik=pix.snapshotItem(i++))
   requestPic(pik.href);   //add images currently on the page

var galleries=document.evaluate("//td[@colspan='8']/a",document,null,4,null); //get all other galleries
while(gallery=galleries.iterateNext().href)
GM_xmlhttpRequest({
	method: "GET",
	url:gallery,
	onload:function(a)
	{
	  addImg(a.responseText);      // add the image on the first page
	  var pics=a.responseText.match(/\/.+#pic/g), i=0, base=location.protocol+"//"+location.host;

	  while(pic=pics[i++])              // lookup other images within the
   		requestPic(base+pic);       // gallery of this loop.
	}
})