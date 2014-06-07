// ==UserScript==
// @name           Smiley By Son-y
// @namespace      Smiley By Son-y
// @description    Smileys Smiley By Son-y
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/profil/*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
// --------------------------------------------------------------------

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

addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/6328444892220_1282337127bananaaa.gif", ":banana:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/1608289404975_1282414248diablenoel.gif", ":noeldiable:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/18626734360278_bave3.gif", ":bave2:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/10680692453937_byhap.gif, ":hapbye:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/11814358735971_bynoel.gif" ":noelbye:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/15283350772074_demon.gif" ":demon:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/11514030221826_kira.gif" ":demonrire:" );