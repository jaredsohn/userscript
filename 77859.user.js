// ==UserScript==
// @name         Smileys For Orkut By Sajan //// (Sajju)
// @namespace    Sajan
// @author	 Sajan
// @description  Click on The Smiley to Insert!Enjoy!
// @include        http://*.orkut.*/*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["pray_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J4U4tZchI/AAAAAAAAAZA/mAw0YvXbvGU/s400/pray.png";
	smileyarr["ashamed0001_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4J550QW_6I/AAAAAAAAAZI/USM-IR6VatU/s400/ashamed0001.png";
        smileyarr["ashamed0005_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J6GH8kW0I/AAAAAAAAAZQ/htPiZYAvf6s/s400/ashamed0005.png";
	smileyarr["bow_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J6R0yZH2I/AAAAAAAAAZY/u3myX-CySB4/s400/bow.png";
	smileyarr["Ecstasy_sajju"]="http://lh4.ggpht.com/_4R3XHUO_k00/TABsGBXn_mI/AAAAAAAAAxI/OWkI46IvJyw/s400/Ecstasy.png";





	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);