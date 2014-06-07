// ==UserScript==
// @name           stream reload button
// @description    Adds a reload button to the stream
// @include        http://*bronystate.net/theatre/twilight/
// @include        http://*bronystate.net/theatre/dash/
// @include        http://*bronystate.net/theatre/pinkie/
// @include        http://*bronystate.net/theatre/fluttershy/
// @include        http://*bronystate.net/theatre/rarity/
// @include        http://*bronystate.net/theatre/applejack/
// ==/UserScript==

//version number
//REMEMBER: incriment when updating
var version = 5;

var setupButton = function() {
	//turns out this doesnt follow closure, that was stupid of me
	//INCRIMENT HERE TO!
	var version = 5;
	
	//Manualy set the div id's, holding object references breaks
	//when you edit html from firebux
	//check first incase the page adds them
	try {
		if(!document.getElementById('embed_div'))
			document.getElementById("wrap_body").childNodes[5].id = 'embed_div';
		
		if(!document.getElementById('stream_div'))
			document.getElementById("embed_div").childNodes[1].id = 'stream_div';
		
		if(!document.getElementById('chat_div'))
			document.getElementById("embed_div").childNodes[3].id = 'chat_div';
		
		if(!document.getElementById('chat_iframe'))
			document.getElementById("chat_div").childNodes[1].id = 'chat_iframe';
	} catch(err) {
		alert("Failed to find the div's (Error: " + err + "\n" +
				"Check http://userscripts.org/scripts/show/119609 for a new version");
		//below this line WILL break, bail out
		return;
	}
	
	var get = function(id) {
		var elm = document.getElementById(id);
		if(!elm) {
			alert("ERROR: Cannot find " + id);
			throw("Error: " + id + " not found");
		}
		return elm;
	}

	var reload_stream = (function() {
		var loading = false;
		
		return function() {
			var elm = get('stream_div');

			if(loading) return; //guard agains the manyclick
			
			req = new XMLHttpRequest();

			req.onreadystatechange = function() {
				if(req.readyState == 4) {
					var realDocument = document;
					var document = new Object();
					var html = "";
					
					//google for prototype, its usefull
					//document.prototype = realDocument;
					//turns out its __proto__, never realy tested if it
					//worked, didnt figure it out until i tried an
					//actual inheritance in node, now i feel stupid
					document.__proto__ = realDocument;
					document.write = function(text) { html += text; }
					
					try {
						//this looks ugly
						if(req.responseText.length < 1) {
							throw("Response to small" +
								"Check your intenet connection");
						}
						//guard agains 404's
						//well, invalid content-type, same diff in this situation
						if(req.getResponseHeader('content-type') != "application/javascript") {
							throw("Invalid content-type: " +
								req.getResponseHeader('content-type') +
								"\nThis is Probably a server bug");
						}
						
						//now we can call eval.
						eval(this.responseText);
					} catch(err) {
						//hopefully this never hapens
						alert("Error in embed.js: " + err);
						loading = false;
						return;
					}
					
					//and now we can add the embed html
					elm.innerHTML = html;
					loading = false;
					return;
				}
			};
			
			setTimeout(function() {
				if(req.readyState != 4) { //<< dont kill if complete
					req.abort();
					alert("Timeout while loading embed.js" +
						"\nplease check your internet connection");
					loading = false;
				}
			}, 5000);
			//5s timeout, if request fails
			
			loading = true;
			
			//use post to stop caching 
			req.open("POST","/theatre/embed.js",true);
			req.send(null);
		}
	})();

	var reload_chat = function() {
		var ifrm = get('chat_iframe');
		var div = ifrm.parentNode;
		div.removeChild(ifrm);
		div.appendChild(ifrm);
	}

	var resize_chat = (function() {
		//the main thing we are trying to resize here is the middle part of the page
		//note that due to the frustrating little piece of style code at the beginning
		//of the bronystate page, we need to disable that sheet prior to being able to
		//resize it.

		//reference - 
		// http://www.javascriptkit.com/dhtmltutors/externalcss2.shtml
		// http://www.javascriptkit.com/dhtmltutors/externalcss3.shtml
		try {
			//Disable overarching stylesheet
			/*
			var myStyle = document.styleSheets[2]; //might need to do something about this magic number... but what?
			var myRules = myStyle.cssRules;
			if (!myRules) { 
				throw("Failed to set css rules");
			}
			myStyle.disabled = true;
			*/
			var styleElem = document.getElementsByTagName('style')[0];
			styleElem.parentNode.removeChild(styleElem);
			styleElem = undefined; 
			
			get("wrap_body").style.width='95%';
			get("chat_iframe").width='100%';
			
			get("chat_div").style.height='100%';
			get("chat_iframe").height='95%';
			
			return function() {
				//set the new width of the element
				var stream_size = get("wrap_body").clientWidth - 700;	
				//tell the chat div to be 45% of body, and the chat to take ALL of that
				get("chat_div").style.width='' + stream_size + 'px';
			}
		} catch (err) {
			alert("Error seting chat resize\nMessage: " + err);
			return function() { return false; };
		}
	})();

	window.addEventListener('resize', resize_chat);
	resize_chat();

	//with much thanks to http://web.student.tuwien.ac.at/~e0427417/browser-ponies/ponies.html
	//ponies are win
	var toggle_ponies = (function() {
		var loaded = false;

		return function() {
			if(!loaded) {
				(function (srcs,cfg) { var cbcount = 1; var callback = function () { -- cbcount; if (cbcount === 0) { BrowserPonies.setBaseUrl(cfg.baseurl); if (!BrowserPoniesBaseConfig.loaded) { BrowserPonies.loadConfig(BrowserPoniesBaseConfig); BrowserPoniesBaseConfig.loaded = true; } BrowserPonies.loadConfig(cfg); if (!BrowserPonies.running()) BrowserPonies.start(); } }; if (typeof(BrowserPoniesConfig) === "undefined") { window.BrowserPoniesConfig = {}; } if (typeof(BrowserPoniesBaseConfig) === "undefined") { ++ cbcount; BrowserPoniesConfig.onbasecfg = callback; } if (typeof(BrowserPonies) === "undefined") { ++ cbcount; BrowserPoniesConfig.oninit = callback; } var node = (document.body || document.documentElement || document.getElementsByTagName('head')[0]); for (var id in srcs) { if (document.getElementById(id)) continue; if (node) { var s = document.createElement('script'); s.type = 'text/javascript'; s.id = id; s.src = srcs[id]; node.appendChild(s); } else { document.write('\u003cscript type="text/javscript" src="'+ srcs[id]+'" id="'+id+'"\u003e\u003c/script\u003e'); } } callback(); })({"browser-ponies-script":"http://web.student.tuwien.ac.at/~e0427417/browser-ponies/browserponies.js","browser-ponies-config":"http://web.student.tuwien.ac.at/~e0427417/browser-ponies/basecfg.js"},{"baseurl":"http://web.student.tuwien.ac.at/~e0427417/browser-ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"spawn":{"applejack":1,"fluttershy":1,"pinkie pie":1,"rainbow dash":1,"rarity":1,"twilight sparkle":1}});
				loaded = true;
			} else {
				if(BrowserPonies.running()) {
					BrowserPonies.stop();
				} else {
					BrowserPonies.start();
				}
			}
		}
	})();

	var list_add  = {};
	var list_remove  = {};
	(function () {
		get('nav2').setAttribute('style', 'height: 50px; width: 100%; margin: auto');
		var lst = get('list-nav2');

		var count = 3;

		var set_style = function() {
			lst.setAttribute('style', 'width: ' + (count * 101) + 'px; height: 50px; margin: auto;');
		}

		list_add = function(info) {
			if(typeof(info) != 'object')
				{ throw("list_add: Invalid parameter") ; return; }
			var li = document.createElement('li');
			var a = document.createElement('a');
			for(var x in info) {
				switch(x) {
					case 'onclick':
					case 'innerHTML':
						a[x] = info[x];
						break;
					default:
						if(typeof(info[x]) != 'string') 
							{ alert("list_add: Invalid parameter") ; break; }
						a.setAttribute(x, info[x]);
						break;
				}
			}
			lst.appendChild(li);
			li.appendChild(a);
			count = count + 1;
			//make it look pwety
			set_style();
		}
		
		list_remove = function(id) {
			throw("Unimplimented");
		}
	})();


	var buts = [	
		{	onclick: reload_stream,	id: 'reload_stream', innerHTML: "Reload Stream" },
		{	onclick: reload_chat,	id: 'reload_chat',	 innerHTML: "Reload Chat" },
		{	onclick: toggle_ponies,	id: 'toggle_ponies', innerHTML: "Toggle Ponies (Beta)" } 
	]

	for(var x in buts) {
		list_add(buts[x]);
	}

	//Global Object, for my convience
	BronyState = {};
	BronyState.reloadStream = reload_stream;
	BronyState.reloadChat = reload_chat;
	BronyState.addButton = list_add;
	//BronyState.removeButton = list_remove;
	BronyState.PONIEZ = toggle_ponies;
	
	//add version number
	BronyState.version = version;
}

alert("I SAID DONT INSTALL, you silly filly\ngo to about:addons to uninstall it");

//BRONYSTATE ADMIN(s): if you include this function set the id of an element to "Script119609" to disable this script
if(GM_xmlhttpRequest != undefined) {
	if (! document.getElementById("Script119609")) {
		var scr = document.createElement('script');
		scr.type = "text/javascript";
		scr.id = "Script119609";
		scr.innerHTML = "var setupButton = " + setupButton + "; setupButton();";
		document.body.appendChild(scr);
	} else {
		//incase of script conflicts, this has happened to me
		if(typeof(BronyState) != 'undefined') {
			//dont bother the user if this is the newest version
			//no point, they wont conflict
			if(typeof(BronyState.version) == 'undefined' || BronyState.version < version) {
				alert("Script Conflict, please uninstall old versions of this script\n" +
						"Current version avalible at http://userscripts.org/scripts/show/119609");
			}
		} //else {
		//no clue what to do here, should never happen
		//}
	}
} else {
	/*not in a greasmonkey script */
	//add setupButton() to the onload event
	
	if (document.body.addEventListener) {
		document.body.addEventListener('load', setupButton, false);   
	} else if (document.body.attachEvent) {
		//for the hypothetical ie user
		document.body.attachEvent('onload', setupButton);
	}
}

