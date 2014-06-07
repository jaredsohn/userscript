// ==UserScript==
// @name           OneFontForAll
// @namespace      OneFont
// @include        *://*
// ==/UserScript==


document.title += ' ::JS:';
try{

  GM_addStyle("*,p,td,a,font,body,ul,li,em,b,strong,div,table,tr,th { font-family: '微软雅黑',Microsoft YaHei !important; line-height: 160% !important}");

}catch(e){ }

document.title += ':OK:: ';