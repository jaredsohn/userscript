// ==UserScript==
// @name           JVC Smileys
// @namespace      JVC
// @include        http://www.jeuxvideo.com/smileys/legende.htm
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

addSmiley(lastTr(), "http://www.noelshack.com/uploads/bide058524.gif", ":bide:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/taggle053712.gif", ":taggle:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/osef047228.gif", ":osef:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/ChuckNorris058941.gif", ":chuck: " );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/jerry028628.gif", ":jerry:" );
addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/xD.gif", ":xD:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/grotte091925.gif", ":btg:" );
addSmiley(lastTr(), "http://www.noelshack.com/uploads/rafy084995.gif", ":rafy:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/fake073516.gif", ":fake:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/fake049788.gif", ":fake2:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/noelempereur089638.gif", ":noelemp:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/oupas077595.gif", ":oupas:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/TAGGLEtransp.005684.gif", ":taggle2:");
addSmiley(lastTr(), "http://antre-jv.com/smileys/AJV/hs.gif", ":hs:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/gg012478.gif", ":gg:");

}
catch(e){
alert(e);
}
}

addSmileys();






