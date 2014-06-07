// ==UserScript==
// @name           Canned Responses
// @namespace      goallineblitz.com
// @description    Lets the user click one button to have a canned message sent as a reply
// @copyright      2010, garrettFoster
// @version        2010.05.20
// @include        http://goallineblitz.com/game/new_message.pl?*
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	10
);

function main(){
    var location = document.getElementById('edit_icons');
    if(location){
        var noButton = document.createElement('a');
        noButton.setAttribute('class', 'edit_icon');
        noButton.setAttribute('href', 'javascript:;');
        noButton.innerHTML = '<b>NO!</b>';
        noButton.addEventListener("click",sendReply,false);
        
        location.appendChild(noButton);        
    }
}

function sendReply(){
    var textbox = document.getElementById('edit_icons').nextSibling.nextSibling;
    textbox.value = 'Not Interested.\n[i]This is an automated message.[/i]\n' + textbox.value;
    
    document.getElementsByTagName('form')[0].submit()
}
