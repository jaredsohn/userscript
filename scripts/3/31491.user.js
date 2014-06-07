

// ==UserScript==
// @name           Fresht nettby
// @namespace      Nettbyfresh
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
if(links[i].innerHTML=="Møre og Romsdal") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Ørsta"){
links[i].innerHTML="Vartdal";
links[i].style.color="#FF0000";
sted++;}
if (sted==2) break;}


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send brev") {
  links[i].innerHTML="Post";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ignorer") {
  links[i].innerHTML="Overse";
  links[i].style.color="#ff0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bli venn med") {
  links[i].innerHTML="Ska vi vær venner";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Skriv en hilsen") {
  links[i].innerHTML="Gjestebok";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Postkasse") {
  links[i].innerHTML="Mine brev";
  links[i].style.color="#ff0000"; {
  }
 }
}


//CALADORION ©




//PROFILELDER
var D = window.document;
var bilder=getName('img');

function getName(n){return D.getElementsByTagName(n);}
//FANNY65
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/fanny65\/3.jpg/)) {bilder[i].src="http://i39.tinypic.com/huizw2.jpg";bilder[i].width="220";bilder[i].height="300";}
}


for(i=0;i<images.length;i++){if(images[i].src==
"http://img1.nettby.no/img/vg.gif"
){images[i].src=
"http://i29.tinypic.com/b7ludg.jpg"}}
//

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_girl.gif"){images[i].src="http://i37.tinypic.com/depk5g.jpg";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_boy.gif"){images[i].src="http://i33.tinypic.com/1htf8k.jpg";images[i].width="55";images[i].height="60";}}




var nick=d.getElementsByTagName('h1');
for(i=0;i<nick.length;i++) {
var s="";
s=nick[i].innerHTML;
if(s.substr(0,12)=='caladorion') {
alert(nick[i].innerHTML)
alert(nick[i].outerHTML);

nick[i].outerHTML='CALADORION';
break;}}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML +'<br><img src="http://i6.photobucket.com/albums/y204/elazn/imagent.gif">'
akt.innerHTML = akt.innerHTML + '</strong><br></font><font color="#ff0000">&nbsp; <font color="#ffffff"><a href="http://www.nettby.no/message/new.php?nick=gh3tto" style="text-decoration: none;"><input class="button" value="Send kongen ett brev" name="send" type="submit"></a><br><br><div align="center"><font size="1"><font color="#ff6600">&copy;2008</font> <font color="#000000"><a href="http://www.nettby.no/user/index.php?user_id=378275">gh3tto</a></font></font></div>';
}
}
//CALADORION ©
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
//CALADORION ©
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
//CALADORION ©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/community/article.php?id=1279864&community_id=665594' );
anchor.appendChild( document.createTextNode( 'Agenter på nettby' ) );
document.getElementById( 'Randomvenn' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/meet/superstars.php' );
anchor.appendChild( document.createTextNode( 'Superstjerner' ) );
document.getElementById( 'FAVORITT' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/user/index.php?user_id=' + Math.round( Math.random() * 959755 ) );
anchor.appendChild( document.createTextNode( 'Random profil' ) );
document.getElementById( 'Random' ).appendChild( anchor );

function poeng(e){try{e.innerHTML=e.innerHTML.replace(/Poeng i dag/,"Poeng du har i dag").replace(/(\d*)\/20\)/,"--0--)").replace(/Poeng totalt/,"Jeg har totalt").replace(/\(\d*\/2000\)/,"(2001/2000)").replace(/Bling-O-Meter:/,"SÅNN BLINGZZ!!:");
var im=e.getElementsByTagName('img');
var is=im[0].parentNode.style;is.width='200px';
is.background='url(http://i38.tinypic.com/sfyovm.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=100)";
is=im[1].parentNode.style;is.width='200px';is.background='url(http://i38.tinypic.com/2en16ba.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=90)";
}catch(err){}};
{var d;
for(var i=window.document.getElementsByTagName('div').length;i&&(d=window.document.getElementsByTagName('div')[--i]);)
{switch(d.innerHTML){case 'Din aktivitet':case 'Finn borger':case 'Inviter en venn':case '<span>Sist pålogget </span>':case 'Sist pålogget':case 'Informasjon':d.className="rtl";break;case 'Aktivitet':poeng(window.document.getElementsByTagName('div')[i+1]);

   break;
  }
 }
}


for(i=0;i<fonts.length;i++)
{if(fonts[i].innerHTML=="Borgermester"){fonts[i].innerHTML='<img src="http://img227.imageshack.us/img227/5271/borjemestergfyn2.gif">';
fonts[i].style.color="#3c3c3c";break;}}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="gh3tto") {
  links[i].innerHTML="Pornstar";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=378275');
   break;
  }
 }
}



//CALADORION ©
//Setter Fakta
var fakta=window.document.getElementsByTagName('div');
for(q=0;q<fakta.length;q++){
	if(fakta[q].innerHTML=="Fake")
		{fakta[q].innerHTML="Bullshit om meg:";
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
	if(imON[q].innerHTML=="Nerder nettby NÅ!")
		//{imON[q].innerHTML="<center><blink>JEYJ!!! Jeg er visst Online nå :D </blink></center>";
		{imON[q].innerHTML='<center><blink><img src="http://xs128.xs.to/xs128/08220/24et6wl_png130.png"></blink></center>';
		break;
	}
}
//CALADORION ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Rekruter en nerd$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {


akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}


akt.innerHTML = akt.innerHTML + '<img src="http://i32.tinypic.com/1ysjf4.jpg">';
akt.innerHTML = akt.innerHTML + '<div id="Test"></div>';
}
}
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://agenten.forumportal.org/forum/index.php' );
anchor.appendChild( document.createTextNode( 'Agent forum' ) );
document.getElementById( 'Test' ).appendChild( anchor );

var ffghj = document.createElement('link');
ffghj.setAttribute('type', 'image/x-icon');
ffghj.setAttribute('rel', 'shortcut icon');
ffghj.setAttribute('href', 'http://i44.tinypic.com/2i1e1dw.png');
var head = document.getElementsByTagName('head')[0];
head.appendChild(ffghj);

