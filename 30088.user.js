// ==UserScript==
// @name           Facebook MobWars Shit-kicker
// @namespace      http://userscripts.org/users/59478
// @description    Alpha 1 - Mobwars scripting thingy
// @source         http://userscripts.org/scripts/show/30088
// @identifier     http://userscripts.org/scripts/source/30088.user.js
// @version        0.1
// @date           15/07/2008
// @creator        Dave A. Logan
// @include        http://apps.facebook.com/mobwars/*
// ==/UserScript==

var Menu = new Object();

Menu.init = function() {
  var menuCode = new Array();
  menuCode.push('<div class="scriptStatusHeader">-Script status-</div>');
  menuCode.push('<div class="scriptStatusContent">Status:<BR /><span id="scriptstatus">Resting...</span><br /><span id="scripttimer"></span></div>');

  var menu = document.createElement('div');
  menu.id = 'ScriptStatus';
  menu.innerHTML = menuCode.join('');
  menuCode.length = 0;

  menuCode.push("#ScriptStatus { position:fixed; bottom:27px; left: 2px; border:2px solid #6D84B4; background:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold; width: 200px; height: 100px;}");
  menuCode.push("#ScriptStatus div.scriptStatusHeader { text-align:center; background: #6D84B4; color: FFFFFF; }");
  menuCode.push("#ScriptStatus div.scriptStatusContent { border-width:1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid; height:75px;}");

  var style = document.createElement('style');
  style.type = 'text/css';
  style.intterHTML = menmuCode.join('');
  
  try { document.getElementsByTagName('head')[0].appendChild(style); }
  catch(e) {}
  document.body.insertBefore(menu, document.body.lastChild);
}

Menu.init();

var textareas = document.getElementsByTagName('input');
if(textareas.length){
  alert("Found inputs");
} else {
  alert("No inputs found!");
}