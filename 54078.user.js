// ==UserScript==
// @name           Google Pirate v2
// @namespace      Aaron Russell
// @description    Use Google to find free music, movies, torrents, books and other files stored publicly online.
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
function newradio(nametext, dorkvalue){
var search = document.getElementsByName('f')[0];
var sometext = document.createTextNode(nametext);
var someradio = document.createElement('input');
var breakup = document.createElement('br');
someradio.setAttribute('type', 'radio');
someradio.setAttribute('name', 'q');
someradio.setAttribute('value', dorkvalue);
search.appendChild(breakup);
search.appendChild(someradio);
search.appendChild(sometext);
}
newradio('Web', '');
newradio('Music', 'intitle:"index.of" (mp3|aac) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3 -hyooge -audiozen -musicindexof -mp3s -musik');
newradio('Movies/TV', 'intitle:"index.of" (avi|mp4|mpg|wmv) "Parent Directory" -htm -html -asp -php -listen77 -idmovies -airmp3 -shexy -moviez -musicindexof -mp3s -musik -eucontest -0x7 -inurl:htm -inurl:html -inurl:php');
newradio('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp');
newradio('Torrents', 'filetype:torrent');
newradio('EBooks', '"Parent Directory" intitle:"index.of" (chm|pdf) "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -opendivx -md5 -md5sums -htm -html -php -idpdf');
}else{
function newselect(nametext, dork){
var newoption = document.createElement('option');
newoption.setAttribute('value', dork);
newoption.innerHTML=nametext;
s.appendChild(newoption);
}

var s = document.createElement('select');
s.setAttribute('name', 'q');
s.setAttribute('onchange', 'window.location.href=window.location.href.split("&q=")[0]+"&q="+window.location.href.split("&q=")[1].split("&")[0]+"&q="+this.value');
document.getElementById('prs').appendChild(s);
newselect('Web', '');
newselect('Music', 'intitle:"index.of" (mp3|aac) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3 -hyooge -audiozen -musicindexof -mp3s -musik');
newselect('Movies/TV', 'intitle:"index.of" (avi|mp4|mpg|wmv) "Parent Directory" -htm -html -asp -php -listen77 -idmovies -airmp3 -shexy -moviez -musicindexof -mp3s -musik -eucontest -0x7 -inurl:htm -inurl:html -inurl:php');
newselect('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp');
newselect('Torrents', 'filetype:torrent');
newselect('EBooks', '"Parent Directory" intitle:"index.of" (chm|pdf) "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -opendivx -md5 -md5sums -htm -html -php -idpdf');
if(window.location.href.search('idmusic')>0){s.options[1].defaultSelected='true';}
if(window.location.href.search('idmovies')>0){s.options[2].defaultSelected='true';}
if(window.location.href.search('idftp')>0){s.options[3].defaultSelected='true';}
if(window.location.href.search('torrent')>0){s.options[4].defaultSelected='true';}
if(window.location.href.search('idpdf')>0){s.options[5].defaultSelected='true';}
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