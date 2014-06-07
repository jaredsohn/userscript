// ==UserScript==
// @name        Chip.de Fotostrecke
// @include     http://*chip.de/bildergalerie/*
// @version     0.1
// ==/UserScript==




function main(){
var bsinh="";
var bsanz=bFilename.length-1;
document.getElementById('colLeft').style.width = '810px';

for (var ibs = 0; ibs < bsanz; ++ibs){
var bsianz=ibs+1;
bsinh=bsinh+"<div class='reihe'><table style='width: 100%'>	<tr><td>";
if(bGrossversion[ibs]!=""){bsinh=bsinh+"<a id='bGrossversion2' href='/ii/grossbild_v2.html?grossbild="+bGrossversion[ibs]+"&grossbild_bu="+bBildueberschrift[ibs]+"' target='_blank'>";}

bsinh=bsinh+"<img style='width:"+460+"px' src='"+bFilename[ibs]+"'\>";

if(bGrossversion[ibs]!=""){bsinh=bsinh+"</a>";}
bsinh=bsinh+"<p align='right'>"+bsianz+"/"+bsanz+"</p></td><td><div class='col340-ri'><h2 id='bildueberschrift'>"+bBildueberschrift[ibs]+"</h2><div id='bildtext' class='faktbox-gray'>"+bBildtext[ibs]+"</td></tr></table></div></div></div>";}

if(bLinktext[ibs]!=""){bsinh=bsinh+"<a href='"+bLinkurl[ibs]+"'>"+bLinktext[ibs]+"</a>";}
if(bLinktext2[ibs]!=""){bsinh=bsinh+"<a href='"+bLinkurl2[ibs]+"'>"+bLinktext2[ibs]+"</a>";}
document.getElementById('colLeft').innerHTML = bsinh;

}

main();