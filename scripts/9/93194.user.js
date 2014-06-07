// ==UserScript==
// @name           Liste des Smileys pour le script de HapisteDuFutur
// @namespace      Smileys JVC 15-18
// @description    Histoire de ne pas perdre les codes des smileys :oui:
// @include        http://www.jeuxvideo.com/smileys/legende.htm
// @exclude        http://*.blog.jeuxvideo.com/*
// @exclude        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/forums/0-*
// @exclude        http://www.jeuxvideo.com/forums/1-*
// @exclude        http://www.jeuxvideo.com/forums/3-*
// @exclude        http://www.jeuxvideo.com/profil/*.html
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
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
addSmiley(lastTr(), "http://img829.imageshack.us/img829/6015/taggle.gif", ":taggle:" );

addSmiley(lastTr(), "http://img21.imageshack.us/img21/9852/chucknoel.png", ":chucknoel:" );
addSmiley(lastTr(), "http://img697.imageshack.us/img697/1851/wesh.png", 
":wesh:" );

addSmiley(lastTr(), "http://img96.imageshack.us/img96/6019/hapok.gif", ":hapok:" );
addSmiley(lastTr(), "http://img4.imageshack.us/img4/2346/noelok.gif", ":noelok:" );

addSmiley(lastTr(), "http://img194.imageshack.us/img194/4753/hapgg.gif", ":hapgg:" );
addSmiley(lastTr(), "http://img28.imageshack.us/img28/7136/noelgg.png", ":noelgg:" );

addSmiley(lastTr(), "http://img197.imageshack.us/img197/5857/hapananas.gif", ":hapananas:" );
addSmiley(lastTr(), "http://img690.imageshack.us/img690/7466/hop.gif", ":hop:" );

addSmiley(lastTr(), "http://img188.imageshack.us/img188/8476/sournouhap.png", ":sournouhap:" );
addSmiley(lastTr(), "http://img688.imageshack.us/img688/5572/cisla.gif", ":cisla:" );

addSmiley(lastTr(), "http://img28.imageshack.us/img28/9923/hapitler.gif", ":hapitler:" );
addSmiley(lastTr(), "http://img143.imageshack.us/img143/9893/autiste.gif", ":autiste:" );

addSmiley(lastTr(), "http://img15.imageshack.us/img15/774/tusaisquoi.gif", ":taggle:" );
addSmiley(lastTr(), "http://img197.imageshack.us/img197/5857/hapananas.gif", ":hapananas:" );

addSmiley(lastTr(), "http://img256.imageshack.us/img256/3383/hapeur.gif", ":hapeur:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bide058524.gif", ":bide:" );

addSmiley(lastTr(), "http://www.noelshack.com/uploads/osef047228.gif", ":osef:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/fake049788.gif", ":fake:" );

addSmiley(lastTr(), "http://www.noelshack.com/uploads/fake073516.gif", ":fake2:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/charte081451.gif", ":charte:" );

addSmiley(lastTr(), "http://www.noelshack.com/uploads/grotte091925.gif", ":btg:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/noelempereur089638.gif", ":nowel:" );

addSmiley(lastTr(), "http://www.noelshack.com/uploads/oupas077595.gif", ":oupas:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/TAGGLEtransp.005684.gif", ":taggle2:" );

addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/founoel.gif", ":founoel:" );
addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/humnoel.gif", ":humnoel:" );

addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/maladenoel.gif", ":nowel:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/noelempereur089638.gif", ":maladenoel:" );

addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/clownnoel.gif", ":clownoel:" );
addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/coeurnoel.png", ":coeurnoel:" );

addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/colerenoel.gif", ":colerenoel:" );
addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/nonnonnoel.gif", ":nonoel:" );

addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/oknoel.gif", ":oknoel:" );
addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/peurnoel.gif", ":peurnoel:" );

addSmiley(lastTr(), "http://smileys.urpix.fr/smileys/Messages/0067.gif", ":rasta:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/yay073915.png", ":awesome:" );

addSmiley(lastTr(), "http://nerdempire.net/forum/img/smilies/Trollface.gif", ":trollface:" );
addSmiley(lastTr(), "http://cinnamal.com/NoelTweet/94.23.116.141/i/icons/fuu.gif", ":fuu:" );

addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/xD.gif", ":xd:" );



}
catch(e){
alert(e);
}
}

addSmileys();