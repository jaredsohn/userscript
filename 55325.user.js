// ==UserScript==
// @name           BvS Kaiju Battle Hotkeys
// @namespace      CampSoup1988
// @description    BvS Kaiju Battle Hotkeys
// @include        http://*animecubed.com/billy/bvs/villagemonsterfight.*
// ==/UserScript==

function process_event(event) {
	if (event.keyCode==66){		//Bring Down the House Jutsu
		var jutsu=document.forms.namedItem("kat").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value=="Bring Down the House Jutsu")		//Bring Down the House Jutsu
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("kat").wrappedJSObject.submit();	//Attempt Fight
	}
	if (event.keyCode==75){		//Kitsune Bakudan
		var jutsu=document.forms.namedItem("kat").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value=="Kitsune Bakudan")		//Kitsune Bakudan
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("kat").wrappedJSObject.submit();	//Attempt Fight
	}
	if (event.keyCode==84){		//Throw a TsukiBall
		var jutsu=document.forms.namedItem("kat").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value=="throw")		//Throw a TsukiBall
				jutsu[i].wrappedJSObject.click();
	}
	if (event.keyCode==65){		//Attempt
		if(document.forms.namedItem("kat"))
			document.forms.namedItem("kat").wrappedJSObject.submit();	//Attempt Fight
		else
			document.forms.namedItem("battle").wrappedJSObject.submit();	//New Fight
	}
	if (event.keyCode==67)		//c
		document.forms.namedItem("chakra").wrappedJSObject.submit();	//Charge chakra
	}

window.addEventListener("keyup", process_event, false);