// ==UserScript==
// @name           Let The World Answer 
// @namespace      Matt Pauls
// @description    Google search to find answers to questions, files, or just about anything else discussed online.  At heart we're searching to see if there's an ongoing (relevant) discussion taking place on the web.
// @version	   1.0
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/
// @include        http://www.google.*/
// @include        http://www.google.*/search*
// @include        http://www.google.*/search*
// @include        *google.*/firefox*
// @include        *google.*/firefox*
// @exclude        *images.google*
// @exclude        *video.google*
// ==/UserScript==

if((document.title==='Google') || (document.title==='Mozilla Firefox Start Page')){
document.getElementsByName('q')[0].focus();
function newradio(nametext, phrasevalue){
var search = document.getElementsByName('f')[0];
var sometext = document.createTextNode(nametext);
var someradio = document.createElement('input');
var breakup = document.createElement('br');
someradio.setAttribute('type', 'radio');
someradio.setAttribute('name', 'q');
someradio.setAttribute('value', phrasevalue);
search.appendChild(breakup);
search.appendChild(someradio);
search.appendChild(sometext);
}
newradio('Google Default', '');
newradio('Answers', 'inurl:showtopic|viewtopic|showthread|viewthread|board|forum|thread|post|topic');
}else{
function newselect(nametext, phrase){
var newoption = document.createElement('option');
newoption.setAttribute('value', phrase);
newoption.innerHTML=nametext;
s.appendChild(newoption);
}

var s = document.createElement('select');
s.setAttribute('name', 'q');
s.setAttribute('onchange', 'window.location.href=window.location.href.split("&q=")[0]+"&q="+window.location.href.split("&q=")[1].split("&")[0]+"&q="+this.value');
document.getElementById('prs').appendChild(s);
newselect('Google Default', '');
newselect('Answers', 'inurl:showtopic|viewtopic|showthread|viewthread|board|forum|thread|post|topic');
if(window.location.href.search('idAnswers')>0){s.options[1].defaultSelected='true';}
var i = 1;
while (i<s.options.length){
if(s.options[i].defaultSelected===true){
document.evaluate( '//input[contains(@title, "Search")]' , document, null, 0, null ).iterateNext().value = window.location.href.split("&q=")[1].split("&")[0];}
i++;}
var p = 0;
var qs = document.evaluate( '//input[contains(@title, "Search")]' , document, null, 0, null ).iterateNext();
var newqs = '';
while(p<qs.value.split('+').length){
if(p==qs.value.split('+').length-1){
newqs = newqs+qs.value.split('+')[p];
}else{
newqs = newqs+qs.value.split('+')[p]+' ';
}p++;}
qs.value = unescape(newqs);
var ni = document.createElement('input');
ni.setAttribute('type', 'hidden');
ni.setAttribute('name', 'q');
ni.setAttribute('value', s.value);
document.forms[0].appendChild(ni);
}