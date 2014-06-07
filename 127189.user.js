// ==UserScript==
// @name Pack de Smileys Professeur Layton SUP
// @namespace Pour mettre de nouveaux smileys sur jeuxvidéo.com SUP
// @description Ce script est un pack de smileys Professeur Layton pour jeuxvideo.com SUP
// @exclude       http://*.blog.jeuxvideo.com/*
// @include       http://*.forumjv.com/smileys/legende.htm
// @exclude       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/forums/1-*
// @exclude       http://www.jeuxvideo.com/forums/3-*
// @exclude       http://www.jeuxvideo.com/profil/*.html
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include       http://www.jeuxvideo.com/smileys/legende.htm
// @Auteur Layton3DS
// @Remerciements Faly
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

addSmiley(lastTr(), "http://img26.imageshack.us/img26/2608/laytonnoelgif.gif", ":laytonnoel:" );
addSmiley(lastTr(), "http://img856.imageshack.us/img856/2854/haplukegif.gif", ":hapluke:" );

addSmiley(lastTr(), "http://img5.imageshack.us/img5/4973/florahapgif.gif", ":florahap:" );
addSmiley(lastTr(), "http://img35.imageshack.us/img35/4566/lgif.gif", ":L:" );

addSmiley(lastTr(), "http://img171.imageshack.us/img171/853/laytonpixgif.gif", ":laytonpix:" );
addSmiley(lastTr(), "http://img62.imageshack.us/img62/8831/lukepixgif.gif", ":lukepix:" );


addSmiley(lastTr(), "http://img155.imageshack.us/img155/2815/emmypixgif.gif", ":emmypix:" );
addSmiley(lastTr(), "http://img838.imageshack.us/img838/52/donpaolopixgif.gif", ":donpaolopix:" );

addSmiley(lastTr(), "http://img845.imageshack.us/img845/2724/clivepixgif.gif", ":clivepix:" );
addSmiley(lastTr(), "http://img844.imageshack.us/img844/5172/clairepixgif.gif", ":clairepix:" );

addSmiley(lastTr(), "http://img705.imageshack.us/img705/13/bartonpixgif.gif", ":bartonpix:" );
addSmiley(lastTr(), "http://img832.imageshack.us/img832/4272/descolepixgif.gif", ":descolepix:" );

addSmiley(lastTr(), "http://img337.imageshack.us/img337/5015/mamiemysterepixpix.gif", ":mamiemysterepix:" );
addSmiley(lastTr(), "http://img708.imageshack.us/img708/6302/chelmeypixgif.gif", ":chelmeypix:" );

addSmiley(lastTr(), "http://img805.imageshack.us/img805/2894/florapixgif.gif", ":florapix:" );
addSmiley(lastTr(), "http://img215.imageshack.us/img215/4552/stachenpixgif.gif", ":stachenpix:" );

addSmiley(lastTr(), "http://img696.imageshack.us/img696/6739/mimimysterepixgif.gif", ":mimimysterepix:" );
addSmiley(lastTr(), "http://img407.imageshack.us/img407/9633/claudiapixgif.gif", ":claudiapix:" );

addSmiley(lastTr(), "http://img407.imageshack.us/img407/911/vladimirpixgif.gif", ":vladimirpix:" );
addSmiley(lastTr(), "http://img88.imageshack.us/img88/6319/pavelpixgif.gif", ":pavelpix:" );

addSmiley(lastTr(), "http://img511.imageshack.us/img511/6130/janicepixgif.gif", ":janicepix:" );
addSmiley(lastTr(), "http://img685.imageshack.us/img685/7659/melinapixgif.gif", ":melinapix:" );

addSmiley(lastTr(), "http://img13.imageshack.us/img13/285/oswaldpixgif.gif", ":oswaldpix:");
addSmiley(lastTr(), "http://img84.imageshack.us/img84/3963/schradergif.gif", ":schraderpix:" );

addSmiley(lastTr(), "http://img97.imageshack.us/img97/8904/ariannapixgif.gif", ":ariannapix:" );
addSmiley(lastTr(), "http://img225.imageshack.us/img225/9086/sgif.gif", ":soluce:" );

addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/nyu.gif", ":cute:" );
addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/play.gif", ":play:" );

addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/hapoelparty.gif", ":hapoelparty: ");
addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/loveyou.gif", ":loveyou:" );

addSmiley(lastTr(), "http://image.jeuxvideo.com/smileys_img/pf.gif", ":pf:" );


addSmiley(lastTr(), "", "" );
addSmiley(lastTr(), "", "©2011 Layton3DS" );

}
catch(e){
alert(e);
}
}

addSmileys();