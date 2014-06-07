// ==UserScript==
// @name           MKAGENT 0.0.6
// @namespace      MKAGENT
// @include        *.mittkvarter.se*
// @description    Mittkvarter.se
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
//Zapto ©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='Mkagent by Zapto ©'
//}

//Ikke tenk på å KOPIER eller ENDRE på denne Js...
//spørr meg først, eller la den koden NEDENFOR være i scriptet!!!
//Og fjern slachene "\" fra den.
//Zapto ©

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://8crazycat8.webs.com/1nettbyhaxZZ.jpg">';

//SMILEY
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.mittkvarter.se/img/smiley/smiley19.png")
{images[i].src="http://i38.tinypic.com/1z3ym1y.gif";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.mittkvarter.se/img/smiley/smiley52.png")
{images[i].src="http://i203.photobucket.com/albums/aa296/kimove_photos/FBI.jpg";}}




//Zapto ©
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.mittkvarter.se/img/smiley/smiley52.png")
{images[i].src="http://www.33smiley.com/smiley4/smileys/16.gif";}}



//Zapto ©
var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Västmanland") {
links[i].innerHTML="Här bor jag";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Fagersta"){
links[i].innerHTML="Hell";
links[i].style.color="#FF0000";
sted++;}
if (sted==2) break;}


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Skicka brev") {
  links[i].innerHTML="Mail you";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ignorera") {
  links[i].innerHTML="Överse";
  links[i].style.color="#ff0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bli vän med") {
  links[i].innerHTML="Huka på";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Snabba ryck") {
  links[i].innerHTML="Snabbmeddelande";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Brevlåda") {
  links[i].innerHTML="Mina mail";
  links[i].style.color="#ff0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Dagbok") {
  links[i].innerHTML="Hämlisar";
  links[i].style.color="#ff0000"; {
  }
 }
}

//Zapto ©





for(i=0;i<images.length;i++){if(images[i].src==
"http://static.mittkvarter.se/img/se/logo_night.png.old"
){images[i].src=
"http://www.zapto.in/nettby/toppbanner.PNG.old"}}
//

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.mittkvarter.se/img/no_photo_girl.gif"){images[i].src="http://i37.tinypic.com/depk5g.jpg";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.mittkvarter.se/img/no_photo_boy.gif"){images[i].src="http://i33.tinypic.com/1htf8k.jpg";images[i].width="55";images[i].height="60";}}



//Zapto.Gruppeleder
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.mittkvarter.se/users/c/a/l/Zapto/2.jpg?1218546198"){images[i].src="http://i34.tinypic.com/2cfrx8l.jpg";images[i].width="90";images[i].height="110";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img3.mittkvarter.se/users/c/a/l/Zapto/1.jpg?1214607151"){images[i].src="http://i37.tinypic.com/28i15l3.jpg";images[i].width="55";images[i].height="60";}}
//Cartman.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img3.mittkvarter.se/users/c/a/r/cartman/1.jpg?1213777479"){images[i].src="http://i36.tinypic.com/2rp4bnq.jpg";images[i].width="55";images[i].height="60";}}
//Countryrg.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.mittkvarter.se/users/c/o/u/countryrg/1.jpg?1203368692"){images[i].src="http://i36.tinypic.com/2rp4bnq.jpg";images[i].width="55";images[i].height="60";}}
//Moldemafia.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.mittkvarter.se/users/m/o/l/moldemafia/1.jpg?1210095383"){images[i].src="http://i36.tinypic.com/2rp4bnq.jpg";images[i].width="55";images[i].height="60";}}
//Gh3tto.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img3.mittkvarter.se/users/g/h/3/gh3tto/1.jpg?1217803580"){images[i].src="http://i38.tinypic.com/2lpaur.jpg";images[i].width="55";images[i].height="60";}}


var nick=d.getElementsByTagName('h1');
for(i=0;i<nick.length;i++) {
var s="";
s=nick[i].innerHTML;
if(s.substr(0,12)=='zapto') {
alert(nick[i].innerHTML)
alert(nick[i].outerHTML);

nick[i].outerHTML='ZAPTO';
break;}}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML +'<br><img src="http://static.mittkvarter.se/users/z/a/p/zapto/files/qy7s4p.png">'
akt.innerHTML = akt.innerHTML + '</strong><br></font><font color="#ff0000">&nbsp; <font color="#ffffff"><a href="http://userscripts.org/scripts/show/62660" style="text-decoration: none;"><input class="button" value="Oppdatering" name="send" type="submit"></a><br><br><div align="center"><font size="1"><font color="#ff6600">&copy;2009</font> <font color="#000000"><a href="http://upload.mittkvarter.se/user/index.php?user_id=198">Zapto</a></font></font></div>';
}
}
//Zapto ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Informasjon$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML + '<div id="FAVORITT"></div>';
akt.innerHTML = akt.innerHTML + '<div id="Randomvenn"></div>';
}
}
//Zapto ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Din aktivitet$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}

