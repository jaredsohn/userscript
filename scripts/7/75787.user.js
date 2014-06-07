// ==UserScript==
// @name           Simplify In.gr
// @author		Apostolos Giannakidis
// @version		0.1
// @description	Remove the advertisements and silly graphics from the Greek portal www.in.gr.
// @namespace	http://userscripts.org/users/159112
// @include        http://www.in.gr/*
// ==/UserScript==

	document.body.background="";
	document.body.style.background = "url(http://www.in.gr/video/assets/images/clear.gif)";
	
	
	var ad = document.getElementsByClassName("quiz")[0];
	
	if (ad) 
		ad.setAttribute("style", "display:none;");
	
	
	//var ad = document.getElementsByClassName("admessage")[0].parentNode;
	//	ad.setAttribute("style", "display:none;");
	
	var ad_table = document.getElementsByTagName("table")[0];
	
	if (ad_table){
	
		var news_td = ad_table.getElementsByTagName("td")[2];
		
		if (news_td) {
			if (news_td.innerHTML.search("/<noscript>/") != 1) 
				ad_table.getElementsByTagName("td")[2].setAttribute("style", "display:none;");
			else
				ad_table.getElementsByTagName("td")[1].setAttribute("style", "display:none;");
		}
		else
			ad_table.getElementsByTagName("td")[1].setAttribute("style", "display:none;");
		
	}