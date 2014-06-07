// ==UserScript==
// @name           Toast2
// @namespace      Compilsmileysjvc - 02
// @description    Compilation Smileys jeuxvideo.com
// @include       http://www.shalenity.com/listeSmileys.php*
// @include       http://shalenity.com/listeSmileys.php*

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

addSmiley(lastTr(), "http://www.netuxi.tk/smileys/tboll.gif", ":tboll:" );
addSmiley(lastTr(), "http://www.netuxi.tk/smileys/death.gif", ":death:" );

addSmiley(lastTr(), "http://www.netuxi.tk/smileys/Dolan.gif", ":dolan:" );
addSmiley(lastTr(), "http://www.netuxi.tk/smileys/facepalm.gif", ":fp:" );

addSmiley(lastTr(), "http://www.netuxi.tk/smileys/wtf.gif", ":wtf:" );
addSmiley(lastTr(), "http://www.netuxi.tk/smileys/tbollok.gif", ":tbollok:" );

addSmiley(lastTr(), "http://i2.kym-cdn.com/profiles/icons/big/000/110/902/Flipping%20Tables.jpg", ":flip:" );
addSmiley(lastTr(), "http://www.netuxi.tk/smileys/facepalm.gif", ":fp:" );

addSmiley(lastTr(), "http://www.free-community.in/upload/1/764a2cc2cdf5d7ce930a8152d659d462.png", ":feel:" );
addSmiley(lastTr(), "http://www.free-community.in/upload/1/65b2950ba15300cb65b3843d056c250d.png", ":wi:" );

addSmiley(lastTr(), "http://www.free-community.in/upload/1/cfc0840d41901718f9ad7e06e8e329ee.gif", ":japfuc:" );

}
catch(e){
alert(e);
}
}

addSmileys();