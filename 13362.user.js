// ==UserScript==
// @name           DF-WebMailNoSpam
// @namespace      DF-WebMailNoSpam
// @include        http://adress-of-your-web-mail-interface-here/*
// ==/UserScript==

/*
some providers mark supposed Spam like this: [SPAM] *THE S-eXY- Titl3 H3re !!! *
At the IMP / Horde webmail interface this userscript will hide all Spam messages .
cc) 2007 jochen preusche -- jochenpreusche.com

this one is for the german interface, if you wish to apply it for another language you may change
some lines at the bottom.

for example, 'Posteingang' reffers to 'inbox'

Please note that ther is no support available for this script.
*/

var spammails = 0;


function del(o)   {
 o.style.display = 'none';
 spammails++;
}


as = document.getElementsByTagName('a');

for (i=0; i<as.length; i++) {
	if(as[i].attributes.length>1){
	nicet = as[i].attributes[1].value;
	var s = /SPAM/;
		if(nicet.match(s)!= null){		
				del(as[i].parentNode.parentNode);			
			
		}
	}
}

tds = document.getElementsByTagName('td');

for (i=0; i<tds.length; i++) {
	if(tds[i].innerHTML){
		if(tds[i].innerHTML == "Unbekanntes Datum&nbsp;"){		
			del(tds[i].parentNode);
		}
	}
}

// display a message
// http://www.kontaktrunde.de/HTML_Farbnamen_HTML_Farbcode.html -- hex colors dont work here
s = /Posteingang \(([\d]*)\)/;


var str = (document.body.innerHTML.match(s)[0]);
var entiremails = (document.body.innerHTML.match(s)[1])-spammails;
if(entiremails<0)entiremails=0;

var newstr = "Posteingang  (" + entiremails +") <span style='color:yellowgreen;font-size:75%'>[ " +spammails +" ]</span>";
document.body.innerHTML = document.body.innerHTML.replace(s, newstr);


t = /(\([\d]*\))/;
parent.document.title = parent.document.title.replace(t, '('+ entiremails +') [' +spammails +']');

t = /Posteingang[\s]?<\/strong>[\s]?\(([\d]*)\)[\s]?<\/span>/g;
formersidbar = parent.frames[0].document.body.innerHTML;
var newstr = "Posteingang</strong> (" + entiremails +") <span style='color:grey;'>[" +spammails +"]</span>";
parent.frames[0].document.body.innerHTML = formersidbar.replace(t, newstr);

//  1 bis 5 von 5 Nachrichten
p = /([\d]*) bis ([\d]*) von ([\d]*)/;
var n1 = document.body.innerHTML.match(p)[1];
var n2 = document.body.innerHTML.match(p)[2]-spammails;
var n3 = document.body.innerHTML.match(p)[3]-spammails;
document.body.innerHTML = document.body.innerHTML.replace(p, ' ' +n1 +' bis ' +n2 +' von ' +n3 +"<span style='color:yellowgreen;font-size:75%'>" +' [+' +spammails +']</span>' );



t = /Webmail[\s]?<\/strong>[\s]?\(([\d]*)\)[\s]?<\/a>/g;
formersidbar = parent.frames[0].document.body.innerHTML;
var newstr = "Webmail</strong> (" + entiremails +") <span style='color:grey;'>[" +spammails +"]</span>";
parent.frames[0].document.body.innerHTML = formersidbar.replace(t, newstr);