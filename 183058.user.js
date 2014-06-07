// ==UserScript==
// @id             plug.dj-egw23f32e7f-025b-154e-abaf-a560f324febb@scriptish
// @name           Plug Theater
// @version        1.0
// @namespace      
// @author         Strategetical
// @description    Superior theater view
// @include        https://plug.dj/*
// @include        http://plug.dj/*
// @run-at         document-end
// ==/UserScript==
function runPlugTheater(){
	var plugTheater = {};
	plugTheater.resized = false;
	plugTheater.load = function(){
		try{
			if(document.getElementById("chat-messages").getElementsByClassName("update")[0]){
				try{
					window.API.on(API.CHAT_COMMAND, plugTheater.check);
					window.API.chatLog("PlugTheater: Loaded. Say /theater to resize the video.", true);
				}
				catch(e){
					setTimeout(plugTheater.load, 500);
				}
			}
			else{
				setTimeout(plugTheater.load, 500);
			}
		}catch(e){
			setTimeout(plugTheater.load, 500);
		}
	}
	plugTheater.check = function(val){
		if (val == "/theater"){
			plugTheater.resize();
		}
	}

	plugTheater.resize = function(){
		if(plugTheater.resized == false){
			API.chatLog("PlugTheater: Making video big. Say /theater to set the video size back.");
			API.chatLog("To make the theater work, you must NOT resize the window.", true);
			plugTheater.oldAudience = document.getElementById("audience").getAttribute("style");
			plugTheater.olddjBooth = document.getElementById("dj-booth").getAttribute("style");
			plugTheater.oldplaybackContainer = document.getElementById("playback-container").getAttribute("style");
			document.getElementById("audience").setAttribute("style","display:none;");
			document.getElementById("dj-booth").setAttribute("style","display:none;");
			var width = parseInt(window.$("#playback-container").css("width").split("px")[0]);
			var height = parseInt(window.$("#playback-container").css("height").split("px")[0]);
			var left = parseInt(window.$("#playback-container").css("left").split("px")[0]);
			window.$("#playback-container").css({"width": (width+300)+"px", "height": (height+150)+"px", "left": (left-150)+"px"});
			plugTheater.resized = true;
		}
		else{
			API.chatLog("PlugTheater: Changing size back. Say /theater to make the video big again.");
			API.chatLog("You may now resize the window again.", true);
			plugTheater.resized = false;
			document.getElementById("audience").setAttribute("style",plugTheater.oldAudience);
			document.getElementById("dj-booth").setAttribute("style",plugTheater.olddjBooth);
			document.getElementById("playback-container").setAttribute("style",plugTheater.oldplaybackContainer);
		}
	}
	plugTheater.load();
}
var scriptthing = document.createElement("script");
scriptthing.innerHTML = String(runPlugTheater)+"runPlugTheater();";
document.body.appendChild(scriptthing);