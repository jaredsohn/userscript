// ==UserScript== 
// @name Disable HTML5 Voice Search 
// @description	 Prevent use of HTML5 Voice Search on all websites, including Google
// @version		1.0.1
// @date		2011-08-17
// @source		http://userscripts.org/scripts/edit_src/110566
// @identifier		http://userscripts.org/scripts/edit_src/110566.user.js
// @author		Michael R. Tomkins
// @namespace		http://userscripts.org/users/388145
// @include *
// ==/UserScript== 

var inputtags = document.getElementsByTagName("input");
for (i = 0; i < inputtags.length; i++) {
        var node = inputtags[i];
        node.removeAttribute("x-webkit-grammar");
        node.removeAttribute("x-webkit-speech");
	node.removeAttribute("onwebkitspeechchange");
}