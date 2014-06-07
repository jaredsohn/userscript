// ==UserScript==
                // @name           The Styling Planet™
                // @namespace      Hansenfp
                // @include        http://www.nettby.no*
                // @description    Script som er utviklet av Didrik Hansen.
                // @version 	   v0.2
                // ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://hansen.uuuq.com/BlackDiamond/xdre4m.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);

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


                //Banner
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_evening.gif")
                {images[i].src='http://i37.tinypic.com/307p09e.jpg';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_night.gif")
                {images[i].src='http://i37.tinypic.com/307p09e.jpg';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_day.gif")
                {images[i].src='http://i37.tinypic.com/307p09e.jpg';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_morning.gif")
                {images[i].src='http://i37.tinypic.com/307p09e.jpg';}}

                 //MenyBanner
                 for(i=0;i<images.length;i++){if(images[i].src=="http://img.nettby.no/img/user_menu_new.png")
                {images[i].src='http://i37.tinypic.com/307p09e.jpg';}}


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


//Hansenfp ©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='profildesigner by Hansenfp ©'
//}

//Hvis du endrer dette JS scriptet blir du direkte anmeldt...
//La den koden NEDENFOR være i scriptet!!
//Hansenfp ©

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = '<img src="http://i37.tinypic.com/307p09e.png">';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '<img src="http://i37.tinypic.com/307p09e.png">';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://i37.tinypic.com/307p09e.png">';


//SMILEY
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley19.png")
{images[i].src="http://i222.photobucket.com/albums/dd239/Ragge1991/Mordi3.png";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley52.png")
{images[i].src="http://i222.photobucket.com/albums/dd239/Ragge1991/1fce755e.png";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley53.png")
{images[i].src="http://i222.photobucket.com/albums/dd239/Ragge1991/bystyret.png";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley54.png")
{images[i].src="http://i222.photobucket.com/albums/dd239/Ragge1991/nobraz.jpg";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley55.png")
{images[i].src="http://i222.photobucket.com/albums/dd239/Ragge1991/daf35866.gif";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley56.png")
{images[i].src="http://i222.photobucket.com/albums/dd239/Ragge1991/xxmasterxx.png";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley57.png")
{images[i].src="http://i41.tinypic.com/2nujfpi.png";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley57.png")
{images[i].src="http://i29.tinypic.com/5y4sx4.jpg";}}


//Bygd
var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Utlandet") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FFFFFF";
sted++;}


if(links[i].innerHTML=="Sverige"){
links[i].innerHTML="Stockholm";
links[i].style.color="#FFFFFF";
sted++;}
if (sted==2) break;}


//Hansenfp..Meg
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Hansenfp") {
  links[i].innerHTML="Script Kongen";
  links[i].style.color="#FF6600"; {
  }
 }
}


//Menyen
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Postkasse") {
  links[i].innerHTML="Meldinger";
  links[i].style.color="#FF0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send brev") {
  links[i].innerHTML="Send PM";
  links[i].style.color="#FFFFFF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ignorer") {
  links[i].innerHTML="Overse";
  links[i].style.color="#FF0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Favoritter") {
  links[i].innerHTML="Damer";
  links[i].style.color="#FFFFFF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Dagbok") {
  links[i].innerHTML="Dagbok";
  links[i].style.color="#FFFFFF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bilder") {
  links[i].innerHTML="Filer";
  links[i].style.color="#FFFFFF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Musiker") {
  links[i].innerHTML="Handz Up";
  links[i].style.color="#FFFFFF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Se alle") {
  links[i].innerHTML="Se alle vennene mine";
  links[i].style.color="#FFFFFF"; {
  }
 }
}


//PROFILELDER
var D = window.document;
var bilder=getName('img');


function getName(n){return D.getElementsByTagName(n);}
//Hansenfp miniatyr 1
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/Hansenfp\/1.jpg/)) {bilder[i].src="http://i29.tinypic.com/5y4sx4.jpg";bilder[i].width="55";bilder[i].height="60";}
}
//Hansenfp miniatyr 2
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/Hansenfp\/2.jpg/)) {bilder[i].src="http://i26.tinypic.com/dmrac6.jpg";bilder[i].width="90";bilder[i].height="110";}
}
//Hansenfp Profilbilde
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/Hansenfp\/3.jpg/)) {bilder[i].src="http://img4.nettby.no/users/s/p/l/splaat/4.jpg?1254091838";bilder[i].width="220";bilder[i].height="300";}
}
//Hansenfp ZOOM Profilbilde
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/Hansenfp\/4.jpg/)) {bilder[i].src="http://img6.nettby.no/users/h/e/i/heisveis18/files/robert.jpg";bilder[i].width="600";bilder[i].height="428";}
}


//TOMMYOK
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/tommyok\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/v7xpc5.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ZIMZORRO
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/zimzorro\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/v7xpc5.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//LOVELY3
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/lovely3\/3.jpg/)) {bilder[i].src="http://static.screenweek.it/2009/5/22/Triana-Iglesias-Holten-02_mid.jpg";bilder[i].width="220";bilder[i].height="300";}
}

