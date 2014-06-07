// ==UserScript==
// @name          Smiley jungle in Orkut! now with reply scraps ENABLED
// @namespace    donno :p
// @author	 Diwakar :p
// @description    :P nd works with reply boxes
// @include        http://www.orkut.com/Scrapbook.aspx*
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
	smileyarr["Evil"]="http://smileyjungle.com/smilies/evil18.gif";
	smileyarr["Evil Tongue"]="http://smileyjungle.com/smilies/evil17.gif";
	smileyarr["voodoo"]="http://smileyjungle.com/smilies/evil14.gif";
	smileyarr["super"]="http://smileyjungle.com/smilies/agreement9.gif";
	smileyarr["finger"]="http://smileyjungle.com/smilies/angry16.gif";
	smileyarr["adingotha"]="http://smileyjungle.com/smilies/angry0.gif";
	smileyarr["celebrate"]="http://smileyjungle.com/smilies/celebrate15.gif";
        smileyarr["tongue"]="http://smileyjungle.com/smilies/celebrate16.gif";
        smileyarr["fighter plane"]="http://smileyjungle.com/smilies/character85.gif";
        smileyarr["siren"]="http://smileyjungle.com/smilies/character46.gif";
        smileyarr["yaman"]="http://smileyjungle.com/smilies/character53.gif";
        smileyarr["confused"]="http://smileyjungle.com/smilies/confused1.gif";
        smileyarr["devils"]="http://smileyjungle.com/smilies/devils4.gif";
        smileyarr["i rule"]="http://smileyjungle.com/smilies/disdain6.gif";
        smileyarr["hit"]="http://smileyjungle.com/smilies/disdain13.gif";
        smileyarr["tomato attack"]="http://smileyjungle.com/smilies/disdain15.gif";
        smileyarr["smash"]="http://smileyjungle.com/smilies/fighting4.gif";
        smileyarr["bond"]="http://smileyjungle.com/smilies/film23.gif";

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