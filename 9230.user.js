// ==UserScript==
// @name           Scriptwright linker
// @namespace      userscripts.org/alien_scum
// @include        http://userscripts.org/*
// ==/UserScript==


function $x(xpath,root,d) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').replace(/([^.])\.([\w-]*)/g,'$1[@class="$2" or contains(@class," $2") or contains(@class,"$2 ")]').replace(/#([\w-]*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  xpath=xpath.replace(/(@\w+)~=("[\w\s]*")/g,'contains($1,$2)').replace(/(@\w+)^=("[\w\s]*")/g,'starts-with($1,$2)').replace(/(@\w+)$=("[\w\s]*")/g,'substring($1,string-length($1)-string-length($2)+1)=$2')
  var got=document.evaluate(xpath,(root&&root.wrappedJSObject)||document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

fn=$x('.fn/a');
role=$x('.role');
posts=$x('span.posts');
for(var i=0;i<role.length;i++) if(/Scriptwright|Admin/.test(role[i].innerHTML)) role[i].innerHTML='<a href="'+fn[i].href+';scripts">'+role[i].innerHTML+'</a>';
for(var i=0;(i<posts.length) && (i<fn.length);i++)  posts[i].innerHTML='<a href="'+fn[i].href+'/posts">'+posts[i].innerHTML+'</a>';

trs=$x(p='tr.hentry');
for(var i=0;tr=trs[i++];)   
  if(!$x('.date//a',tr).length &&$x('.topic//a',tr).length)
    $x('.date',tr)[0].innerHTML='<a href="'+$x('.topic//a',tr)[1].href+'#'+tr.id+'">'+$x('.date',tr)[0].innerHTML+'</a>';