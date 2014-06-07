// ==UserScript==
// @name           PAPAZ Easy IMDB
// @namespace      *
// @description    Adds some new buttons on IMDB to facilitate searches for torrents and subtitles.
// @version	4.05
// @include        http://www.imdb.com/*
// ==/UserScript==


var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  'window.name = "oldwin"; var a = new String(document.location);var b = new Array();var tit = document.title;var tits = tit.substring(0,tit.indexOf("(",0)-1);if(tits=="") { tits=tit } ;var tits2 = tits.substring(0,tits.indexOf("-",0)-1);if(tits2=="") { tits2=tits } ;var torz = "http://torrentz.eu/search?f=" + "%22" + tits + "%22" ;var iso = "http://baymirror.com/search/" + tits + "/0/99/0" ;var pir = "http://thepiratebay.se/search/" + tits + "/0/99/0";var tits4 = tits;var intSpace= tits4.indexOf(" ");while (intSpace != -1){var tits4 =tits4.replace(" ","+");intSpace= tits4.indexOf(" ");};var intSpace= tits4.indexOf(":");while (intSpace != -1){var tits4 =tits4.replace(":","");intSpace= tits4.indexOf(" ");};var subs4 = "http://www.small-industry.com/search_report.php?search=" + tits4; var pic = "http://www.google.com/search?safe=off&tbm=isch&q=" + "%22" + tits + "%22" ; var nud = "http://www.google.com/search?safe=off&tbm=isch&q=" + "%22" + tits + "%22 nude";var wiki= "http://en.wikipedia.org/wiki/" + tits;var wiki2= "http://en.wikipedia.org/wiki/" + tits2;var opensub= "http://www.opensubtitles.org/en/search2/sublanguageid-all/moviename-" + tits;var Netw= "http://www.celebritynetworth.com/dl/" + tits;var youtube= "http://www.youtube.com/results?search_query=" + "%22" + tits + "%22 trailer";var youtubem= "http://www.youtube.com/results?search_query=" + "%22" + tits + "%22 making of";function torrents() {  window.open(iso);window.open(pir);window.open(torz); oldwin.focus();  };function subs() { window.open(subs4);window.open(opensub); oldwin.focus();  };function pict() { window.open(pic);oldwin.focus() ; };function Wikipedia() { window.open(wiki);oldwin.focus() ; };function Wikipedia2() { window.open(wiki2);oldwin.focus() ; };function nude() { window.open(nud);oldwin.focus() ; };function trailer() { window.open(youtube)};function making() { window.open(youtubem)};function Net() { window.open(Netw);oldwin.focus() ; }'

// var tits4 = tits.substring(1,(tits.length-1));
// var iso = "http://isohunt.com/torrents/?ihq=" + tits ;

document.getElementsByTagName("head")[0].appendChild(scriptElement);
window.addButton = function () {

	var targetDiv = document.getElementById('tn15title'); //tsf, mngb
	
	var aUrl = window.location.href;
	
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'Phrase');
	
	var inputButton1 = document.createElement('input');
	inputButton1.name = 'inputButton';
	inputButton1.type = 'button';
	inputButton1.value = 'Torrents';
  inputButton1.setAttribute('style', 'margin-top:5px;margin-left:7px;font-size:12px;background-color: #EDF55B;color: #006200; width: 90px; border:1px solid; border-left-width: 1px;border-color: #777777; ');
	inputButton1.setAttribute("onclick", "torrents();");

	var inputButton2 = document.createElement('input');
	inputButton2.name = 'inputButton';
	inputButton2.type = 'button';
	inputButton2.value = 'Subtitles';
  inputButton2.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EDF55B;color: #0000A5; width: 90px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton2.setAttribute("onclick", "subs();");

	var inputButton3 = document.createElement('input');
	inputButton3.name = 'PhraseButton';
	inputButton3.type = 'button';
	inputButton3.value = 'Pictures';
  //inputButton3.setAttribute('style', 'font-size:12px;color: #0000AA;');
  inputButton3.setAttribute('style', 'font-size:12px ; margin-left:7px;background-color: #EDF55B ; width: 90px ; border:1px solid; border-left-width: 1px;border-color: #777777; color: #0000DD ');
  inputButton3.setAttribute("onclick", "pict();");
	
	var inputButton4 = document.createElement('input');
	inputButton4.name = 'PhraseButton';
	inputButton4.type = 'button';
	inputButton4.value = 'Nude Pictures';
	//inputButton4.setAttribute('style', 'font-size:12px;color: #AA0000;');
  inputButton4.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EDF55B;color: #DD0000; width: 90px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton4.setAttribute("onclick", "nude();");
	
	var inputButton5 = document.createElement('input');
	inputButton5.name = 'PhraseButton';
	inputButton5.type = 'button';
	inputButton5.value = 'Trailer';
	inputButton5.setAttribute('style', 'margin-top:5px;margin-left:2px;font-size:12px;background-color: #FFFFFF;color: #DD0000; width: 75px; border:1px solid; border-left-width: 1px;border-color: #777777; ');
	inputButton5.setAttribute("onclick", "trailer();");
	
	var inputButton9 = document.createElement('input');
	inputButton9.name = 'PhraseButton';
	inputButton9.type = 'button';
	inputButton9.value = 'Making of';
	inputButton9.setAttribute('style', 'margin-top:5px;margin-left:0px;font-size:12px;background-color: #E6FBFC;color: #0780A8; width: 75px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton9.setAttribute("onclick", "making();");
	
	var inputButton6 = document.createElement('input');
	inputButton6.name = 'PhraseButton';
	inputButton6.type = 'button';
	inputButton6.value = 'Wikipedia';
	inputButton6.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EEEEEE;color: #000000; width: 90px; border:1px solid; border-left-width: 1px;border-color: #777777; ');
	inputButton6.setAttribute("onclick", "Wikipedia();");
	
	var inputButton7 = document.createElement('input');
	inputButton7.name = 'PhraseButton';
	inputButton7.type = 'button';
	inputButton7.value = 'NetWorth';
	inputButton7.setAttribute('style', 'margin-top:5px;margin-left:7px;font-size:12px;background-color: #DAF2F1;color: #117A75; width: 90px; border:1px solid; border-left-width: 1px;border-color: #777777; ');
	inputButton7.setAttribute("onclick", "Net();");
	
	var inputButton8 = document.createElement('input');
	inputButton8.name = 'PhraseButton';
	inputButton8.type = 'button';
	inputButton8.value = 'Wikipedia';
	inputButton8.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EEEEEE;color: #000000; width: 90px; border:1px solid; border-left-width: 1px;border-color: #777777; ');
	inputButton8.setAttribute("onclick", "Wikipedia2();");
	
	var span = document.createElement('span');
	var textYT = document.createTextNode('on YouTube:');
span.style.fontSize = "10px";
span.style.color = "#777777";
span.style.marginLeft = "10px";
span.appendChild(textYT);
	

	

	if (aUrl.match("title")) {
	newDiv.appendChild(inputButton6); 
	newDiv.appendChild(inputButton1);
	newDiv.appendChild(inputButton2);
	newDiv.appendChild(span);
	newDiv.appendChild(inputButton5);
	newDiv.appendChild(inputButton9); 
	}else{
	newDiv.appendChild(inputButton8); 
	newDiv.appendChild(inputButton3); 
	newDiv.appendChild(inputButton4);
	newDiv.appendChild(inputButton7); 
}
	targetDiv.appendChild(newDiv);
}
 
addButton();