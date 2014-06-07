// ==UserScript==
// @name           Facebook Auto Delete Friends
// @namespace      http://www.facebook.com/ewinQ
// @author         Herwin Ariwin
// @description    Automatically delete your first 50 friends on Facebook, each time you load the page again.
// @include        http://*.facebook.com/friends/all?*
// ==/UserScript==


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
  
  
  var remove = $$('a.remove');
  for (var i = 0; i < remove.length; i++){
    remove[i].onclick();
    $('dialog_button1').click();
  }
})();