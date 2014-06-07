// ==UserScript==
// @name           Tell-command
// @namespace      tag://kongregate
// @description    Adds a /t-command for Kongregate's chat which automatically replaces with "/w" when pressing space. This is to allow for an easy transition betwen Kong chat and most MMOs
// @include        http://www.kongregate.com/games/*
// @author         Aru (modifying Ventero's /r command script)
// @version        1.1
// @date           01/05/2010
// ==/UserScript==
// Licensed under Creative Commons by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/

// Modified by MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous) 10/12/09
// Updated by MrSpontaneous for new framework support 1/5/2010
// /r-command script written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/01/09

var dom;
try{
	if(unsafeWindow && unsafeWindow.holodeck){
		dom = unsafeWindow;
	} else {
		dom = this;
	}
}catch(e){
	dom = this;
}

function init_tellcommand(){
	var CDialogue = dom.ChatDialogue;

	if (CDialogue){
	
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;

		if(!CDialogue.prototype.oldKeyPressTell){
			CDialogue.prototype.oldKeyPressTell = CDialogue.prototype.onKeyPress;

			CDialogue.prototype.onKeyPress = function (a) { 
				if ((z=this._input_node.getValue().match(/^\/[tT](.*)/)) && a.which == 32) {
					var x=z[1]||""; 
					this.setInput("/w "); 
					a.stop(); 
				}; 
			
				this.oldKeyPressTell(a); 
			}
		}
	}
};

function check(){
	if(!dom.injectScript && !dom._promptedFramework){
			if(confirm("You don't have the latest version of the framework-script!\n" + 
			      "Please install it, otherwise the scripts won't work.\n" +
			      "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	} else {
		dom.injectScript(init_tellcommand, 100);
	}
}

setTimeout(check, 0);
