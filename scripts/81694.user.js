// ==UserScript==
// @name           Canned Responses
// @namespace      goallineblitz.com
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
        noButton.innerHTML = '<b>SPAM</b>';
        noButton.addEventListener("click",sendReply,false);
        
        location.appendChild(noButton);        
    }
}

function sendReply(){
    var textbox = document.getElementById('edit_icons').nextSibling.nextSibling;
    textbox.value = 'I SPAM YOU' + textbox.value;
    
    document.getElementsByTagName('form')[0].submit()
}
