// ==UserScript==
// @name           Agent2
// @namespace      Agent2
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
var rcity="Sunndal";
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
function m() { 
  e=setTimeout("g()",300);
}
//Didriikh ©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='agent2 by Didriikh ©'
//}

//Ikke tenk på å KOPIER eller ENDRE på denne Js...
//Spørr meg først, eller la den koden NEDENFOR være i scriptet!!!
//Og fjern slachene "\" fra den.
//Didriikh ©

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://i40.tinypic.com/swz18z.jpg">';

//SMILEY
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley19.png")
{images[i].src="URL";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley52.png")
{images[i].src="URL";}}




//Didriikh ©
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley52.png")
{images[i].src="URL";}}



//Didiriikh ©
var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Østfold") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FF00FF";
sted++;}


if(links[i].innerHTML=="Sarpsborg"){
links[i].innerHTML="Dataverden";
links[i].style.color="#FF00FF";
sted++;}
if (sted==2) break;}


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send brev") {
  links[i].innerHTML="Send post";
  links[i].style.color="#FF0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ignorer") {
  links[i].innerHTML="Overse";
  links[i].style.color="#FF00FF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bli venn med") {
  links[i].innerHTML="Skal vi være venner";
  links[i].style.color="#FF00FF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Skriv en hilsen") {
  links[i].innerHTML="Gjestebok";
  links[i].style.color="#FF00FF"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Postkasse") {
  links[i].innerHTML="Email";
  links[i].style.color="#FF0000"; {
  }
 }
}
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
 if(links[i].innerHTML=="Logg") {
  links[i].innerHTML="FAIL"; {
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


//Didriikh ©




//PROFILELDER
var D = window.document;
var bilder=getName('img');

function getName(n){return D.getElementsByTagName(n);}
//MEG
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/didriikh\/3.jpg/)) {bilder[i].src="http://i43.tinypic.com/4q4lyt.png";bilder[i].width="220";bilder[i].height="300";}
}

//TOMMY
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/remz94\/3.jpg/)) {bilder[i].src="http://www.electricguitarplanet.com/wp-content/uploads/2007/09/epiphone_lp_100_2.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//TOMMY2
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/jto94\/3.jpg/)) {bilder[i].src="http://images.biip.no/user/profile/image/69426449223.png  ";bilder[i].width="220";bilder[i].height="300";}
}

//SIMEN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/zimzorro\/3.jpg/)) {bilder[i].src="http://sacandolavuelta.bitacoras.com/nerd.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//VETLE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/vjjj\/3.jpg/)) {bilder[i].src="http://www.adressa.no/multimedia/archive/00691/SKI_163_691094f.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//MALIN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/malinok\/3.jpg/)) {bilder[i].src="http://www.oktat.com/pictures/img/paris_hilton_04.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//IDA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/iidaoo\/3.jpg/)) {bilder[i].src="http://gfx.dagbladet.no/pub/artikkel/4/43/437/437542/raskXart280.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//EDON
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/edonxdd\/3.jpg/)) {bilder[i].src="http://www.infendo.com/wp-content/uploads/2007/05/nerd-46422.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//JEANETTE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/jeanetteok\/3.jpg/)) {bilder[i].src="http://img5.nettby.no/users/s/i/g/siggsag/3.jpg?1228131647  ";bilder[i].width="220";bilder[i].height="300";}
}

//JOHANNE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/lovely3\/3.jpg/)) {bilder[i].src="http://bifsniff.com/wp-content/files/2007/02/liverpool-5-star-crest.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//CALADORION
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/caladorion\/3.jpg/)) {bilder[i].src="http://images.gfx.no/356/356397/nett_tyv.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//TOMAS
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/topasz\/3.jpg/)) {bilder[i].src="http://www.fitnessplushealth.com/wp-content/uploads/2008/05/six-pack.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//ALEKSANDER
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/seppukux3\/3.jpg/)) {bilder[i].src="http://www.woo-yay.net/images/06-06-05_gaa-emo.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//GUNHILD
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/frisell\/3.jpg/)) {bilder[i].src="http://www.worst-jobs.com/images/ugly-man-transvestite-fat-bitch-men-women.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//KJELL-MARIUS
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/kjellii25\/3.jpg/)) {bilder[i].src="http://bilder.vgb.no/7341/4col/img_43ef501befd9e.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//PETER-ANDRE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/3bfjfb\/3.jpg/)) {bilder[i].src="http://frontierwebdesign.com/passtheammo/images/temp/fat-bastard-michael-moore-s.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//DENIEL-ABBA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/ddanielxd\/3.jpg/)) {bilder[i].src="http://www.celebritiesuncovered.co.uk/wp-content/uploads/michael-jackson-mugshot.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//DJRUSA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/djrusa\/3.jpg/)) {bilder[i].src="http://gfx.dagbladet.no/dinside/2004/08/05/tyvXcopysak.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

//SPRALIEN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/spralien\/3.jpg/)) {bilder[i].src="http://www.alarm-sikkerhet.no/var/ezwebin_site/storage/images/media/images/tyv/1315-1-nor-NO/tyv.gif  ";bilder[i].width="220";bilder[i].height="300";}
}

