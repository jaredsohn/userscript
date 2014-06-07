// ==UserScript==
// @name           Dinosaur Smileys for Orkut by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Dinosaur Smileys for Orkut. Just Made for Fun.
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
	smileyarr["1"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1hur14AmTI/AAAAAAAAAbQ/kXS6yEl8UQk/2343_animado.gif";
	smileyarr["2"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1husIjP9BI/AAAAAAAAAbU/c9X9VBQSRug/2344_animado.gif";
	smileyarr["3"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1husSkEmqI/AAAAAAAAAbY/5B8suR9nqJM/2345_animado.gif";
	smileyarr["4"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1husvDgsAI/AAAAAAAAAbc/7pWSW0XYcjc/2346_animado.gif";
	smileyarr["5"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1huswXhQVI/AAAAAAAAAbg/y_gDOJRLvbE/2348_animado.gif";
	smileyarr["6"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1hu32_c6jI/AAAAAAAAAbk/-6Z8H3AySfM/2349_animado.gif";	
	smileyarr["7"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1hu4OqtizI/AAAAAAAAAbo/Fp6ftta_mOI/2350_animado.gif";
	
	smileyarr["8"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1hu4IEO6QI/AAAAAAAAAbs/5VAIguqlQsQ/2351_animado.gif";
	smileyarr["9"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1hu4epukoI/AAAAAAAAAbw/ytGsaxhQ16I/2353_animado.gif";
	smileyarr["10"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1hu4mJF5RI/AAAAAAAAAb0/oYZXaLG2Z4M/2354_animado.gif";
	smileyarr["11"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1hvC16-8OI/AAAAAAAAAb4/fR7gECRuS7w/2360_animado.gif";
	smileyarr["12"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1hvC1T384I/AAAAAAAAAb8/UaFiy47hS3k/2362_animado.gif";
	smileyarr["13"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1hvDNBMGqI/AAAAAAAAAcA/KhZR5HCNyCM/2364_animado.gif";
	smileyarr["14"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1hvDWdzySI/AAAAAAAAAcE/vBiGYmlap_I/2367_animado.gif";
	smileyarr["15"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1hvDfNNETI/AAAAAAAAAcI/I2btCfsal4k/2369_animado.gif";
	smileyarr["16"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1hvKni2hFI/AAAAAAAAAcM/_Q1VyUDF3bY/2371_animado.gif";
	smileyarr["17"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1hvK0HyNLI/AAAAAAAAAcQ/q3SIDh7UukM/2372_animado.gif";
	smileyarr["18"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1hvLKk3aeI/AAAAAAAAAcU/THOOeIgN38g/2375_animado.gif";
	smileyarr["19"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1hvLHVZfaI/AAAAAAAAAcY/vNuD3XF0Las/2376_animado.gif";
	
	smileyarr["20"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1hvLclZg6I/AAAAAAAAAcc/8mDDc9CgYQM/2379_animado.gif";
	smileyarr["21"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1iQ2BmHRwI/AAAAAAAAAck/SQmScPwAzQE/2380_animado.gif";
	smileyarr["22"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1iQ2QLONTI/AAAAAAAAAco/W8fRO2nC1gc/2382_animado.gif";
	smileyarr["23"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1iQ2vHEubI/AAAAAAAAAcs/24EuuKS3Vpg/2383_animado.gif";
	smileyarr["24"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1iQ20yyfII/AAAAAAAAAcw/sxcXCLmXwWU/2384_animado.gif";
	smileyarr["25"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1iQ3Ln7bdI/AAAAAAAAAc0/R_xVbdYU03w/2386_animado.gif";
	smileyarr["26"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1iRT49e7ZI/AAAAAAAAAc4/TRui6nd0ne4/2387_animado.gif";
	smileyarr["27"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1iRT6a9XuI/AAAAAAAAAc8/gM96uM0HUss/2388_animado.gif";
	smileyarr["28"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1iRUIOWJBI/AAAAAAAAAdA/bdMABUXvlHw/2390_animado.gif";
	smileyarr["29"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1iRUPaKxhI/AAAAAAAAAdE/V8JLaex68UI/2395_animado.gif";
	



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

// Subedaar's script