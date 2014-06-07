// ==UserScript==
// @name           Animated Orkut Smileys
// @namespace     http://www.orkut.co.in/Main#Profile?uid=7289969707659461596
// @author	Ashish
// @description   Made this so that sab kuch ulta ulta lage...
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Original Base script by Abhishek [OD] - http://userscripts.org/scripts/show/12735
//Made the smileys just for fun and thought to share with you all..!!
// All credits to Original script writer. I hope u all enjoy the script! ;)
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
	smileyarr["Cool"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIIoOaDvI/AAAAAAAAAC8/XsxILHcQqFI/s400/i_cool.png";
	smileyarr["Sad"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIW6OlG8I/AAAAAAAAADU/r2RE9DiuQF0/s400/i_sad.png";
	smileyarr["Angry"]="http://lh3.ggpht.com/_UU3pei9R6Q4/SsNIITmKkvI/AAAAAAAAACw/I86zC8vKmbQ/s400/i_angry.png";
	smileyarr["Smile"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIW4-WDaI/AAAAAAAAADQ/IBdK_9sp_ns/s400/i_smile.png";
	smileyarr["Wink"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIWjB6sHI/AAAAAAAAADI/NUbMPdq-QHw/s400/i_wink.png";
	smileyarr["Big Smile"]="http://lh3.ggpht.com/_UU3pei9R6Q4/SsNIW4mgqxI/AAAAAAAAADY/Rejs7O_2p9M/s400/i_bigsmile.png";
	smileyarr["Surprise"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIWg8rb-I/AAAAAAAAADM/4GDEHrWlHt0/s400/i_surprise.png";
	smileyarr["Funny"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIIl0CijI/AAAAAAAAADA/yhYeMrT3eME/s400/i_funny.png";
	smileyarr["Confuse"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIIUdknCI/AAAAAAAAAC0/zbOEH4_lud8/s400/i_confuse.png";



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

// ashish's script