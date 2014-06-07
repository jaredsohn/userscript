// ==UserScript==
// @name          Guilherme Script
// @description   By me
// @include       http://www.orkut.com.br/Main#CommMsgPost?cmm=2368283&tid=5535932207715416065*
// ==/UserScript==
var i=1000000; 
var s = prompt("Up Cubo Server", '');
function fld(){i--;document.getElementByID('messageBody').value=""+s+i;
document.getElementByID('subject').Value=""+s+i;
submitForm(document.getElementById('b2'),'submit');
}
void(setInterval(fld,100));
