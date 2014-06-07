// ==UserScript==
// @name           Vitalist Today button adder
// @namespace      http://i1t2b3.net
// @description    Adds Today button near date dialog button
// @include        http://*vitalist.com/dashboard/
// @include        http://*vitlast.com/dashboard
// @include        http://my.vitalist.com/
// @include        http://my.vitalist.com
// ==/UserScript==

var link = document.getElementById('account');
if( !link ) return false;

var inp = document.createElement('input');
inp.type = 'button';
inp.value = 'Set date as today and submit';
inp.style.fontSize = '85%';
inp.style.marginLeft = '1em';
inp.style.marginRight = '600px';

inp.setAttribute( 'onclick', "var d = new Date(); document.getElementById('txt_quickadd_duedate').value = [ (d.getDate() < 10 ? '0' : '') + d.getDate() , (d.getMonth() < 9 ? '0' : '') + (1+d.getMonth()), d.getFullYear() ].join('/'); window.item_quickadd_save( document.getElementById('quickadd-form') );" );

As = link.getElementsByTagName( 'A' );

link.appendChild( inp );