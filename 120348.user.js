// ==UserScript==
// @name           MuteList
// @author         GrateGuy (http://www.kongregate.com/accounts/GrateGuy)
// @namespace      http://www.kongregate.com
// @description    Adds a Mute List link to the chat on Kongregate pages.
// @include        http://www.kongregate.com/games/*
// @version        3.0
// ==/UserScript==
// Special thanks to MrSpontaneous for his Modcaller code to help me build this.
// Original Modcaller Script: http://userscripts.org/scripts/show/53712

var empty_list = "Nobody muted yet.";
var pro_link = "http://www.kongregate.com/accounts/"

function init() {
	var mutecode = new Array();
	mutecode.push('GetMuteList = function() {var s="";for (var p in holodeck._chat_window._mutings) {s+=" "+p;} if (s=="") {s="' + empty_list + '";} return s;}');
	mutecode.push('ShowMuteList = function() {var s=GetMuteList();holodeck._active_dialogue.displayUnsanitizedMessage("Mute List", LinkMuteList(), {"class":"whisper received_whisper"}, {"non_user":true});}');
	mutecode.push('LinkMuteList = function() {var m=GetMuteList();if(m=="' + empty_list + '"){return m;}else{var names=m.split(" ");var n=new Array();for(var i=names.length;--i;){n[i]="<a href=\\"' + pro_link + '" + names[i] + "\\">"+names[i]+"</a>";};return n.join(" ");};}');
	mutecode.push('MuteButton = function() { ShowMuteList(); };');

	var script = document.createElement('script');
	script.innerHTML = mutecode.join('\n');

	document.getElementsByTagName('head')[0].appendChild(script);

	mute_inject = "<li class=\"action\" onclick=\"MuteButton();\">Mute List</li>";
	chat_script = document.getElementById("chat_actions_dropdown_template").innerHTML;
	script_array = chat_script.split('\n');
	script_array.splice(script_array.length-2,0,mute_inject);
	document.getElementById("chat_actions_dropdown_template").innerHTML = script_array.join('\n');
}

setTimeout(init, 500);