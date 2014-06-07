// ==UserScript==
// @name           supply without 0
// @namespace      http://virtonomic*.*/*/window/unit/supply/create/*/step2
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/step2
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;
var pattern=/(3262746)|(3384494)/;//замените мои id на свои(на каждый реалм по числу)
var tbod=document.getElementById("mainTable");
var my_units=document.createDocumentFragment();
$('script',tbod).each(function(){
var aaa=this.nextSibling.nextSibling;
if(!(/(Независимый)|(Морской)/.test(aaa.getElementsByTagName('td')[1].getElementsByTagName('span')[0].textContent))&&pattern.test(aaa.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href))
{var temp=document.createDocumentFragment();
temp.appendChild(aaa);
if(aaa.tagname=='tr') temp.appendChild(aaa);
my_units.appendChild(this);my_units.appendChild(temp);}})
$('script',tbod).each(function(){
var aaa=this.nextSibling.nextSibling;
if((aaa.getElementsByTagName('td')[4].textContent==0)&&(!(pattern.test(aaa.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href))))
		{tbod.removeChild(aaa);
			tbod.removeChild(this);
			}})
tbod.insertBefore(my_units,tbod.firstChild);
