// ==UserScript==
// @name serserionline SAL SAV 4.0 
// @namespace   serserionline by  basti1012 (2b)
// @description SAL SAV Overall
// @include http://*serserionline.com*
// ==/UserScript==

if (document.location.href.indexOf('serserionline.com/')>=0) {
var pgurl = 'http://serserionline.com/';
};
if(document.location.href.indexOf('www.serserionline.com/')>=0) {
var pgurl = 'http://www.serserionline.com/';
};

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl+'/fight/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('SAL:')[1];
			var text2 = text1.split('class')[0];
			var text3 = text2.split('">')[1];
			var text4 = text3.split('<a')[0];		
			var text5 = content.split('SAV:')[1];
			var text6 = text5.split('class')[0];
			var text7 = text6.split('<td>')[1];
			var text8 = text7.split('<a')[0];
		var table = document.getElementById('topmenu');
		var li = document.createElement('li');
		table.getElementsByTagName('ul')[0].appendChild(li);
li.innerHTML +='<img src=\"http://mediaberlin.pennergame.de/img/att.png\" border=\"2\">&nbsp;'+text4+'&nbsp;<img src=\"http://media.pennergame.de/img/def.png\" border=\"2\">&nbsp;'+text8+'';




		}
	});