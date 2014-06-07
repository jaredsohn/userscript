// ==UserScript==
// @name          Orkut Smileys
// @namespace     http://www.orkut.co.in/Profile?uid=17871999853502549227
// @author	  Farhan| The Ruler! x-|
// @description   Old 0rkut Smilies! [UPDATED VERSION]
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==


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
	smileyarr["Smile"]="http://img1.orkut.com/img/i_smile.gif";
        smileyarr["Sad"]="http://img1.orkut.com/img/i_sad.gif";
	smileyarr["Big Smile"]="http://img1.orkut.com/img/i_bigsmile.gif";
        smileyarr["Surprise"]="http://img1.orkut.com/img/i_surprise.gif";
	smileyarr["Funny"]="http://img1.orkut.com/img/i_funny.gif";
        smileyarr["Cool"]="http://img1.orkut.com/img/i_cool.gif";
        smileyarr["Angry"]="http://img1.orkut.com/img/i_angry.gif";
	smileyarr["Wink"]="http://img1.orkut.com/img/i_wink.gif";                                    	smileyarr["Confuse"]="http://img1.orkut.com/img/i_confuse.gif";
        
        





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

//