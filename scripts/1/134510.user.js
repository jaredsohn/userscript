// ==UserScript==
// @name           'Smiley Arena (Lite ver)' by Discount-maniac
// @namespace      Discount-maniac
// @description    This is the Lite version containing only basic emoticons. Perfect for slow connections and those who prefer less options.
// @icon           http://i.imgur.com/m6Wzt.png
// @include        http://*.desidime.*/*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src=\""+image+"\">";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["1"]="http://cdn0.desidime.com/smileys/4VAEC.gif";
	smileyarr["2"]="http://cdn0.desidime.com/smileys/LdBJH.gif";
	smileyarr["3"]="http://cdn0.desidime.com/smileys/yJWi0.gif";
	smileyarr["4"]="http://cdn0.desidime.com/smileys/MBg7h.gif";
	smileyarr["5"]="http://cdn0.desidime.com/smileys/9IRWa.gif";
	smileyarr["6"]="http://cdn0.desidime.com/smileys/w7MSP.gif";
	smileyarr["7"]="http://cdn0.desidime.com/smileys/wSHQB.gif";
	smileyarr["8"]="http://cdn0.desidime.com/smileys/ssydj.gif";
	smileyarr["9"]="http://cdn0.desidime.com/smileys/jnlSr.gif";
	smileyarr["10"]="http://cdn0.desidime.com/smileys/8O9eK.gif";
	smileyarr["11"]="http://cdn0.desidime.com/smileys/PFlVu.gif";
	smileyarr["12"]="http://cdn0.desidime.com/smileys/eKavq.gif";
	smileyarr["13"]="http://cdn0.desidime.com/smileys/6qCFf.gif";
	smileyarr["14"]="http://cdn0.desidime.com/smileys/6eiZY.gif";
	smileyarr["15"]="http://cdn0.desidime.com/smileys/1BjAy.gif";
	smileyarr["16"]="http://cdn0.desidime.com/smileys/W0iNx.gif";
	smileyarr["17"]="http://cdn0.desidime.com/smileys/BgvXc.gif";
	smileyarr["18"]="http://cdn0.desidime.com/smileys/lGBSS.gif";
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


// DM's profile link: http://www.desidime.com/users/2374