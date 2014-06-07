// ==UserScript==
// @name           mp3tube downloader
// @version        2.0
// @namespace      http://tevaum.eti.br/ff/gmus
// @author         Estêvão Samuel Procópio
// @description    Download your favorite songs from mp3tube.net
// @include        http://mp3tube.net/musics/*/*
// @include        http://www.mp3tube.net/musics/*/*
// @include        http://mp3tube.net/*/musics/*/*
// @include        http://www.mp3tube.net/*/musics/*/*
// @include        http://yehplay.com/musics/*/*
// @include        http://www.yehplay.com/musics/*/*
// @include        http://yehplay.com/*/musics/*/*
// @include        http://www.yehplay.com/*/musics/*/*
// ==/UserScript==

function DownloadLink (url) {
	var tr = document.createElement('tr');
	var td = [document.createElement('td'), document.createElement('td')];	
	var img = document.createElement('img');
	img.setAttribute('src', 'http://www.youtube.com/img/icn_web_reg_19x17.gif');
	
	var a = document.createElement('a');
	a.setAttribute('href', url);
	a.setAttribute('style', 'font-family: arial; font-size: 9pt;');
	a.innerHTML = 'Download';

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