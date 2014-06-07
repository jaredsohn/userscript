// ==UserScript==
// @name           IT2 - sauberes Gebäudemenü 
// @namespace      de
// @description    Gebäudemenü, Transporte, Handelsplatz & Marketing von VIP Code befreien
// @include        http://www.itycoon2.de/building
// @include        http://www.itycoon2.de/direct_sale
// @author         XMANT1000
// @version        a0.8
// @date           02-22-2011 1:04 pm
// ==/UserScript==

//Button entfernen
var ss1 = document.getElementsByClassName('ra')[0]; 
        ss1.style.display = 'none'; 

//Verkürzen-Button 
var split_url = document.URL.split("/");
if(split_url[3]=="building" && split_url[4]==null) {
	var i = 0;
	del:while(i < 101) {
		if (document.getElementsByClassName('ra')[i]==null) {
			break del;
		}
		else {
			var ss = document.getElementsByClassName('ra')[i].style.display = 'none';
			i++
		};
	};
};
if(document.getElementsByClassName('right ra')[0]!=null) {
	document.getElementsByClassName('right ra')[0].style.display = 'none';
};
if(document.getElementsByClassName('vip_notice right ra')[0]!=null) {
	document.getElementsByClassName('vip_notice right ra')[0].style.display = 'none';
};
