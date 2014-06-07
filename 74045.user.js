// ==UserScript==
// @name 	   Pennergame ATT DEF Anzeige Hamburg Berlin Muenchen 4.0 
// @author         basti1012 @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @namespace      basti1012 @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @description    Zeigt die aktuellen ATT und DEF Werte im Status an.
// @include        http://*pennergame.de*
// ==/UserScript==

//Position
var left = '200';
var top = '200';


//Linkadressen definieren
var url = document.location.href;
//Linkadressen fuer Hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
//Linkadressen fuer Berlin
if (url.indexOf("berlin")>=0) {
var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}
//Linkadressen fuer Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var link = "http://muenchen.pennergame.de"
var sig = 'http://inodes.pennergame.de/mu_DE/signaturen/';
}

GM_xmlhttpRequest({
  	method: 'GET',
   	url: link+'/fight/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('ATT:')[1];
			var text2 = text1.split('class')[0];
			var text3 = text2.split('">')[1];
			var text4 = text3.split('<a')[0];		
			var text5 = content.split('DEF:')[1];
			var text6 = text5.split('class')[0];
			var text7 = text6.split('<td>')[1];
			var text8 = text7.split('<a')[0];
		var body = document.getElementsByTagName('body')[0];
body.innerHTML +='<div style="position:absolute;left:'+left+'px;top:'+top+'px"><img src=\"http://media.pennergame.de/img/att.png\" border=\"2\">&nbsp;'+text4+'&nbsp;<img src=\"http://media.pennergame.de/img/def.png\" border=\"2\">&nbsp;'+text8+'</div>';




		}
	});