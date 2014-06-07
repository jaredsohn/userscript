// ==UserScript==
// @name           word counter
// @namespace      http://my.donews.com/firewood/
// @description    Count selected words,including Chinese characters and English words.Press Alt+C to count.Coverted from Maxthon plugin Counter,main code by Austin,thanks to him or her
// @include        *
// ==/UserScript==

function strlen(str){
   return str.length;
}

function strchlen(str){
  var counter;
  var i;
  counter=0;
  for(i=0;i<str.length;i++){
    if(str.charCodeAt(i)>255){
      counter++;
    }
  }
  return counter;
}

function strenlen(str){
  var counter;
  var i;
  counter=0;
  for(i=0;i<str.length;i++){
    while(str.charAt(i)==' '||str.charCodeAt(i)>255) i++;
    if(str.charAt(i+1)==' '||str.charCodeAt(i+1)>255||i==str.length-1) counter++;
  }
  return counter;
}
document.addEventListener("keydown",count,false);
function count(e){
if(e.altKey==true && e.ctrlKey==false && e.shiftKey==false && e.keyCode ==67){
var txt=window.getSelection().toString();
var lenall=strlen(txt);
var lench=strchlen(txt);
var lenen=strenlen(txt);
var msg="word counter\n\nTotal: "+lenall+"\nChinese characters: "+lench+"\nEnglish(number) words: "+lenen;
alert(msg);
}
}


