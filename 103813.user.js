// ==UserScript==
// @name           Hogsmeade: Alternativ AAO
// @namespace      http://userscripts.org/users/324340
// @description    Alternative AAO für die Hogsmeade Edition
// @include        http://www.feuerwache.net/*
// @author         Amtsleiter / Haruspex
// ==/UserScript==
function createElement(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	return node;
}
var adr = document.location.href;
if (adr.match('http://www.feuerwache.net/feuerwehr-einsaetze/[0-9]*')) {
var aao;
aao+='undef:LF%%WATCH:LF,LF,LF%%RD:RTW%%F1:LF%%Feuer klein:LF%%F1-Feld:LF/FLF,GWL/FLF%%F-Schiene:LF,LF,GWS%%F2:LF,LF%%F2-TLF:LF,LF,DLK,GWL,TLF,RW,ELW%%F3:LF,LF,LF%%F3-ELW:LF,LF,LF,ELW,DLK%%F3-FwK:LF,LF,LF,DLK,FwK%%F3-DLK:LF,LF,LF,ELW,DLK,GWL%%F3-GW-A:LF,LF,LF,LF,ELW,GWA,GWL%%F3-GW-L:LF,LF,LF,ELW,GWL%%F4:LF,LF,LF,LF%%F4-GW-S:LF,LF,LF,LF,DLK,ELW,GWL,RW,GWS%%F4-GW-M:LF,LF,LF,LF,DLK,ELW,GWA,GWM%%F4-GW-A:LF,LF,LF,LF,DLK,ELW,GWA%%F4-TLF:LF,LF,LF,LF,DLK,ELW,GWA,TLF%%F4-GW-L:LF,LF,LF,LF,DLK,ELW,GWA,GWL,RW%%F4-RW:LF,LF,LF,LF,DLK,ELW,GWA,RW%%F4-DLK:LF,LF,LF,LF,DLK,ELW,RW%%F4-ELW:LF,LF,LF,LF,GWL,ELW,DLK%%F5:LF,LF,LF,LF,LF,DLK,ELW,TLF,GWA,GWL%%F5-GW-A:LF,LF,LF,LF,LF,ELW,GWA%%Großbrand:LF,LF,LF,LF,LF,LF,LF,LF,DLK,ELW,TLF,GWA,GWL%%Wasserrettung:LF,GWT%%Menschenrettung:LF,GWT%%Wasserschaden:LF%%Tierrettung:LF%%Ölunfall:LF,GWÖ%%TH-Wasser1:LF,RW,GWT,FwK%%TH-Wasser2:LF,LF,RW,GWT,FwK%%TH-Klemm:LF,RW,GWÖ%%TH:LF%%TH1:LF,RW%%TH2:RW,LF,LF%%F-GG2:LF,LF,GWM,GWG%%F-GG3:LF,LF,LF,ELW,GWM,GWG%%TH-Chemie:LF,LF,LF,ELW,GWM,GWG%%Gasalarm:LF,LF,LF,ELW,RW,GWM,GWG%%F-GG4:LF,LF,LF,LF,ELW,RW,GWM,GWG,GWA%%F-GG4-DLK:LF,LF,LF,LF,ELW,DLK,RW,TLF,GWM,GWG,GWL%%F-GG5:LF,LF,LF,LF,LF,DLK,ELW,GWL,GWG,GWM%%F-GG6:LF,LF,LF,LF,LF,LF,ELW,DLK,GWA,GWM,GWG%%F-MANV:LF,LF,LF,LF,LF,LF,LF,LF,ELW,GWL,RW,GWM,GWG,GWA%%A1:FLF/LF%%A2:FLF|LF,GWL%%Crash:FLF,FLF,FLF,FLF,FLF,FLF,FLF,RTF,GWG,GWM,GWÖ,ELW,RW%%Explosion:LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,TLF,GWA,GWL,DLK,RW,FwK,GWÖ,GWM,GWG,GWS,GT%%Waldbrand:LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,TLF,GWA,GWL,DLK,RW,FwK,GWÖ,GWM,GWG,GWS,GWT%%H1:Feuerlöschboot%%H2:Feuerlöschboot,Feuerlöschboot%%F-Tankl1:LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,RW,GWÖ,ELW,ULF%%F-Tankl2:LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,RW,GWM,GWÖ,ELW,GWL,ULF%%F-Tankl3:LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,ELW,RW,GWG,GWM,DLK,GWL,TLF,FwK,ULF%%F-Tankl4:LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,LF/ULF,GWG,GWM,GWA,RW,ULF%%TH-GG:LF,LF,RW,FwK,GWA,GWG,GWM,ELW%%TH-GG2:LF,LF,LF,LF,GWM,GWG,GWA,GWL,ELW%%F-Wald:LF,LF,LF,LF,LF,ELW,GWL,DLK%%TH-Schiene:LF,LF,RW,GWS,FwK,ELW';
var footer=document.getElementById('footerLeft');
var div=createElement('div',{'id':'aao'});
div.style.display='none';
var text=document.createTextNode(aao);
footer.appendChild(div);
div.appendChild(text);
}