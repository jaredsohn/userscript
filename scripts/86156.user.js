// ==UserScript==
// @name          Orkut  old, animated & inverted smileys
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Dost
// @description   Orkut  smilies only (old, animated & inverted) for Orkut. Have Fun.
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
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

/*smileyarr["Old Smileys"]="http://lh5.ggpht.com/_Yg003HyxRmE/SyN3kdpgv5I/AAAAAAAAADM/JwW-o0YPwe8/s400/old.JPG";*/
	smileyarr["Cool"]="http://img1.orkut.com/img/i_cool.gif";
	smileyarr["Sad"]="http://img1.orkut.com/img/i_sad.gif";
	smileyarr["Angry"]="http://img1.orkut.com/img/i_angry.gif";
	smileyarr["Smile"]="http://img1.orkut.com/img/i_smile.gif";
	smileyarr["Wink"]="http://img1.orkut.com/img/i_wink.gif";
	smileyarr["Big Smile"]="http://img1.orkut.com/img/i_bigsmile.gif";
	smileyarr["Surprise"]="http://img1.orkut.com/img/i_surprise.gif";
	smileyarr["Funny"]="http://img1.orkut.com/img/i_funny.gif";
	smileyarr["Confuse"]="http://img1.orkut.com/img/i_confuse.gif";

/*smileyarr["Animated smileys"]="http://lh3.ggpht.com/_Yg003HyxRmE/SyN3bCULsBI/AAAAAAAAACs/MO8kBBirB_U/s400/animated.JPG";*/
	smileyarr["CoolAnim"]="http://lh4.ggpht.com/_Ajoc8AujQC0/SvAqJZpO4iI/AAAAAAAAAN4/8M9dSIgWfA8/s400/i_cool.png";
	smileyarr["SadAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1qhOu8rRI/AAAAAAAAAKQ/pcvCiQrAFvs/s400/i_sad.png";
	smileyarr["AngryAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1viCDcCKI/AAAAAAAAAKY/ZIEuF_qdqvo/s400/i_angry.png";
	smileyarr["SmileAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St2LOwuB5QI/AAAAAAAAALw/miyNfnfvj-U/s400/i_smile.png";
	smileyarr["WinkAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/SvAx7TnUWMI/AAAAAAAAAOI/69ETthREJFo/s400/i_wink.png";
	smileyarr["Big SmileAnim"]="http://lh5.ggpht.com/_Ajoc8AujQC0/SvAiPxQ1n_I/AAAAAAAAANw/IVp5-BIj18Y/s400/i_bigsmile.png";
	smileyarr["SurpriseAnim"]="http://lh4.ggpht.com/_Ajoc8AujQC0/St2H3-QPksI/AAAAAAAAALo/e9nzXRGzmVg/s400/i_surprise.png";
	smileyarr["FunnyAnim"]="http://lh3.ggpht.com/_Ajoc8AujQC0/StHudlqXeHI/AAAAAAAAAJ4/sz7QRLqRW0c/s400/i_funny.png";
	smileyarr["ConfuseAnim"]="http://lh4.ggpht.com/_Ajoc8AujQC0/St1jfQI9YII/AAAAAAAAAKI/eTXmknPgpgw/s400/i_confuse.png";

/*smileyarr["inverted Smileys"]="http://lh5.ggpht.com/_Yg003HyxRmE/SyN3oGG9-MI/AAAAAAAAADU/23xPxt3oUnA/s400/upside%20down.JPG";*/
	smileyarr["invertedCool"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIIoOaDvI/AAAAAAAAAC8/XsxILHcQqFI/s400/i_cool.png";
	smileyarr["invertedSad"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIW6OlG8I/AAAAAAAAADU/r2RE9DiuQF0/s400/i_sad.png";
	smileyarr["invertedAngry"]="http://lh3.ggpht.com/_UU3pei9R6Q4/SsNIITmKkvI/AAAAAAAAACw/I86zC8vKmbQ/s400/i_angry.png";
	smileyarr["invertedSmile"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIW4-WDaI/AAAAAAAAADQ/IBdK_9sp_ns/s400/i_smile.png";
	smileyarr["invertedWink"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIWjB6sHI/AAAAAAAAADI/NUbMPdq-QHw/s400/i_wink.png";
	smileyarr["invertedBig Smile"]="http://lh3.ggpht.com/_UU3pei9R6Q4/SsNIW4mgqxI/AAAAAAAAADY/Rejs7O_2p9M/s400/i_bigsmile.png";
	smileyarr["invertedSurprise"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIWg8rb-I/AAAAAAAAADM/4GDEHrWlHt0/s400/i_surprise.png";
	smileyarr["invertedFunny"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIIl0CijI/AAAAAAAAADA/yhYeMrT3eME/s400/i_funny.png";
	smileyarr["invertedConfuse"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIIUdknCI/AAAAAAAAAC0/zbOEH4_lud8/s400/i_confuse.png";
	

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

// DOST's script