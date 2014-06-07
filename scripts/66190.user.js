// ==UserScript==
// @name           Google Pirate Advanced
// @namespace      Aaron Russell, Mikulas Dite
// @description    Use Google to find free music, movies, torrents, books and other files stored publicly online.
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/
// @include        http://www.google.*/
// @include        *google.*/firefox*
// @include        *google.*/firefox*
// @exclude        *images.google*
// @exclude        *video.google*
// @exclude        *.google.*/search*
// ==/UserScript==

function newradio(nametext, dorkvalue, selected){
  var pli = document.createElement('li');
  pli.setAttribute('style', 'margin: 0px; padding: 0px; text-align: left;');
  pul.appendChild(pli);
  
  var sometext = document.createTextNode(' - ' + nametext);
  var someradio = document.createElement('input');
  pli.appendChild(someradio);
  pli.appendChild(sometext);
  
  someradio.setAttribute('type', 'radio');
  someradio.setAttribute('name', 'q');
  someradio.setAttribute('value', dorkvalue);
  someradio.setAttribute('class', 'lsb');
  
  someradio.setAttribute('style', 'display: none; position: relative; left: -35px; top: -10px');  
  someradio.parentNode.setAttribute('onclick', 'this.getElementsByTagName("input")[0].checked = true; document.getElementsByName("f")[0].submit();');
  pli.setAttribute('style', 'width: 124px; position: relative; top: -15px; left: -38px;');
  pli.setAttribute('class', 'lsb');
  
  if(selected)
    someradio.setAttribute('checked', 'true');
}
var script = document.createElement('script');
script.innerHTML = "function togglepmenu(status){document.getElementById('pmenu').style.display = status?'inline':'none';}"; 
document.getElementsByTagName("head")[0].appendChild(script);

document.getElementsByName("btnG")[0].value = 'Google Search';

var ds = document.getElementsByName('btnG')[0].parentNode.parentNode;
ds.setAttribute('onmouseover', 'togglepmenu(true);');
ds.setAttribute('onmouseout', 'togglepmenu(false);');
var pmenu = document.createElement('div');
pmenu.setAttribute('class', 'lsb');
pmenu.style.width = '126px';
pmenu.style.display = 'none';
pmenu.style.position = 'relative';
pmenu.style.cssFloat = 'left';

pmenu.id = 'pmenu';
ds.appendChild(pmenu);
var pul = document.createElement('ul');
pul.setAttribute('style', 'list-style-type: none; text-align: left; background: #1442E0;');
pmenu.appendChild(pul);

document.getElementsByName('btnG')[0].setAttribute('class','lsb');
document.getElementsByName('q')[0].focus();

newradio('Music', 'intitle:"index.of" (mp3|aac) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3 -hyooge -audiozen -musicindexof -mp3s -musik');
newradio('Movies/TV', 'intitle:"index.of" (avi|mp4|mpg|wmv) "Parent Directory" -htm -html -asp -php -listen77 -idmovies -airmp3 -shexy -moviez -musicindexof -mp3s -musik -eucontest -0x7 -inurl:htm -inurl:html -inurl:php');
newradio('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp');
newradio('eBooks', '"Parent Directory" intitle:"index.of" (chm|pdf) "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -opendivx -md5 -md5sums -htm -html -php -idpdf');