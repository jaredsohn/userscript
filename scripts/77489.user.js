// ==UserScript==
// @name           shin-chan + dbz (By-SARVESH)
// @namespace     http://www.orkut.co.in/Main#Profile?uid=15529437965615365366
// @author	SARVESH ANAND
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
	smileyarr["lol"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oJifltweI/AAAAAAAAAZ0/FXQBD01XSm0/s128/1.gif";
	smileyarr["Old Cool"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oJim953KI/AAAAAAAAAZ4/P646QYOA5fM/s128/2.gif";
	smileyarr["Old Cool(A)"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJi59Cv3I/AAAAAAAAAZ8/l1U3YV5SSac/s128/3.gif";
	smileyarr["Old Sad"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oJjQBbHFI/AAAAAAAAAaA/uwxfWNDJFk8/s128/4.gif";
	smileyarr["Old Sad (A)"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oJje9yP8I/AAAAAAAAAaE/z8dKoiPo8zw/s128/5.gif";
	smileyarr["Old Angry"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJt72-kJI/AAAAAAAAAaI/C8S8IRboC1k/s128/6.gif";
	smileyarr["Old Angry (A)"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJuApB-ZI/AAAAAAAAAaM/nVf2_PcLyhM/s128/7.gif";
	smileyarr["Old Smile"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oJufMFanI/AAAAAAAAAaQ/6GFW2Ma5v3k/s128/8.gif";
	smileyarr["Old Smile (A)"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJup6b9jI/AAAAAAAAAaU/WV9Owlii-ZA/s128/11.gif";
	smileyarr["Old Wink"]="http://lh6.ggpht.com/_2d4rVQ6z9_o/S_oJu1foWdI/AAAAAAAAAaY/Ms6hV-FGqdk/s128/12.gif";
	smileyarr["Old Wink (A)"]="http://lh5.ggpht.com/_2d4rVQ6z9_o/S_oJ1YV5SzI/AAAAAAAAAac/JDxP7CX4SRQ/s128/13.gif";
	smileyarr["Old Big Smile"]="http://lh3.ggpht.com/_2d4rVQ6z9_o/S_oJ16eF5pI/AAAAAAAAAag/hcF2U_n8D1g/s128/14.gif";
	smileyarr["Old Big Smile (A)"]="http://lh4.ggpht.com/_2d4rVQ6z9_o/S_oJ2PSBTYI/AAAAAAAAAak/7q5VMtctdZU/s128/a.gif";






	





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