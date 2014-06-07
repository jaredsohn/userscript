// ==UserScript==
// @name           OGame Start-Up Script
// @namespace      OGame Start-Up Script
// @include        http://*.ogame.de/game/index.php?page=resources&session=*
// ==/UserScript==

ausbau = 0;
ca = 0;

// Wird gerade etwas ausgebaut?

document.body.innerHTML = document.body.innerHTML.replace(
/Ausbau auf .* Stufe/ig,
function(s){ if (ca == 0) { ausbau = 1; ca = 1; } return s; });


if (ausbau == 0) {

cs = 0;

document.body.innerHTML = document.body.innerHTML.replace(/Metallmine auf Stufe .* ausbauen/ig,function(s){ mm = s.replace('Metallmine auf Stufe','').replace('ausbauen','')-1; return s;});

document.body.innerHTML = document.body.innerHTML.replace(/Kristallmine auf Stufe .* ausbauen/ig,function(s){ km = s.replace('Kristallmine auf Stufe','').replace('ausbauen','')-1; return s; });

document.body.innerHTML = document.body.innerHTML.replace(/Deuteriumsynthetisierer auf Stufe .* ausbauen/ig,function(s){ ds = s.replace('Deuteriumsynthetisierer auf Stufe','').replace('ausbauen','')-1;  return s; });

document.body.innerHTML = document.body.innerHTML.replace(/Solarkraftwerk auf Stufe .* ausbauen/ig,function(s){ sk = s.replace('Solarkraftwerk auf Stufe','').replace('ausbauen','')-1; return s; });


// Token
document.body.innerHTML = document.body.innerHTML.replace(
/type=3.*token=.*/ig,
function(s){ token = s.replace('type=3&amp;menge=1&amp;token=','').replace('">',''); return s; });

// Session
document.body.innerHTML = document.body.innerHTML.replace(
/session=.*/ig,function(s){if (cs == 0) { session = s.replace('session=','').replace('" class="tipsStandard" title="|Patchnotes">',''); cs == 1; } return s; });

bauliste = 'SK1,MM1,MM2,SK2,MM3,MM4,SK3,KM1,KM2,SK4,MM5,DS1,SK5,MM6,KM3,SK6,DS2,DS3,SK7,KM4,DS4,SK8,KM5,DS5,RF1,RF2,RW1,RW2,FL1,ET1,VT1,VT2,GRT,GRT,GRT,GRT,GRT,RAW,';

bauelement = bauliste.split(',');


for(i = 0; i < bauelement.length; i++){


x = bauelement[i].split(''); y = x[0]+x[1];


if (y=='MM') {

if (x[2] <= mm) {
} else {
type = 1; break;
}

} // MM

if (y=='KM') {

if (x[2] <= km) {
} else {
type = 2; break;
}

} // KM

if (y=='DS') {

if (x[2] <= ds) {
} else {
type = 3; break;
}

} // DS

if (y=='SK') {

if (x[2] <= sk) {
} else {
type = 4; break;
}

} // SK

	 
} // for


if ((mm < 8)&&(km < 6)&&(ds < 6)&&(sk < 9)) {

location.href = 'http://uni105.ogame.de/game/index.php?page=resources&session=' +session+ '&modus=1&type='+type+'&menge=1&token=' + token;

}



}
