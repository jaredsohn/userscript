// ==UserScript==
// @name           alternate classer
// @namespace      userscripts.org/alien_scum
// @description    Adds GM_alternate class to every other tr and li
// @include        *
// ==/UserScript==


function $x(xpath,root) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3');
  var got=document.evaluate(xpath,root||document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

function alt(n,i){
  if (i%2)
    n.setAttribute('class',(n.getAttribute('class')||'')+' GM_alternate');
}

$x('table').forEach(function(t){$x('tr',t).forEach(alt)});
$x('ul|ol').forEach(function(t){$x('li',t).forEach(alt)});
