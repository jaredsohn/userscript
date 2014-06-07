// ==UserScript==
// @name           Google Search Mucker JP
// @namespace      http://www.google.co.jp/
// @description    Adds user-defined result into Google
// ==/UserScript==
// ==UserScript==
// This script will change your Google search such that the first result points wherever you want it to.
//
// @name           Google Search Mucker
// @namespace      Salesforce
// @include        http://www.google.co.jp/*ats*
// ==/UserScript==
(function()
{	
	//First, be sure to install this other script also to remove redirects: http://userscripts.org/scripts/show/29812
	
	var currentUrl = location.href;
	
	GM_log("url:"+currentUrl);
	if (currentUrl.indexOf("www.google.co.jp/#")>0 || currentUrl.indexOf("btnG")>0) {
		var searchHashPattern = /&q=([^&]*)/;
		//var  = currentUrl.match(searchHashPattern);
		var matches = searchHashPattern.exec(currentUrl);

		GM_log("searchTerm:"+matches[0]);
		
		if (matches[0]!=null) {
			var split = matches[0].split("=");
			var newUrl = "http://www.google.co.jp/search?q=" + split[1];
			GM_log("redirect to "+newUrl);
			location.href = newUrl;
		}
	} else {
		//Now change these variables to say and point to where you want them.
		var searchUrl = "http://www.cirruscomputers.com/japan_knowledgearticle1";
		var searchTitle = "Cirrusコンピューター <strong>ATS</strong>ノートパソコン <strong>メモリ</strong>の<strong>アップグレード方法</strong>";
		var searchDescription = "Cirrusコンピューター株式会社 - サポート情報：ATSノートパソコンでメモリのアップグレードに関する情報";

		var allLIs=document.getElementsByTagName("li");

		//GM_log('length:'+allLIs.length);

		if (allLIs.length==0) {
			//setTimeout(500,rewriteFunc(rewriteFunc));
		} else {
			//Loop through all tags using a for loop
			for (i=0; i<allLIs.length; i++) {
				var liTag = allLIs[i];

				//Get all tags with the specified class name.
				if (liTag.className=="g w0" || liTag.className=="g") {
					var divTag = liTag.childNodes[0];
　　　　　　　　　　　　　　　　　　　　var spanTag = divTag.childNodes[0];
　　　　　　　　　　　　　　　　　　　　var h3Tag = spanTag.childNodes[0];
					var aTag = h3Tag.childNodes[0];

					aTag.innerHTML = searchTitle;

					aTag.href = searchUrl;

					var descriptionDiv = liTag.childNodes[2];
					descriptionDiv.innerHTML = searchDescription;
					descriptionDiv.innerHTML += "<b>...</b>";

					descriptionDiv.innerHTML += "<br/><cite>"+searchUrl+"</cite>";

					break;
				}
			}
		}
	}
}
)();