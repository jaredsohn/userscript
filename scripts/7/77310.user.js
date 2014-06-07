// ==UserScript==
// @name           D.A.D.D.Y.
// @namespace      goallineblitz.com
// @description    Lets the user click one button to have a canned message sent as a reply
// @include        http://goallineblitz.com/game/new_message.pl?to=*
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
        noButton.innerHTML = '<b>DADDY</b>';
        noButton.addEventListener("click",sendReply,false);
        
        location.appendChild(noButton);        
    }
}

function sendReply(){
    var textbox = document.getElementById('edit_icons').nextSibling.nextSibling;
    textbox.value = 'Would you be interested in signing your dot to D.A.D.D.Y.?.\n \n -Josh\n owner of D.A.D.D.Y. \n' + textbox.value;
    
}