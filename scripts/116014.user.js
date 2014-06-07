// ==UserScript==
// @name          Redirect remover for vozforums
// @namespace     Crawler
// @description   Removes the URL redirect that vozforums makes on external links. Vứt mẹ cái "Tôi đồng ý chuyển" đi cho đỡ mệt :(
// @include       http://vozforums.com/showthread.php*
// ==/UserScript==
//
// This is an extended version of "redirect remover"
//
(function(){
	var links = document.getElementsByTagName("a");
	for (var i=0;i<links.length;i++){
		var href=links[i].href;
		if (href.length > 22){
			switch (0){
				case href.indexOf("http://vozforums.com/redirect/index.php?link="):
					links[i].href = decodeURIComponent(href.substring(45))
					break;
			}
		}
	}
}
)();