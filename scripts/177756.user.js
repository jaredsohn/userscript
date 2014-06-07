// ==UserScript==
// @name        66RPG Direct
// @namespace   Seiran
// @include     http://*.66rpg.com/*
// @include     http://*.cgyouxi.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function (){
    var x = document.getElementsByTagName("a")
    for(var i = 0; i < x.length; ++i){
      var anchor = x[i];
      anchor.href = anchor.href.replace(
        /http:\/\/bbs\.66rpg\.com\/([\w\W]*)$/,
        function(word, id){
          return "http://bbs.cgyouxi.com/" + id
        }
      );

      anchor.href = anchor.href.replace(
        /bbs\.cgyoxui\.com/,
        function(word, id){
          return "bbs.cgyouxi.com"
        }
      );  //首页上有个奇葩拼写错误。。。
    
    }
})()
//