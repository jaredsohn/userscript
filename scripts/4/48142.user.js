// ==UserScript==
// @name           YehPlay Downloader - PT-BR
// @version        1.0
// @namespace      http://userscripts.org/users/89077
// @author         Oeder Fermino dos Santos
// @description    Baixe suas musicas Favoritas do YehPlay.com
// @include        http://yehplay.com/musics/*/*
// @include        http://www.yehplay.com/musics/*/*
// @include        http://yehplay.com/*/musics/*/*
// @include        http://www.yehplay.com/*/musics/*/*

// ==/UserScript==

function DownloadLink (url) {
	var tr = document.createElement('tr');
	var td = [document.createElement('td'), document.createElement('td')];	
	var img = document.createElement('img');
	img.setAttribute('src', 'http://img242.imageshack.us/img242/2446/downloadj.jpg');
	
	var a = document.createElement('a');
	a.setAttribute('href', url);
	a.setAttribute('style', 'font-family: arial; font-size: 9pt;');
	a.innerHTML = 'Baixar';

	td[0].appendChild(img);	
	td[1].appendChild(a);
	
	tr.appendChild(td[0]);
	tr.appendChild(td[1]);
	
	return tr;
}

var inputs = document.getElementsByTagName('input');
for (var i=0; i<inputs.length; i++) {
	if ( inputs[i].name == 'embed' ) {
		var embed = inputs[i].value;
		var er = /http:\/\/www\.mp3tube\.net\/play\.swf\?id=(.*?)"/;
		
		var tube = embed.match(er)[1];
		var link = 'http://storm.mp3tube.net/d.php?file=' + tube + '.tube';

		var as = document.getElementsByTagName('a');
		
		for (i=0; i<as.length; i++) {
			if ( as[i].getAttribute('target') == 'goo' ) {
				var table = as[i].parentNode.parentNode.parentNode.parentNode;
				table.appendChild ( DownloadLink(link) );
			}
		}
		
	}
}