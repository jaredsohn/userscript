// ==UserScript==
// @name           JustDial Extract Data from Search Results
// @description    Extract complete business details for ALL search results (including Business name, Telephone number, Address, JustDial URL for the business, and number of Ratings).
// @namespace      net.rajeshsoni
// @include        http*://*justdial.com/*
// ==/UserScript==

// Rajesh Soni (rajeshgsoni@gmail.com)
// http://rajeshsoni.net


var script = document.createElement('script');

script.innerHTML='function setup_extract_details(){ if($ && $(".jsr").length>0){ extract_details(); } }   function extract_details() {     $(".jsr a[href*=\'tel:\']").each(function () {         console.log(trim_phone($(this).attr("href")) + "|" + $(this).parent().parent().parent().parent().parent().find(".jcn a").text() + "|" + trim_address($(this).parent().parent().find("p:first").text().trim()) + "|" + $(this).parent().parent().parent().parent().parent().find(".jcn a").attr("href") + "|" + trim_rating($(this).parent().parent().parent().parent().parent().find(".jrat .jrt").text()));     }); }   function trim_phone(p) {     return p.replace(\'tel:\', \'\').trim(); }   function trim_address(a) {     a2 = a;     a2 = a2.replace(\'View Map\', \'\');     a2 = a2.trim();     a2 = a2.replace("|", "");     a2 = a2.trim();     return a2; }   function trim_rating(r) {     a2 = r;     a2 = a2.trim();     a2 = a2.replace("|", "");     a2 = a2.trim();     return a2; }   if( document.getElementsByClassName(\'jsr\') && document.getElementsByClassName(\'jsr\') [0] ) { 	b=document.createElement("a"); 	b.innerHTML=\'<h2>Extract All Details</h2>\'; 	b.width=\'100%\'; 	b.style.width=\'100%\'; 	b.href=\'javascript:extract_details();\'; 	b.id=\'btn_extract_details\'; 	b2=document.getElementsByClassName(\'jrs\')[0].appendChild(b);  	/* 	$(\'#btn_extract_details\').on(\'click\', function(){ extract_details()}); 	*/  }  setTimeout("extract_details()", 10000); ';

document.getElementsByTagName('head')[0].appendChild(script);
