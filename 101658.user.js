// ==UserScript==
// @name           PAPAZ Easy Google
// @namespace      *
// @version	3.03
// @include        http://www.google.tld/*
// @include        https://encrypted.google.com/*
// ==/UserScript==


var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  'var oldwin = this;var a = new String(document.location);var b = new Array();b = a.split("&q=",1);bb = b.join();if(bb==a) { b = a.split("?q=",1); qq = "?q=";} else {qq = "&q=";};c = a.length;d = b[0].length;e = a.substring(d+3, c);var f = new Array();f = e.split("&",1);fs=f.toString();g = e.length;h = f[0].length;i = e.substring(h+1,g);var k1 = b[0] + qq +  "%22" + f + "%22" + "&" + i;var k2 = b[0] + qq +  f + " filetype:pdf" + "&" + i;var k3 = b[0] + qq + f + " (inurl:forum OR inurl:showthread OR inurl:viewtopic OR inurl:viewthread)" + "&"  + i;var k4 = b[0] + qq +  "%22" + f + "%22 nude" + "&" + i + "&tbm=isch";var k5 = "http://isohunt.com/torrents/?ihq=" + f ; var k6 = "http://thepiratebay.org/search/" + f + "/0/99/0";var k7 = "http://www.skroutz.gr/search?keyphrase=" + f ; var k8 = "https://encrypted.google.com/search?q=" + f + "&" + i;function MakePhrase() {  window.content.location = k1  ; };function PDFs() {  window.content.location = k2  ;  };function Fora() {  window.content.location = k3  ;  };function Nude() {  window.content.location = k4  ;  };function iso() {  window.open(k5);oldwin.focus() ;  };function pirat() {  window.open(k6)  ;  };function skr() {  window.open(k7)  ;  }; function ssl() {  window.content.location = k8  ;};function engr(){ var ff="";var x=0;while (x<h){BL = fs.substr(x,1).toLowerCase();if (BL=="a"){ff=ff+String.fromCharCode(913);x++} else if (BL=="b"){ff=ff+String.fromCharCode(914);x++} else if (BL=="c"){ff=ff+String.fromCharCode(936);x++} else if (BL=="d"){ff=ff+String.fromCharCode(916);x++} else if (BL=="e"){ff=ff+String.fromCharCode(917);x++} else if (BL=="f"){ff=ff+String.fromCharCode(934);x++} else if (BL=="g"){ff=ff+String.fromCharCode(915);x++} else if (BL=="h"){ff=ff+String.fromCharCode(919);x++} else if (BL=="i"){ff=ff+String.fromCharCode(921);x++} else if (BL=="j"){ff=ff+String.fromCharCode(926);x++} else if (BL=="k"){ff=ff+String.fromCharCode(922);x++} else if (BL=="l"){ff=ff+String.fromCharCode(923);x++} else if (BL=="m"){ff=ff+String.fromCharCode(924);x++} else if (BL=="n"){ff=ff+String.fromCharCode(925);x++} else if (BL=="o"){ff=ff+String.fromCharCode(927);x++} else if (BL=="p"){ff=ff+String.fromCharCode(928);x++} else if (BL=="q"){ff=ff+String.fromCharCode(58);x++} else if (BL=="r"){ff=ff+String.fromCharCode(929);x++} else if (BL=="s"){ff=ff+String.fromCharCode(931);x++} else if (BL=="t"){ff=ff+String.fromCharCode(932);x++} else if (BL=="u"){ff=ff+String.fromCharCode(920);x++} else if (BL=="v"){ff=ff+String.fromCharCode(937);x++} else if (BL=="w"){ff=ff+String.fromCharCode(962);x++} else if (BL=="x"){ff=ff+String.fromCharCode(935);x++} else if (BL=="y"){ff=ff+String.fromCharCode(933);x++} else if (BL=="z"){ff=ff+String.fromCharCode(918);x++} else if (BL=="%"){CL = fs.substr(x,6);if (CL=="%CE%91" | CL=="%CE%B1"){ff=ff+"a";} else if (CL=="%CE%92" | CL=="%CE%B2"){ff=ff+"b";} else if (CL=="%CE%93" | CL=="%CE%B3"){ff=ff+"g";} else if (CL=="%CE%94" | CL=="%CE%B4"){ff=ff+"d";} else if (CL=="%CE%95" | CL=="%CE%B5"){ff=ff+"e";} else if (CL=="%CE%96" | CL=="%CE%B6"){ff=ff+"z";} else if (CL=="%CE%97" | CL=="%CE%B7"){ff=ff+"h";} else if (CL=="%CE%98" | CL=="%CE%B8"){ff=ff+"u";} else if (CL=="%CE%99" | CL=="%CE%B9"){ff=ff+"i";} else if (CL=="%CE%9A" | CL=="%CE%BA"){ff=ff+"k";} else if (CL=="%CE%9B" | CL=="%CE%BB"){ff=ff+"l";} else if (CL=="%CE%9B" | CL=="%CE%BB"){ff=ff+"l";} else if (CL=="%CE%9C" | CL=="%CE%BC"){ff=ff+"m";} else if (CL=="%CE%9D" | CL=="%CE%BD"){ff=ff+"n";} else if (CL=="%CE%9E" | CL=="%CE%BE"){ff=ff+"j";} else if (CL=="%CE%9F" | CL=="%CE%BF"){ff=ff+"o";} else if (CL=="%CE%A0" | CL=="%CF%80"){ff=ff+"p";} else if (CL=="%CE%A1" | CL=="%CF%81"){ff=ff+"r";} else if (CL=="%CE%A3" | CL=="%CF%83"){ff=ff+"s";} else if (CL=="%CF%82"){ff=ff+"w";} else if (CL=="%CE%A4" | CL=="%CF%84"){ff=ff+"t";} else if (CL=="%CE%A5" | CL=="%CF%85"){ff=ff+"y";} else if (CL=="%CE%A6" | CL=="%CF%86"){ff=ff+"f";} else if (CL=="%CE%A7" | CL=="%CF%87"){ff=ff+"x";} else if (CL=="%CE%A8" | CL=="%CF%88"){ff=ff+"c";} else if (CL=="%CE%A9" | CL=="%CF%89"){ff=ff+"v";} x=x+6;} else if (BL=="0" | BL=="1" | BL=="2" | BL=="3" | BL=="4" | BL=="5" | BL=="6" | BL=="7" | BL=="8" | BL=="9" | BL=="+" | BL=="-" | BL=="."){ff=ff+BL;x++} ;};window.content.location = b[0] + qq +  ff + "&" + i ;};'


