// ==UserScript==
// @name           'Smiley Arena' by Discount-maniac
// @namespace      Discount-maniac
// @description    Use these lovely smileys to bring liveliness in your posts and topics without any hassles :) Happy DesiDiming!!
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
	getTextArea(this.getAttribute("gult")).value += '<img src=\"'+image+'\">';
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["1"]="http://cdn0.desidime.com/smileys/LdBJH.gif";
	smileyarr["2"]="http://cdn0.desidime.com/smileys/J5EiZ.gif";
	smileyarr["3"]="http://cdn0.desidime.com/smileys/Aj78s.gif";
	smileyarr["4"]="http://cdn0.desidime.com/smileys/yJWi0.gif";
	smileyarr["5"]="http://cdn0.desidime.com/smileys/4VAEC.gif";
	smileyarr["6"]="http://cdn0.desidime.com/smileys/bwT9D.gif";
	smileyarr["7"]="http://cdn0.desidime.com/smileys/MBg7h.gif";
	smileyarr["8"]="http://cdn0.desidime.com/smileys/ux4hO.gif";
	smileyarr["9"]="http://cdn0.desidime.com/smileys/sZUY3.gif";
	smileyarr["10"]="http://cdn0.desidime.com/smileys/2SAw1.gif";
	smileyarr["11"]="http://cdn0.desidime.com/smileys/9IRWa.gif";
	smileyarr["12"]="http://cdn0.desidime.com/smileys/w7MSP.gif";
	smileyarr["13"]="http://cdn0.desidime.com/smileys/lGBSS.gif";
	smileyarr["14"]="http://cdn0.desidime.com/smileys/aXq11.gif";
	smileyarr["15"]="http://cdn0.desidime.com/smileys/NP1A2.gif";
	smileyarr["16"]="http://cdn0.desidime.com/smileys/ogwRV.gif";
	smileyarr["17"]="http://cdn0.desidime.com/smileys/mlMmL.gif";
	smileyarr["18"]="http://cdn0.desidime.com/smileys/oTAw9.gif";
	smileyarr["19"]="http://cdn0.desidime.com/smileys/ssydj.gif";
	smileyarr["20"]="http://cdn0.desidime.com/smileys/LRQ9T.gif";
	smileyarr["21"]="http://cdn0.desidime.com/smileys/sftvy.gif";
	smileyarr["22"]="http://cdn0.desidime.com/smileys/eYGbn.gif";
	smileyarr["23"]="http://cdn0.desidime.com/smileys/aorlS.gif";
	smileyarr["24"]="http://cdn0.desidime.com/smileys/jnlSr.gif";
	smileyarr["25"]="http://cdn0.desidime.com/smileys/8O9eK.gif";
	smileyarr["26"]="http://cdn0.desidime.com/smileys/BMNIy.gif";
	smileyarr["27"]="http://cdn0.desidime.com/smileys/2dEl1.gif";
	smileyarr["28"]="http://cdn0.desidime.com/smileys/SXqKN.gif";
	smileyarr["29"]="http://cdn0.desidime.com/smileys/jrII9.gif";
	smileyarr["30"]="http://cdn0.desidime.com/smileys/t2Jn8.gif";
	smileyarr["31"]="http://cdn0.desidime.com/smileys/RzYq6.gif";
	smileyarr["32"]="http://cdn0.desidime.com/smileys/EEvuH.gif";
	smileyarr["33"]="http://cdn0.desidime.com/smileys/NgZqC.gif";
	smileyarr["34"]="http://cdn0.desidime.com/smileys/LcKVI.gif";
	smileyarr["35"]="http://cdn0.desidime.com/smileys/EqnVS.gif";
	smileyarr["36"]="http://cdn0.desidime.com/smileys/BbI1P.gif";
	smileyarr["37"]="http://cdn0.desidime.com/smileys/vYdYt.gif";
	smileyarr["38"]="http://cdn0.desidime.com/smileys/ZrtT5.gif";
	smileyarr["39"]="http://cdn0.desidime.com/smileys/PFlVu.gif";
	smileyarr["40"]="http://cdn0.desidime.com/smileys/XNTSe.gif";
	smileyarr["41"]="http://cdn0.desidime.com/smileys/ftox5.gif";
	smileyarr["42"]="http://cdn0.desidime.com/smileys/QHaq6.gif";
	smileyarr["43"]="http://cdn0.desidime.com/smileys/CPc24.gif";
	smileyarr["44"]="http://cdn0.desidime.com/smileys/yKnyG.gif";
	smileyarr["45"]="http://cdn0.desidime.com/smileys/6qCFf.gif";
	smileyarr["46"]="http://cdn0.desidime.com/smileys/mwljg.gif";
	smileyarr["47"]="http://cdn0.desidime.com/smileys/eKavq.gif";
	smileyarr["48"]="http://cdn0.desidime.com/smileys/3obab.gif";
	smileyarr["49"]="http://cdn0.desidime.com/smileys/jn8nx.gif";
	smileyarr["50"]="http://cdn0.desidime.com/smileys/laxjr.gif";
	smileyarr["51"]="http://cdn0.desidime.com/smileys/e74r3.gif";
	smileyarr["52"]="http://cdn0.desidime.com/smileys/BamBW.gif";
	smileyarr["53"]="http://cdn0.desidime.com/smileys/jQfpB.gif";
	smileyarr["54"]="http://cdn0.desidime.com/smileys/pooVO.gif";
	smileyarr["55"]="http://cdn0.desidime.com/smileys/6eiZY.gif";
	smileyarr["56"]="http://cdn0.desidime.com/smileys/1BjAy.gif";
	smileyarr["57"]="http://cdn0.desidime.com/smileys/JzBF5.gif";
	smileyarr["58"]="http://cdn0.desidime.com/smileys/EdDC3.gif";
	smileyarr["59"]="http://cdn0.desidime.com/smileys/2ShXN.gif";
	smileyarr["60"]="http://cdn0.desidime.com/smileys/vv4pu.gif";
	smileyarr["61"]="http://cdn0.desidime.com/smileys/rmIwh.gif";
	smileyarr["62"]="http://cdn0.desidime.com/smileys/K280R.gif";
	smileyarr["63"]="http://cdn0.desidime.com/smileys/D2OCU.gif";
	smileyarr["64"]="http://cdn0.desidime.com/smileys/R2EZW.gif";
	smileyarr["65"]="http://cdn0.desidime.com/smileys/tmSMO.gif";
	smileyarr["66"]="http://cdn0.desidime.com/smileys/BgvXc.gif";
	smileyarr["67"]="http://cdn0.desidime.com/smileys/W0iNx.gif";
	smileyarr["68"]="http://cdn0.desidime.com/smileys/Z5waK.gif";
	smileyarr["69"]="http://cdn0.desidime.com/smileys/wBGUe.gif";
	smileyarr["70"]="http://cdn0.desidime.com/smileys/cdTQU.gif";
	smileyarr["71"]="http://cdn0.desidime.com/smileys/OnwvB.gif";
	smileyarr["72"]="http://cdn0.desidime.com/smileys/ibLsl.gif";
	smileyarr["73"]="http://cdn0.desidime.com/smileys/VQz3d.gif";
	smileyarr["74"]="http://cdn0.desidime.com/smileys/b6JRc.gif";
	smileyarr["75"]="http://cdn0.desidime.com/smileys/aKITn.gif";
	smileyarr["76"]="http://cdn0.desidime.com/smileys/daf5d.gif";
	smileyarr["77"]="http://cdn0.desidime.com/smileys/KK3an.gif";
	smileyarr["78"]="http://cdn0.desidime.com/smileys/IyD6r.gif";
	smileyarr["79"]="http://cdn0.desidime.com/smileys/g6Kja.gif";
	smileyarr["80"]="http://cdn0.desidime.com/smileys/Vskjc.gif";
	smileyarr["81"]="http://cdn0.desidime.com/smileys/ILVtb.gif";
	smileyarr["82"]="http://cdn0.desidime.com/smileys/S7k49.gif";
	smileyarr["83"]="http://cdn0.desidime.com/smileys/86GZe.gif";
	smileyarr["84"]="http://cdn0.desidime.com/smileys/luRrt.gif";
	smileyarr["85"]="http://cdn0.desidime.com/smileys/jn6iB.gif";
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
			mm.innerHTML='<img src=\"'+smileyarr[title]+'\" title=\"'+title+'\">';
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


// DM's profile link: http://www.desidime.com/users/2374