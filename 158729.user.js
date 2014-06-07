// ==UserScript==
// @name           FitocracyGreentext
// @namespace      http://userscripts.org/users/505293, https://github.com/JoeyMatthews
// @include        www.fitocracy.com
// @include        www.fitocracy.com/home
// @match          https://www.fitocracy.com/*
// ==/UserScript==

if(!this._user_manager.isMuted(user.toLowerCase()) && (msg.indexOf("&gt;") == 0)) {
				var classes = attributes["class"] || "";
				classes += " greentext";
				attributes["class"] = classes;
			}
this.displayUnsanitizedMessagePreGreentext(user, msg, attributes, options);

var color = "#789922";

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

			sheet.insertRule('.div#status_18172202.stream-status { color: '+color+' !important; }', sheet.cssRules.length);
		sheet.insertRule('.div#status_18172202.stream-status { color: '+color+' !important; }', sheet.cssRules.length);
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
;


