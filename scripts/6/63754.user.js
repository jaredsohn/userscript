// ==UserScript==
// @name          Orkut Smileys
// @namespace     http://www.orkut.co.in/Main#Profile?uid=10691217579308342354
// @author	  I-Hacker
// @description   Orkut Removed Old Smileys So Here's D Script
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
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
	smileyarr["Smile"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5rdxCBHKI/AAAAAAAAALc/lFq6Eb1Lh08/s400/i_smile.png";
        smileyarr["Sad"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5rWAZC87I/AAAAAAAAALQ/IZZyjW6UoYs/s400/i_sad.png";
	smileyarr["Big Smile"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5qmaBnx3I/AAAAAAAAAKU/Povu1UUyI4c/s400/i_bigsmile.png";
        smileyarr["Surprise"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5s-WWdzFI/AAAAAAAAAMA/NeVHfYAuZoo/s400/i_surprise.png";
	smileyarr["Funny"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sx5rBdB8D0I/AAAAAAAAALE/mpXKYwUhWZY/s400/i_funny.png";
        smileyarr["Cool"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5q27vIyaI/AAAAAAAAAKs/S4wt2Zoc8CM/s400/i_cool.png";
        smileyarr["Angry"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5qeTSywLI/AAAAAAAAAKI/3N70yMxGymY/s400/i_angry.png";
	smileyarr["Wink"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5vUY-btPI/AAAAAAAAAMY/sL6bdAe-8aw/s400/i_wink.png";                                    smileyarr["Confuse"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sx5qwGAx14I/AAAAAAAAAKg/w1jjVKPj16s/s400/i_confuse.png";
smileyarr["I-Hacker Special Smiley"]="http://lh5.ggpht.com/_yoWejpWxP08/S9EotsrhiXI/AAAAAAAAAsU/DgC5OLGAwYo/s400/hfac.png";
        
        





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