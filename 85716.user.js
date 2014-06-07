// ==UserScript==
// @name           Autoscribe
// @namespace      einzelkind
// @description    Enables Google Scribe (an automatic text completion service) to all entry fields on all visited webpages. Toggle on and off with Ctrl + J, and toggle between "Always" and "On demand" with Ctrl + Shift + J. More info at http://googlescribe.appspot.com/
// @author         einzelkind-AT-gmail-DOT-com
// @include        http://*
// @version        1.01
// ==/UserScript==

window.location.href='javascript:gsblet=window.gsblet||{};if(!gsblet.toggle)(function(){var t=gsblet,d=document,o=d.body,c="createElement",a="appendChild",p=window.location.protocol;t["b"]="googlescribe.appspot.com";t["l"]="en";t.toggle=function(o){t["o"]=o};x=o[a](d[c]("script"));x.id="gsbletloader";x.src=(p=="https:"?"https:":"http:")+"//"+t["b"]+"/jsres/rgsblet.js?v="+(new Date().getTime());})();gsblet.toggle(false)'
