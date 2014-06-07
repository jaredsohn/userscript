// ==UserScript==
// @name           ChangeLogo
// @namespace      http://userscripts.org/users/82730
// @description    Using googlemyway.com, this changes the Google logo to a custom text logo!
// @include        http://www.google.com/
// ==/UserScript==

function ld(what) {
var alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
return (alpha.indexOf(what)>=0);
}
function isupper(what) {
return (what.toUpperCase()==what);
}

what="New Logo Text Here";
code="";

for (p=0; p<what.length; p++) {
char=what.charAt(p);
code+="<img src='http://googlemyway.com/pics/";
if (!ld(char)) { code+="_.png' />"; continue; }
code+=char.toLowerCase();
if (isupper(char)) { code+="1"; }
code+=".png' />";

}

document.getElementById("lga").innerHTML=code+"<br><br>";