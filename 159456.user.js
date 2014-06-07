// ==UserScript==
// @name        Synchtube Emotes
// @namespace   http://userscripts.org/scripts/show/159456
// @include     http://www.synchtube.com/r/LoungeHF
// @version     1.11
// @run-at      document-start
// @updateURL   http://userscripts.org/scripts/source/159456.user.js
// @downloadURL http://userscripts.org/scripts/source/159456.user.js
// ==/UserScript==

(function(){
document.addEventListener("DOMContentLoaded", function(){
	var facecodes={':assntitties:': '<img src="http://i.imgur.com/CALcK.png" width="38" height="42">',
						
':mysides:': '<img src="http://i.imgur.com/vETtK.png" width="39" height="58">',				

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