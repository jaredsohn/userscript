// ==UserScript==
// @name           EXTRA CSS AND HTML™
// @namespace      Zezima2
// @include        http://www.nettby.no*
// @description    Zezima2 endrer profilene i nettby.no
// @version 	   Css Style v0.8.2
// ==/UserScript==


var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var rcity="Rakkestad";
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
function m() { 
  e=setTimeout("g()",300);
}

                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_halloween.png")
                {images[i].src='http://i35.tinypic.com/x40vty.gif';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_evening.gif")
                {images[i].src='http://i32.tinypic.com/11wdd0x.png';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_night.gif")
                {images[i].src='http://i32.tinypic.com/11wdd0x.png';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_day.gif")
                {images[i].src='http://i32.tinypic.com/11wdd0x.png';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/r/a/x/raxtakonge/3.jpg?1274015426")
                {images[i].src='http://i991.photobucket.com/albums/af40/raxtakongen/Raxta%20Kongen/Ultra-Block.png';}}


var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var rcity="Rakkestad";
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
function m() { 
  e=setTimeout("g()",300);
}
//Zezima2 Â©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='nettbymaker by Zezima2 Â©'
//}

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://8crazycat8.webs.com/1nettbyhaxZZ.jpg">';}}











//SMILEY
for(i=0;i<images.length;i++){if(images[i].src==
"http://img.nettby.no/img/smiley/smiley4.png"
){images[i].src=
"http://i45.tinypic.com/vo5veb.png"}}





var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Østfold") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Rakkestad"){
links[i].innerHTML="Crusing Stan";
links[i].style.color="#FF0000";
sted++;}
if (sted==2) break;}

var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Utlandet") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Sverige"){
links[i].innerHTML="Crusing Stan";
links[i].style.color="#FF0000";
sted++;}
if (sted==2) break;}












//Robert.. Det er meg ja
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Raxta konge") {
  links[i].innerHTML="Raxta Kongen";
  links[i].style.color="#00FF00"; {
  }
 }
}
//Kjæresten min
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Grillpusen") {
  links[i].innerHTML="Grill Pusen";
  links[i].style.color="#00FF00"; {
  }
 }
}












//Folkaaa<3
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="slipknot18") {
  links[i].innerHTML="Ruben (Rabba)";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="atir96") {
  links[i].innerHTML="Rita (Musa)";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="viragoxv") {
  links[i].innerHTML="Mumrikken, Snusern";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="stefanx") {
  links[i].innerHTML="StefanX";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="slipknot18") {
  links[i].innerHTML="RIBBA";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="steinarsh") {
  links[i].innerHTML="Ti På To<3";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="micky15") {
  links[i].innerHTML="Mickey Finn's";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="cssking") {
  links[i].innerHTML="Hitler Heine";{
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="styggen96") {
  links[i].innerHTML="Bodil<3";{
  }
 }
}











//Menyen
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="grillpusen") {
  links[i].innerHTML="Grill Pusen";
  links[i].style.color="#00FF00"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Raxta konge") {
  links[i].innerHTML="Raxta Kongen";
  links[i].style.color="#00FF00"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Vebe93") {
  links[i].innerHTML="REBEL SON";
  links[i].style.color="#00FF00"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send brev") {
  links[i].innerHTML="Skriv noen brev";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ignorer") {
  links[i].innerHTML="Gi faen i meg";
  links[i].style.color="#ff0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bli venn med") {
  links[i].innerHTML="Bli min venn";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Gi Nettby Max") {
  links[i].innerHTML="Du får ikke MAX!";
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
  links[i].innerHTML="Ikke interisert";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Skriv en hilsen") {
  links[i].innerHTML="Skriv en liten hilsen";
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
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Logg") {
  links[i].innerHTML="Avisen"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Rakkestad") {
  links[i].innerHTML="Crusing Stan"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Logg ut") {
  links[i].innerHTML="Logg av"; {
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
  links[i].innerHTML="Ikke Send SMS";
  links[i].style.color="#8B7D7B"; {
  }
 }
}



for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML +'<br><img src="http://i991.photobucket.com/albums/af40/raxtakongen/Raxta%20Kongen/CSS-AND-HTML-SCRIPT.png">'
akt.innerHTML = akt.innerHTML + '</strong><br></font><font color="#ff0000">&nbsp; <font color="#ffffff"><a href="http://userscripts.org/scripts/source/46082.user.js" style="text-decoration: none;"><input class="button" value="Oppdater Innstillinger" name="send" type="submit"></a><br><br><div align="center"><font size="1"><font color="#ff6600">&copy;2010</font> <font color="#000000"><a href="http://www.nettby.no/user/index.php?user_id=1498178">Raxta Kongen</a></font></font></div>';
}
}
//Grill Kongen Â©
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
//Grill Kongen Â©
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
//Grill Kongen Â©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/message/new.php?nick=GrillKing' );
anchor.appendChild( document.createTextNode( 'Trenger du hjelp?' ) );
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
 if(links[i].innerHTML=="RaxtaKonge") {
  links[i].innerHTML="Raxta Kongen";
  links[i].style.color="#00FF00"; {
   if(links[i].href='/user/index.php?user_id=1372345');
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
	if(imON[q].innerHTML=="Pålogget")
		//{imON[q].innerHTML="<center><blink>JEYJ!!! Jeg er visst Online nå :D </blink></center>";
		{imON[q].innerHTML='<center><blink><img src="http://xs128.xs.to/xs128/08220/24et6wl_png130.png"></blink></center>';
		break;
	}
}
//Grill Kongen Â©
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
anchor.setAttribute( 'href', 'http://www.nettby.no/community/news.php?community_id=1214098' );
anchor.appendChild( document.createTextNode( 'The Styling Planet' ) );
document.getElementById( 'Test' ).appendChild( anchor );




var ffghj = document.createElement('link');
ffghj.setAttribute('type', 'image/x-icon');
ffghj.setAttribute('rel', 'shortcut icon');
ffghj.setAttribute('href', 'http://static.nettby.no/users/r/a/r/raring61/files/leader.gif');
var head = document.getElementsByTagName('head')[0];
head.appendChild(ffghj);