// ==UserScript==
// @name           W
// @namespace      std
// @include        http://larkinor.index.hu/*
// ==/UserScript==
	var x=document.getElementsByTagName("OPTION"); //homeport,lopas,rablas,leghajokibe,fejvkibe,ongyilok,kilep,as,vargyogy,burok,
	var asd=-1;
	for(var i=0; i<x.length; i++){
		if (x[i].value=="vargyogy"){ 
			asd=i; 
		}
		/*alert(x[i].value);*/
	}
	if (asd>-1) {
		x[asd].selected=true;
	}