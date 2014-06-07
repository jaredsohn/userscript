// ==UserScript==
// @name           OpenSubtitles - procura para o português do brasil
// @namespace      http://userscripts.org/users/ym
// @description    automaticamente seleciona o pt-Br automaticamente como padrão das procuras
// @include        http://www.opensubtitles.org/*
// @date           2009-01-07
// @version        1.0
// @GM_version     0.6.7
// ==/UserScript==

document.getElementById('SubLanguageID').value = "pob";


fullurl = window.location.href.split("/"); 
var loc = window.location.href.replace("sublanguageid-all","sublanguageid-pob");
for(i=0;i<=fullurl.length;i++)
{
  if(fullurl[i]=="sublanguageid-all")
  {
      window.location.href = loc;
  }
}
