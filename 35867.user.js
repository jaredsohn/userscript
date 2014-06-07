// ==UserScript==
// @name          Flirtlife: Bilder in der Suche anzeigen
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Es ist eine für Flirtlife angepasste Usersuche: Per xmlhttprequest wird die seite aufgerufen und das JPG des profils wird rausgefiltert, worauf es dann in voller größe (getrimmt auf 200px) in der Usersuche erscheint. Also gehts doch ohne zu bezahlen ;) ... programmiert von ralf jäger
// @include      http://www.flirtlife.de/alle_user.php*
// ==/UserScript==

var zeile;
var der=document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR')[1].getElementsByTagName('TD');
if (der.length<3)
{zeile=1;}else{zeile=0;}
//document.title=zeile;

for (var g=0;g<document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-1-zeile;g++)
{
var peter=document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR')[g+1+zeile].getElementsByTagName('TD')[1].getElementsByTagName('A');
if (peter.length)
{
//document.title="";
bild=peter[0].getElementsByTagName('IMG')[0];
bild.src="http://www.flirtlife.de/images/loading.gif";
}
}

function such(text)
{
var posanfang=text.search(/img name="bild".+/);
erg=text.substring(posanfang+21,posanfang+101);
var posjpg=erg.lastIndexOf(".jpg");
erg=erg.substring(0,posjpg+4);
return erg;
}

function req(addy,f)
{
GM_xmlhttpRequest({
    method: 'GET',
    url: addy,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
	onload:function(e)
{
f(e);
}
});
}


url=new Array(document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-1-zeile);
t=new Array(document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-1-zeile);
varl=new Array(document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-1-zeile);


for (var g=0;g<document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-1-zeile;g++)
{
url[g]=document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR')[g+1+zeile].getElementsByTagName('TD')[2].getElementsByTagName('A')[1].href;

req(url[g],function(jpg)
{
t=document.createElement('noscript');
t.innerHTML=such(jpg.responseText);
document.body.appendChild(t);
});

}


function gibuserid1(addy)
{
c=addy.lastIndexOf('/');
d=addy.substring(40,c);
if (d.substring(0,1)=="/")
{
return d.substring(1,d.length);
}
else
{
return d;
}
}

function gibuserid2(addy)
{
c=addy.lastIndexOf('/');
return addy.substring(c+2,addy.length);
}

//document.title=;


function wartedoch()
{
if (document.getElementsByTagName('noscript')[document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-2-zeile])
{
for (var g=0;g<document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-1-zeile;g++)
{
 id1=gibuserid1(document.getElementsByTagName('noscript')[g].innerHTML);
  for (var s=0;s<document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR').length-1-zeile;s++)
  {
   id2=gibuserid2(document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR')[s+1+zeile].getElementsByTagName('TD')[2].getElementsByTagName('A')[1].href)
   if (id1==id2)
    {
	bild=document.getElementsByTagName('TBODY')[3].getElementsByTagName('TR')[s+1+zeile].getElementsByTagName('TD')[1].getElementsByTagName('A')[0].getElementsByTagName('IMG')[0];
	bild.src=document.getElementsByTagName('noscript')[g].innerHTML;
	bild.height="200";
	bild.parentNode.href=url[s];
	}
  }
}
}
else
{
window.setTimeout(wartedoch,100);
}
}
window.setTimeout(wartedoch,100);

