// ==UserScript==

// @name           OrkutFormatter
// @namespace      http://userscripts.org/users/56469/

// @description    A formating tool for Orkut

// @include        http://www.orkut.com/CommMsgPost.aspx*
//*@include        http://www.orkut.com/CommMsgs.aspx?cmm=64172
//*@include        http://www.orkut.com/CommTopics.aspx?cmm=64172
// ==/UserScript==


function formatKey(event) {
	key = event.which || event.charCode || event.keyCode;
	key = String.fromCharCode(key).toLowerCase();
	var replyMsg = document.getElementById("messageBody");
	st = replyMsg.selectionStart;
	en = replyMsg.selectionEnd;
	txt = replyMsg.value;
	if(event.ctrlKey && (key == 'b' || key == 'i'|| key == 's'|| key == 'r')
		         && st!=en) {
		switch (key) {
			case 'b':
				tag = "b";
				break;
			case 'i':
				tag = "i";
				break;
			case 'r':
				tag = "red";
				break;
		}
		if(key== 's')
			replyMsg.value = txt.substr(0,st) 
					+ "[b][red]SPOILER Begins[/red][/b][silver]"
					+ txt.substr(st,en-st) 
					+ "[/silver][b][red]SPOILER Ends[/red][/b]"
					+ txt.substr(en);
		else
			replyMsg.value = txt.substr(0,st) + "[" + tag + "]" 
					+ txt.substr(st,en-st) + "[/" + tag + "]"
					+ txt.substr(en);
		event.preventDefault();
		event.stopPropogation();
	}
} 


var replyMsg = document.getElementById("messageBody");
replyMsg.addEventListener("keypress", formatKey, true);