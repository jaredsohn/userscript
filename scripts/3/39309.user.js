// ==UserScript==
// @name           Large MSN animated smileys for Orkut! by BLAKUT TEAM
// @namespace      www.blakut.com
// @description    Use MSN animated script in your scrapbook or in HTML enabled communiyt post!... Enjoyeee
// @include        http://*.orkut.*/Scrapbook.aspx*
// @include        http://*.orkut.*/CommMsgs.aspx*
// @include        http://*.orkut.*/CommMsgPost.aspx*
// ==/UserScript==

/**********************************************************************************************************************************************************
//Thanks to Ashu da for guiding in writing this script and also thanks to Chaitanya for providing the smileys
//Original Base script by Ashu da![Our Orkut community "DOWNLOAD FREE SOFTWARE [DFS]" community MOD Thanks to him for teaching me how to write the scripts.
//All credits to Original script writer. Enjoy! =D
***********************************************************************************************************************************************************/

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
	smileyarr["GreemFace"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVXFj0lKW8I/AAAAAAAAAfc/hoY0Fzn7RAg/s144/smiles-msn-emotions-5.gif";
	smileyarr["Crying"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVXFlCGafOI/AAAAAAAAAfg/IXb-TMq_0q4/s144/smiles-msn-emotions-4.gif";
	smileyarr["Slap"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVXFnAqbEOI/AAAAAAAAAfk/DelbIgssmQ4/s144/smiles-msn-emotions-36.gif";
	smileyarr["Huff"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVXFpKiQSiI/AAAAAAAAAfo/_yItwozh0Gw/s144/smiles-msn-emotions-35.gif";
	smileyarr["Love"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVXFrBSwMsI/AAAAAAAAAfs/bFHIYRubH00/s144/smiles-msn-emotions-24.gif";
	smileyarr["Shouting"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVXFtDNSXSI/AAAAAAAAAfw/IqliNVhlfYU/s144/smiles-msn-emotions-23.gif";
	smileyarr["iDEA"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVXFuhMVLmI/AAAAAAAAAf0/Dl075GAiIq4/s144/smiles-msn-emotions-22.gif";
	smileyarr["Perspirating"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVXFwPhF5kI/AAAAAAAAAf4/jPwyVpD4HoI/s144/smiles-msn-emotions-21.gif";
	smileyarr["Flying Kiss"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVXFyHSAYdI/AAAAAAAAAf8/PL30L6LaZ_E/s144/smiles-msn-emotions-16.gif";
	smileyarr["Crying Hard"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVXF2c9zSiI/AAAAAAAAAgA/XtPf1s1_K4s/s144/smiles-msn-emotions-11.gif";
	



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

// My Second script!! Thanks to Ashu da again for his help.
// Visit our official website www.blakut.com for regualr update on smileys and other orkut related stuffs.
//~~Happy Orkutting~~
// Regards--- Swashata
// Thanks to Ashu da again...