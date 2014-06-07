// ==UserScript==
// @name           Better Facebook
// @description    Hides spam messages from external sites.
// @version        1.00.001 beta
// @author         look997
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/73380.meta.js
// @include        *facebook.com/*
// ==/UserScript==

var $ = function(selector,context){return(context||document).querySelector(selector)};

function dodajStyl(idStyle,styles) { // Dodanie stylu
	if(document.getElementById(idStyle)){ document.getElementsByTagName("head")[0].removeChild(document.getElementById(idStyle)); }
	var css = document.createElement('style'); css.type = 'text/css'; css.id = idStyle;
	css.styleSheet ? css.styleSheet.cssText = styles : css.appendChild( document.createTextNode(styles) );
	document.getElementsByTagName("head")[0].appendChild(css);
}

var repeatFunction = function(repeatedFunctionName, time){
	(function repeater(){
		if(document.getElementById("pagelet_stream_pager")){
		if(document.getElementById("pagelet_stream_pager").getElementsByTagName("div")[0] ){
		if(document.getElementById("pagelet_stream_pager").getElementsByTagName("div")[0].className.replace(" async_saving") == "clearfix mts uiMorePager stat_elem fbStreamPager hasMorePosts") {
			console.log(3);
			repeatedFunctionName(); }}}
		setTimeout(repeater, time);
	})();
}

function StalePrzyklejenie(){
	// Wziąć pod uwagę udostępnienie tego samego przez kilka osób
	// Skasować lubienia stron
	
	//var iloscWpisow = document.getElementById("home_stream").getElementsByTagName("li").length;
	//console.log(iloscWpisow);
	iloscWpisow = 47;
	for(var idPostu = 0; idPostu<iloscWpisow; idPostu++){
		var tekstWpisu = $("#home_stream li:nth-child("+idPostu+") .messageBody .userContent");
		var nazwaAdresu = $("#home_stream li:nth-child("+idPostu+") .uiAttachmentTitle > strong");
		if(tekstWpisu && nazwaAdresu){
		var sTekstWpisu = tekstWpisu.firstChild.nodeValue.toLowerCase();
		var sNazwaAdresu = tekstWpisu.firstChild.nodeValue.toLowerCase();
		console.log(sTekstWpisu +" ||| "+ sNazwaAdresu);
			
			if(sNazwaAdresu == sTekstWpisu) console.log('rowne');
			if(sTekstWpisu.replace(sNazwaAdresu) != sTekstWpisu || 
			   sNazwaAdresu.replace(sTekstWpisu) != sNazwaAdresu ){
				console.log('kasuj to '+$("#home_stream li:nth-child("+idPostu+")"));
				$("#home_stream > li:nth-child("+idPostu+")").style.display = "none";
				
			}
		}
	}
}

function glFun() {
	repeatFunction(StalePrzyklejenie, 100);
	
	// Poczekaj aż załaduje się strona :(
	
	
		
	/*dodajStyl("styleUsera",""
		+""
	);*/
}


document.addEventListener("DOMContentLoaded", glFun);