// ==UserScript==
// @name           Nintendo8.com Download Link
// @namespace      http://www.userscripts.org
// @description    Creates a download link to the ROM file at Nintendo8.com
// @include        http://nintendo8.com/game/*
// @include        http://www.nintendo8.com/game/*
// ==/UserScript==

romlink = document.getElementsByTagName("param");
for(i=0;i<romlink.length;i++)
  {
    if(romlink[i].getAttribute("name")=="rom")
       {  var url = romlink[i].getAttribute("value"); }
  }

var link = document.createElement('a');
var p = document.createElement("p");
link.href = url;
link.appendChild( document.createTextNode('Download ROM') );
p.style.textAlign = "center";
p.appendChild(link);

document.getElementById('content').appendChild(p);

