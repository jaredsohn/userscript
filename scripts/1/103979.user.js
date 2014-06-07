// ==UserScript==
// @name         Szamlazo program2
// @namspace     http://userscripts.org/
// @description  szamlazo program2
// @version      0.0
// @include      http://agymatek.info/*



// ==/UserScript==


var site2= location.href.toString();
var site3=unescape(site2);
function encode_utf8(rohtext) {
             // dient der Normalisierung des Zeilenumbruchs
             rohtext = rohtext.replace(/\r\n/g,"\n");
             var utftext = "";
             for(var n=0; n<rohtext.length; n++)
                 {
                 // ermitteln des Unicodes des  aktuellen Zeichens
                 var c=rohtext.charCodeAt(n);
                 // alle Zeichen von 0-127 => 1byte
                 if (c<128)
                     utftext += String.fromCharCode(c);
                 // alle Zeichen von 127 bis 2047 => 2byte
                 else if((c>127) && (c<2048)) {
                     utftext += String.fromCharCode((c>>6)|192);
                     utftext += String.fromCharCode((c&63)|128);}
                 // alle Zeichen von 2048 bis 66536 => 3byte
                 else {
                     utftext += String.fromCharCode((c>>12)|224);
                     utftext += String.fromCharCode(((c>>6)&63)|128);
                     utftext += String.fromCharCode((c&63)|128);}
                 }
             return utftext;
}

  function decode_utf8(utftext) {
             var plaintext = ""; var i=0; var c=c1=c2=0;
             // while-Schleife, weil einige Zeichen uebersprungen werden
             while(i<utftext.length)
                 {
                 c = utftext.charCodeAt(i);
                 if (c<128) {
                     plaintext += String.fromCharCode(c);
                     i++;}
                 else if((c>191) && (c<224)) {
                     c2 = utftext.charCodeAt(i+1);
                     plaintext += String.fromCharCode(((c&31)<<6) | (c2&63));
                     i+=2;}
                 else {
                     c2 = utftext.charCodeAt(i+1); c3 = utftext.charCodeAt(i+2);
                     plaintext += String.fromCharCode(((c&15)<<12) | ((c2&63)<<6) | (c3&63));
                     i+=3;}
                 }
             return plaintext;
         } 


var site= decode_utf8(site3);




//alert(site);
var darabol = site.split("=");
var nev = darabol[1].toString().substring(0,darabol[1].toString().length-1);
var cim = darabol[2].toString().substring(0,darabol[2].toString().length-1);
var telszam = darabol[3].toString().substring(0,darabol[3].toString().length);
document.getElementById('1').value=nev;
document.getElementById('2').value=cim;
document.getElementById('3').value=telszam;
document.getElementById('4').click();
//alert("fileba iras megtörtent");