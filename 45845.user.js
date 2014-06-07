// ==UserScript==
// @name           CantrIIColorChars
// @namespace      www.cantr.net
// @description    coloring chars in CantrII events page
// @include        http://www.cantr.net/index.php*
// ==/UserScript==

//usage: char name[color] i.e. John[red][i] , [b][green]Ann 
//1 = enabled. 0 = disabled
const CHARSEXCOLOR=1;	//apply COLOR to unknown CHARacters by SEX?
const SEXM='cyan';		//color for male chars
const SEXF='pink';		//color for female chars
const STRM='-:,czyzna,ruszek,man';		//strings to  identif. male chars 
const STRF='>-,kobieta,ruszka,woman';		//strings to  identif. female chars
const ITAL='[i]';			//italics tag
const BOLD='[b]';		//bold tag

var zdarzenia,zestaw=null;
//searching for chars
var zdarzenia=document.getElementById('eventsList');
if (zdarzenia!=null){
zestaw = document.evaluate(
	'//a[@onmouseover]',
	zdarzenia,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i = 0; i < zestaw.snapshotLength; i++) {
		osoba = zestaw.snapshotItem(i);
		var str=osoba.firstChild.data;
		if (CHARSEXCOLOR){
			lista=STRM.split(',');
			for (j=0;j<lista.length;j++){
				if(str.indexOf(lista[j])>=0){
					osoba.style.color = SEXM;
				}
			}
			
			lista=STRF.split(',');
			for (j=0;j<lista.length;j++){
				if(str.indexOf(lista[j])>=0){
					osoba.style.color = SEXF;
				}
			}
		}	
		//style
		if(str.indexOf(BOLD)>=0){
			osoba.style.fontWeight = 'bold';
			osoba.innerHTML=osoba.innerHTML.replace(BOLD,'');
			str=str.replace(BOLD,'')
		}
		if(str.indexOf(ITAL)>=0){
			osoba.style.fontStyle = 'italic';
			osoba.innerHTML=osoba.innerHTML.replace(ITAL,'');
			str=str.replace(ITAL,'');
		}
		//color
		lb=str.indexOf('[');
		if(lb>=0){
			rb=str.indexOf(']');
			kolor=str.substr(lb+1,rb-lb-1);
			osoba.style.color=kolor;
			osoba.innerHTML=osoba.innerHTML.replace('['+kolor+']','');
		}
	}
};