for(i=0;i<images.length;i++){if(images[i].src==
"http://img1.nettby.no/img/vg.gif"
){images[i].src="http://i222.photobucket.com/albums/dd239/Ragge1991/th_VGno.png"}}
//

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_girl.gif"){images[i].src="http://i37.tinypic.com/depk5g.jpg";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_boy.gif"){images[i].src="http://i33.tinypic.com/1htf8k.jpg";images[i].width="55";images[i].height="60";}}


//Hansenfp.Gruppeleder
for(i=0;i<images.length;i++){if(images[i].src=="http://img5.nettby.no/users/e/m/b/emblaliv/1.jpg?1235121402"){images[i].src="http://i40.tinypic.com/2vkb5n4.gif";images[i].width="90";images[i].height="110";}}


var nick=d.getElementsByTagName('h1');
for(i=0;i<nick.length;i++) {
var s="";
s=nick[i].innerHTML;
if(s.substr(0,12)=='Hansenfp') {
alert(nick[i].innerHTML)
alert(nick[i].outerHTML);

nick[i].outerHTML='Hansenfp';
break;}}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML +'<br><img src="http://i29.tinypic.com/dfgcva.png">'
akt.innerHTML = akt.innerHTML + '</strong><br></font><font color="#ff0000">&nbsp; <font color="#ffffff"><a href="http://userscripts.org/scripts/source/60403.user.js" style="text-decoration: none;"><input class="button" value="Oppdater Innstillinger" name="send" type="submit"></a><br><br><div align="center"><font size="1"><font color="#ff6600">&copy;2010</font> <font color="#000000"><a href="http://www.nettby.no/user/index.php?user_id=1414310">HansenFP</a></font></font></div>';
}
}
//Hansenfp ©
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
//Hansenfp ©
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
//Hansenfp ©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/community/article.php?id=1279864&community_id=665594' );
anchor.appendChild( document.createTextNode( 'Profildesignerne css & styling:' ) );
document.getElementById( 'Randomvenn' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://affiliate.kickapps.com/user/displayAffiliateRegisterPage.kickAction?STATUS=MAIN' );
anchor.appendChild( document.createTextNode( '$lag et nettsamfunn som nettby$' ) );
document.getElementById( 'FAVORITT' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/user/index.php?user_id=' + Math.round( Math.random() * 959755 ) );
anchor.appendChild( document.createTextNode( 'Se på profiler' ) );
document.getElementById( 'Random' ).appendChild( anchor );

function poeng(e){try{e.innerHTML=e.innerHTML.replace(/Poeng i dag/,"Poeng i dag").replace(/(\d*)\/20\)/,"40/40)").replace(/Poeng totalt/,"Poeng totalt").replace(/\(\d*\/2000\)/,"(4000/4000)").replace(/Bling-O-Meter:/,"Penger:");
var im=e.getElementsByTagName('img');
var is=im[0].parentNode.style;is.width='200px';
is.background='url(http://i222.photobucket.com/albums/dd239/Ragge1991/Syle2.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=100)";
is=im[1].parentNode.style;is.width='200px';is.background='url(http://i222.photobucket.com/albums/dd239/Ragge1991/Syle2.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=90)";
}catch(err){}};
{var d;
for(var i=window.document.getElementsByTagName('div').length;i&&(d=window.document.getElementsByTagName('div')[--i]);)
{switch(d.innerHTML){case 'Din aktivitet':case 'Finn borger':case 'Inviter en venn':case '<span>Sist påloggede på nettby </span>':case 'Sist pålogget':case 'Informasjon':d.className="rtl";break;case 'Aktivitet':poeng(window.document.getElementsByTagName('div')[i+1]);

   break;
  }
 }
}


for(i=0;i<fonts.length;i++)
{if(fonts[i].innerHTML=="Borgermester"){fonts[i].innerHTML='<img src="http://img1.nettby.no/img/top_bg_day.gif">';
fonts[i].style.color="#3c3c3c";break;}}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="mujaff") {
  links[i].innerHTML="Hansenfp fra profildesign - css & styling:";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?nick=Hansenfp');
   break;
  }
 }
}


//Hansenfp ©
//Setter Fakta
var fakta=window.document.getElementsByTagName('div');
for(q=0;q<fakta.length;q++){
	if(fakta[q].innerHTML=="Fakta")
		{fakta[q].innerHTML="Privat informasjon:";
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
		//{imON[q].innerHTML="<center><blink>Jeg er på nettby </blink></center>";
		{imON[q].innerHTML='<center><blink><img src="http://xs128.xs.to/xs128/08220/24et6wl_png130.png"></blink></center>';
		break;
	}
}
//Hansenfp ©
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
anchor.setAttribute( 'href', 'http://nettbysenter.net/' );
anchor.appendChild( document.createTextNode( 'Nettbysenter' ) );
document.getElementById( 'Test' ).appendChild( anchor );

var ffghj = document.createElement('link');
ffghj.setAttribute('type', 'image/x-icon');
ffghj.setAttribute('rel', 'shortcut icon');
ffghj.setAttribute('href', 'http://i35.tinypic.com/ac5qbb.png');
var head = document.getElementsByTagName('head')[0];
head.appendChild(ffghj);