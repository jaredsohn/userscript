// ==UserScript==
// @name          Get TV Total Video-Links
// @namespace     
// @description   Durch Klick auf "DL als Playlist" wird eine Liste beinhaltend mit den Direkt-Links zu den entsprechenden Videos der Seite runtergezogen... Eine Verknüpfung mit VLC Player ist zu empfehlen, somit lässt sich die ganze Folge mit einem Klick anschauen... greets... ralf ;) 
// @include       http://tvtotal.prosieben.de/show/*
// ==/UserScript==
//-------------------------------------------------------------------------------------

function getjahr()
{
 var g=document.title.substring(17,21);
 return g;
}
function getmonat()
{
 var g=document.title.substring(14,16);
 return g;
}
function gettag()
{
 var g=document.title.substring(11,13);
 return g;
}

var tags=document.getElementsByTagName('a');
nummer="1";

for (i=0;i<tags.length;i++)
{
  g=tags[i].href.indexOf('javascript:videoPopUpHigher(\'/tvtotal/components/videoplayer/');
  if (g!=-1) //wenn obiges vorkommnis in einem link gefunden
 {
  hrs=tags[i].href;
  nummer=hrs.substring(61,65); //nummer der sendung zuordnen (4stellig)
  //liste[i]=tags[i].href;
  break;
 }
}
sec=document.createElement('td');
var liss="";
for (zahl=1;zahl<7;zahl++)
{
sec.innerHTML=sec.innerHTML+"<a href=\"http://c11021-o.l.core.cdn.streamfarm.net/11021brainpool/ondemand/3583brainpool/tvtotal/"+getjahr()+"/"+getmonat()+"/"+gettag()+"/"+nummer+"-00-0"+zahl+".flv\"><td>#"+zahl+"</td></a> ";

liss=liss+"http%3A%2F%2Fc11021-o.l.core.cdn.streamfarm.net%2F11021brainpool%2Fondemand%2F3583brainpool%2Ftvtotal%2F"+getjahr()+"%2F"+getmonat()+"%2F"+gettag()+"%2F"+nummer+"-00-0"+zahl+".flv%0D%0A";
//PLAYLISTE ERSTELLEN
//schleifen-END
}
liss="data:text/m3u,"+liss;
tee=document.createElement('div');
tee.innerHTML="<a href="+liss+">DL Playlist</a>";
document.getElementById('ContentLeft').getElementsByTagName('tr')[1].appendChild(tee);
//document.body.appendChild(sec);


//http://c11021-o.l.core.cdn.streamfarm.net/11021brainpool/ondemand/3583brainpool/tvtotal/