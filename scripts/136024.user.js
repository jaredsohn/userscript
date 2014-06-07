// ==UserScript==
// @name        afk Message Disabler
// @namespace   tag://kongregate
// @include     http://www.kongregate.com/games/*
// @version     1
// @description Hides messages from KongBot announcing that you are afk or back
// ==/UserScript==

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

function init_afkdisable()
{	var holodeck = dom.holodeck,
			ChatDialogue = dom.ChatDialogue;	

	if(ChatDialogue)
	{
		ChatDialogue.prototype.kongBotMessage = function(a) 
		{
			if(a != "Set status to active" && a != "Set status to away")
	    	           this.displayMessage("Kong Bot", a, {"class": "whisper received_whisper"}, {non_user:true});
		}
	}
};

function check()
{
	dom.injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript)
	{
		dom.injectScript(init_afkdisable, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion))
	{
		if(confirm("You don't have the latest version of the framework-script!\n" + 
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
};

setTimeout(check, 0);