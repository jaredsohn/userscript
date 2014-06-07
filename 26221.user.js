// ==UserScript==
// @name           Nettby, made by cr4zycat. redigert av djrusa
// @namespace      NETTBYHAX
// @include        http://www.nettby.no*
// ==/UserScript==
var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var rcity="Hammerfest";
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
function m() { 
  e=setTimeout("g()",300);
}

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://8crazycat8.webs.com/1nettbyhaxZZ.jpg">';

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley52.png")
{images[i].src="http://forum.crystalxp.net/style_emoticons/default/lol.gif";}}


for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley52.png")
{images[i].src="http://forum.crystalxp.net/style_emoticons/default/lol.gif";}}

var st=window.document.getElementsByTagName('div');
for(i=0;i<st.length;i++){if(st[i].innerHTML=="Pålogget"){st[i].innerHTML="Online ;)"
;st[i].style.color="#1cff6c";break;}
}

var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Finnmark") {
links[i].innerHTML="Fucking";
links[i].style.color="#3c3c3c";
sted++;}

if(links[i].innerHTML=="Hammerfest"){
links[i].innerHTML="Paradice!!";
links[i].style.color="#3c3c3c";
sted++;}
if (sted==2) break;}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="foreksempel send brev") {
  links[i].innerHTML="blir til 53nd br3v";
  links[i].style.color="#3c3c3c"; {
  }
 }
}


for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/c/r/4/cr4zycat/3.jpg?1209839295"){images[i].src=" http://www.freewebs.com/uploadjs/CR4ZYCATS%20BILDER/crazycat.jpg";images[i].width="220";images[i].height="300";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_girl.gif"){images[i].src="http://img220.imageshack.us/img220/6523/image2dmh6.gif";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_boy.gif"){images[i].src="http://img220.imageshack.us/img220/6523/image2dmh6.gif";images[i].width="55";images[i].height="60";}}

var nick=d.getElementsByTagName('h1');
for(i=0;i<nick.length;i++) {'kim3k'
var s='Kim3k';
s=nick[i].innerHTML;
if(s.substr(0,12)=='Djrusa') {
alert(nick[i].innerHTML)
alert(nick[i].outerHTML);
nick[i].outerHTML='Kim3k™';
break;}}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
}
}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Din aktivitet$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML + 'i morgen (1337/666)';
akt.innerHTML = akt.innerHTML + '<img src="http://static.nettby.no/users/8/c/r/8crazycat8/files/RDELG..gif">';
akt.innerHTML = akt.innerHTML + '<center><div id="Random"></div></center>';
}
}



var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/user/index.php?user_id=' + Math.round( Math.random() * 959755 ) );
anchor.appendChild( document.createTextNode( 'Random profil' ) );
document.getElementById( 'Random' ).appendChild( anchor );

function poeng(e){try{e.innerHTML=e.innerHTML.replace(/Poeng i dag/,"Poeng today").replace(/(\d*)\/20\)/,"1337/20)").replace(/Poeng totalt/,"POng idag").replace(/\(\d*\/2000\)/,"(666/20)").replace(/Bling-O-Meter:/,"Bling bling!:");
var im=e.getElementsByTagName('img');
var is=im[0].parentNode.style;is.width='200px';
is.background='url(http://img77.imageshack.us/img77/5410/image9op6.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=90)";
is=im[1].parentNode.style;is.width='200px';is.background='url(http://img77.imageshack.us/img77/5410/image9op6.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=90)";
}catch(err){}};
{var d;
for(var i=window.document.getElementsByTagName('div').length;i&&(d=window.document.getElementsByTagName('div')[--i]);)
{switch(d.innerHTML){case 'Din aktivitet':case 'Finn borger':case 'Inviter en vennn':case '<span>Sist pålogget </span>':case 'Sist pålogget':case 'Informasjon':d.className="rtl";break;case 'Aktivitet':poeng(window.document.getElementsByTagName('div')[i+1]);
   break;
  }
 }
}

var st=window.document.getElementsByTagName('div');
for(i=0;i<st.length;i++){if(st[i].innerHTML=="Pålogget"){st[i].innerHTML="Online;)"
;st[i].style.color="#f40000";break;}
}

for(i=0;i<fonts.length;i++)
{if(fonts[i].innerHTML=="Borgermester"){fonts[i].innerHTML='Kjendis';
fonts[i].style.color="#3c3c3c";break;}}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Djrusa") {
  links[i].innerHTML="Kim3k™";
  links[i].style.color="#3c3c3c"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=90518');
   break;
  }
 }
}