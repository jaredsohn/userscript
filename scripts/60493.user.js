// ==UserScript==
// @name Pennergame ATTZ def anzeige hamburg berlin 4.0 
// @namespace  fuer 2 berlin von basti1012
// @description Zeigt die aktuellen ATT und DEF Werte im Status an.
// @include http://*pennergame.de*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
};
if(document.location.href.indexOf('www.pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
};

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl+'/fight/overview/',
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
		var table = document.getElementById('topmenu');
		var li = document.createElement('li');
		table.getElementsByTagName('ul')[0].appendChild(li);
li.innerHTML +='<img src=\"http://mediaberlin.pennergame.de/img/att.png\" border=\"2\">&nbsp;'+text4+'&nbsp;<img src=\"http://media.pennergame.de/img/def.png\" border=\"2\">&nbsp;'+text8+'';




		}
	});