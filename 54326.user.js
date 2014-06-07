// ==UserScript==
// @name           Modcaller (Opera and Chrome Edition)
// @author         MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous)
// @namespace      http://www.kongregate.com
// @description    Adds a modcall link to the chat on Kongregate pages.  A script by MrSpontaneous with some help from Ventero.
// @match        http://www.kongregate.com/games/*
// @include        http://www.kongregate.com/games/*
// ==/UserScript==
// You cannot modify or redistribute this script without permission.

function init() {
  var inject_code = new Array();
  inject_code.push('insertmodwhisper = function (mod) { if (mod[0] != "^") {this.holodeck.insertPrivateMessagePrefixFor(mod + " [MC] I need help in " + this.holodeck._chat_window._active_room._room.name + ".");} else { error = mod.split(":"); this.holodeck.activeDialogue().displayMessage(error[0].substr(1), error[1], {class:"whisper sent_whisper"}, {"non_user":true});} document.getElementById("modwhisper").parentNode.removeChild(document.getElementById("modwhisper"));};');
  inject_code.push('loadScript = function() { var newScript = document.createElement("script"); newScript.setAttribute("id","modwhisper"); newScript.src = "http://modcaller.appspot.com/modcaller.js?room="+this.holodeck._chat_window._active_room._room.id+"&time="+new Date().getTime(); document.body.appendChild(newScript);};');
  inject_code.push('whispermod = function(element) { if(element == "whispermod") { loadScript();}};');

  var script = document.createElement('script');
  script.innerHTML = inject_code.join('\n');

  document.getElementsByTagName('head')[0].appendChild(script);
}

call = document.createElement("option");
call.setAttribute("class","action");
call.setAttribute("value","whispermod");
call.innerHTML="Call a Mod";

select = document.getElementsByClassName("chat_actions_container")[0].childNodes[1];
select.setAttribute("onchange","whispermod(this.options[this.selectedIndex].value);");
select.appendChild(call);

setTimeout(init, 500);