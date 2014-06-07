// ==UserScript==
// @name           MoneyControl Cleaner
// @namespace      jeetu.cleanupscriprs
// @description    Cleans up Money Control
// @include        http://www.moneycontrol.com/*
// ==/UserScript==

/*

Author: Jeetendra Mirchandani 
http://www.cse.iitb.ac.in/~jeetu
http://jeetu.co.in

A Greasemonkey script to clean up/remove useless ads on moneycontrol.com portfolio

*/

(function(){
	function doCleanup(){
		// remove all iframes
		ifr=document.getElementsByTagName("iframe"); 
		for(i in ifr){if(ifr[i] && ifr[i].style)ifr[i].style.display="none"}

		// cleanup top bar
		main=document.getElementById("main"); 
		if(main){
			var right=searchByClassName(main.childNodes, "floatL right");
			if(right)right.style.display="none";
			
			var left=searchByClassName(main.childNodes, "floatL left");
			if(left.childNodes[1].nodeName=="DIV"){left.childNodes[1].style.display="none"}
	
			var banner=searchByClassName(left.childNodes, "top_search_new_2");
			if(banner)banner.style.display="none";
		}

		// middle LIVE price bar
		var bar1=document.getElementById("ref_td"); if(bar1)bar1.parentNode.parentNode.style.display="none";
		var bar2=document.getElementById("rel_link"); if(bar2)bar2.parentNode.style.display="none";

		// popup div 
		var pdiv=document.getElementById("div_popup"); if(pdiv)pdiv.style.display="none";
		
		//sidebar
		// /html/body/div/table[2]/tbody/tr/td[3]
		var result = document.evaluate("/html/body/div/table[2]/tbody/tr/td[3]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
		if(result){
			var sidebar=result.iterateNext();
			if(sidebar)sidebar.style.display="none";
		}
		
		// small white space	
		// /html/body/div/table[2]/tbody/tr/td/table
		result = document.evaluate("/html/body/div/table[2]/tbody/tr/td/table", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
		if(result){
			var whitebar=result.iterateNext();
			if(whitebar && whitebar.clientHeight<12)whitebar.style.display="none";
		}
		

	}
	function searchByClassName(array, name){
		for(var i in array){
			if(array[i].className == name){	
				return array[i];
			}
		}
	}
	setTimeout(doCleanup, 100);
})();
