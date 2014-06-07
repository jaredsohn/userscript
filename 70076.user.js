// ==UserScript==
// @name            Fullscreen Chat
// @namespace       tag://kongregate
// @description     Adds a chat action which hides the game and makes the chat use the available free space
// @author          Ventero
// @include         http://www.kongregate.com/games/*
// @date            06/29/10
// @version         1.5
// @require         http://kong.ventero.de/updates/70076.js
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 02/27/10
// Based on an idea by SavageWolf (http://www.kongregate.com/accounts/SavageWolf - http://www.wolfthatissavage.com)
// Licensed under MIT/X11 license
// Copyright (c) 2010-2012 Ventero
// Full text of the license here:
// http://www.opensource.org/licenses/mit-license.php

function init_resize(){

	var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

	function d(c){
		return document.getElementById(c);
	}

	if(!d("maingame")) return;

	function setWidth(width, gamewidth){
		d("maingame").style.width = (gamewidth + width) + "px";
		d("maingamecontent").style.width = (gamewidth + width) + "px";
		d("flashframecontent").style.width = (gamewidth + width) + "px";
		d("chat_container").style.width = width + "px";
		d('chat_window_spinner').style.right = width/2 - 38 + "px";
		if(d('high_scores_spinner'))
			d('high_scores_spinner').style.right = width/2 - 38 + "px";
		z = d("kong_game_ui").childNodes
		for(i=0;i<z.length;i++){
			if(z[i].tagName == "DIV")
				z[i].style.width = (width - 17) + "px";
		}
	}

	function p(a){
		return parseInt(d(a).style.width, 10);
	}

	var isIFrame = !document.getElementById("game_wrapper")
	var wrapper = isIFrame?"gameiframe":"game_wrapper";
	var initialized = false;

	function initOrigValues(){
		window.__oldWidth = p("chat_container");
		window.__gameHolderWidth = p("gameholder");
		window.__gameWrapperWidth = p(wrapper);
		window.__gameWidth = p("game");
		initialized = true;
	}

	dom.resizeChat = function(){
		if(!initialized) initOrigValues();
		if(p("game") == 0){
			d("chat_container").style.marginLeft = "3px";
			d("gameholder").style.width = window.__gameHolderWidth + "px";
			d("game").style.width = window.__gameWidth + "px";
			d(wrapper).style.width = window.__gameWrapperWidth + "px";
			if(!isIFrame)
				d("gamediv").width = window.__gameDivWidth;
			if(typeof dom.__setChatWidth === "function")
				dom.__setChatWidth(window.__oldWidth);
			else
				setWidth(window.__oldWidth, window.__gameWidth + 3);
		} else {
			d("chat_container").style.marginLeft = "0px";
			d("gameholder").style.width = "0px";
			d("game").style.width = "0px";
			d(wrapper).style.width = "0px";
			if(!isIFrame){
				window.__gameDivWidth = d("gamediv").width;
				d("gamediv").width = 0;
			}
			if(typeof dom.__setChatWidth === "function")
				dom.__setChatWidth(p("flashframecontent"));
			else
				setWidth(p("flashframecontent"), 0);
		}
	}
}

// ugly workaround because Chrome doesn't fire onclick for <option>s
var isChrome = /Chrome/.test(navigator.appVersion);
if(isChrome){
	var inject = document.createElement("script");
	var head = document.getElementsByTagName("head")[0];
	inject.type = "text/javascript";
	inject.textContent = init_resize.toString() + "\ninit_resize();";
	(head || document.body).appendChild(inject);
} else {
	init_resize();
}

var call = document.createElement("option");
call.setAttribute("class","action");
call.setAttribute("value", "resize_chat");
call.setAttribute("onclick","resizeChat();");
call.innerHTML = "Fullscreen Chat";

var template = document.getElementById("chat_actions_dropdown_template");
var container = document.createElement("div");
container.appendChild(call);
template.innerHTML = template.innerHTML.replace("</select>", container.innerHTML + "</select>");

[].slice.call(document.querySelectorAll(".chat_actions_container")).forEach(function(n){
	var c = n.querySelector("select");
	if(c) {
		c.appendChild(call);
		if(isChrome)
			c.setAttribute("onchange", "if(this.getValue() == 'resize_chat') resizeChat();");
	}
});
