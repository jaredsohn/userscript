// --------------------------------------------------------------------
//
// Script : Liste smileys
// Version 0.1
// 1-07-2010
// Copyright (c) 2010, [Coupedumonde]
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          New smileys
// @description   Des smileys nouveaux dans la liste (TDM)
// @exclude       http://*.blog.jeuxvideo.com/*
// @exclude       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/forums/1-*
// @exclude       http://www.jeuxvideo.com/forums/3-*
// @exclude       http://www.jeuxvideo.com/profil/*.html
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include       http://www.jeuxvideo.com/smileys/legende.htm
// @author        [The_DarK_My]
// @contributor   [The_DarK_My]

// ==/UserScript==

function addImg(href){
var img = document.createElement('img');
img.src = href;
return img;
}

function addA(href, code){
var a = document.createElement('a');
a.href = 'javascript:passCode("newmessage","'+code+'");'
a.appendChild(addImg(href));
return a;
}

function addTd1(href, code){
var td = document.createElement('td');
td.appendChild(addA(href, code));
return td;
}

function addTd2(code){
var td = document.createElement('td');
td.innerHTML = code;
return td;
}

function addTr(i){
var tr = document.createElement('tr');
var classe = (i%2 == 0)? 'tr1' : 'tr2';
tr.setAttribute('class', classe);
return tr;
}

function nbTr(){
	return document.getElementsByTagName('tr').length;
}

function lastTr(){
return document.getElementsByTagName('tr')[nbTr()-1];
}

function nbTd(tr){
return lastTr().getElementsByTagName('td').length;
}

function addSmiley(tr, href, code){
if(nbTd(tr) == 8)
tr = tr.parentNode.appendChild(addTr(nbTr()));
tr.appendChild(addTd1(href, code));
tr.appendChild(addTd2(code));
}

function addSmileys(){
try{

addSmiley(lastTr(), "http://www.hapoeliashack.com/img/pack/smiley-hapoelia.gif, ":hapoelia:" );
addSmiley(lastTr(), "http://img697.imageshack.us/img697/1851/wesh.png", 
":wesh:" );
addSmiley(lastTr(), "http://www.hapoeliashack.com/img/pack/smiley-hapoel.gif", ":hapoel:" );

}
catch(e){
alert(e);
}
}

addSmileys();