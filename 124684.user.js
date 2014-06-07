// ==UserScript==
// @name           Schulterglatze Spenden Beschleuniger
// @namespace      http://mes-lotzen.tagesnews.ch/
// @version        1.0
// @description    Spenden Beschleuniger für usarmy.schulterglatze.de, wbk1.schulterglatze.de, www.schulterglatze.de und www.slick-sleeve.com
// @include        http://*.tagesnews.ch/*
// @include        http://*.schulterglatze.de/donate/*
// @include        http://www.slick-sleeve.com/donate/*
// @copyright      2012, by muler
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}
contentEval( function() { beschleuniger = true} );
GM_addStyle('.usrscript_div { display:none !important }');

var script = document.getElementById("content").getElementsByTagName("script")[0].firstChild.data;
var reg_ex = /setSpende\('"\+ (\d{1,6}) \+"', '"\+ (\d{1,6}) \+"', '"\+ (\d{10,}) \+"', '([0-9a-f]{40})'\)/;
var params = reg_ex.exec(script);
window.setTimeout("setSpende('"+ params[1] +"', '"+ params[2] +"', '"+ params[3] +"', '" + params[4] + "')", 0);
window.setTimeout(function() { document.getElementById("donationResponse").removeAttribute("id") }, 1400);