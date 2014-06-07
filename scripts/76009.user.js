// ==UserScript==
// @name           Youtube Embed HD
// @version        1.4
// @namespace      Youtube
// @include        *
// ==/UserScript==

trim = function(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

var YTEmbedHD = {
	//Array of youtube embedded videos
	ytEmbeds		: new Array(),
	//Searches the page for youtube players
	findPlayers		: function() {
		var embeds = document.body.getElementsByTagName("embed");
		for(i in embeds) {
			if(embeds[i].src.indexOf("youtube") > -1) {
				YTEmbedHD.ytEmbeds.push(embeds[i]);
			}
		}
		//alert(embeds.length)
		//If we have youtube elements, run the script!
		if(YTEmbedHD.ytEmbeds.length > 0) {
			YTEmbedHD.run();
		}
	},
	//Loads the required SWFObject
	run				: function() {
		var waitForLibs, loadLibary;
	
		//Wait for libraries to load then call the libLoaded function
		waitForLibs = function() {
			if (typeof unsafeWindow.swfobject == 'undefined') {
				window.setTimeout(waitForLibs, 100);
			} else {
				YTEmbedHD.libLoaded();
			}
		}
		//Add a javascript libary to the page
		loadLibary = function(url, fn) {
			var head = document.getElementsByTagName('head')[0] || document.documentElement;
			var script = document.createElement('script');
			script.src = url;
			script.type = 'text/javascript';
			script.async = true;
			head.insertBefore(script, head.firstChild);
			if (typeof fn == 'function') {
				fn();
			}
		}
		//Check if the libary is already loaded on page
		if (typeof unsafeWindow.swfobject == 'undefined')
			loadLibary('http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject_src.js', waitForLibs);
		else
			waitForLibs();
	},
	//Write a script element to the page
	addScript		: function(str, fn) {
		var head = document.getElementsByTagName('head')[0] || document.documentElement;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = str + "\n" + fn;
		head.insertBefore(script, head.firstChild);
	},
	//Called after the SWFObj lib has loaded
	libLoaded		: function() {
		YTEmbedHD.swfobject = unsafeWindow.swfobject;
		//Function that is called when the youtube player has been replaced sucessfully
		function onYouTubePlayerReady() {	
			//Get the current player and add the correct onstatechange event hander for it
			var yt = document.getElementById("ytPlayer" + YTEmbedHD.cID); 
			yt.addEventListener("onStateChange", "onStateChange" + YTEmbedHD.cID);
			if(YTEmbedHD.cID == YTEmbedHD.ytEmbeds.length-1) {
				//alert("COMPLETED")
			} else {
				//alert("NEXT")
				YTEmbedHD.cID++;
				YTEmbedHD.replacePlayer();
			}
		}
		
		//Write this object to the page and the ready function
		YTEmbedHD.addScript("var YTEmbedHD = {}; var YT_EMBED_QUALTIY = '" + GM_getValue("qualityOrder", "1080p,720p,480p,360p,small") + "'", onYouTubePlayerReady);
		unsafeWindow.YTEmbedHD = YTEmbedHD;
		YTEmbedHD.cID = 0;
		//Start replacing players on the page
		YTEmbedHD.replacePlayer();
	},
	//Replaces the current embed element with a SWFObject to use the YoutubeAPI
	replacePlayer	: function() {
		var embed = YTEmbedHD.ytEmbeds[YTEmbedHD.cID];
		var src = embed.src;
		var ytDiv = document.createElement("div");
		
		var _w, _h;
		_h = embed.clientHeight;
		_w = embed.clientWidth;
		if(_w == "" || _w <= "0") _w = embed.parentNode.clientWidth;
		if(_h == "" || _h <= "0") _w = embed.parentNode.clientHeight;
		
		ytDiv.id = "ytDiv" + YTEmbedHD.cID;
		ytDiv.style.width = _w + "px";
		ytDiv.style.height = _h + "px";
		embed.parentNode.parentNode.replaceChild(ytDiv, embed.parentNode);
		
		//Ugh crazy thing to select the quality in the order the user specified- 
		//needs re coding, like most of this. Ill do it at some point.
		function selectQuality(q) {	
			var p = 0;
			var f = false;
			var pref = YT_EMBED_QUALTIY.split(",");
			for(px in pref) {
				if(pref[px] == "1080p")
					pref[px] = "hd1080";
				else if(pref[px] == "720p")
					pref[px] = "hd720"
				else if(pref[px] == "480p")
					pref[px] = "large"
				else if(pref[px] == "360p")
					pref[px] = "medium"	
			}
			var find = function() {
				for(j in q) {
					if(q[j] == pref[p]) {
						f = true;
						p = j;
						break;
					}
				}
			};
			for(c = 0; c < pref.length; c++) {
				find();
				if(f == true) {
					break;
				}
				p++;
			};
			return q[p];
		}
		
		//Create a onStateChange function for this specific player
		YTEmbedHD.addScript(
			"var qualitySet" + YTEmbedHD.cID + " = false;" +
			"\nfunction onStateChange" + YTEmbedHD.cID + "(newState) {" + 
			"\n if(qualitySet" + YTEmbedHD.cID + "==false) {" + 
			"\n		var yt = document.getElementById('ytPlayer" + YTEmbedHD.cID + "');" +
			"\n		var q = yt.getAvailableQualityLevels();" +
			"\n		var sq = ''" +
			"\n		for(j in q) {" + 
			"\n			sq = q[j]; break;" +
			"\n		}" + 
			"\n		if(sq != '' && qualitySet" + YTEmbedHD.cID + "==false) {" +
			"\n			qualitySet" + YTEmbedHD.cID + "=true;" +
			"\n			yt.setPlaybackQuality(selectQuality(q));" +
			"\n		}" +
			"\n	}" +
			"\n}", selectQuality);
		var params = { allowScriptAccess: "always", wmode: "transparent" };
		var atts = { id: "ytPlayer" + YTEmbedHD.cID };
		//Embed the video player
		YTEmbedHD.swfobject.embedSWF(src + "&enablejsapi=1&playerapiid=ytplayer", ytDiv.id, _w, _h, "8", null, null, params, atts);
	}
}

createStuff = function() {
	var fill = document.createElement("div");
	fill.setAttribute("style", "position: fixed; top: 0; width: 100%; height: 100%; z-index: 2147483645; background: black; opacity: 0.6; cursor: pointer");
	
	var cel = function(p, elm) {
		var el = document.createElement(elm);
		p.appendChild(el);
		return el;
	}
	
	var addCSS = function(text) {
		var head = document.getElementsByTagName('head')[0] || document.documentElement;
		var css = document.createElement('style');
		css.type = 'text/css';
		css.innerHTML = text;
		head.insertBefore(css, head.firstChild);
	}
	
	var settings = document.createElement("div");
	settings.setAttribute("style", "width: 250px; border: 2px solid white;z-index: 2147483646; position: fixed; top: 0; margin-top: 100px; left: 50%;" +
								   "margin-left: -150px; background: #333; -moz-border-radius: 10px; font-size: 11px; color: white; padding: 10px; font-family: Arial;" +
								   "line-height: 13px;");
	var head = cel(settings, "h1");
	head.setAttribute("style", "font-size: 15px; color: white; font-family: Arial; margin: 0; padding: 5px; border: 0; border-bottom: 1px solid white; margin-bottom: 10px;");
	head.appendChild(document.createTextNode("Youtube Embed HD Settings"));
	settings.appendChild(head);
	
	var ctn = function(elem, text) {
		elem.appendChild(document.createTextNode(text));
	}
	ctn(settings, "Default video quality (Enter in order you wish them to be selected");
	
	addCSS("#ytEmbedHDList { padding: 10px; }" +  
			"#ytEmbedHDList > div { border:1px solid white; padding: 3px; margin: 2px; width: 70px; float: left; clear: left;}" +
			"#ytEmbedHDList input {float: left; width: 20px; border: 1px solid white; margin-top: 2px; font-size: 11px; padding: 3px; color: white; background: #666}");
	
	
	var order = GM_getValue("qualityOrder", "1080p,720p,480p,360p,small").split(",");
	var items = [];
	var list = cel(settings, "div");
	list.id = "ytEmbedHDList";
	
	for(m=0;m<order.length;) {
		ctn(cel(list, "div"), order[m]);
		items[m] = cel(list, "input")
		items[m].id = order[m];
		items[m].value = ++m;
	}

	var sx = cel(settings, "br");
	var sbmt = cel(settings, "input");
	sbmt.type = "button";
	sbmt.value = "Save";
	sbmt.setAttribute("style", "margin: 20px auto 0 auto; display: block;");
	
	var span = null;
	
	sbmt.addEventListener("click", function() {
		var ord = []
		for(i in items)
			ord[items[i].value-1] = items[i].id;
		var err = false;
		for(i=0;i < items.length; i++) {
			if(ord[i]==null) {
				err = true;
				break;
			}
		}
		if(err && span == null) {
			cel(settings, "br");
			span = cel(settings, "span");
			span.style.color = "yellow";
			span.style.marginLeft = "25px";
			span.appendChild(document.createTextNode("Error invalid input"));
		} else {
			m = "";
			for(i = 0; i < 4; i++) {
				m += trim(ord[i]) + ",";
			}
			m += trim(ord[4]);
			GM_setValue("qualityOrder", m);	
			YTEmbedHD.addScript("YT_EMBED_QUALTIY = '" + m + "'");
			fill.parentNode.removeChild(fill);
			settings.parentNode.removeChild(settings);
		}
	}, false);
	
	fill.addEventListener("click", function() {
		fill.parentNode.removeChild(fill);
		settings.parentNode.removeChild(settings);
	}, false);
	document.body.appendChild(fill);
	document.body.appendChild(settings);
	settings.focus();
}
GM_registerMenuCommand("Set playback quality settings", createStuff);
setTimeout(YTEmbedHD.findPlayers, 500);