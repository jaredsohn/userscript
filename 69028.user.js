// ==UserScript==
// @name           Kill Quote
// @namespace      ru.ryotsuke
// @description    Убивалка вложенных цитат
// @include        http://diary.ru/*
// @include        http://www.diary.ru/*
// @include        http://*.diary.ru/*
// ==/UserScript==




function unwrap(element) {
  var res = element.innerHTML;
  var ready = false;
  while(!ready)
  {
    ready = true;
    if(res.toLowerCase().indexOf('<div class="blockquote">')>=0) {
      
      
      var j = res.toLowerCase().indexOf('<div class="blockquote">');
      res=res.substring(0,j)+res.substr(j+24,res.length-j-24);
      j = res.toLowerCase().lastIndexOf('</div>');
      res=res.substring(0,j)+res.substr(j+6,res.length-j-6);
      
      
      ready=false;
    }
    if(res.toLowerCase().indexOf('<span class="quote_text">')>=0) {
      
      
      var j = res.toLowerCase().indexOf('<span class="quote_text">');
      res=res.substring(0,j)+res.substr(j+25,res.length-j-25);
      j = res.toLowerCase().lastIndexOf('</span>');
      res=res.substring(0,j)+res.substr(j+7,res.length-j-7);
      
      
      ready=false;
    }
    var patt=/<small><a[^>]*>URL[^<]*<\/a><\/small><br><br>/ig;    
    res=res.replace(patt, "");
    var patt2=/Пишет <a class="TagJIco"[^>]*>[^<]*<\/a><a class="TagL"[^>]*>([^<]*)<\/a>:<br><br>/ig;        
    res=res.replace(patt2, "");
    var patt3=/<div align="right"><b>\d\d.\d\d.\d\d\d\d<\/b>[^<]*<\/div>/ig;    
    res=res.replace(patt3, "");
    
  }
  element.innerHTML=res;
  
  return null;
}

var ready=false;


var divs = document.getElementsByTagName("span");
var divslen = divs.length;
ready=true;
for(var i = 0; i < divslen && ready; i++) {
	comment = divs[i];
	if(comment.className.indexOf("quote_text") != -1) {
      unwrap(comment);
    }
	}
	 



