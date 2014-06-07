// ==UserScript==
// @name         Orkut Old Emotes
// @namespace    -=[Old Emotes]=-
// @author	 s4ch1n
// @description  Use Latest Yahoo Smileys  !
// @include        http://*.orkut.*/*
// @require http://sizzlemctwizzle.com/updater.php?id=77755&days=2
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
		smileyarr["Tongue"]="http://static3.orkut.com/img/i_funny.gif";
	smileyarr["Teeth"]="http://static4.orkut.com/img/i_bigsmile.gif";
	smileyarr["sad"]="http://static4.orkut.com/img/i_sad.gif";
	smileyarr["Wink"]="http://static3.orkut.com/img/i_wink.gif";
        smileyarr["Angry"]="http://static2.orkut.com/img/i_angry.gif";
	smileyarr["Confused"]="http://static3.orkut.com/img/i_confuse.gif";
	smileyarr["Smile"]="http://static1.orkut.com/img/i_smile.gif";
        smileyarr["Shocked"]="http://static1.orkut.com/img/i_surprise.gif";  
        smileyarr["Cool"]="http://static1.orkut.com/img/i_cool.gif";

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