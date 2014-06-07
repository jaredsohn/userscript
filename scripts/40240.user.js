// ==UserScript==
// @name           Flip for help.com/chat
// @namespace      textboxes
// @description    this is a version of the script found at http://www.revfad.com/flip.html, all i have done is made it work at help.com/chat by pressing the end key,  alll credit should go to them really.
// @include        http://help.com/chat
// ==/UserScript==

function flipString(aString) {
 var last = aString.length - 1;
 //Thanks to Brook Monroe for the
 //suggestion to use Array.join
 var result = new Array(aString.length)
 for (var i = last; i >= 0; --i) {
  var c = aString.charAt(i)
  var r = flipTable[c]
  result[last - i] = r != undefined ? r : c
 }
 return result.join('')
}

var flipTable = {
a : '\u0250',
b : 'q',
c : '\u0254', //open o -- from pne
d : 'p',
e : '\u01DD',
f : '\u025F', //from pne
g : '\u0183',
h : '\u0265',
i : '\u0131', //from pne
j : '\u027E',
k : '\u029E',
//l : '\u0283',
m : '\u026F',
n : 'u',
r : '\u0279',
t : '\u0287',
v : '\u028C',
w : '\u028D',
y : '\u028E',
'.' : '\u02D9',
'[' : ']',
'(' : ')',
'{' : '}',
'?' : '\u00BF', //from pne
'!' : '\u00A1',
"\'" : ',',
'<' : '>',
'_' : '\u203E',
';' : '\u061B',
'\u203F' : '\u2040',
'\u2045' : '\u2046',
'\u2234' : '\u2235',
'\r' : '\n' //thank you, Yeeliberto
}

for (i in flipTable) {
  flipTable[flipTable[i]] = i
}


document.getElementsByTagName('input')[0].addEventListener('keydown', function(e){  var unicode=e.keyCode? e.keyCode : e.charCode; if(unicode==35){ var result = flipString(document.getElementsByTagName('input')[0].value.toLowerCase());  document.getElementsByTagName('input')[0].value = result; } }, false);