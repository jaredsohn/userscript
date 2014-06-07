// ==UserScript==
// @name           Google Search Optionbox
// @namespace      Jos van Nijnatten
// @description    Google search options in a optionbox
// @version        1
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



    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
      script.setAttribute('text', 'text/javascript');
      script.setAttribute('id', 'gsOptionBox');
      script.innerHTML = <![CDATA[

function GoogleSearchOptions() {
if((document.title==='Google') || (document.title==='Mozilla Firefox Start Page')){
    var i=0;var ii=0;
  var optionList = new Array();
  var span = document.getElementsByTagName('span')[5];
  var parent = span.parentNode;
  
  while (i<span.children.length) {
    if (span.children[i].tagName.toLowerCase()=="input") {
      optionList[ii] = new Array(4);
      a=i+1;
      optionList[ii]['title'] = span.children[a].innerHTML;
      optionList[ii]['id']    = span.children[i].id;
      optionList[ii]['value'] = span.children[i].value;
      optionList[ii]['name']  = span.children[i].name;
      ii++;
    }
    i++;
  }i=ii;
  parent.removeChild(span);

  optionList[i] = new Array(1);
    optionList[i]['title'] = 'hr';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Download sites';
    optionList[i]['id']    = null;
    optionList[i]['value'] = 'download (inurl:"megaupload.com" OR inurl:"mediafire.com" OR inurl:"filefactory.com" OR inurl:"rapidshare.com" OR inurl:"megashares.com" OR inurl:"seriesyonkis.com" OR inurl:"badongo.com" OR intitle:gigasize OR inurl:"filefront.com") -xxx -md5 -md5sums';
    optionList[i]['name']  = 'q';
    i++;    
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Torrent';
    optionList[i]['id']    = null;
    optionList[i]['value'] = '((filetype:torrent) OR (inurl:"torrentz.com"))';
    optionList[i]['name']  = 'q';
    i++;

  optionList[i] = new Array(1);
    optionList[i]['title'] = 'hr';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Music (mp3/aac)';
    optionList[i]['id']    = null;
    optionList[i]['value'] = 'intitle:"index.of" (mp3|aac) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3 -hyooge -audiozen -musicindexof -mp3s -musik';
    optionList[i]['name']  = 'q';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Movies (avi/mp4/etc)';
    optionList[i]['id']    = null;
    optionList[i]['value'] = 'intitle:"index.of" (avi|mp4|mpg|wmv) "Parent Directory" -htm -html -asp -php -listen77 -idmovies -airmp3 -shexy -moviez -musicindexof -mp3s -musik -eucontest -0x7 -inurl:htm -inurl:html -inurl:php';
    optionList[i]['name']  = 'q';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Ebooks (pdf/pdb/etc)';
    optionList[i]['id']    = null;
    optionList[i]['value'] = '"Parent Directory" intitle:"index.of" (chm|pdf|pdb|prc|lit|doc|rtf|txt) "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -opendivx -md5 -md5sums -htm -html -php -idpdf';
    optionList[i]['name']  = 'q';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'FTP Folder';
    optionList[i]['id']    = null;
    optionList[i]['value'] = '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp';
    optionList[i]['name']  = 'q';
    i++;
  
  
  document.getElementsByName('q')[0].focus();
  var Tselect = document.createElement('select');
    Tselect.setAttribute('id', 'Toptions');
    Tselect.setAttribute('onchange','this.name=this.children[this.selectedIndex].className');
    parent.appendChild(Tselect);
  
  function newoption(title,id,value,name){
    var search = document.getElementById('Toptions');
    var option = document.createElement('option');
      if(title=='hr'){
        title = '- - - - -';
        option.setAttribute('disabled', 'true');
      }else{
        option.setAttribute('Id', id);
        option.setAttribute('class', name);
        option.setAttribute('Value', value);
      }
    var text = document.createTextNode(title);
    search.appendChild(option);
    option.appendChild(text);
  }
  
  i=0;
  while (i<optionList.length) {
    optionList[i]['title']=='hr'?newoption(optionList[i]['title'],null,null,null):newoption(optionList[i]['title'],optionList[i]['id'],optionList[i]['value'],optionList[i]['name']);
    i++;
  }
}}
var move=0;
]]>;
      head.appendChild(script);

document.onload = document.getElementsByTagName('body')[0].setAttribute('onmousemove','if((String(document.getElementsByTagName("html")[0].onmousemove).search("fade")>0)&&(move==0)){setTimeout("GoogleSearchOptions()",25);move++;}else if((String(document.getElementsByTagName("html")[0].onmousemove).search("fade")<0)&&(move==0)) {GoogleSearchOptions();move++;}');
