// ==UserScript==
// @name           3D Black Smileys (By-HB)
// @namespace     http://www.orkut.co.in/Main#Profile?uid=563787369546797333
// @author	HB
// @description   Made this just for fun :D (please respect the creator of this smiley)..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
*********************************************************/

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
	smileyarr["big_smile"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/THAqRypVZ1I/AAAAAAAABWQ/p5P002dBay0/s800/big_smile.gif";
	smileyarr["confused"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/THAqRxTbsnI/AAAAAAAABWU/zzwMDcawiII/s800/confused.gif";
	smileyarr["Cry"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/THAqSJmJk_I/AAAAAAAABWY/nN8I7nBW_H8/s800/Cry.gif";
	smileyarr["Dag"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/THAqSDkCTaI/AAAAAAAABWc/ds4y_MSSSac/s800/Dag.gif";
	smileyarr["Girl"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/THAqSJYjzrI/AAAAAAAABWg/4-Hf5GZPAXQ/s800/Girl.gif";
	smileyarr["Haha"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/THAqfpxGGVI/AAAAAAAABWk/Evtn_Htes8o/s800/Haha.gif";
	smileyarr["Shy"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/THAqf_ncmjI/AAAAAAAABWo/bQTsy1s6bQg/s800/Shy.gif";
	smileyarr["Sunglasses"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/THAqf5k1GCI/AAAAAAAABWs/GLaVO84Ys0o/s800/Sunglasses.gif";
	smileyarr["unhappy"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/THAqf388B7I/AAAAAAAABWw/iTF4MzFNpFw/s800/unhappy.gif";
	smileyarr["Superman"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/THAqsf2wlkI/AAAAAAAABW8/zT_ifx2JePU/s800/superman.gif";
	smileyarr["What_The"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/THAqsXeeWZI/AAAAAAAABXA/mVaS2SlRIpw/s800/What_The.gif";





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

// HB's script