// ==UserScript==

// @name           Remove Justify

// @namespace      Burglish

// @description    Remove Justify

// @include        http://*.*.*/*

// ==/UserScript==



var ttag= document.getElementsByTagName("*");

var tags=",DIV,SPAN,P,";

for (i = 0; i < ttag.length; i++) {
    try{
	if (tags.indexOf(ttag[i])) {
    	    ttag[i].style.setProperty("text-align","left",null);
	}
    }catch(e){};

    if(ttag[i].style){

	if(ttag[i].style.textAlign=="justify"){	    

    	    ttag[i].removeAttribute("style");

	}

    }

}	