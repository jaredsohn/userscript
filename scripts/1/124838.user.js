// ==UserScript==
// @name           Blogger NCR
// @namespace      http://technoslab.blogspot.com/2012/02/blogger-ncr-userscript.html
// @description    Always switch to NCR version of blogspot blogs
// @include        http://*.blogspot.*/*
// ==/UserScript==

var host = document.location.hostname;
var parts = host.split(/\./);
if(parts.length==3)
{
  if(parts[2].toLowerCase()!='com')
  {
    var url = 'http://'+parts[0]+'.'+parts[1]+'.com/ncr'+document.location.pathname;
    document.location = url;
  }
}