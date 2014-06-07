// ==UserScript==
// @author         SlovenianChampion
// @name           Poceni oglasi/Cheap Ads
// @namespace      http://www.erepublik.com/en/citizen/profile/2521043
// @description    Poceni oglaševanje
// @version        1
// @include        http://*.erepublik.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=770420&days=1&show
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// License and Disclaimer
// ===============================================================================
// This software is payable. If you want these ads, you have to pay in eRepublik 
// gold to organization: eSlovenija. How much have you got to pay is depending of // what you want.
// Ta programska oprema je plačljiva. Če želite te oglase nam morate plačati v 
// eRepublik zlatu in sicer organizaciji eSlovenija. Koliko morate plačati je 
// odvisno od tega kaj želite imeti.
// ===============================================================================

var html = '<div class="ad_holder">';

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://sjeb.freehostia.com/customadds/data.html',
	onload:function(response) {
		var addList = eval('('+response.responseText+')');
		
		for(i in addList) {
			var elem = addList[i];
			var img = elem[0];
			var ttl = elem[1];
			var txt = elem[2];
			var lnk = elem[3];
			
			html += '<div class="ad_prev"><div class="ad_prev_img"><a href="'+lnk+'"><img src="'+img+'" width="100px" height="100px"></a></div><a class="ad_link" href="'+lnk+'">'+ttl+'</a><p><a class="desc ad_link" href="'+lnk+'">'+txt+'</a></p></div>';
		}
		html += '</div>';
		
		latest = document.getElementById("eads");
		newAddContent = document.createElement("div");
		newAddContent.id = "newAddContent";
		newAddContent.style.textAlign ="center";
		newAddContent.style.width="120px";
		newAddContent.align="center";
		newAddContent.innerHTML = html;
		latest.parentNode.insertBefore(newAddContent, latest);
//		document.getElementById("promo").removeChild(latest);
	}
});