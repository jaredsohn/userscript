// ==UserScript==
// @name           Syberian Ikariam [WEB BASED]
// @autor          Angelo Verona alias Anilo, _Assassin
// @email          anilo4ever@gmail.com
// @namespace      Ikariam
// @description    Winter graphic pack for Ikariam v.0.2.4, Created/redrawed by Angelo Verona alias Anilo with _Assasin (Script is not compatibile with Animated Ikariam/Ikariam Animator)[Syberian Ikariam v.0.6]
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==
 
//
var current_version="0.8.1";var url="http://ikariam.bgt-angels.sk/scripts/info_syberian.xml";GM_xmlhttpRequest({method:"GET",url:url,headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},onload:function(details){var str=details.responseText;var parser=new DOMParser();var dom=parser.parseFromString(str,'text/xml');version_obj=dom.documentElement.getElementsByTagName('version');var upversion=new Array();for(var i=0;i<version_obj.length;i++){upversion[i]=version_obj[i].firstChild.nodeValue}url_obj=dom.documentElement.getElementsByTagName('link');var url=new Array();for(var i=0;i<url_obj.length;i++){url[i]=url_obj[i].firstChild.nodeValue}if(upversion==current_version){version="Nolee "+current_version;change="update";alt="Nolee2"}else{version="(Nolee3 "+upversion+"!";change="newupdate";alt="Nolee4 "+current_version+", Nolee5 "+upversion+"."}name=document.getElementById('GF_toolbar').childNodes[3];var AnimUpdate=document.createElement('li');AnimUpdate.setAttribute('class',change);AnimUpdate.innerHTML="<a href=\""+url+"\" title=\""+alt+"\" target=\"_blank\"><span class=\"textLabel\">"+version+"</span></a>";name.appendChild(AnimUpdate)}});

