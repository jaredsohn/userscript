// ==UserScript==
// @name           Smileys
// @namespace      Smileys
// @description    Use these lovely smileys to bring liveliness in your posts and topics without any hassles :) Happy FKDing!!
// @icon           http://i.imgur.com/m6Wzt.png
// @include        http://*.freekideals.*/*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["1"]="http://i.imgur.com/LdBJH.gif";
	smileyarr["2"]="http://i.imgur.com/J5EiZ.gif";
	smileyarr["3"]="http://i.imgur.com/Aj78s.gif";
	smileyarr["4"]="http://i.imgur.com/yJWi0.gif";
	smileyarr["5"]="http://i.imgur.com/4VAEC.gif";
	smileyarr["6"]="http://i.imgur.com/bwT9D.gif";
	smileyarr["7"]="http://i.imgur.com/MBg7h.gif";
	smileyarr["8"]="http://i.imgur.com/ux4hO.gif";
	smileyarr["9"]="http://i.imgur.com/sZUY3.gif";
	smileyarr["10"]="http://i.imgur.com/2SAw1.gif";
	smileyarr["11"]="http://i.imgur.com/9IRWa.gif";
	smileyarr["12"]="http://i.imgur.com/w7MSP.gif";
	smileyarr["13"]="http://i.imgur.com/lGBSS.gif";
	smileyarr["14"]="http://i.imgur.com/aXq11.gif";
	smileyarr["15"]="http://i.imgur.com/NP1A2.gif";
	smileyarr["16"]="http://i.imgur.com/ogwRV.gif";
	smileyarr["17"]="http://i.imgur.com/mlMmL.gif";
	smileyarr["18"]="http://i.imgur.com/oTAw9.gif";
	smileyarr["19"]="http://i.imgur.com/ssydj.gif";
	smileyarr["20"]="http://i.imgur.com/LRQ9T.gif";
	smileyarr["21"]="http://i.imgur.com/sftvy.gif";
	smileyarr["22"]="http://i.imgur.com/eYGbn.gif";
	smileyarr["23"]="http://i.imgur.com/aorlS.gif";
	smileyarr["24"]="http://i.imgur.com/jnlSr.gif";
	smileyarr["25"]="http://i.imgur.com/8O9eK.gif";
	smileyarr["26"]="http://i.imgur.com/BMNIy.gif";
	smileyarr["27"]="http://i.imgur.com/2dEl1.gif";
	smileyarr["28"]="http://i.imgur.com/SXqKN.gif";
	smileyarr["29"]="http://i.imgur.com/jrII9.gif";
	smileyarr["30"]="http://i.imgur.com/t2Jn8.gif";
	smileyarr["31"]="http://i.imgur.com/RzYq6.gif";
	smileyarr["32"]="http://i.imgur.com/EEvuH.gif";
	smileyarr["33"]="http://i.imgur.com/NgZqC.gif";
	smileyarr["34"]="http://i.imgur.com/LcKVI.gif";
	smileyarr["35"]="http://i.imgur.com/EqnVS.gif";
	smileyarr["36"]="http://i.imgur.com/BbI1P.gif";
	smileyarr["37"]="http://i.imgur.com/vYdYt.gif";
	smileyarr["38"]="http://i.imgur.com/ZrtT5.gif";
	smileyarr["39"]="http://i.imgur.com/PFlVu.gif";
	smileyarr["40"]="http://i.imgur.com/XNTSe.gif";
	smileyarr["41"]="http://i.imgur.com/ftox5.gif";
	smileyarr["42"]="http://i.imgur.com/QHaq6.gif";
	smileyarr["43"]="http://i.imgur.com/CPc24.gif";
	smileyarr["44"]="http://i.imgur.com/yKnyG.gif";
	smileyarr["45"]="http://i.imgur.com/6qCFf.gif";
	smileyarr["46"]="http://i.imgur.com/mwljg.gif";
	smileyarr["47"]="http://i.imgur.com/eKavq.gif";
	smileyarr["48"]="http://i.imgur.com/3obab.gif";
	smileyarr["49"]="http://i.imgur.com/jn8nx.gif";
	smileyarr["50"]="http://i.imgur.com/laxjr.gif";
	smileyarr["51"]="http://i.imgur.com/e74r3.gif";
	smileyarr["52"]="http://i.imgur.com/BamBW.gif";
	smileyarr["53"]="http://i.imgur.com/jQfpB.gif";
	smileyarr["54"]="http://i.imgur.com/pooVO.gif";
	smileyarr["55"]="http://i.imgur.com/6eiZY.gif";
	smileyarr["56"]="http://i.imgur.com/1BjAy.gif";
	smileyarr["57"]="http://i.imgur.com/JzBF5.gif";
	smileyarr["58"]="http://i.imgur.com/EdDC3.gif";
	smileyarr["59"]="http://i.imgur.com/2ShXN.gif";
	smileyarr["60"]="http://i.imgur.com/vv4pu.gif";
	smileyarr["61"]="http://i.imgur.com/rmIwh.gif";
	smileyarr["62"]="http://i.imgur.com/K280R.gif";
	smileyarr["63"]="http://i.imgur.com/D2OCU.gif";
	smileyarr["64"]="http://i.imgur.com/R2EZW.gif";
	smileyarr["65"]="http://i.imgur.com/tmSMO.gif";
	smileyarr["66"]="http://i.imgur.com/BgvXc.gif";
	smileyarr["67"]="http://i.imgur.com/W0iNx.gif";
	smileyarr["68"]="http://i.imgur.com/Z5waK.gif";
	smileyarr["69"]="http://i.imgur.com/wBGUe.gif";
	smileyarr["70"]="http://i.imgur.com/cdTQU.gif";
	smileyarr["71"]="http://i.imgur.com/OnwvB.gif";
	smileyarr["72"]="http://i.imgur.com/ibLsl.gif";
	smileyarr["73"]="http://i.imgur.com/VQz3d.gif";
	smileyarr["74"]="http://i.imgur.com/b6JRc.gif";
	smileyarr["75"]="http://i.imgur.com/aKITn.gif";
	smileyarr["76"]="http://i.imgur.com/daf5d.gif";
	smileyarr["77"]="http://i.imgur.com/KK3an.gif";
	smileyarr["78"]="http://i.imgur.com/IyD6r.gif";
	smileyarr["79"]="http://i.imgur.com/g6Kja.gif";
	smileyarr["80"]="http://i.imgur.com/Vskjc.gif";
	smileyarr["81"]="http://i.imgur.com/ILVtb.gif";
	smileyarr["82"]="http://i.imgur.com/S7k49.gif";
	smileyarr["83"]="http://i.imgur.com/86GZe.gif";
	smileyarr["84"]="http://i.imgur.com/luRrt.gif";
	smileyarr["85"]="http://i.imgur.com/jn6iB.gif";
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