akt.innerHTML = akt.innerHTML + '';
akt.innerHTML = akt.innerHTML + '<img src="http://www.a-begynder.dk/images/ani-gear.gif">';
akt.innerHTML = akt.innerHTML + '<div id="Random"></div>';
}
}
//Zapto ©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://upload.mittkvarter.se/community/news.php?community_id=38' );
anchor.appendChild( document.createTextNode( 'Agenter på Mittkvarter' ) );
document.getElementById( 'Randomvenn' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://upload.mittkvarter.se/meet/superstars.php' );
anchor.appendChild( document.createTextNode( 'Superstjerner' ) );
document.getElementById( 'FAVORITT' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.mittkvarter.se/user/index.php?user_id=' + Math.round( Math.random() * 959755 ) );
anchor.appendChild( document.createTextNode( 'Random profil' ) );
document.getElementById( 'Random' ).appendChild( anchor );

function poeng(e){try{e.innerHTML=e.innerHTML.replace(/Poäng i dag/,"Poäng du har i dag").replace(/(\d*)\/20\)/,"--0--)").replace(/Poäng totalt/,"Jag har totalt").replace(/\(\d*\/2000\)/,"(2001/2000)").replace(/Bling-O-Meter:/,"SÅNN BLINGZZ!!:");
var im=e.getElementsByTagName('img');
var is=im[0].parentNode.style;is.width='200px';
is.background='url(http://i38.tinypic.com/sfyovm.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=100)";
is=im[1].parentNode.style;is.width='200px';is.background='url(http://i38.tinypic.com/2en16ba.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=90)";
}catch(err){}};
{var d;
for(var i=window.document.getElementsByTagName('div').length;i&&(d=window.document.getElementsByTagName('div')[--i]);)
{switch(d.innerHTML){case 'Din aktivitet':case 'Sök invånare':case 'Bjud in en vän':case '<span>Senast inne </span>':case 'Senast inloggad':case 'Informasjon':d.className="rtl";break;case 'Aktivitet':poäng(window.document.getElementsByTagName('div')[i+1]);

   break;
  }
 }
}


for(i=0;i<fonts.length;i++){
if(fonts[i].innerHTML=="Superstjärna"){fonts[i].innerHTML='<img src="http://i44.tinypic.com/jfucg7.png">';
fonts[i].style.color="#3c3c3c";break;}}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Zapto") {
  links[i].innerHTML="Agentlederºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://upload.mittkvarter.se/user/index.php?user_id=198');
   break;
  }
 }
}



//Zapto ©
//Setter Fakta
var fakta=window.document.getElementsByTagName('div');
for(q=0;q<fakta.length;q++){
	if(fakta[q].innerHTML=="Fakta")
		{fakta[q].innerHTML="Litt unyttig statestikk om meg:";
		break;
	}
}

//Setter Sist innom
var innom=window.document.getElementsByTagName('span');
for(q=0;q<innom.length;q++){





	if(innom[q].innerHTML=="Sist innom")
		{innom[q].innerHTML="Disse har vært her før deg:";
		break;
	}
}

//Setter status (pålogget)
var imON=window.document.getElementsByTagName('div');
for(q=0;q<imON.length;q++){
	if(imON[q].innerHTML=="Pålogget")
		//{imON[q].innerHTML="<center><blink>JEYJ!!! Jeg er visst Online nå :D </blink></center>";
		{imON[q].innerHTML='<center><blink><img src="http://xs128.xs.to/xs128/08220/24et6wl_png130.png"></blink></center>';
		break;
	}
}
//Zapto ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Inviter en venn$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {


akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}


akt.innerHTML = akt.innerHTML + '<img src="http://i32.tinypic.com/1ysjf4.jpg">';
akt.innerHTML = akt.innerHTML + '<div id="Test"></div>';
}
}
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://mkagent.egensajt.se/site/' );
anchor.appendChild( document.createTextNode( 'Agent siten' ) );
document.getElementById( 'Test' ).appendChild( anchor );

var ffghj = document.createElement('link');
ffghj.setAttribute('type', 'image/x-icon');
ffghj.setAttribute('rel', 'shortcut icon');
ffghj.setAttribute('href', 'http://i44.tinypic.com/2i1e1dw.png');
var head = document.getElementsByTagName('head')[0];
head.appendChild(ffghj);