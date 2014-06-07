// ==UserScript==
// @name           Search Fix
// @namespace      GLB
// @include        http://goallineblitz.com/game/search_forum.pl?page=*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

var str1 = document.location.href
var str2 = str1.split("page=", 2)
var str3 = str2[1].split("&keyword", 2)
var pagenum = str3[0]
var prepage = str2[0] + "page="
var postpage = "&keyword" + str3[1]
var pagefloat = parseInt(pagenum)
var nextfloat = new Array()
nextfloat[0] = pagefloat + 1
nextfloat[1] = pagefloat + 2
var prevfloat = new Array()
prevfloat[0] = pagefloat - 1
prevfloat[1] = pagefloat - 2
var nextpage = new Array()
nextpage[0] = '<a href="'+prepage + nextfloat[0] + postpage+'">'+nextfloat[0]+'</a>'
nextpage[1] = '<a href="'+prepage + nextfloat[1] + postpage+'">'+nextfloat[1]+'</a>'
var prevpage = new Array()
prevpage[0] = '<a href="'+prepage + prevfloat[0] + postpage+'">'+prevfloat[0]+'</a>'
prevpage[1] = '<a href="'+prepage + prevfloat[1] + postpage+'">'+prevfloat[1]+'</a>'
var qwerty = getElementsByClassName('page_controls', document)
qwerty[0].innerHTML = '<div style="float: left;"><b>Page:  </b></div>' + prevpage[1] + prevpage[0] + nextpage[0] + nextpage[1]