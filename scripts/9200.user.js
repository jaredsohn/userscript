// ==UserScript==
// @name          Interactive Community Flooder
// @description   Interactive Community flooder.Enter text easily.Created by Vivek Narayanan
// @include       http://www.orkut.com/CommMsgPost*
// ==/UserScript==
var i=1000000; 
var s = prompt("Input text Here.ICF v1.0 Created by Vivek Narayanan", '');
function fld(){i--;document.getElementByID('messageBody').value=""+s+i;
document.getElementByID('subject').Value=""+s+i;
submitForm(document.getElementById('b2'),'submit');
}
void(setInterval(fld,600));
