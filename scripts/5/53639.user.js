// ==UserScript==
// @name           Aragorn.cz Favorites and PMs count notifier
// @namespace      aragorn.cz
// @description    Shows unread favs and pms in the title bar
// @include        http://*.aragorn.cz/*
// ==/UserScript==
// Created by Jakub Buriánek (C) 2009

  // Creating framework
  var ajax = new XMLHttpRequest();
  var xmlResponse = String();
  var pms = 0, favs = 0;
  ajax.onreadystatechange = function(r){ 
    if (ajax.readyState == 4 || ajax.readyState == 'complete')
      {
         xmlResponse = ajax.responseText;
         
		 favs = xmlResponse.substring(xmlResponse.indexOf('(', xmlResponse.indexOf("<span class='c-ub'>")) + 1, xmlResponse.indexOf(')', xmlResponse.indexOf("<span class='c-ub'>")));
         favs = (favs == 'DrD' ? 0 : favs);
		 
		 pms = xmlResponse.substring(xmlResponse.indexOf('(', xmlResponse.indexOf("id='theprofilepostlink'")) + 1, xmlResponse.indexOf(')', xmlResponse.indexOf("id='theprofilepostlink'")));
         pms = (pms == '' ? 0 : pms);
				  
         var mod = '[' + favs + '/' + pms + '] ';
		 var p = document.title.indexOf(']');
		 if(p != -1)
		   document.title = mod + document.title.substring(p + 2, document.title.length);
		 else
           document.title = mod + document.title;
      } 
  };
ajax.open('GET', 'http://www.aragorn.cz/chat/', true);
 
setInterval(function(){ ajax.send(); }, 30000);

ajax.send();