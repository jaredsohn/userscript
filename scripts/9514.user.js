// ==UserScript==
// @name           Yes I Meant
// @namespace      userscripts.org/alien_scum
// @description    Automaticaly goes to did you mean and adds a link back to your original search.
// @include        http://www.google.tld/search?*
// @include        http://google.tld/search?*
// ==/UserScript==

r=$('#res/p/a');
if(r && !/#realymeant/.test(location.href)) {
location.replace(r.href+'#typed='+location.href);
}
u=location.href.match(/#typed=(.*)/);
if(u) {
  r=$('#res')
  r.insertBefore(document.createElement('p'),r.firstChild).innerHTML=
    '<font class="p" color="#cc0000">Are you sure you meant?: </font><a href="'+u[1]+'#realymeant" class="p"><b><i>'+unescape(u[1].match(/q=([^&]*)/)[1])+'</i></b></a>';
}

 function $(xpath,root) { 
   xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').replace(/([^.])\.([\w-]*)/g,'$1[@class="$2" or contains(@class," $2") or contains(@class,"$2 ")]').replace(/#([\w-]*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
   xpath=xpath.replace(/(@\w+\s*)~=(\s*"[\w\s]*")/g,'contains($1,$2)').replace(/(@\w+\s*)\^=(\s*"[\w\s]*")/g,'starts-with($1,$2)').replace(/(@\w+\s*)\$=(\s*"[\w\s]*")/g,'substring($1,string-length($1)-string-length($2)+1)=$2');
   return document.evaluate(xpath,root||document,null,null,null).iterateNext();
 }