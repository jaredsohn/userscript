// ==UserScript==
// @name          Suncorp Menu Fixer
// @namespace     http://foddrick.com/greasemonkey
// @description   Stop the madness with the new menus on the suncorp site
// @include       https://internetbanking.suncorp*.com.au/sml/nav/navl.htm
// ==/UserScript==

function fixit(a)
{
   a.className='current';
   a.parentNode.firstChild.nextSibling.nextSibling.className='current';
   a.onclick="";
   a.id=a.id+'x';
   a.removeChild(a.firstChild);

}

window.addEventListener('load',
function() {
  fixit(document.getElementById('account'));
  fixit(document.getElementById('history'));
  fixit(document.getElementById('transfer'));
  fixit(document.getElementById('bpay'));
  fixit(document.getElementById('bpcredit'));
  fixit(document.getElementById('bpdebit'));
},true);