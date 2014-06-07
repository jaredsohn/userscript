// ==UserScript==
// @name          Funky Boy Smileys by swαтι..
// @namespace     http://www.orkut.co.in/Profile?uid=15147230465059278431
// @author	  swati..
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
	smileyarr["hi"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVSTuzaKFI/AAAAAAAAAf0/xz3YjbTE7Fw/1%20-%20hi.gif";
        smileyarr["bye"]="http://lh5.ggpht.com/_2D983UpPeSc/TJVSTi1Be6I/AAAAAAAAAf4/vSSRaLjQkcM/s128/2%20-%20bye.gif";
        smileyarr["fit n fine"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVSTzoBPAI/AAAAAAAAAf8/mNSDmJpLPuM/3%20-%20fit%20n%20fine.gif";
        smileyarr["enjoy"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVST0W5-2I/AAAAAAAAAgA/x-y31na6hIA/s128/4%20-%20enjoy.gif";
        smileyarr["party"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVST1cJUsI/AAAAAAAAAgE/DiTcZSCpI5k/s128/5%20-%20party.gif";
        smileyarr["smug"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVSvT4vuDI/AAAAAAAAAgI/wiV3bIVmMHg/s128/6%20-%20smug.gif";
        smileyarr["sigh"]="http://lh5.ggpht.com/_2D983UpPeSc/TJVSvgo1FlI/AAAAAAAAAgM/agpUKiwCrFI/s128/7%20-%20sigh.gif";
        smileyarr["surprise"]="http://lh3.ggpht.com/_2D983UpPeSc/TJVSvso_nkI/AAAAAAAAAgQ/ikoxqMx9x_Q/s128/8%20-%20surprise.gif";



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

// swati's script