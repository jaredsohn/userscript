// ==UserScript==
// @name           WDK .html Remover
// @namespace      .
// @description    Fjerner .html paa filer fra RS
// @include        http://warez-dk.org/showthread.php?t=*
// @include        http://new.warez-dk.org/showthread.php?t=*
// ==/UserScript==

var page = document.body.innerHTML;
var regex = new RegExp("http://rapidshare\\.com/files/[0-9]+/[a-z0-9_\\-\\.,]+\\.html", "i");
var result = regex.exec(page);
if(result == null)
  return 0;
while(result != null)
{
  page = page.replace(result, result.toString().replace(".html",""));
  result = regex.exec(page);
}
document.body.innerHTML = page;