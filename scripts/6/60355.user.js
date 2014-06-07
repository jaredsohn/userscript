// ==UserScript==
// @name          Simple English translator
// @namespace     
// @description   
// @include       http://spencerino.spencermountain.user.dev.freebaseapps.com/words
// ==/UserScript==

  var the=document.body;
  var content='';
  walk(the);
  document.write(content);
  
  function walk(y){
    for (var i in y.childNodes)
    { if (y.childNodes[i].nodeType==3)
      {  content= content + y.childNodes[i].nodeValue;  }
      if (y.childNodes[i].nodeType!=3)
      {walk(y.childNodes[i]);}//recursion
    }
  }  