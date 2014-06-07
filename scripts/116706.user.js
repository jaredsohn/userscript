// ==UserScript==
// @name           SpongeBob Smileys For Orkut !
// @namespace     http://www.orkut.co.in/Main#Profile?uid=5962872855089272949
// @author	Techie
// @description   ~ SpongeBob Smileys For Orkut ! ^.^ 
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//Just Made it For Fun .. !
//The Smileys Have Been Provided By Anshul (Showstopper) .. !
//Enjoy ! ;)
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
	smileyarr["lol"]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYKvwTJMVI/AAAAAAAAAWQ/rUxED7Z6j6c/bob1.gif";
	smileyarr["Maid"]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYKwd7fkyI/AAAAAAAAAWU/GLpKlQMhmUQ/bob2.gif";
	smileyarr["Bunny"]="http://lh5.ggpht.com/_NZJzdRm10Y0/TUYKwe6hFyI/AAAAAAAAAWY/z65DsoFPcS4/bob3.gif";
	smileyarr["crazy"]="http://lh6.ggpht.com/_NZJzdRm10Y0/TUYKw4tI5YI/AAAAAAAAAWc/xy3q_P5CrEM/bob4.gif";
	smileyarr["Funny"]="http://lh6.ggpht.com/_NZJzdRm10Y0/TUYKxMSXDZI/AAAAAAAAAWg/wfqjqEs7uOs/bob5.gif";
	smileyarr["LoL"]="http://lh6.ggpht.com/_NZJzdRm10Y0/TUYLnBQnp9I/AAAAAAAAAWo/loznM5Kh8oI/bob6.gif";
	smileyarr["Blow it Down"]="http://lh4.ggpht.com/_NZJzdRm10Y0/TUYLnjLzi-I/AAAAAAAAAWw/W9tNNpAUCPA/bob8.gif";
	smileyarr["*-*"]="http://lh6.ggpht.com/_NZJzdRm10Y0/TUYLnz-Yn8I/AAAAAAAAAW0/q6lRcZJTmIs/bob9.gif";
	smileyarr["Running"]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYLoETEd_I/AAAAAAAAAW4/qgizB73EiHQ/bob10.gif";
	smileyarr["Shake it Baby !"]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYPNimaBtI/AAAAAAAAAXE/9ZHhpko373s/bob12.gif";
	smileyarr["Love Struck"]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYPNy-BKEI/AAAAAAAAAXI/fySO_Z_F1Tc/bob13.gif";
	smileyarr["Yo Yo ! "]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYPOGQY66I/AAAAAAAAAXM/vLCKNdIaznM/bob14.gif";
	smileyarr["Surprise"]="http://lh5.ggpht.com/_NZJzdRm10Y0/TUYPOY_lrsI/AAAAAAAAAXQ/yeCGDFZcXYc/bob16.gif";
	smileyarr["Happy B'day"]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYPwZ_7wcI/AAAAAAAAAXU/jmXqeNsWQ3o/bob17.gif";
	smileyarr["Cool"]="http://lh5.ggpht.com/_NZJzdRm10Y0/TUYPwqqo7II/AAAAAAAAAXY/MR46cwKfIOE/bob18.gif";
	smileyarr["Mad"]="http://lh3.ggpht.com/_NZJzdRm10Y0/TUYPxOTYIQI/AAAAAAAAAXk/kapVwYxfkkk/bob21.gif";
	smileyarr["<3"]="http://lh6.ggpht.com/_NZJzdRm10Y0/TUYQDceC-vI/AAAAAAAAAXo/NxSX28cWzls/bob22.gif";
	smileyarr["Crying"]="http://lh5.ggpht.com/_NZJzdRm10Y0/TUYPwg5MAnI/AAAAAAAAAXc/0APZUIiwShM/bob19.gif";
	smileyarr["Sad"]="http://lh4.ggpht.com/_FEb-MI9D0VA/TdTcN4vE4CI/AAAAAAAAADE/677KhDN-LWA/URemicons-SpongeBob-010.png";
	





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

// Techie's Script