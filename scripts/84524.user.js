// ==UserScript==
// @name           Ikariam Ally City
// @namespace      http://userscripts.org/users/197019
// @include        http://s*.*.ikariam.com/index.php*
// @version        0.9
// ==/UserScript==
var a=document.getElementById('citySelect');var b=a.getElementsByClassName('deployedCities coords');var v=new Array(b.length);var t=new Array(b.length);var s=new Array(b.length);var i,j;for(i=0;i<b.length;i++){v[i]=b[i].value;t[i]=b[i].innerHTML;t[i]=s[i]=t[i].substr(t[i].indexOf(']')+2)}s.sort();var w=new Array(t.length);for(i=0;i<t.length;i++){j=0;while(s[i]!=t[j]){j++}w[i]=j}for(i=a.options.length-1;a.options.length-b.length<=i;i--){a.remove(i)}var o;for(i=0;i<t.length;i++){o=document.createElement('option');o.className='deployedCities coords';o.text=t[w[i]];o.value=v[w[i]];a.appendChild(o)}