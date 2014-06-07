// ==UserScript==
// @name           Animated Orkut Smileys
// @namespace     http://www.orkut.co.in/Main#Profile?uid=15308457744651801650
// @author	Devil
// @description   Made this just for fun :D (please respect the creator of this smiley)..
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
	smileyarr["Cool"]="http://lh4.ggpht.com/_Ajoc8AujQC0/SvAqJZpO4iI/AAAAAAAAAN4/8M9dSIgWfA8/s400/i_cool.png";
	smileyarr["Sad"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1qhOu8rRI/AAAAAAAAAKQ/pcvCiQrAFvs/s400/i_sad.png";
	smileyarr["Angry"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1viCDcCKI/AAAAAAAAAKY/ZIEuF_qdqvo/s400/i_angry.png";
	smileyarr["Smile"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St2LOwuB5QI/AAAAAAAAALw/miyNfnfvj-U/s400/i_smile.png";
	smileyarr["Wink"]="http://lh6.ggpht.com/_Ajoc8AujQC0/SvAx7TnUWMI/AAAAAAAAAOI/69ETthREJFo/s400/i_wink.png";
	smileyarr["Big Smile"]="http://lh5.ggpht.com/_Ajoc8AujQC0/SvAiPxQ1n_I/AAAAAAAAANw/IVp5-BIj18Y/s400/i_bigsmile.png";
	smileyarr["Surprise"]="http://lh4.ggpht.com/_Ajoc8AujQC0/St2H3-QPksI/AAAAAAAAALo/e9nzXRGzmVg/s400/i_surprise.png";
	smileyarr["Funny"]="http://lh3.ggpht.com/_Ajoc8AujQC0/StHudlqXeHI/AAAAAAAAAJ4/sz7QRLqRW0c/s400/i_funny.png";
	smileyarr["Confuse"]="http://lh4.ggpht.com/_Ajoc8AujQC0/St1jfQI9YII/AAAAAAAAAKI/eTXmknPgpgw/s400/i_confuse.png";





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

// devil's script