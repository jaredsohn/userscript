// ==UserScript==
// @name           BRPG Guild Click Announcement
// @namespace      xelab
// @include        http://www.boringrpg.com/guild
// ==/UserScript==

function bClicked() {
	var box = document.getElementById("chat-textbox");
	box.value = "i clicked, next person up!";
	document.getElementById("chat-button").click();
}
            
function addListeners() {
    var but = document.getElementById("button");
    but.addEventListener('click', bClicked, false);
}
            
window.addEventListener('load', addListeners, false);


