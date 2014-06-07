// ==UserScript==
// @name        tivibu_min
// @version     1.2        
// @namespace   http://tolga.kaprol.net/macosta-tivibu-kullanmak/
// @description Minimizes Tivibu webclients screen
// @include        http://webtvweb.ttnet.com.tr/WebClient/WebTVClient.aspx*
// @include        http://95.0.28.124/WebClient/WebTVClient.aspx*
// @author      Tolga Kaprol
// ==/UserScript==




( function() {
// original reloadSilverlight function reloads page on error, we had just disabled original one
window.reloadSilverlight = function(){}

//======== Useful Sub-routines =====
$=function(name) { return document.getElementById(name); }
GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
  var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
  var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
  if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
  return sel;
}

GM_addGlobalStyle(''
//--- Add CSS
+' #silverlightControlHost {      margin: auto !important;       padding: 0px !important;    }'
+' body {background: black !important;position: absolute;}'
);

} )();