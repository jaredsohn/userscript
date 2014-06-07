// ==UserScript==
// @name           Hapoels By Dragonche
// @namespace      Hapoels By Dragonche
// @description    Smileys hapoel by Dragonche
// @include        http://www.jeuxvideo.com/*
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

addSmiley(lastTr(), "http://img143.imageshack.us/img143/9521/smileyhapoel.gif", ":hapoel:" );
addSmiley(lastTr(), "http://img412.imageshack.us/img412/791/hapoelia.gif", ":hapoelia:" );

addSmiley(lastTr(), "http://img706.imageshack.us/img706/812/hapoelok.gif", ":hapoel-ok:" );
addSmiley(lastTr(), "http://img710.imageshack.us/img710/5983/hapoeliaok.gif", ":hapoelia-ok:" );

addSmiley(lastTr(), "http://img13.imageshack.us/img13/2434/hapoelquestion.gif", ":hapoel-question:" );
addSmiley(lastTr(), "http://img706.imageshack.us/img706/3269/hapoeliaquestion.gif", ":hapoelia-question:" );

addSmiley(lastTr(), "http://img294.imageshack.us/img294/7660/hapoelcoeur.gif", ":hapoel-coeur:" );
addSmiley(lastTr(), "http://img715.imageshack.us/img715/199/hapoeliacoeur.gif", ":hapoelia-coeur:" );

addSmiley(lastTr(), "http://img219.imageshack.us/img219/7904/hapoelange.gif", ":hapoel-ange:" );
addSmiley(lastTr(), "http://img526.imageshack.us/img526/4406/hapoeliaange.gif", ":hapoelia-ange:" );

addSmiley(lastTr(), "http://img534.imageshack.us/img534/6113/hapoeldiable.gif", ":hapoel-diable:" );
addSmiley(lastTr(), "http://img441.imageshack.us/img441/670/hapoeliadiable.gif", ":hapoelia-diable:" );

addSmiley(lastTr(), "http://img341.imageshack.us/img341/3365/hapoelbave.gif", ":hapoel-bave:" );
addSmiley(lastTr(), "http://img257.imageshack.us/img257/3869/hapoeliabave.gif", ":hapoelia-bave:" );

addSmiley(lastTr(), "http://img594.imageshack.us/img594/186/hapoelup.gif", ":hapoel-up:" );
addSmiley(lastTr(), "http://img15.imageshack.us/img15/4725/hapoeliaup.gif", ":hapoelia-up:" );

addSmiley(lastTr(), "http://img10.imageshack.us/img10/7937/hapolink.gif", ":hapolink:" );
addSmiley(lastTr(), "http://img192.imageshack.us/img192/665/hapolinkup.gif", ":hapolink-up:" );

addSmiley(lastTr(), "http://img801.imageshack.us/img801/4021/hapolinkok.gif", ":hapolink-ok:" );
addSmiley(lastTr(), "http://img51.imageshack.us/img51/2107/hapolinkdiable.gif", ":hapolink-diable:" );

addSmiley(lastTr(), "http://img824.imageshack.us/img824/5499/hapolinkange.gif", ":hapolink-ange:" );
addSmiley(lastTr(), "http://img191.imageshack.us/img191/2105/hapolinkcoeur.gif", ":hapolink-coeur:" );


}
catch(e){
alert(e);
}
}

addSmileys();