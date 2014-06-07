// ==UserScript==
// @name           Jump Download
// @namespace      KingRider
// @description    Anti-Ads & Anti-Link Protected by KingRider
// @author         Sandro Alvares <sandro.rider@gmail.com>
// @version        2.56
// @include        http://*?url=*
// @include        http://*?link=*
// @include        http://*&url=*
// @include        http://*?go!aHR0*
// @include        http://www.baixandorapido.com/?*
// @include        http://*/proturl/?*
// @include        http://*/protetor/?*
// @include        http://*/*687474703a2f2f*
// ==/UserScript==

var host = window.location.href;
var inverter = 0;
var hexdec = 0;
var hexurl = "";
var temp = 0;

if (host.indexOf("?go!aHR0") > 0) {
	window.location=(host.replace("?go!aHR0","?down!aHR0"));
	exit;
}

if (host.indexOf("url=") > 0) {
	tamanho = host.indexOf("url=");
	letra = 4;
}

if (host.indexOf("/proturl/") > 0) {
  botao = document.getElementsByTagName('INPUT');
  for (i = 0; i < botao.length; i++) {
    if (document.getElementsByTagName('INPUT')[i].value == "submit" && temp == 0) {
		document.getElementsByTagName('INPUT')[i].click();
		temp = 1;      
    }      
  }
}

if (host.indexOf("/protetor/") > 0) {
	tamanho = host.indexOf("protetor/?");
	letra = 10;
	hexdec = 0;
}

if (host.indexOf("687474703a2f2f") > 0) {
	tamanho = host.indexOf("687474703a2f2f");
	letra = 0;
	hexdec = 1;
}

var total = host.length;
var atual = window.location.href;
var fake2 = "http://www.baixandorapido.com/?"

if (atual.substring(total-7,total) == "//:ptth") {
	tamanho = atual.indexOf("=");
	letra = 1;
	inverter = 1;
}

if (hexdec == 0 && tamanho >= 20) {
  if (inverter == 0) {
		window.location=(atual.substring(tamanho+letra,total));
  } else {
		linkinverter = atual.substring(tamanho+letra,total);
		window.location=(reversao(linkinverter));
  }
} else if (hexdec == 0) {
  var host2 = window.location.href;
  var tamanho2 = host.indexOf(fake2);
  var total2 = host2.length;
  var atual2 = window.location.href;
  if (inverter == 0) {
	window.location=(atual2.substring(fake2.length,total2));
  } else {
	linkinverter2 = atual2.substring(fake2.length,total2);
	window.location=(reversao(linkinverter2));
  }
}

if (hexdec == 1) {
	hexurl = atual.substring(tamanho+letra,total);
	var final = hexurl.length;
	var result = "";
	var inicio;
	h = 0;
	while (h <= final-2) {
		result=String.fromCharCode("0x"+hexurl.substring(h,h+2))+result;
		h = h + 2;
	}
	window.location=(reversao(result));
}

function reversao(texto) {
  text = "";
  for (i = 0; i <= texto.length; i++) {
	text = texto.substring(i, i+1) + text;
  }
  return text;
}