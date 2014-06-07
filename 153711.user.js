// ==UserScript==
// @name           YouTube ScriptTest
// @namespace      http://www.youtube.com/
// @description    testing jscript
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==


 
 var n=document.getElementById("comments-view").innerHTML.match(/icon_comments_disabled-vflxokpZC.png/g);


// This code borrowed from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values/901144#901144
    var videoid=function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }else{
        alert("YouTube Comment Re-enabler error in getting video ID");
    }
// That code was borrowed from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values/901144#901144
}
  var parentsrc="http://ytcommentable.host22.com/";
  
  
  document.getElementById("watch7-discussion").innerHTML="<iframe src=frame1src width='640' height='400' frameborder='0'></iframe>";
  var codeString="document.getElementById('watch7-discussion').innerHTML='<iframe src="+parentsrc+" width='640' height='400' frameborder='0'></iframe>';";
  
  eval(codeString); 
  

  
  /*
var n=document.getElementById("comments-view").innerHTML.match(/icon_comments_disabled-vflxokpZC.png/g);


if (n=="icon_comments_disabled-vflxokpZC.png")
  {
  document.getElementById("watch7-discussion").innerHTML="<iframe src='http://ytcommentable.host22.com/' width='640' height='400' frameborder='0'></iframe>";
  }
 */