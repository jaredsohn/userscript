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
// @name          new smiley
// @description   Version 0.5 du 03-06-2010 par [Hapoel] / Script pour ajouter les smiley Hapoeliste sur les legendes des forums de jeuxvideo.com
// @homepage      http://script-hapoeliste.sup.fr/
// @namespace     http://script-hapoeliste.sup.fr/
// @exclude       http://*.blog.jeuxvideo.com/*
// @exclude       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/forums/1-*
// @exclude       http://www.jeuxvideo.com/forums/3-*
// @exclude       http://www.jeuxvideo.com/profil/*.html
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include       http://www.jeuxvideo.com/smileys/legende.htm
// @author        [coupedumonde]
// @contributor   [coupedumonde]

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

addSmiley(lastTr(), "http://img20.imageshack.us/img20/9909/msgplusimg2395.png", ":hapervers:" );
addSmiley(lastTr(), "http://img340.imageshack.us/img340/9245/msgplusimg0377.png", ":gayhap:" );

addSmiley(lastTr(), "http://img526.imageshack.us/img526/452/msgplusimg0444.png", ":chucknoel:" );
addSmiley(lastTr(), "http://img228.imageshack.us/img228/2811/msgplusimg0461.png", ":Wesh:" );

}
catch(e){
alert(e);
}
}

addSmileys();