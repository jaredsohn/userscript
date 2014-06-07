// ==UserScript==
// @name           Old Orkut Smileys (By-HB)
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
	smileyarr["Old Cool"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94aMOxSwI/AAAAAAAAAoY/w3dnZepZLtI/s800/o_cool.gif";
	smileyarr["Old Sad"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx94j8K894I/AAAAAAAAAo4/XA6qtDzth6I/s800/o_sad.gif";
	smileyarr["Old Angry"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx94Zn4CGSI/AAAAAAAAAoM/l0C5mb-UnK4/s800/o_angry.gif";
	smileyarr["Old Smile"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx94jwq3ejI/AAAAAAAAAo8/PAnSwgo_Umc/s800/o_smile.gif";
	smileyarr["Old Wink"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94kKUxU2I/AAAAAAAAApE/XMVPHWXyayU/s800/o_wink.gif";
	smileyarr["Old Big Smile"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94Z8DunzI/AAAAAAAAAoQ/CyQ1YXaqrZY/s800/o_bigsmile.gif";
	smileyarr["Old Surprise"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx94jyDkA6I/AAAAAAAAApA/P_tc4GOkcHc/s800/o_surprise.gif";
	smileyarr["Old Funny"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx94aFPA4_I/AAAAAAAAAoc/lGMca0uPo1Y/s800/o_funny.gif";
	smileyarr["Old Confuse"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94Z8XKMZI/AAAAAAAAAoU/76WoFzQ11RQ/s800/o_confuse.gif";

	





	





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