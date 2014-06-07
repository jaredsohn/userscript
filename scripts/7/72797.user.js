// ==UserScript==
// @name         green old orkut funny smileys
// @namespace    RD 
// @description  With This Script You Can Use The old-funny green Smileys  In ORKUT! :P
// @include      http://*.orkut.*/*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function prabhu(){
	var vinu = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+vinu+">";
}

function dip() {
	var RD = new Array();	
	RD["birthday"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-002.gif";
	RD["bandits"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-004.gif";
	RD["funny-devil"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-005.gif";
	RD["fighting"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-006.gif";
	RD["bigsmile"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-007.gif";
	RD["dinasour"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-008.gif";
	RD["download"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-009.gif";
	RD["cycling"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-010.gif";
	RD["rocket"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-011.gif";
	RD["itching"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-012.gif";
	RD["pirates"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-013.gif";
	RD["scooter"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-014.gif";
	RD["rss feed love"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-015.gif";
	RD["bat"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-016.gif";
	RD["glider"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-017.gif";
	RD["me-online"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-018.gif";
	RD["hunk"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-019.gif";
	RD["aa-braa-ka-dabra"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-020.gif";
	RD["wizard"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-021.gif";
	RD["warrior"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-022.gif";
	RD["Laughing"]="http://lh5.ggpht.com/_Z_CdHVH07U0/S6Tcs4rxSjI/AAAAAAAAAak/djQuWREcpc4/21.gif";
	RD["doggy"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-023.gif";
	RD["hoho"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-024.gif";
	RD["shaving"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-025.gif";
	RD["swimming"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-026.gif";
	RD["scorpion"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-027.gif";
	RD["wizardious float"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-028.gif";
	RD["whisseling"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-029.gif";
	RD["carribean"]="http://www.freesmileys.org/smileys/smiley-green/greensmilies-030.gif";
	RD["Looser"]="http://lh3.ggpht.com/_Z_CdHVH07U0/S6TczRqxYsI/AAAAAAAAAbI/c-sEaBVIklU/30.gif";
	
RD["I Cool"]="http://static1.orkut.com/img/i_cool.gif";
	RD["I Sad"]="http://static4.orkut.com/img/i_sad.gif";
	RD["I Angry"]="http://static2.orkut.com/img/i_angry.gif";
	RD["I Smile"]="http://static1.orkut.com/img/i_smile.gif";
	RD["I Wink"]="http://static3.orkut.com/img/i_wink.gif";
	RD["I BigSmile"]="http://static4.orkut.com/img/i_bigsmile.gif";
	RD["I Surprise"]="http://static1.orkut.com/img/i_surprise.gif";
	RD["I Funny"]="http://static3.orkut.com/img/i_funny.gif";
	RD["I Confuse"]="http://static3.orkut.com/img/i_confuse.gif";



	var oug = document.getElementsByTagName('textarea');
	for(i=0;i<oug.length;i++){
		text=oug[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in RD){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+RD[title]+"' title='"+title+"'>";
			mm.addEventListener("click", prabhu, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);