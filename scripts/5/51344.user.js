// ==UserScript==
// @name           BlackDiamond™
// @namespace      Første versjon av BlackDiamond på Nettby
// @include        http://www.nettby.no*
// @description    Script for nettby til å forandre utsende.
// @version 	   v4.7
// ==/UserScript==
        
                var d=document;
                var images=d.getElementsByTagName('img');
                var welcome=d.getElementsByTagName("span");
                var nick1=d.getElementsByTagName("tr");
                var nick2=d.getElementsByTagName("span");
                var member="";
                var city1=d.getElementsByTagName("tr");
                var city2=d.getElementsByTagName("strong");
                var count=0;
                var fonts=d.getElementsByTagName('font');
                var links=d.getElementsByTagName('a');
                var mm=d.getElementsByTagName('link');
                var r=d.getElementsByTagName('div');mm[0].href='http://dragen.mikromann.net/Mark.css';
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_evening.gif")
                {images[i].src='http://i40.tinypic.com/282kpjq.png';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_night.gif")
                {images[i].src='http://i40.tinypic.com/282kpjq.png';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_day.gif")
                {images[i].src='http://i40.tinypic.com/282kpjq.png';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_morning.gif")
                {images[i].src='http://i40.tinypic.com/282kpjq.png';}}
var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var rcity="Sverige";
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
function m() { 
  e=setTimeout("g()",300);
}
//Hansen ©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='blackdiamond av Didrik Hansen ©'
//}

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://8crazycat8.webs.com/1nettbyhaxZZ.jpg">';


//SMILEY
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley17.png")
{images[i].src="http://i39.tinypic.com/m8d4eh.gif";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley2.png")
{images[i].src="http://i42.tinypic.com/16ia25t.png";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley2.png")
{images[i].src="http://i43.tinypic.com/nc9xs.png";}}

for(i=0;i<images.length;i++){if(images[i].src=="")
{images[i].src="";}}

for(i=0;i<images.length;i++){if(images[i].src=="")
{images[i].src="";}}

for(i=0;i<images.length;i++){if(images[i].src=="")
{images[i].src="";}}

for(i=0;i<images.length;i++){if(images[i].src=="")
{images[i].src="";}}


var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Østfold") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Sarpsborg"){
links[i].innerHTML="Script land";
links[i].style.color="#FF0000";
sted++;}
if (sted==2) break;}


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send brev") {
  links[i].innerHTML="Send brev";
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
  links[i].innerHTML="Bli venn med";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Gi Nettby Max") {
  links[i].innerHTML="Gi Nettby Max";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ring (Skype") {
  links[i].innerHTML="Skype";
  links[i].style.color="#3366ff"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Legg i favoritter") {
  links[i].innerHTML="Legg i favoritter";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Skriv en hilsen") {
  links[i].innerHTML="Skriv en hilsen";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Postkasse") {
  links[i].innerHTML="Mail";
  links[i].style.color="#ff0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Logg") {
  links[i].innerHTML="Logg"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Logg ut") {
  links[i].innerHTML="Logg ut"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Innstillinger") {
  links[i].innerHTML="Rediger CSS"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send SMS") {
  links[i].innerHTML="Send SMS";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Nettby Max") {
  links[i].innerHTML="dritt"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Pimp min profil") {
  links[i].innerHTML="dritt"; {
  }
 }
}


//PROFILELDER
var D = window.document;
var bilder=getName('img');

function getName(n){return D.getElementsByTagName(n);}
//Hansen ©
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/Svartez\/3.jpg/)) {bilder[i].src="http://i41.tinypic.com/2zxy447.jpg";bilder[i].width="220";bilder[i].height="300";}
}


for(i=0;i<fonts.length;i++)
{if(fonts[i].innerHTML=="Borgermester"){fonts[i].innerHTML='<img src="http://i43.tinypic.com/30iu71e.jpg">';
fonts[i].style.color="#3c3c3c";break;}}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Svartez") {
  links[i].innerHTML="The Böss*";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=1318529');
   break;
  }
 }
}


for(i=0;i<images.length;i++){if(images[i].src==
"http://hansen.uuuq.com/BlackDiamond/404.html"
){images[i].src=
"http://hansen.uuuq.com/BlackDiamond/404.html"}}


for(i=0;i<images.length;i++){if(images[i].src==
"http://img1.nettby.no/img/vg.gif"
){images[i].src=
"http://i222.photobucket.com/albums/dd239/Ragge1991/nett.png"}}


