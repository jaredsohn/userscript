// ==UserScript==
// @name          testing me
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Rubin Jose
// @description   simply frak
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


	smileyarr["Happy"] ="http://smileyjungle.com/smilies/greetings11.gif";
	smileyarr["DGX-BoyS-smile"]="http://smileyjungle.com/smilies/greetings0.gif";
	smileyarr["DGX-BoyS-sad"]="http://smileyjungle.com/smilies/aloofandbored0.gif";
	smileyarr["DGX-BoyS-wink"]="http://smileyjungle.com/smilies/angel3.gif";
	smileyarr["DGX-BoyS-grin"]="http://smileyjungle.com/smilies/angry0.gif";
	smileyarr["DGX-BoyS-batting eyelashes"]="http://smileyjungle.com/smilies/angry5.gif";
	smileyarr["Help"]="http://smileyjungle.com/smilies/infomilies16.gif";
	smileyarr["love"]="http://smileyjungle.com/smilies/infomilies41.gif";
	smileyarr["teeth"]="http://smileyjungle.com/smilies/smiling3.gif";
	smileyarr["confused"]="http://smileyjungle.com/smilies/confused1.gif";
	smileyarr["love"]="http://smileyjungle.com/smilies/love3.gif";
	smileyarr["love2"]="http://smileyjungle.com/smilies/love27.gif";
	smileyarr["love3"]="http://smileyjungle.com/smilies/love49.gif";
	smileyarr["celebrate"]="http://smileyjungle.com/smilies/celebrate8.giff";
	smileyarr["celbra"]="http://smileyjungle.com/smilies/celebrate16.gif";
	smileyarr["dead"]="http://smileyjungle.com/smilies/aloofandbored10.gif";
	
	

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

			mm.innerHTML="<img src='"+smileyarr[title]+">";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// DGX-Rules