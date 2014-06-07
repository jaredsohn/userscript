// ==UserScript==
// @name           TED - all videos on one page
// @namespace      davidfichtmueller.de
// @description    load all ted videos in one list
// @include        http://www.ted.com/talks/list/page/all
// @license        GPL 2
// @version        0.1
// ==/UserScript==
// author          David Fichtmueller (david (at) fichtmueller (dot) de)
//
// based on Code from Firefox Addon Customize Google: https://addons.mozilla.org/en-US/firefox/addon/743

var pagination = document.evaluate("//div[@class='pagination clearfix']/p", document, null, 9, null).singleNodeValue.innerHTML;
var findNumber = new RegExp("[0-9]+$");
var pageNumber = parseInt(findNumber.exec(pagination));
var pageCounter = 0;


var loadNextPage = function()  {
	if(pageCounter<pageNumber){
		pageCounter++;
		
		var newUrl = "http://www.ted.com/talks/list/page/"+pageCounter;
		var iframe = document.createElement("iframe");
		iframe.width = 30;
		iframe.height = -10;
		iframe.style.margin = "0 0 0 1px";
		iframe.style.position = "absolute";
		iframe.style.top = -100;
		iframe.style.left = 0;
		document.body.appendChild(iframe);
		
		storageContainer = document.evaluate("//div[@class='talkListContainer horiz clearfix']", document, null, 9, null).singleNodeValue;
		iframe.src = newUrl;
		iframe.addEventListener("load", function() {
			var iframeContent = iframe.contentDocument;
			var list = iframeContent.evaluate("//div[@class='talkListContainer horiz clearfix']/dl", iframeContent.body, null, 6, null);
			if (list.snapshotLength>0) {
				for (var i = 0; i < list.snapshotLength; i++) {
					storageContainer.appendChild(list.snapshotItem(i));
				}
			}
			
			iframe.src = "";
			document.body.removeChild(iframe);
			
			var h2 = document.evaluate("//h2", document, null, 9, null).singleNodeValue;
			var h2Text = h2.innerHTML;
			h2.innerHTML = h2Text.replace(new RegExp("[0-9]+ - [0-9]+"),"1 - "+pageCounter*10);

			setTimeout(loadNextPage,10);
		}, false);
	}else if(pageCounter==pageNumber){
		var pagination = document.evaluate("//div[@class='pagination clearfix']", document, null, 9, null).singleNodeValue;
		pagination.parentNode.removeChild(pagination);

		var h2 = document.evaluate("//h2", document, null, 9, null).singleNodeValue;
		var h2Text = h2.innerHTML;
		var findNumber2 = new RegExp("of  [0-9]+");
		var total = new String(findNumber2.exec(h2Text));
		h2.innerHTML = h2Text.replace(new RegExp("[0-9]+ - [0-9]+"),"1 - "+total.substring(4));
	}
}

storageContainer = document.evaluate("//div[@class='talkListContainer horiz clearfix']", document, null, 9, null).singleNodeValue;
storageContainer.innerHTML="";
storageContainer.style.height = "auto";			
loadNextPage();	
