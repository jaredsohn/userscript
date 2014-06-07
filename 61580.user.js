// ==UserScript==
// @name           Facepunch  "postbitold" Mod
// @description    Adds more subtlety to the div class "postbitold yourpost". Normally, entire post is yellow, this changes all posts to have a short gradient fade to white, starting from the user info and fading into the post. Others = Dark blue, your post = light blue.
// @include        http://www.facepunch.com/showthread.php?t=*
// @include        http://www.facepunch.com/showthread.php?p=*
// @include	   http://www.facepunch.com/showpost.php?p=*
// ==/UserScript==

//backup
//http://i39.tinypic.com/34j274o.png

var style="div.postbitold {background: #FFFFFF url(http://i28.tinypic.com/2qm432b.jpg) repeat-x scroll 0 0}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);


var style="div.postbitnew {background: #FFFFFF url(http://i28.tinypic.com/2qm432b.jpg) repeat-x scroll 0 0}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);

var style="div.yourpost {background: #FFFFFF url(http://i29.tinypic.com/6qi0ky.jpg) repeat-x scroll 0 0}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);


var style="div.message {background: #FFFFFF url(http://i25.tinypic.com/huh8bc.jpg) repeat-x scroll 0 0}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);


