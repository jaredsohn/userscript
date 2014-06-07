// ==UserScript==
// @name           Nouveaux smileys jeuxvideo.com part 2
// @namespace      nsmileyjeuxvideo.com2
// @description    Nouveaux smileys pour jeuxvideo.com
// @exclude       http://*.blog.jeuxvideo.com/*
// @exclude       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/forums/1-*
// @exclude       http://www.jeuxvideo.com/forums/3-*
// @exclude       http://www.jeuxvideo.com/profil/*.html
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include       http://www.jeuxvideo.com/smileys/legende.htm

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

addSmiley(lastTr(), "http://hapshack.com/images/fCGMY.gif", ":bail:" );
addSmiley(lastTr(), "http://hapshack.com/images/wBvkV.gif", ":bof:" );

addSmiley(lastTr(), "http://hapshack.com/images/aFikr.gif", ":geek:" );
addSmiley(lastTr(), "http://hapshack.com/images/xz4gb.gif", ":cute:" );

addSmiley(lastTr(), "http://hapshack.com/images/PCEf9.gif", ":hehe:" );
addSmiley(lastTr(), "http://hapshack.com/images/VYtJ5.gif", ":zik:" );

addSmiley(lastTr(), "http://hapshack.com/images/7iXwy.gif", ":osef:" );
addSmiley(lastTr(), "http://hapshack.com/images/Llk85.gif", ":play:" );

addSmiley(lastTr(), "http://hapshack.com/images/No84V.gif", ":poker:" );
addSmiley(lastTr(), "http://hapshack.com/images/IQ5E.gif", ":tcho:" );

addSmiley(lastTr(), "http://hapshack.com/images/x6boQ.gif", ":wsh:" );
addSmiley(lastTr(), "http://hapshack.com/images/eqkQ6.gif", ":ha:" );

addSmiley(lastTr(), "http://hapshack.com/images/7jKxh.gif", ":what:" );
addSmiley(lastTr(), "http://hapshack.com/images/1QCvc.gif", ":pense:" );

addSmiley(lastTr(), "http://hapshack.com/images/5QRYD.gif", ":euh:" );
addSmiley(lastTr(), "http://hapshack.com/images/XoIfn.gif", ":win:" );

addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/loveyou.gif", ":loveyou:" );

addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/6.gif", ":globe:" );
addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/16.gif", ":mac:" );

addSmiley(lastTr(), "http://s4.noelshack.com/old/up/hapoel-bcb64c2a14.jpg", ":hapoel:" );
addSmiley(lastTr(), "http://sebsauvage.net/images/smiley_ninja.gif", ":ninja:" );

addSmiley(lastTr(); "http://image.jeuxvideo.com/smileys_img/hapoelparty.gif", ":hapoelparty:" );
addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/fish.gif", ":fish:" );

}
catch(e){
alert(e);
}
}

addSmileys();