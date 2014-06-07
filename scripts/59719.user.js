// ==UserScript==
// @name           hoopCHINA keyboard navigation
// @description    使用快捷键快速访问 hoopCHINA.com 的常用栏目和版块 
// @namespace      213 via http://userscripts.org/scripts/show/59663
// @include        http://*.hoopchina.com/*
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         213
// @version        0.1
/* @reason
   @end*/
// ==/UserScript==

function OnKeyUp(e)
{
  key_map = {"W" : "http://www.hoopchina.com","N" : "http://news.hoopchina.com","G" : "http://www.hoopchina.com/gamespace","P" : "http://my.hoopchina.com/public.php","H" : "http://my.hoopchina.com","M" : "http://my.hoopchina.com/me","V" : "http://v.hoopchina.com","B" : "http://bbs.hoopchina.com","R" : "http://bbs.hoopchina.com/rockets","J" : "http://bbs.hoopchina.com/bxj","L" : "http://bbs.hoopchina.com/lakers","C" : "http://bbs.hoopchina.com/celtics","S" : "http://bbs.hoopchina.com/spurs"}
  if (String.toUpperCase(String.fromCharCode(e.keyCode)) in key_map && 
      String.trim(e.target.className).length == 0 &&
      (typeof e.target.type == "undefined" || e.target.type != "text"))
  {
    window.location.replace(key_map[String.toUpperCase(String.fromCharCode(e.keyCode))])
  }
}

window.addEventListener("keyup",function(event) { OnKeyUp(event); },false)