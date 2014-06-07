// ==UserScript==
// @name          Odkaz z tv.sms.cz na csfd.cz
// @description   Odkazuje filmy v programu na csfd 
// @version	    1.1
// @include       http://tv.sms.cz/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

$(function(){
var a;
 
$(".porad .nazev a").each(function(index) {
	  a = $(this).attr("href");
	  if(a != undefined)
	  {
		  a=a.replace(/http:\/\/[^/]*\//,"");
		  for(i=0;i<9;i++)
				a=a.replace(/[^/]*\//,"");
      
		  a=a.replace(/[0-9]*/,"")
		  a=a.replace(/^-/,"");
		  a=a.replace(/-/g,"+");
		  a="http://www.csfd.cz/hledat/?q="+a;
		  
		  $(this).attr("href",a);
		  $(this).attr("target","_blank");
	  }
	 
});
});   