// ==UserScript==
// @name           add reverse talkbacks button in mako.co.il
// @namespace      http://shmulik.zekar.co.cc/mako
// @include        http://www.mako.co.il/*/Article*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs  [you can ask change the licence for any reason by mail]
// @description    add a button to reverse the talkbacks to normal order
// ==/UserScript==

if (typeof unsafeWindow != "undefined")
  unsafeWindow.$$("p.talkback_top_links")[0].innerHTML+="<a href=\"javascript:(function(){var home = $$('#talkbacks_div div.mako_main_portlet_container')[0];var childs = home.childNodes;for(var i=0;i<childs.length;i++)home.insertBefore(childs[childs.length-1],childs[i]);})();\" style=\"margin-left: 40%;float:right;\">הפוך סדר</a>";
else
  $$("p.talkback_top_links")[0].innerHTML+="<a href=\"javascript:(function(){var home = $$('#talkbacks_div div.mako_main_portlet_container')[0];var childs = home.childNodes;for(var i=0;i<childs.length;i++)home.insertBefore(childs[childs.length-1],childs[i]);})();\" style=\"margin-left: 40%;float:right;\">הפוך סדר</a>";