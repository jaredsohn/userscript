// ==UserScript==
// @name           Mage
// @namespace      std
// @description    4MAGE
// @include        http://larkinor.index.hu/*
// ==/UserScript==

//MANAFORRÁS gyorsgomb
	var x=document.getElementsByTagName("OPTION"); //homeport,lopas,rablas,leghajokibe,fejvkibe,ongyilok,kilep,as,forrmana,vargyogy,burok,
	var asd=-1;
	for(var i=0; i<x.length; i++){
		if (x[i].value=="forrmana"){ 
			asd=i; 
		}
	}
	if (asd>-1) {
		x[asd].selected=true;
	}
	
// EROLOPAS,MANAPAJZS
	var b=document.getElementsByTagName("font");
	var sdb=-1;
	for(var i=2; i<b.length; i++){
		if (b[i].innerHTML.indexOf("Megszünt a manapajzs varázsod")>0){ 
			sdb=i; 
		}
	}
	if (sdb>-1) {
		alert("Megszünt a manapajzs varázsod\nMegszünt az erolopás varázsod.");
	}