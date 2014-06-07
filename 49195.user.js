// ==UserScript==
// @name           Kongregate Chat Full Profile Linker
// @namespace      tag://kongregate
// @description    Opens the full profile for a user if you right click on their name in the chat window. Thanks to Ventero for help on getting FF compatibility working again.
// @include        http://www.kongregate.com/games/*
// @author         MrSpontaneous
// @version        1.2
// @date           01/05/2010
// ==/UserScript==
// You cannot modify or redistribute this script without permission.

// Updated 03/22/2011 - added support for Firefox 4
// Updated 01/05/2010 - added support for the new version of Ventero's framework.

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);


function init_fullprofile(){
	CDialogue = dom.ChatDialogue;
	if (CDialogue){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		CDialogue.prototype.base_initialize = CDialogue.prototype.initialize;
		CDialogue.prototype.initialize = function(parent_node, onInputFunction, holodeck, user_manager) {
			this.base_initialize(parent_node, onInputFunction, holodeck, user_manager);
			var mwn = this._message_window_node.wrappedJSObject || this._message_window_node;
			mwn.observe('contextmenu',
				function(event) {
					if (event.target) { 
						var username = event.target.getAttribute('username');
						if(username){
							event.preventDefault();
							window.open('http://www.kongregate.com/accounts/'+username,'_blank');
						}
					}
				}
			);
		};
	}
}

function check(){
	var injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript){
		dom.injectScript(init_fullprofile, 1000);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" + 
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}


setTimeout(check, 0);