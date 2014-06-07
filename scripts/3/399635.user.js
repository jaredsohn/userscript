// ==UserScript==
// @name        2chMenu
// @namespace   https://github.com/mr-rak/Tomorrow2ch
// @include     http://*2ch.hk/*
// @include     https://*2ch.hk/*
// @include     http://*2ch.so/*
// @include     https://*2ch.so/*
// @include     http://*2ch.ru/*
// @include     https://*2ch.ru/*
// @include     http://*2ch.ec/*
// @include     https://*2ch.ec/*
// @include     http://*2ch.pm/*
// @include     https://*2ch.pm/*
// @include     http://*2ch.tf/*
// @include     https://*2ch.tf/*
// ==/UserScript==

var menu = '';
menu += '[ <a href="/b/" title="бред">b</span></a> ';
menu += '/ <a href="/s/" title="программы">s</a> ';
menu += '/ <a href="/pr/" title="программирование">pr</a> ';
menu += '/ <a href="/spc/" title="космос и астрономия">spc</a> ';
menu += '/ <a href="/vg/" title="видеоигры">vg</a> ]';


if (menu != '')

{

menuobj = document.createElement('p');

menuobj.style.position = 'fixed';
menuobj.style.marginTop = '0px';
menuobj.style.marginRight = '0px'
menuobj.style.top = '-3px';
menuobj.style.listStyle = 'none';
menuobj.style.right = '2px';
menuobj.style.padding = '0px';
menuobj.style.backgroundColor = '#282a2e';

menuobj.style.borderStyle = 'solid';
menuobj.style.borderWidth = '1px';
menuobj.style.borderColor = '#111';

menuobj.style.fontFamily = 'Trebuchet MS';
menuobj.style.fontSize = '14px';

menuobj.innerHTML = menu;
body = document.getElementsByTagName('body')[0];
body.appendChild(menuobj);

}
