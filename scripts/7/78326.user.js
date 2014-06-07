// ==UserScript==
// @name           Aqua-Dei
// @namespace      std
// @description    AD gyorsgomb
// @include        http://larkinor.index.hu/*
// ==/UserScript==

		/*
		var x=document.getElementsByTagName("select");
		for(var i=0; i<x.length; i++){
			alert(x[i].innerHTML);
		}
		*/
		
		/*
<option value="kajal">kajálsz</option><option value="aquadei">megiszod az aqua deit</option><option value="vargyogy">elmondasz egy gyógyvarázst</option><option value="homeport">elmondasz egy hómportot</option><option value="csodaflaska">kiüríted a csodaflaskát</option><option value="extramanaital">megiszod az extra manaitalt</option><option value="regeneracioitala">megiszod a regeneráció italát</option><option value="mobilodiavovino">megiszod a mobilo diavovinót</option><option value="burok">felveszed a varázsburkot</option><option value="leghajokibe">Léghajó helyzetjelzés</option><option value="fejvkibe">fejvadászat</option><option value="ongyilok">öngyilkos leszel</option><option value="kilep">kilépsz a játékból</option>
         */


	var x=document.getElementsByTagName("OPTION"); //homeport,lopas,rablas,leghajokibe,fejvkibe,ongyilok,kilep,as,vargyogy,burok,
	var asd=-1;
	for(var i=0; i<x.length; i++){
		if (x[i].value=="aquadei"){ 
			asd=i; 
		}
		/*alert(x[i].value);*/
	}
	if (asd>-1) {
		x[asd].selected=true;
	}