//Hansen ©
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_girl.gif"){images[i].src="http://i41.tinypic.com/2igoepf.jpg";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_boy.gif"){images[i].src="http://i41.tinypic.com/2igoepf.jpg";images[i].width="55";images[i].height="60";}}


//SVARTEZ.Gruppeleder
for(i=0;i<images.length;i++){if(images[i].src=="http://i41.tinypic.com/rrv2ol.jpg"){images[i].src="
http://i43.tinypic.com/5yaiqq.jpg";images[i].width="90";images[i].height="110";}}

var nick=d.getElementsByTagName('h1');
for(i=0;i<nick.length;i++) {
var s="";
s=nick[i].innerHTML;
if(s.substr(0,12)=='svartez') {
alert(nick[i].innerHTML)
alert(nick[i].outerHTML);
nick[i].outerHTML='SVARTEZ';
break;}}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML +'<br><img src="http://i203.photobucket.com/albums/aa296/kimove_photos/aag-1.png">'
akt.innerHTML = akt.innerHTML + '</strong><br></font><font color="#ff0000">&nbsp; <font color="#ffffff"><a href="http://hansen.uuuq.com/BlackDiamond/software.xpi" style="text-decoration: none;"><input class="button" value="Oppdatering" name="send" type="submit"></a><br><br><div align="center"><font size="1"><font color="#ff6600">&copy;2009</font> <font color="#000000"><a href="http://www.nettby.no/user/index.php?user_id=1318529">Svartez</a></font></font></div>';
}
}


//Hansen ©
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
//Hansen ©
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


//Hansen ©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/message/new.php?nick=Svartez' );
anchor.appendChild( document.createTextNode( 'Trenger du hjelp med Script eller Css koder?' ) );
document.getElementById( 'Randomvenn' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/meet/superstars.php' );
anchor.appendChild( document.createTextNode( 'Superstjerner' ) );
document.getElementById( 'FAVORITT' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.pimptown.no/?side=color&view=1' + Math.round( Math.random() * 959755 ) );
anchor.appendChild( document.createTextNode( 'Profilfarger,stilsett (CSS)' ) );
document.getElementById( 'Random' ).appendChild( anchor );

function poeng(e){try{e.innerHTML=e.innerHTML.replace(/Poeng i dag/,"Pimp du har i dag").replace(/(\d*)\/20\)/,"--MAX--)").replace(/Poeng totalt/,"Jeg har ").replace(/\(\d*\/2000\)/,"(Fullt Hus) i dag").replace(/Bling-O-Meter:/,"SÅNN PIMP DRITT!!:");
var im=e.getElementsByTagName('img');
var is=im[0].parentNode.style;is.width='200px';
is.background='url(http://i43.tinypic.com/30iu71e.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=100)";
is=im[1].parentNode.style;is.width='200px';is.background='url(http://i43.tinypic.com/30iu71e.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=90)";
}catch(err){}};
{var d;
for(var i=window.document.getElementsByTagName('div').length;i&&(d=window.document.getElementsByTagName('div')[--i]);)
{switch(d.innerHTML){case 'Din aktivitet':case 'Finn borger':case 'Inviter en venn':case '<span>Sist pålogget </span>':case 'Sist pålogget':case 'Informasjon':d.className="rtl";break;case 'Aktivitet':poeng(window.document.getElementsByTagName('div')[i+1]);

   break;
  }
 }
}


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
	if(imON[q].innerHTML=="pålogget")
		//{imON[q].innerHTML="Online";
		{imON[q].innerHTML='<center><blink><img src="http://xs128.xs.to/xs128/08220/24et6wl_png130.png"></blink></center>';
		break;
	}
}


//Hansen ©
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
anchor.setAttribute( 'href', 'http://www.nettby.no/community/news.php?community_id=963678' );
anchor.appendChild( document.createTextNode( 'BlackDiamond™ gruppen' ) );
document.getElementById( 'Test' ).appendChild( anchor );




var ffghj = document.createElement('link');
ffghj.setAttribute('type', 'image/x-icon');
ffghj.setAttribute('rel', 'shortcut icon');
ffghj.setAttribute('href', 'http://static.nettby.no/users/r/a/r/raring61/files/leader.gif');
var head = document.getElementsByTagName('head')[0];
head.appendChild(ffghj);