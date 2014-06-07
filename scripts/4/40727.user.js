// ==UserScript==
// @name           Nettby NaN Profile + stuff
// @namespace      Nettby NaN Profile + stuff
// @include        *nettby.no*
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
akt.innerHTML = akt.innerHTML + '<img src="http://img1.nettby.no/img/smiley/smiley46.png">';
akt.innerHTML = akt.innerHTML + '<div id="Random"></div>';
}
}
//CALADORION ©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/user/index.php?user_id=563395' );
anchor.appendChild( document.createTextNode( 'Funsjoner:' ) );
document.getElementById( 'Randomvenn' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/user/index.php?user_id=563395' );
anchor.appendChild( document.createTextNode( '' ) );
document.getElementById( 'FAVORITT' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/user/index.php?user_id=563395' );
anchor.appendChild( document.createTextNode( ' Funsjoner:                       Unlimted status text,                    Fjernet "Innstilinger" PGA. css,            Mer kommer senere!                 ' ) );
document.getElementById( 'Random' ).appendChild( anchor );


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Innstillinger") {
  links[i].innerHTML="";
  links[i].style.color="#ff0000"; {
  }
 }
}


for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/home__edit1.gif")
{images[i].src="http://img1.nettby.no/t.gif";}}


var limited;
limited=document.evaluate(
"//input[@maxlength]",
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0; i<limited.snapshotLength; i++)
limited.snapshotItem(i).removeAttribute("maxlength");




//Matsinator©