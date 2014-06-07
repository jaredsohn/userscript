// ==UserScript==
// @name           Nettby Script
// @namespace      Nettby Script
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
//Crap93Shit ©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='nettbyagent by caladorion ©'
//}

//Ikke tenk på å KOPIER eller ENDRE på denne Js...
//spørr meg først, eller la den koden NEDENFOR være i scriptet!!!
//Og fjern slachene "\" fra den.
//Crap93Shit ©

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://8crazycat8.webs.com/1nettbyhaxZZ.jpg">';

//Crap93Shit ©
var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Buskerud") {
links[i].innerHTML="Gangsters";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Kongsberg"){
links[i].innerHTML="Paradise";
links[i].style.color="#FF0000";
sted++;}
if (sted==2) break;}



for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send brev") {
  links[i].innerHTML="Send et jævla brev";
  links[i].style.color="#8B7D7B"; {
  }
 }
}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ignorer") {
  links[i].innerHTML="Drit lange faen i denne personen";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bli venn med") {
  links[i].innerHTML="Homie?";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Skriv en hilsen") {
  links[i].innerHTML="Homseboka";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Postkasse") {
  links[i].innerHTML="Mine jææævla brev!";
  links[i].style.color="#00ccff"; {
  }
 }
}for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Pålogget") {
  links[i].innerHTML="Fuck'it I'm Online";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Logg") {
  links[i].innerHTML="Sjekk hva folka driver med";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Varsler") {
  links[i].innerHTML="Kommentarer ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Kongsberg") {
  links[i].innerHTML="Paradise ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Gjestebok") {
  links[i].innerHTML="Homsebok ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Dagbok") {
  links[i].innerHTML="EMO Boka ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Gjestebok") {
  links[i].innerHTML="Homsebok ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Dagbok") {
  links[i].innerHTML="EMO Boka ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Gjestebok") {
  links[i].innerHTML="Homsebok ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Dagbok") {
  links[i].innerHTML="EMO Boka ";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Status") {
  links[i].innerHTML="Skjera?";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Venner") {
  links[i].innerHTML="Gangsterene";
  links[i].style.color="#00ccff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bilder") {
  links[i].innerHTML="Bildr!";
  links[i].style.color="#00ccff"; {
  }
 }
}
//Crap93shit.Boss
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/c/r/a/crap93shit/1.jpg?1225094354"){images[i].src="http://i37.tinypic.com/28i15l3.jpg";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img2.nettby.no/users/c/r/a/crap93shit/2.jpg?1225094354"){images[i].src="http://i37.tinypic.com/28i15l3.jpg";images[i].width="90";images[i].height="110";}}
//Sleck94.homie
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/s/l/e/sleck94/1.jpg?1223386236"){images[i].src="http://i37.tinypic.com/28i15l3.jpg";images[i].width="55";images[i].height="60";}}

//PROFILELDER
var D = window.document;
var bilder=getName('img');

function getName(n){return D.getElementsByTagName(n);}
//GEIR240
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/geir240\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/2h654xy.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//Do0b
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/Do0b\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/2nk6m3b.jpg";bilder[i].width="220";bilder[i].height="300";}
}



for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Crap93shit") {
  links[i].innerHTML="Tha Bossºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=970686');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Xzk") {
  links[i].innerHTML="Xzkºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=1129642');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="crap93shit") {
  links[i].innerHTML="Tha Bossºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=970686');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="xzk") {
  links[i].innerHTML="Xzkºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=1129642');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Sleck94") {
  links[i].innerHTML="Ace Jºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=983414');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="sleck94") {
  links[i].innerHTML="Ace Jºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=983414');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="geir240") {
  links[i].innerHTML="Kek'fo.sho";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=160537');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="grilzgangs") {
  links[i].innerHTML="CyborgFFS";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=964182');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Grilzgangs") {
  links[i].innerHTML="CyborgFFS";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=964182');
   break;
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Geir240") {
  links[i].innerHTML="Kek'fo.sho";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=160537');
   break;
  }
 }
}
//CALADORION ©
//Setter Fakta
var fakta=window.document.getElementsByTagName('div');
for(q=0;q<fakta.length;q++){
	if(fakta[q].innerHTML=="Fakta")
		{fakta[q].innerHTML="Litt unyttig dritt om meg:";
		break;
	}
}






//Setter innom
var innom=window.document.getElementsByTagName('span');
for(q=0;q<innom.length;q++){
        if(innom[q].innerHTML=="innom")
		{innom[q].innerHTML="Nuub's:";
		break;
	}
}
//Setter Pålogget
var innom=window.document.getElementsByTagName('span');
for(q=0;q<innom.length;q++){
        if(innom[q].innerHTML=="Pålogget")
		{innom[q].innerHTML="Fuck'it, I'm Online";
		break;
	}
}



//Crap93Shit ©

