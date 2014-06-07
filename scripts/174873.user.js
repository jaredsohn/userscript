// ==UserScript==
// @name        ro.wikipedia - Tweaks
// @author      XXN
// @description Tweaks for romanian Wikipedia
// @include     *ro.wikipedia.org*
// @version     1.3
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var b=document.getElementById('p-Participare');

b.innerHTML='<div><table style="font-size:12px"><tr><td>\
<form name="createbox" class="createbox" action="/w/index.php" method="get"><input type="hidden" name="action" value="edit">\
<input type="hidden" name="preload" value="Format:Pagina_noua">\
<input type="hidden" name="nosummary" value=""><input type="hidden" name="prefix" value="">\
<input type="hidden" name="minor" value="">\
<input type="text" name="title" class="createboxInput" value="" placeholder="Articol Nou" size="17" dir="ltr">\
<br /></form></td></tr></table></div>'+b.innerHTML;

document.getElementById('t-upload').innerHTML='<a href="/wiki/Special:Încărcare">Trimite fișier</a>';
var v=document.getElementById('t-contributions');
span = document.createElement('span');
v.insertBefore(span,v.getElementsByTagName("a")[0]);
n=document.querySelector('#p-namespaces > ul');
n.appendChild(v);
$("li#t-contributions > a").text("Contribuții")

//document.getElementById('editpage-copywarn').style.display = 'none';
document.getElementById('editpage-copywarn').innerHTML = '';

sss=document.querySelector('div.mw-editTools');
sss.innerHTML='';