// ==UserScript==
// @name           Deezer Lyrics
// @namespace      Moon6child
// @description    Lyrics on Deezer
// @include        http://*.deezer.*/*
// @copyright      Moon6child
// @author         Moon6child
// @version        1.2
// ==/UserScript==

var elements;
var band;
var song;
var l1adress;
var l2adress;
var t1adress;
var t2adress;
var link;
var tlink;
var l1link;
var l2link;
var t1link;
var t2link;
var font;
var txt;
var ttxt;
var t1txt;
var t2txt;
var l1txt;
var l2txt;
var fonttxt;
var div;
var tdiv;
var ldiv;
var dir;
var dirdiv;
var dirtdiv;
var dirldiv;
var del;
var tdel;
var t1del;
var t2del;
var l1del;
var l2del;
var fontdel;
var tbr;
var lbr;
var tbrdel;
var lbrdel;


			dir = document.getElementById('options').getElementsByTagName('ul')[0];
			
			div = document.createElement('div');
			div.setAttribute("id", "divlink");
			div.setAttribute("style", "text-align:center;");
			dir.appendChild(div);
			dirdiv = dir.getElementsByTagName('div')[0];
			
			tdiv = document.createElement('div');
			tdiv.setAttribute("id", "divtlink");
			tdiv.setAttribute("style", "display:none; text-align:center; background-color:#666666;");
			tdiv.setAttribute("onMouseOver", "javascript:this.style.display='block';");
			tdiv.setAttribute("onMouseOut", "javascript:this.style.display='none';");
			dir.appendChild(tdiv);
			dirtdiv = dir.getElementsByTagName('div')[1];
			
			ldiv = document.createElement('div');
			ldiv.setAttribute("id", "divllink");
			ldiv.setAttribute("style", "display:none; text-align:center; background-color:#666666;");
			ldiv.setAttribute("onMouseOver", "javascript:this.style.display='block';");
			ldiv.setAttribute("onMouseOut", "javascript:this.style.display='none';");
			dir.appendChild(ldiv);
			dirldiv = dir.getElementsByTagName('div')[2];
			
			var diraban = document.getElementById('top-nav');
			var aban = document.createElement('a');
			aban.setAttribute("href", "http://concert-stream.fr/");
			aban.setAttribute("target", "_blank");
			aban.setAttribute("id", "banconcertstream");
			diraban.appendChild(aban);
			
			var diriban = document.getElementById('banconcertstream');
			var iban = document.createElement('img');
			iban.setAttribute("src", "http://concert-stream.fr/images/ban350x38.jpeg");
			iban.setAttribute("alt", "");
			diriban.appendChild(iban);
			
			

function Lyrics(){

			elements = document.getElementById('current');

			band = elements.getElementsByTagName('a')[1].innerHTML;

			song = elements.getElementsByTagName('a')[0].innerHTML.split(' (')[0].split(' [')[0];

			l1adress = 'http://search.letssingit.com/cgi-exe/am.cgi?a=search&l=archive&s=' + band + ' ' + song;
			l2adress = 'http://www.lyricsmode.com/search.php?what=bands&s=' + band + '&what=songs&s=' + song;
			t1adress = 'http://www.ultimate-guitar.com/search.php?value=' + band + ' ' + song + '&search_type=title';
			t2adress = 'http://www.911tabs.com/search.php?search=' + band + '&type=band&search=' + song + '&type=song';

			link = document.createElement('a');
			link.setAttribute("onMouseOver", "javascript:document.getElementById('divllink').style.display='block';");
			link.setAttribute("onMouseOut", "javascript:document.getElementById('divllink').style.display='none';");
			txt = document.createTextNode('Lyrics');
			link.appendChild(txt);
			
			tlink = document.createElement('a');
			tlink.setAttribute("onMouseOver", "javascript:document.getElementById('divtlink').style.display='block';");
			tlink.setAttribute("onMouseOut", "javascript:document.getElementById('divtlink').style.display='none';");
			ttxt = document.createTextNode('Tabs');
			tlink.appendChild(ttxt);
			
			font = document.createElement('font');
			font.setAttribute('color', '#0D7BBC');
			fonttxt = document.createTextNode(' | ');
			font.appendChild(fonttxt);
			
			l1link = document.createElement('a');
			l1link.setAttribute('href', l1adress);
			l1link.setAttribute('target', '_blank');
			l1txt = document.createTextNode('Lets Sing It');
			l1link.appendChild(l1txt);
			
			l2link = document.createElement('a');
			l2link.setAttribute('href', l2adress);
			l2link.setAttribute('target', '_blank');
			l2txt = document.createTextNode('Lyrics Mode');
			l2link.appendChild(l2txt);

			
			t1link = document.createElement('a');
			t1link.setAttribute('href', t1adress);
			t1link.setAttribute('target', '_blank');
			t1txt = document.createTextNode('Ultimate Guitare');
			t1link.appendChild(t1txt);
			
			t2link = document.createElement('a');
			t2link.setAttribute('href', t2adress);
			t2link.setAttribute('target', '_blank');
			t2txt = document.createTextNode('911Tabs');
			t2link.appendChild(t2txt);
			
			tbr = document.createElement('br');
			lbr = document.createElement('br');
			
			dirdiv.appendChild(link);
			dirdiv.appendChild(font);
			dirdiv.appendChild(tlink);
			
			dirldiv.appendChild(l1link);
			dirldiv.appendChild(lbr);
			dirldiv.appendChild(l2link);
			
			dirtdiv.appendChild(t1link);
			dirtdiv.appendChild(tbr);
			dirtdiv.appendChild(t2link);

			setTimeout(Delete, 1000);

}

function Delete(){

			del = dirdiv.getElementsByTagName('a')[0];
			tdel = dirdiv.getElementsByTagName('a')[1];
			fontdel = dirdiv.getElementsByTagName('font')[0];
			dirdiv.removeChild(del);
			dirdiv.removeChild(fontdel);
			dirdiv.removeChild(tdel);
			
			l1del = dirldiv.getElementsByTagName('a')[0];
			l2del = dirldiv.getElementsByTagName('a')[1];
			t1del = dirtdiv.getElementsByTagName('a')[0];
			t2del = dirtdiv.getElementsByTagName('a')[1];
			
			lbrdel = dirldiv.getElementsByTagName('br')[0];
			dirldiv.removeChild(l1del);
			dirldiv.removeChild(lbrdel);
			dirldiv.removeChild(l2del);
			tbrdel = dirtdiv.getElementsByTagName('br')[0];
			dirtdiv.removeChild(t1del);
			dirtdiv.removeChild(tbrdel);
			dirtdiv.removeChild(t2del);
			
			
			
			Lyrics();
}

setTimeout(Lyrics, 5000);