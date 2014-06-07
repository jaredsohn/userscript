// ==UserScript==
// @name           Zip Selected Files
// @namespace      mobarmg@gmail.com
// @description    Zip Selected Files From 4Shared personal folder 
// @include        http://www.4shared.com/account/dir/*
// ==/UserScript==


var dv= document.createElement('div'); 
var scr= document.createElement('Script'); 
scr.innerHTML= "function addbtn() {var x = document.getElementsByName('zipFormURL')[0]; var hidn = document.getElementsByName('userId')[0]; var frm = document.forms['theForm'];frm.action = x.value;frm.submit();}";
dv.title= 'Show zip';
dv.className ='g a';
dv.innerHTML = "<div class='gv'><div class='gh' ><div class='gi'><div class='gg'></div><div class='gt' onclick='addbtn()' >Show zip</div></div></div></div></div>" ;
var xx = document.getElementById('showSearchButton');
xx.parentNode.insertBefore(dv,xx.nextSibling);
xx.parentNode.insertBefore(scr,xx);