for(i=0;i<images.length;i++){if(images[i].src==
"http://img1.nettby.no/img/vg.gif"
){images[i].src=
"http://img3.nettby.no/users/z/a/c/zack47/files/topbannernavn.jpg"}}
//

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_girl.gif"){images[i].src="http://i42.tinypic.com/1pfdw4.jpg";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_boy.gif"){images[i].src="http://i42.tinypic.com/1pfdw4.jpg";images[i].width="55";images[i].height="60";}}



//Didriikh.Gruppeleder
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/d/i/d/didriikh/3.jpg?1229966792"){images[i].src="http://i40.tinypic.com/14adeok.jpg";images[i].width="90";images[i].height="110";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/d/i/d/didriikh/3.jpg?1229966792"){images[i].src="http://i40.tinypic.com/14adeok.jpg";images[i].width="55";images[i].height="60";}}
//Didriikh.Gruppevakt


var nick=d.getElementsByTagName('h1');
for(i=0;i<nick.length;i++) {
var s="";
s=nick[i].innerHTML;
if(s.substr(0,12)=='Didriikh') {
alert(nick[i].innerHTML)
alert(nick[i].outerHTML);

nick[i].outerHTML='Didriikh';
break;}}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML +'<br><img src="http://i44.tinypic.com/k48eol.png">'
akt.innerHTML = akt.innerHTML + '</strong><br></font><font color="#FFFFFF">&nbsp; <font color="#FFFFFF"><a href="http://userscripts.org/scripts/source/39102.user.js" style="text-decoration: none;"><input class="button" value="Oppdatering" name="send" type="submit"></a><br><br><div align="center"><font size="1"><font color="#FF00FF">&copy;2009</font> <font color="#000000"><a href="http://www.nettby.no/user/index.php?user_id=1173955">Didriikh</a></font></font></div>';
}
}
//Didriikh ©
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
//Didriikh ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Din aktivitet$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}

akt.innerHTML = akt.innerHTML + '';
akt.innerHTML = akt.innerHTML + '<img src="http://i39.tinypic.com/2zzopr4.jpg">';
akt.innerHTML = akt.innerHTML + '<div id="Random"></div>';
}
}
//Didriikh ©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/community/news.php?community_id=963678' );
anchor.appendChild( document.createTextNode( 'Agent2 på Nettby' ) );
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
is.background='url(http://i42.tinypic.com/2s1rqk8.gif)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=100)";
is=im[1].parentNode.style;is.width='200px';is.background='url(http://i42.tinypic.com/2s1rqk8.gif)';is.opacity="0.9";
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
{if(fonts[i].innerHTML=="Borgermester"){fonts[i].innerHTML='<img src="http://i43.tinypic.com/2qxq8hv.png">';
fonts[i].style.color="#3c3c3c";break;}}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Didriikh") {
  links[i].innerHTML="Agentlederºº²";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=1173955');
   break;
  }
 }
}



//Didriikh ©
//Setter Fakta
var fakta=window.document.getElementsByTagName('div');
for(q=0;q<fakta.length;q++){
	if(fakta[q].innerHTML=="Fakta")
		{fakta[q].innerHTML=" Viktige fakta:";
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
		{imON[q].innerHTML='<center><blink><img src="i43.tinypic.com/v2ttdw.png"></blink></center>';
		break;
	}
}
//Didriikh ©
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
anchor.setAttribute( 'href', 'http://www.nettby.no/user/guestbook.php?user_id=1173955' );
anchor.appendChild( document.createTextNode( 'Agent2 forum' ) );
document.getElementById( 'Test' ).appendChild( anchor );