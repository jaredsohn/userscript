// ==UserScript==
// @name 		Troop info gatherer
// @Namespace	troopinfo
// @author 		Eddy Freivald
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
function functionMain(e){

    function newDiv(iHTML){
        var aDiv = document.createElement("DIV");
        aDiv.innerHTML = iHTML;
        //addAttributes(aDiv, cAttribute);
        return aDiv;
    }
	var mydiv = document.createElement("div");
	mydiv.innerHTML = "aaaa";
	document.body.insertBefore(mydiv,document.getElementById("ltop1"));
}



//window.addEventListener('load', functionMain, false);
if (window.addEventListener) {
    window.addEventListener('load', functionMain, false);
}
else {
    window.attachEvent('onload', functionMain);
}

