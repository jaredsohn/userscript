// ==UserScript==
// @id             1
// @name           reader title
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://www.google.com/reader/*
// @run-at         document-end
// ==/UserScript==

function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}

function replaceTitle(){
  other=document.title.indexOf("Google Reader")
  if(other==0)
    post=document.title.substring(14)
  else
    post=document.title.substring(0,other)
  document.title=post+' '+'Google Reader'
  setTimeout(replaceTitle,5000);
}

replaceTitle()