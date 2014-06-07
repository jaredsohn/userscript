// ==UserScript==
// @name           Auto Page Refresher v1.1
// @namespace      http://www.lessel.us/
// @description    Automatically refreshes the page at a given interval
// @include        http://*
// @include        https://*
// ==/UserScript==
//By: Mark Lessel
//Email: mark@lessel.us
//

var div = document.createElement("div");

div.innerHTML = '<div id="ref1" style="position:absolute; z-index:100; left: 100%; top: 0px;"><div id="ref2" style="position:absolute; width:32px; height:32px; z-index:100; left: -32px; top: 25px;"><img src="http://www.iconarchive.com/icons/everaldo/kids-icons/reload-32x32.png" onClick="returnObjById('+"'timediv'"+').style.visibility = ' + "'visible'" + '; SetCookie(document.location,0); returnObjById('+"'refreshsecs'"+').value=0;" /><div id="timediv" style="visibility: hidden"><input id="refreshsecs" type="text" value="' + GetCookie(document.location) + '" style="width: 32px" onChange="SetCookie(document.location,returnObjById('+"'refreshsecs'"+').value);window.location.reload(true);"></div></div></div><script language="JavaScript">function GetCookie (name) { var arg = name + "="; var alen = arg.length; var clen = document.cookie.length; var i = 0; while (i < clen) { var j = i + alen; if (document.cookie.substring(i, j) == arg) return getCookieVal (j); i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break; } return 0; } function SetCookie (name, value) { var argv = SetCookie.arguments; var argc = SetCookie.arguments.length; var expires = (argc > 2) ? argv[2] : null; var path = (argc > 3) ? argv[3] : null; var domain = (argc > 4) ? argv[4] : null; var secure = (argc > 5) ? argv[5] : false; document.cookie = name + "=" + escape (value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : ""); } function getCookieVal(offset) {var endstr = document.cookie.indexOf (";", offset); if (endstr == -1) endstr = document.cookie.length; return unescape(document.cookie.substring(offset, endstr)); } function returnObjById( id ) { if (document.getElementById) var returnVar = document.getElementById(id); else if (document.all) var returnVar = document.all[id]; else if (document.layers) var returnVar = document.layers[id]; return returnVar; }</script>';
document.body.insertBefore(div, document.body.firstChild);

if(GetCookie(document.location)!="0") {
	window.setTimeout(function() { window.location.reload(true) }, 1000*parseInt(GetCookie(document.location)));
}

function GetCookie (name) 
{
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while (i < clen) 
      {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg)
         return getCookieVal (j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) 
         break; 
      }
   return 0;
}

function SetCookie (name, value) {  
	var argv = SetCookie.arguments;  
	var argc = SetCookie.arguments.length;  
	var expires = (argc > 2) ? argv[2] : null;  
	var path = (argc > 3) ? argv[3] : null;  
	var domain = (argc > 4) ? argv[4] : null;  
	var secure = (argc > 5) ? argv[5] : false;  
	document.cookie = name + "=" + escape (value) + 
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
	((path == null) ? "" : ("; path=" + path)) +  
	((domain == null) ? "" : ("; domain=" + domain)) +    
	((secure == true) ? "; secure" : "");
}

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}
