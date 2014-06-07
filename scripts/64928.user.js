// ==UserScript==
// @name           Cowboy Avtars by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Cute & Dancing CowBoy Avtars for Orkut.
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
	smileyarr["1"]="http://lh4.ggpht.com/_FZEwHZ4UznY/SyC4g6sQYdI/AAAAAAAAAM4/YI8K-jzqdhk/8.gif";
	smileyarr["2"]="http://lh6.ggpht.com/_FZEwHZ4UznY/SyC4jMPFh6I/AAAAAAAAAM8/So5_yfpSIW8/5.gif";
	smileyarr["3"]="http://lh3.ggpht.com/_FZEwHZ4UznY/SyC4lUH1gmI/AAAAAAAAANA/h_c1r0Gc0B0/4.gif";
	smileyarr["4"]="http://lh4.ggpht.com/_FZEwHZ4UznY/SyC4oJeXDgI/AAAAAAAAANE/V1RCrQ2vcdE/3.gif";
	smileyarr["5"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC4teMfSXI/AAAAAAAAANI/Z3uQn3DuZh4/29.gif";
	smileyarr["6"]="http://lh3.ggpht.com/_FZEwHZ4UznY/SyC4xQKFqwI/AAAAAAAAANM/iQnjQjM5KwE/27.gif";
	smileyarr["7"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC4yeDz8NI/AAAAAAAAANQ/qacyYmG8f0U/26.gif";
	smileyarr["8"]="http://lh4.ggpht.com/_FZEwHZ4UznY/SyC40wuARiI/AAAAAAAAANU/GnC98u9lZ88/23.gif";
	smileyarr["9"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC43VCTxVI/AAAAAAAAANc/BeTzBEikUUE/21.gif";
	smileyarr["12"]="http://lh4.ggpht.com/_FZEwHZ4UznY/SyC45VRuG6I/AAAAAAAAANk/MIAE89SwVUE/2.gif";
	smileyarr["13"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC46avPwAI/AAAAAAAAANo/kxFQ8jHixKk/19.gif";
	smileyarr["14"]="http://lh3.ggpht.com/_FZEwHZ4UznY/SyC44aQVKaI/AAAAAAAAANg/wV4n6Cqnock/20.gif";
	smileyarr["15"]="http://lh4.ggpht.com/_FZEwHZ4UznY/SyC48hZd0iI/AAAAAAAAANs/pL7FwIlAteI/18.gif";
	smileyarr["17"]="http://lh4.ggpht.com/_FZEwHZ4UznY/SyC49iNJ1kI/AAAAAAAAANw/haQ49z659r8/17.gif";
	smileyarr["18"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC4-UbTf2I/AAAAAAAAAN0/uRPh5irzYMs/14.gif";
	smileyarr["19"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC4_8XFXKI/AAAAAAAAAN4/b3hP_XgUnDY/13.gif";
	smileyarr["11"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC5BOXcOzI/AAAAAAAAAN8/zQXdCQZGOts/11.gif";
	smileyarr["20"]="http://lh5.ggpht.com/_FZEwHZ4UznY/SyC5CXfnChI/AAAAAAAAAOA/fQpWHgnCoLA/10.gif";





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