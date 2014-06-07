// ==UserScript==
// @name          Clarin Clasificados More Results
// @namespace     http://www.n3rds.com.ar/greasemonkey
// @include       http://www.inmuebles.clarin.com/ResultadoBuscadorInmuebles.jsp*
// @exclude       
// @description	  Adds the option to show 100, 200 or 300 results per page (standard options are 10-50)
// ==/UserScript==

(function(){
results=document.evaluate("//font[@class='paginarOn']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;
results.innerHTML+='<font face="Arial, Helvetica, sans-serif" size="1">&nbsp;|&nbsp;</font> <a class="paginarOff" href="http://www.inmuebles.clarin.com/ResultadoBuscadorInmuebles.jsp?accion=NEXT&amp;max_rows=100&amp;absolutePosition=0">100</a> <font face="Arial, Helvetica, sans-serif" size="1">&nbsp;|&nbsp;</font> <a class="paginarOff" href="http://www.inmuebles.clarin.com/ResultadoBuscadorInmuebles.jsp?accion=NEXT&amp;max_rows=200&amp;absolutePosition=0">200</a> <font face="Arial, Helvetica, sans-serif" size="1">&nbsp;|&nbsp;</font><a class="paginarOff" href="http://www.inmuebles.clarin.com/ResultadoBuscadorInmuebles.jsp?accion=NEXT&amp;max_rows=300&amp;absolutePosition=0">300</a>';
})()
