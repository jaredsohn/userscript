// ==UserScript==
// @name          Water Smileys by swαтι..
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
	smileyarr["cry"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-Chg2dupI/AAAAAAAAAw8/ejjeb8NwSRM/cry.gif";
        smileyarr["cry out loud"]="http://lh4.ggpht.com/_2D983UpPeSc/TS-ChoZyLWI/AAAAAAAAAxA/flsogzj6TCw/cry%20out%20loud.gif";
        smileyarr["irritate"]="http://lh4.ggpht.com/_2D983UpPeSc/TS-Ch-Jp9lI/AAAAAAAAAxE/PjCBLI7BxJQ/irritate.gif";
        smileyarr["laugh"]="http://lh5.ggpht.com/_2D983UpPeSc/TS-CiAclnnI/AAAAAAAAAxI/tX1vpw1GqO0/laugh.gif";
        smileyarr["poke"]="http://lh6.ggpht.com/_2D983UpPeSc/TS-CiDku62I/AAAAAAAAAxM/8FVEH2VhHE4/poke.gif";
        smileyarr["shocking"]="http://lh6.ggpht.com/_2D983UpPeSc/TS-Co5vzzyI/AAAAAAAAAxQ/pOquale5qAc/shocking.gif";


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