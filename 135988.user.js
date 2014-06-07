// --------------------------------------------------------------------
//
// Script : Liste smileys
// Version 0.9
// 1-07-2010
// Copyright (c) 2010, [Coupedumonde]
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          New smileys
// @description   Day smilay nouveauw dans la liyste :bave:
// @homepage      
// @namespace     
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

addSmiley(lastTr(), "http://img705.imageshack.us/img705/9180/hapervers.png", ":hapervers:" );
addSmiley(lastTr(), "http://img710.imageshack.us/img710/6956/hapgay.png", ":hapgay:" );

addSmiley(lastTr(), "http://img21.imageshack.us/img21/9852/chucknoel.png", ":chucknoel:" );
addSmiley(lastTr(), "http://img697.imageshack.us/img697/1851/wesh.png", 
":wesh:" );

addSmiley(lastTr(), "http://img96.imageshack.us/img96/6019/hapok.gif", ":hapok:" );
addSmiley(lastTr(), "http://img4.imageshack.us/img4/2346/noelok.gif", ":noelok:" );

addSmiley(lastTr(), "http://img194.imageshack.us/img194/4753/hapgg.gif", ":hapgg:" );
addSmiley(lastTr(), "http://img28.imageshack.us/img28/7136/noelgg.png", ":noelgg:" );

addSmiley(lastTr(), "http://img18.imageshack.us/img18/1917/hapss.png", ":hapss:" );
addSmiley(lastTr(), "http://img690.imageshack.us/img690/7466/hop.gif", ":hop:" );

addSmiley(lastTr(), "http://img188.imageshack.us/img188/8476/sournouhap.png", ":sournouhap:" );
addSmiley(lastTr(), "http://img688.imageshack.us/img688/5572/cisla.gif", ":cisla:" );

addSmiley(lastTr(), "http://img28.imageshack.us/img28/9923/hapitler.gif", ":hapitler:" );
addSmiley(lastTr(), "http://img143.imageshack.us/img143/9893/autiste.gif", ":autiste:" );

addSmiley(lastTr(), "http://img15.imageshack.us/img15/774/tusaisquoi.gif", ":taggle:" );
addSmiley(lastTr(), "http://img535.imageshack.us/img535/1504/hapananas.png",":hapananas:");

addSmiley(lastTr(), "http://img256.imageshack.us/img256/3383/hapeur.gif", ":hapeur:" );
addSmiley(lastTr(), "http://img835.imageshack.us/img835/2304/hapbronz.gif", ":nigghap:" );

addSmiley(lastTr(), "http://r11.imgfast.net/users/1114/10/10/39/smiles/192955.png", ":troll:" );
addSmiley(lastTr(), "http://wiki.teamfortress.com/w/images/c/cf/User_Nyan_Cat.gif", ":nyan:" );

addSmiley(lastTr(), "http://img88.imageshack.us/img88/1967/doigtgauche.png", ":dd:" );
addSmiley(lastTr(), "http://img543.imageshack.us/img543/4996/doigtdroite.png", ":dg:" );

}
catch(e){
alert(e);
}
}

