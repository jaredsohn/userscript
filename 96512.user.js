// ==UserScript==
// @name       OgameLogin
// @namespace  OgameLogin
// @include    http://*ogame.*/
// @include    http://*ogame.*/main*
// @include    http://*ogame.*/#
// ==/UserScript==

document.getElementById('login').style.display = 'block';
var server = document.forms[0].elements[4].value.substring(document.forms[0].elements[4].value.indexOf('.'), document.forms[0].elements[4].value.length);
document.forms[0].elements[4].value = 'uniXX' +server; // change XX into your universe's number ;
document.forms[0].elements[5].value= 'abc'; // change abc into your nickname ; 
document.forms[0].elements[6].value='pass'; // change pass into your pass ;
