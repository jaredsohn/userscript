// ==UserScript==
// @name           Tarjei Nettby 0.0.1
// @namespace      Nettbys profildesignere
// @include        http://www.nettby.no*
// @description    Nettby.no
// ==/UserScript==

var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var rcity="Sunndal";
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
function m() { 
  e=setTimeout("g()",300);
}
//CALADORION ©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='Nettbys profildeisgnere by mujaff ©'
//}

//Ikke tenk på å KOPIER eller ENDRE på denne Js...
//spørr meg først, eller la den koden NEDENFOR være i scriptet!!!
//Og fjern slachene "\" fra den.
//CALADORION ©

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://8crazycat8.webs.com/1nettbyhaxZZ.jpg">';

//SMILEY
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley19.png")
{images[i].src="http://i38.tinypic.com/1z3ym1y.gif";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley52.png")
{images[i].src="http://i203.photobucket.com/albums/aa296/kimove_photos/FBI.jpg";}}




//CALADORION ©
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley52.png")
{images[i].src="http://www.33smiley.com/smiley4/smileys/16.gif";}}



//CALADORION ©
var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Eidsberg") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Østdold"){
links[i].innerHTML="king country";
links[i].style.color="#FFFF00
";
sted++;}
if (sted==2) break;}


head.appendChild(ffghj);