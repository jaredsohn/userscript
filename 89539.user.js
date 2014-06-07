// ==UserScript==
// @name          ATT e DEF em Todo Lugar
// @namespace     ATT e DEF em Todo Lugar
// @author        James Maxwel
// @version       1.0
// @description   Exibe a ATT DEF valores atuais
// @include       http://*faveladogame.com.br*
// ==/UserScript==

if (document.location.href.indexOf('sampa.faveladogame.com.br/')>=0) {
var pgurl = 'http://sampa.faveladogame.com.br/';
};
if(document.location.href.indexOf('www.faveladogame.com.br/')>=0) {
var pgurl = 'http://www.faveladogame.com.br/';
};
if(document.location.href.indexOf('muenchen.faveladogame.com.br/')>=0) {
var pgurl = 'http://muenchen.faveladogame.com.br/';
};
if(document.location.href.indexOf('halloween.faveladogame.com.br/')>=0) {
var pgurl = 'http://halloween.faveladogame.com.br/';
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
li.innerHTML +='<img src=\"http://mediaberlin.faveladogame.com.br/img/att.png\" border=\"2\">&nbsp;'+text4+'&nbsp;<img src=\"http://media.faveladogame.com.br/img/def.png\" border=\"2\">&nbsp;'+text8+'';




		}
	});