// fs to f i anazitisi (array) se string


document.getElementsByTagName("head")[0].appendChild(scriptElement);
window.addButton = function () {

	var targetDiv = document.getElementById('tsf'); //tsf, mngb, resultStats, ss-status
	
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'Phraser');
	
	var inputButton1 = document.createElement('input');
	inputButton1.name = 'inputButton';
	inputButton1.type = 'button';
	inputButton1.value = 'Phrase';
	inputButton1.setAttribute("onclick", "MakePhrase();");


	var inputButton2 = document.createElement('input');
	inputButton2.name = 'PhraseButton';
	inputButton2.type = 'button';
	inputButton2.value = 'PDFs';
	inputButton2.setAttribute("onclick", "PDFs();");

	var inputButton3 = document.createElement('input');
	inputButton3.name = 'PhraseButton';
	inputButton3.type = 'button';
	inputButton3.value = 'Fora';
	inputButton3.setAttribute("onclick", "Fora();");

	var inputButton4 = document.createElement('input');
	inputButton4.name = 'PhraseButton';
	inputButton4.type = 'button';
	inputButton4.value = 'Nude';
	inputButton4.setAttribute("onclick", "Nude();");

	var inputButton5 = document.createElement('input');
	inputButton5.name = 'inputButton';
	inputButton5.type = 'button';
	inputButton5.value = 'isoHunt';
	inputButton5.setAttribute("onclick", "iso();");


	var inputButton6 = document.createElement('input');
	inputButton6.name = 'PhraseButton';
	inputButton6.type = 'button';
	inputButton6.value = 'PirateBay';
	inputButton6.setAttribute("onclick", "pirat();");

	var inputButton7 = document.createElement('input');
	inputButton7.name = 'PhraseButton';
	inputButton7.type = 'button';
	inputButton7.value = 'Skroutz';
	inputButton7.setAttribute("onclick", "skr();");

	var inputButton8 = document.createElement('input');
	inputButton8.name = 'PhraseButton';
	inputButton8.type = 'button';
	inputButton8.value = 'SSL';
	inputButton8.setAttribute("onclick", "ssl();");

	var inputButton9 = document.createElement('input');
	inputButton9.name = 'PhraseButton';
	inputButton9.type = 'button';
	inputButton9.value = 'EN<=>GR';
	inputButton9.setAttribute("onclick", "engr();");
	
	newDiv.appendChild(inputButton1); 
	newDiv.appendChild(inputButton2); 
	newDiv.appendChild(inputButton3); 
	newDiv.appendChild(inputButton4);
	newDiv.appendChild(inputButton5); 
	newDiv.appendChild(inputButton6); 
	newDiv.appendChild(inputButton7); 
	newDiv.appendChild(inputButton8);
	newDiv.appendChild(inputButton9);

	targetDiv.appendChild(newDiv);

}
addButton();


