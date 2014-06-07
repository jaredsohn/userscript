/*<![CDATA[*//*
// ==UserScript==
// @name          zapEmbeds4chan
// @match http://*.4chan.org/*
// @run-at document-start
// @description   zap embeds into 4chanpage
// ==/UserScript==
*/
 function zapembs() {
	var doc=document,astag=['object','embed'],rempr=function(ref){ref.parentNode.removeChild(ref);};
   for(var a=astag.length,embs; a--;){
	embs=doc.getElementsByTagName(astag[a]);
  if(embs.length){for(var i=embs.length; i--;){rempr(embs[i]);}}
   }
 }
   document.addEventListener('load',zapembs(),false);
/*]]>*/