// ==UserScript==
// @name          click
// @description   Turns javascript links to normal links
// @include       http://clickclickclick.com/default.asp
// ==/UserScript==
(function(){
  var fe=function()
    {
      var but='<button onclick="for(var i=0;i<999;i++)ck();sc();">HELLO</button>';
      var bod=document.body.innerHTML;
      document.body.innerHTML+=but;
    };
  
  //window.addEventListener("load",fe, false);
  fe();
 })();
