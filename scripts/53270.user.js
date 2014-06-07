// ==UserScript==
// @name           pma Custom Relation View
// @namespace      http://userscripts.org/users/98544
// @description    Swaps a field's text with its tooltip text when relations are enabled.
// @include        https://<Your PMA URL here>/*
// ==/UserScript==

function pcv_swap(display,tooltip){
  var temp=display.nodeValue;
  display.nodeValue=tooltip.nodeValue;
  tooltip.nodeValue=temp;
}

var pcv_f,pcv_l,pcv_li;
pcv_f=document.getElementsByTagName("td");
for(var i=0;i<pcv_f.length;i++){
  pcv_l=pcv_f[i].childNodes;
  for(var j=0;j<pcv_l.length;j++){
    if(pcv_l[j].nodeType==1 && pcv_l[j].nodeName.toLowerCase()=="a"){
	  pcv_li=pcv_l[j].attributes;
	  for(var k=0;k<pcv_li.length;k++){
	    if(pcv_li[k].nodeName.toLowerCase()=="title"){
	      pcv_swap(pcv_l[j].childNodes[0],pcv_li[k]);
		}
	  }
	}
  }
}