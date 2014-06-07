// ==UserScript==
// @name           Otherinbox Mailbox toggle
// @namespace      http://userscripts.org/users/73299
// @description    Hide all mailboxes without unread items
// @include        https://my.otherinbox.com/box
// ==/UserScript==

var state = "hide";

function hide_read(){
	var mailboxes, current, space=0, 	
	mailboxes = document.getElementById("mailboxes_source_list").children	
	document.getElementById("mailboxes_source_list").style.height = document.getElementById("folder_source_list").style.height
		for (var i = (mailboxes.length-1); i > 0; i--){
			current = mailboxes[i];
			if (current.children.length == 1 ){ current.style.display = "none"; }
						else {
								current.style.top=+space+"px";
								space += 29
						}
		}
}


function restore_all(){
	var mailboxes, current, space=0;
	mailboxes = document.getElementById("mailboxes_source_list").children;
	for (var i = (mailboxes.length-1); i > 0; i--){
		current = mailboxes[i];
		current.style.display = "block";		
		current.style.top=+space+"px";
		space += 29
		// break;
	}
}


function run_toggler() {	
	if (state == "hide") { hide_read();   }
	else								 { restore_all(); }	
	setTimeout(run_toggler,1000);
}

function button_toggle(){
	if 	 (state == "hide") { state = "restore" }
	else { state = "hide"}	
}

function initialize_toggler(){
	setTimeout(run_toggler, 5000)
	document.getElementById("layoutbar").innerHTML = document.getElementById("layoutbar").innerHTML +
	"<div class='compose_button_wrap' style='float: right; margin-top: 5px; margin-right: 150px;'>"+
	"    <a class='sc-button-view button regular normal compose_button' id='toggle_button' title='Toggle maiboxes'>"+
	"		<span class='button-inner'><span class='label'>Toggle maiboxes</span></span>"+
	"	</a>" +
	"</div>"

	document.getElementById("toggle_button").addEventListener("click", button_toggle, true)
}

initialize_toggler()