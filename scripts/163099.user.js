// ==UserScript==
// @name           GasztonIrtó
// @namespace      www.nethirlap.hu
// @description    nethirlap fórum antigaszton-szkript
// @include        *
// ==/UserScript==


var gs, ga, gx, i, f ;

f = /^http:\/\/www.nethirlap.hu\//;
if( ! document.URL.match( f )) { return; }                      //csak a nethirlapon működünk, ha nem ott vagyunk, azonnal kilép



s = document.getElementsByTagName( "b" );                       //minden boldot megkeres az oldalon, jó lassú, pláne hosszú oldalakon

//alert(s.length);     //ez csak debug célokra van, ennyi boldot találtunk
for( i = 0; i < s.length; i++ ) {    //végigmegyünk mindegyiken
//alert ( s[ i ].innerHTML ) ;                                 //ez csak debug, megjeleniti az aktuális bold stringet

if ( s[ i ].innerHTML == "Gaston Glock" ) {                    //hardkódolva van benne gaszton, de nem nagy ügy kibővíteni akár provokátorlista-kezeléssel
gx = s[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; //  ez a fő lényeg, itt szerezzük meg a hozzászólás ojjektumot
gs = gx.nextSibling.nextSibling;                               //meg itt
ga = gs.nextSibling.nextSibling;                               //meg itt is

//alert(gs.nodeName);                                          //debug célokra, kiköpi milyen objektumot talált

//gx.parentNode.removeChild(gx);                               //eredetileg kiszedte volna a teljes hozzászólást kerettel együtt
if ( gs.nodeName == "TABLE" ) { gs.parentNode.removeChild(gs); }                                 //csak a hozzászólást magát szedi ki
//ga.parentNode.removeChild(ga);                               //ez szedte le a keret maradékát, 
                                                               // de úgy már szétesik a fórum szerkezete és bentmarad néhány a gasztonizáció
                                                               // biztos ami biztos: csak table törölhető, ha valami valahol elromlott, ne robbantsa szét az oldalt
 }
}



