// ==UserScript==
// @name           OGame Overview
// @namespace      OGame Overview
// @include        http://uni77.ogame.de/game/index.php?page=overview&session=*
// ==/UserScript==

/*
var counter = 0;


var regAus = /<th><div.*<\/div><\/th>\n<th colspan="3"><span class="flight owndeploy">Eine .*Flotte.* Ihr Auftrag lautet.*<\/span>/ig;
var treffer = document.body.innerHTML.match(regAus);

if (treffer != null) {

	for (i = 0; i < treffer.length; i++) {

		counter = counter+1;

		if (treffer[i].match(/Stationieren/ig) != null) {
			document.body.innerHTML = treffer[i].replace(/<a href="javascript:showGalaxy.*<\/a> erreicht/ig,"").replace(/<a href="javascript:showGalaxy.*<\/a>\./ig,"").replace(/erreicht/ig,"").replace(/Planeten/ig,"").replace(/den/ig,"->").replace(/vom/ig,"").replace(/Eine/ig,"").replace(/deiner/ig,"").replace(/Flotten/ig,"").replace(/Ihr/ig,"").replace(/Auftrag/ig,"").replace(/lautet\:/ig,"").replace(/dr/ig,"");


                }

        }

}


*/

var angriffe = 0;

function urlp(name)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );

	if ( results == null )
		return "";
	else
		return results[1];
}



document.body.innerHTML = document.body.innerHTML.replace(
/<!-- _________________ComBox Ende _____________ -->/ig,
function(s){ return '<div align=center><img src=http://img69.imageshack.us/img69/2065/lzb.png></div><br><br>'; });


document.body.innerHTML = document.body.innerHTML.replace(
/Du hast .* neue Nachrichten/ig,
function(s){ return '<table width=100% height=100%><td align=center><table style=background-color:#333333><td style=background-color:#002277 align=center><font size=4 color=grey><b>&nbsp;<a href=index.php?page=messages&dsp=1&session='+urlp('session')+ '>'+s+'</a>&nbsp;</td></table></td></table>'; });

document.body.innerHTML = document.body.innerHTML.replace(
/Du hast 1 neue Nachricht/ig,
function(s){ return '<table width=100% height=100%><td align=center><table style=background-color:#333333><td style=background-color:#002277 align=center><font size=4 color=grey><b>&nbsp;<a href=index.php?page=messages&dsp=1&session='+urlp('session')+ '>'+s+'</a>&nbsp;</td></table></td></table>'; });


document.body.innerHTML = document.body.innerHTML.replace(
/Eine feindliche .*Flotte.* Ihr Auftrag lautet: Angreifen/ig,
function(s){ angriffe = angriffe + 1; return '<table width=100% height=100% style=background-color:#c11b17><td style=background-color:#c11b17 align=center><font size=4 color=red><b>&nbsp;'+s+'&nbsp;</td></table>'; });

document.body.innerHTML = document.body.innerHTML.replace(
/Eine feindliche .*Flotte.* Ihr Auftrag lautet: Spionage/ig,
function(s){ return '<table width=100% height=100% style=background-color:orange><td style=background-color:orange align=center><font size=4 color=red><b>&nbsp;'+s+'&nbsp;</td></table>'; })

document.body.innerHTML = document.body.innerHTML.replace(
/Eine deiner .*Flotte.* Ihr Auftrag lautet: .*<\/span>/ig,
function(s){ return '<table width=100% height=100% style=background-color:green><td style=background-color:green align=center><font size=1 color=lime><b>&nbsp;'+s+'&nbsp;</td></table>'; })


document.body.innerHTML = document.body.innerHTML.replace(
/Eine deiner .*Flotte.* Ihr Auftrag lautete: .*<\/span>/ig,
function(s){ return '<table width=100% height=100% style=background-color:green><td style=background-color:green align=center><font size=1 color=lime><b>&nbsp;'+s+'&nbsp;</td></table>'; })

/*
.replace(/<a href="javascript:showGalaxy.*<\/a> zurück/ig,"")
.replace(/<a href="javascript:showGalaxy.*<\/a> erreicht/ig,"")
.replace(/<a href="javascript:showGalaxy.*<\/a>\./ig,"")
.replace(/kehrt/ig,"").replace(/erreicht/ig,"")
.replace(/Planeten/ig,"")
.replace(/den/ig,"->")
.replace(/zum/ig,"<-")
.replace(/vom/ig,"")
.replace(/deiner/ig,"")
.replace(/Eine/ig,"><td width=100% style=background-color:red align=center><font size=1 color=orange><b>&nbsp;")
.replace(/Flotten/ig,"")
.replace(/Ihr/ig,"")
.replace(/Auftrag/ig,"")
.replace(/lautet\:/ig,"")
.replace(/lautete\:/ig,"<td width=* style=background-color:blue align=center><font size=1 color=orange><b>&nbsp;(R)")
.replace(/d r/ig,"")
.replace(/<\/span>/ig,"&nbsp;</td></span>")
*/


if (angriffe > 0) {
window.setTimeout('document.title = "ACHTUNG! ANGRIFF!"',1);
}