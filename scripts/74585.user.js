// ==UserScript==
// @name           Facebook join my group or die killer
// @namespace      fbkill
// @description    Show me your group
// @include        http://www.facebook.com/pages/*
// @author         Crazypops <crazypops@gmail.com>
// ==/UserScript==

function $$(xpath,root) { 
  xpath = xpath
    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
    .replace(/#([\w-]+)/g, '[@id="$1"]')
    .replace(/\/\[/g,'/*[');
  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
  xpath = xpath
    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got = document.evaluate(xpath, root||document, null, 5, null);
  var result=[];
  while (next = got.iterateNext())
    result.push(next);
  return result;
}

$$('span').forEach(function(a){
    if(a.style.visibility == "hidden"){
    a.style.visibility = "visible";
    }
});
