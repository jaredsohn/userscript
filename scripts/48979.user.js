// ==UserScript==
// @name           Character-limit
// @namespace      tag://kongregate
// @description    Limits your textinput to 250 characters
// @include        http://www.kongregate.com/games/*
// @version        1.5.2
// @date           12.11.10
// @author         Ventero
// @require        http://kong.ventero.de/updates/48979.js
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/12/09

var dom = (typeof unsafeWindow === "undefined" ? window : unsafeWindow);

function init_characterLimitVent(){

	var CDialogue = dom.ChatDialogue;

	if(CDialogue){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;

		if(!CDialogue.prototype.oldKeyPressLimit){
			CDialogue.prototype.oldKeyPressLimit = CDialogue.prototype.onKeyPress;
			CDialogue.prototype.onKeyPress = function (a) {
				var node = (this._input_node.wrappedJSObject || this._input_node);
				this.oldKeyPressLimit(a);
				if (node.getValue().length > 249) {
					z = node.getValue();
					var y = "";
					if (n=z.match(/^(\/\S+\s+\S*\s*)(.*)/)){
						y=n[2];
						if (y.length>249){
							node.setValue(n[1]+y.substr(0, 249))
						}
					}else{
						node.setValue(node.getValue().substr(0, 249))
					}
				}
			}
		}
	};
};

function check(){
	dom.injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript){
		dom.injectScript(init_characterLimitVent, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" +
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0);
