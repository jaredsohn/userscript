// ==UserScript==
// @id             googleadsremover@masahal.info
// @name           Google Ads Remover
// @version        1.0
// @namespace      
// @author         masahal
// @description    Remove ads in google search page　Google検索結果の広告を削除します
// @include        http://www.google.co*/search*
// @include        https://www.google.co*/search*
// @run-at         document-start
// ==/UserScript==

(function() {

var count = 0;

function removeAds(){
	var ads = document.getElementById("tads");
	if(ads) ads.parentNode.removeChild(ads);
	else{
	  if (count<10) setTimeout(removeAds, 50);
   }	
	count++;
	
}

removeAds();

})();