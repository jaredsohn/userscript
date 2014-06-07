// ==UserScript==
// @name           xStripper
// @namespace      userscripts.org/alien_scum
// @description    Strip a site down to it's bare esentials by adding #xpath= to it's url
// @include        *xpath=*
// ==/UserScript==

function $x(xpath) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w*)/g,'$1[@class="$2"]').replace(/#(\w*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  var got=document.evaluate(xpath,document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

r=$x(unescape(location.href.match(/xpath=(.*)/)[1]))
document.body.innerHTML='';
r.forEach(function(n){document.body.appendChild(document.createElement('div')).appendChild(n);});