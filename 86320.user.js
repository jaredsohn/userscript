// ==UserScript==
// @name           shin-chan  (by-shalu)
// @namespace     http://www.orkut.co.in/Main#Profile?uid=15529437965615365366
// @author	shalu
// @description   shin-chan N dbz MY best_________
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
	smileyarr["lol"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oJifltweI/AAAAAAAAAZ0/FXQBD01XSm0/1.gif";
	smileyarr["1"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oJim953KI/AAAAAAAAAZ4/P646QYOA5fM/s128/2.gif";
	smileyarr["2"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJi59Cv3I/AAAAAAAAAZ8/l1U3YV5SSac/s128/3.gif";
	smileyarr["4"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oJje9yP8I/AAAAAAAAAaE/z8dKoiPo8zw/s128/5.gif";
	smileyarr["5"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJt72-kJI/AAAAAAAAAaI/C8S8IRboC1k/s128/6.gif";
	smileyarr["6"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJuApB-ZI/AAAAAAAAAaM/nVf2_PcLyhM/s128/7.gif";
	smileyarr["7"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oJufMFanI/AAAAAAAAAaQ/6GFW2Ma5v3k/s128/8.gif";
	smileyarr["8"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJup6b9jI/AAAAAAAAAaU/WV9Owlii-ZA/s128/11.gif";
	smileyarr["9"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oJu1foWdI/AAAAAAAAAaY/Ms6hV-FGqdk/s128/12.gif";
	smileyarr["10"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oJ1YV5SzI/AAAAAAAAAac/JDxP7CX4SRQ/s128/13.gif";
	smileyarr["a"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oJ16eF5pI/AAAAAAAAAag/hcF2U_n8D1g/s128/14.gif";
	smileyarr["b"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJ2PSBTYI/AAAAAAAAAak/7q5VMtctdZU/s128/a.gif";
        smileyarr["c"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oUqWMV6jI/AAAAAAAAAas/RanKUMWFRsQ/s128/1.gif";
	smileyarr["d"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oUqrO90xI/AAAAAAAAAaw/ciSmMs-_9s8/s128/2.gif";
	smileyarr["e"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oUqzLlm0I/AAAAAAAAAa0/a0pW-6m5sGk/s128/3.gif";
	smileyarr["f"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oUrVOYGmI/AAAAAAAAAa4/yGH3aMOcqfE/s128/4.gif";
	smileyarr["h"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oUrjLxXgI/AAAAAAAAAa8/P9a1L_xZwO0/s128/5.gif";
        smileyarr["i"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oUzDtYT7I/AAAAAAAAAbA/7_z-2J5jmtQ/s128/6.gif";
	smileyarr["j"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oUzMA9s0I/AAAAAAAAAbE/Lf1SUA7SAiE/s128/7.gif";
	smileyarr["k"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oUzYlrk9I/AAAAAAAAAbI/BuqMZHAIDaE/s128/8.gif";
	smileyarr["m"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oUziFy1UI/AAAAAAAAAbM/IuHahAvWMU0/s128/9.gif";
	smileyarr["n"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oUzwekZwI/AAAAAAAAAbQ/lcFN7G7dH1k/s128/10.gif";
        smileyarr["o"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oU6rjAmuI/AAAAAAAAAbU/YDDkh-xmzFs/s128/11.gif";
	smileyarr["p"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oU6uF2zTI/AAAAAAAAAbY/Z5iSy3xQE-U/s128/12.gif";
	smileyarr["q"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oU6_2JC3I/AAAAAAAAAbc/TldlzMCS1P8/s128/13.gif";
	smileyarr["r"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oU7R_mSSI/AAAAAAAAAbg/K7W1JCPbK1A/s128/14.gif";
	smileyarr["s"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oU7g2WtII/AAAAAAAAAbk/mW8Nn0dDN6Y/s128/15.gif";
        smileyarr["t"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oVB1XqvHI/AAAAAAAAAbo/Vkg2pac06oU/s128/16.gif";
	smileyarr["u"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oVCNrw_LI/AAAAAAAAAbs/fFsZUhAP5mc/s128/17.gif";
smileyarr["u"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/TADnT-Tq6EI/AAAAAAAAAfA/FhWNslKZSAs/fantasy-mnster-25.gif";






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

// shalu's script