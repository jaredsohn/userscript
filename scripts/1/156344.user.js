// ==UserScript==
// @name        Emotes
// @namespace   http://userscripts.org/scripts/show/156344
// @include     http://www.synchtube.com/r/*
// @version     1.11
// @run-at      document-start
// @updateURL   http://userscripts.org/scripts/source/156344.user.js
// @downloadURL http://userscripts.org/scripts/source/156344.user.js
// ==/UserScript==
(function(){
document.addEventListener("DOMContentLoaded", function(){
	var facecodes={
':loading:': '<img src="http://i.imgur.com/LpBOu.gif" width="53" height="54">',
':reddit:': '<img src="http://i.imgur.com/wKaFk.png" width="80" height="16">',						
':assntitties:': '<img src="http://i.imgur.com/CALcK.png" width="38" height="42">',				
':penis:': '<img src="http://i.imgur.com/VorSn.gif" width="50" height="58">',
':ahah:': '<img src="http://cs419726.userapi.com/v419726676/5ae/qbeMkW6iU1Q.jpg" width="50" height="50">',          
':feel:': '<img src="http://i.imgur.com/4lwg0.png" width="50" height="50">',
':crack:': '<img src="http://i.imgur.com/yezCps.jpg" width="50" height="50">',
':tomb:': '<img src="http://i.imgur.com/LlMTv.jpg" width="35" height="50">', 
':foreman:': '<img src="http://i.imgur.com/fBzfP.jpg" width="45" height="50">',
':kappa:': '<img src="http://i.imgur.com/1oDmq.png" width="35" height="50">',
':white:' : '<span style="color:white">', 
':black:' : '<span style="color:black">',
':tomato:' : '<span style="color:tomato">',
':yellow:' : '<span style="color:yellow">',
':blue:' : '<span style="color:blue">',
':darkblue:' : '<span style="color:darkblue">',
':cyan:' : '<span style="color:cyan">',
':red:' : '<span style="color:red">',
':green:' : '<span style="color:green">',
':darkgreen:' : '<span style="color:darkgreen">',
':violet:' : '<span style="color:violet">',
':purple:' : '<span style="color:purple">',
':orange:' : '<span style="color:orange">',
':blueviolet:' : '<span style="color:blueviolet">',
':brown:' : '<span style="color:brown">',
':deeppink:' : '<span style="color:deeppink">',
':aqua:' : '<span style="color:aqua">',
':indigo:' : '<span style="color:indigo">',
':orange:' : '<span style="color:orange">',
':pink:' : '<span style="color:pink">',
':chocolate:' : '<span style="color:chocolate">',
':yellowgreen:' : '<span style="color:yellowgreen">',
':steelblue:' : '<span style="color:steelblue">',
':silver:' : '<span style="color:silver">',
':tan:' : '<span style="color:tan">',
':royalblue:' : '<span style="color:royalblue">'
}
		var id= document.getElementById("chat_list");
		var chatstring;
		id.addEventListener("DOMNodeInserted", function(event){
			var element = event.target;
			if(element.innerHTML){
				chatstring=element.innerHTML;
				for(var emotes in facecodes){
					var regexps=new RegExp(emotes,'g');
					chatstring = chatstring.replace(regexps,facecodes[emotes]);
				}
				element.innerHTML=chatstring;
			}
		});
}, false);
})();