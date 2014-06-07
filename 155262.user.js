// ==UserScript==
// @name        Kongregate Greentext
// @namespace   http://www.gaiaonline.com
// @description Adds Greentext to Kongregate chatrooms.
// @include     http://www.kongregate.com/games/*/*
// ==/UserScript==

//Important!  Keeps things running smoothly.
var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

function init(){
	//Only dealing with the ChatDialogue object
	var CDialogue = dom.ChatDialogue;

	if(CDialogue){
		CDialogue.prototype = dom.ChatDialogue.prototype;

		//Replace one function with another.  Rather messy in my opinion, but it works.
		CDialogue.prototype.displayUnsanitizedMessagePreGreentext = CDialogue.prototype.displayUnsanitizedMessage;

		CDialogue.prototype.displayUnsanitizedMessage = function(user, msg, attributes, options){
			if(!attributes) attributes = {};

			//Searches for the first instance of the right arrow bracket and makes sure it's the first character.
			//Adds a "Greentext" class if this is the case.
			if(!this._user_manager.isMuted(user.toLowerCase()) && (msg.indexOf("&gt;") == 0)) {
				var classes = attributes["class"] || "";
				classes += " greentext";
				attributes["class"] = classes;
			}

			//Recall the original function here.
			this.displayUnsanitizedMessagePreGreentext(user, msg, attributes, options);
		}

		//Greentext color
		var color = "#789922";

		//Ew stylesheets.  Thankfully most of this code was easy to rip.
		var style = document.createElement("style");
		var head = document.getElementsByTagName("head")[0];
		(head || document.body).appendChild(style);

		var sheet = null;
		for(var s = document.styleSheets.length - 1; s >= 0; --s) {
			try{
				if(document.styleSheets[s].cssRules && document.styleSheets[s].cssRules.length) {
					sheet = document.styleSheets[s];
					break;
				}
			}catch(e){}
		}

		if(!sheet) {return;}

		//Gives all "Greentext" class objects green text.  Simple enough.
		sheet.insertRule('#kong_game_ui .chat_message_window .greentext.even { color: '+color+' !important; }', sheet.cssRules.length);
		sheet.insertRule('#kong_game_ui .chat_message_window .greentext { color: '+color+' !important; }', sheet.cssRules.length);
	}
}

if(window.opera){
	setTimeout(init, 1000, window);
}else if(/Chrome/i.test(navigator.appVersion) || typeof unsafeWindow === "undefined"){
	var script = document.createElement("script");
	var source = init.toString();
	if(source[source.length - 1] == ";"){
		source = source.substring(0, source.length - 1);
	}

	script.type = "text/javascript";
	script.textContent = "//<![CDATA[\n" +
	                   "(" + source + ")(window);\n" +
	                   "//]]>";

	setTimeout(function(){document.body.appendChild(script)}, 1000);
}else{
	setTimeout(function(){init(unsafeWindow);}, 1000);
}

//-END-