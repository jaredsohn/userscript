// ==UserScript==
// @name          Animated Apples by Preeya
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Preeya
// @description   Animated Apples for Orkut
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
	smileyarr["extremehappy"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TOXlVdQn-YI/AAAAAAAAAHA/Th-6Wmgvqo8/extremehappy.gif";
	smileyarr["feelingdown"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TOXlVsR6eYI/AAAAAAAAAHE/R7tgaHWzz_A/feelingdown.gif";
	smileyarr["goodbye"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TOXlVp6cxKI/AAAAAAAAAHI/kpIhjyiVDWU/goodbye.gif";
	smileyarr["halfcry"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TOXlV5XoPdI/AAAAAAAAAHM/kN7TVVTEYMo/halfcry.gif";
	smileyarr["inlove"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TOXlWIUVMSI/AAAAAAAAAHQ/Gq8Z-2Upg9g/inlove.gif";
	smileyarr["innocence"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TOXmErV9OLI/AAAAAAAAAHU/3ZIsNXCPD9Q/innocence.gif";

	smileyarr["laugh"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TOXmE8ilniI/AAAAAAAAAHY/37DqsJfPQ30/laugh.gif";
	smileyarr["love"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TOXmFV-FRdI/AAAAAAAAAHc/_ufTnOR0xFg/love.gif";
	smileyarr["nostril"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TOXmFSNcibI/AAAAAAAAAHg/w3MmLuyYXD4/nostril.gif";
	smileyarr["pig"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TOXmFndkJJI/AAAAAAAAAHk/D-AsTDPkzLY/pig.gif";
	smileyarr["smileteeth"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TOXm2FhGp6I/AAAAAAAAAHo/gRjyjW46zLQ/smileteeth.gif";
	smileyarr["tired"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TOXm2L6c0tI/AAAAAAAAAHs/LlZDcsLqN5I/tired.gif";	
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

// Preeya's script