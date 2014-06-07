// ==UserScript==
// @name           M
// @namespace      std
// @include        http://larkinor.index.hu/*
// ==/UserScript==

	var x=document.getElementsByTagName("OPTION"); //homeport,lopas,rablas,leghajokibe,fejvkibe,ongyilok,kilep,as,vargyogy,burok,
	var asd=-1;
	for(var i=0; i<x.length; i++){
		if (x[i].value=="forrmana"){ 
			asd=i; 
		}
		/*alert(x[i].value);*/
	}
	if (asd>-1) {
		x[asd].selected=true;
	}
	
	//Megszünt az erőlopás varázsod.
	//Megszünt a manapajzs varázsod.
	var a=document.getElementsByTagName("font");
	var sda=-1;
	for(var i=2; i<a.length; i++){
		if (a[i].innerHTML.indexOf("Megszünt a manapajzs varázsod")>0){ 
			sda=i;  
		}
	}
        if (sda>-1) {
	        alert("Megszünt a manapajzs varázsod.\nMegszünt az erőlopás varázsod.");
        }