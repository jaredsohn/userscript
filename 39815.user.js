// ==UserScript==
// @name           zerohora
// @namespace      zerohora
// @description    arrumar zero hora
// @include        http://zerohora.clicrbs.com.br/zerohora/jsp/*
// ==/UserScript==
var stylesheet = ''+
'div#superbanner {padding:8px 0;width:100%}'+
'div#superbanner div{width:728px;margin:0 auto}'+
'div#corpo{margin:0 auto}'+
'div#rodape p{margin:0 auto}'+
'div#rodape p{width:775px}'+
'div#rodape p a.gruporbs{position:inherit}'+
'div#clic-barra h1 a{position:absolute;left:0}'+
'div#clic-barra ul.regioes{position:absolute;left:133px}'+
'div#clic-barra ul.links{width:750px;float:none;margin:0 auto;padding:0 0 0 192px}'
var newstyle = document.createElement("style")
newstyle.type = "text/css"
var css = document.createTextNode(stylesheet)
newstyle.appendChild(css)
document.getElementsByTagName('body')[0].appendChild(newstyle);