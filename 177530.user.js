// ==UserScript==
// @name        AstroDemo TRFix
// @author      juiev
// @namespace   *
// @description Astrodemo forumundaki Türkçe karaktersorunu ve görünüm düzeltmesi
// @include     http://www.astrodemo.org/forum/*
// @version     0.2
// @run-at	document-start
// ==/UserScript==


while(document.readyState === 'loading') 
{
  document.head.innerHTML='<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-9" />';
  document.head.innerHTML='<style type="text/css">td {font-family:Verdana;font-size:10px;color:#444}</style>'
  break;
} 
function xchgBody(){
try {
	document.body.innerHTML=document.body.innerHTML.replace(/<\/?font\ ?[^\>]+>/gi,'');
	} catch(e) {
	setTimeout(function(){xchgBody()},500);
	}
}

xchgBody();