// ==UserScript==
// @name           CinceSozluk
// @namespace      mea
// @description    1 Nisan 2010 gunu sozlukte ortaya cikan Cince karakterleri duzeltir
// @version        1.01
// @include        http://sozluk.sourtimes.org/*
// @include        http://eksisozluk.com/*
// @include        http://www.eksisozluk.com/*
// ==/UserScript==

(function(){

dict = {};
dict['个'] = 'a';
dict['弋']='b';
dict['伫']='c';
dict['䒑']='d';
dict['㣺']='e';
dict['䘏']='f';
dict['巨']='g';
dict['人']='h';
dict['仠']='i';
dict['伹']='j';
dict['伺']='k';
dict['佔']='l';
dict['佸']='m';
dict['佱']='n';
dict['侔']='o';
dict['侐']='p';
dict['便']='q';
dict['兄']='r';
dict['光']='s';
dict['冤']='t';
dict['冣']='u';
dict['凰']='v';
dict['単']='w';
dict['卞']='x';
dict['埕']='y';
dict['垮']='z';
 
dict['增']='ş';
dict['婥']='ı';
dict['壳']='ö';
dict['塤']='ü';
dict['塚']='ğ';     
dict['夘']='ç';     
 
dict['兒']='0';
dict['娃']='1';
dict['尢']='2';
dict['歯']='3';
dict['扌']='4';
dict['靣']='5';
dict['洞']='6';
dict['金']='7';
dict['北']='8';
dict['只']='9';

function replaceHTML(html) {
  var newHtml = "";
  for (var i=0; i<html.length; i++) {
    var v = dict[ html[i] ];
    if (v) newHtml += dict[ html[i] ]
    else newHtml += html[i];
  }
  return newHtml;
}

function replaceElement(element) {
  if (element) {
    var html = element.innerHTML;
    element.innerHTML = replaceHTML(html);
  }
}

if (document.location.href.indexOf("show.asp")>=0) {
  var h1 = document.getElementsByTagName("h1")[0];
  if (h1) {
    var h = h1.innerHTML;
    h1.innerHTML = h + " <br><b><small>(" + replaceHTML(h) + ")</small></b>";
  }
  
  var divs = document.getElementsByTagName("div");
  for (var i=0; i<divs.length; i++) {
    if (divs[i].className=="aul")
      replaceElement(divs[i].getElementsByTagName("a")[0]);
  }
}

if (document.location.href.indexOf("index.asp")>=0) {  
  var links = document.links;
  for (var i=0; i<links.length; i++) {
    links[i].innerHTML = links[i].innerHTML + "  <b><small>(" +  replaceHTML(links[i].innerHTML) + ")</small></b>";
  }
}

})();
