// ==UserScript==
// @name            Chat Resizer
// @namespace       tag://kongregate
// @description     Automatically resizes the chat to a specified value. This value can be overriden for single games.
// @author          Ventero
// @include         http://www.kongregate.com/games/*
// @date            15.09.2012
// @require         http://kong.ventero.de/updates/70040.js
// @version         1.2.4
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/12/09
// Copyright (c) 2010-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php

// Default dimensions of chat
var defaultWidth = 500;
var defaultHeight = 600;

// How much space should be left on the left/right border
var spaceLeft = 200;

// Set to false if game should line up with bottom of chat, not center
var center = true;

// Sets the height of the user list
var userListHeight = 100;

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
if(!document.getElementById("game")) return;
if(!dom.holodeck){
	var s = document.createElement("div");
	s.setAttribute("onclick","return window");
	dom = s.onclick();
}

function d(c){
	return document.getElementById(c);
}

function c(c){
	return document.getElementsByClassName(c);
}

function $(c){
	return document.querySelector(c);
}

function $A(c){
	return [].slice.call(c);
}

function setWidth(width){
	window._currentChatWidth = width;
	var gameWidth = parseInt(d("game").style.width, 10);
	d("maingame").style.width = (gameWidth + 3 + width) + "px";
	d("maingamecontent").style.width = (gameWidth + 3 + width) + "px";
	d("flashframecontent").style.width = (gameWidth + 3 + width) + "px";
	d("chat_container").style.width = width + "px";
	d('chat_window_spinner').style.right = width/2 - 38 + "px";
	if(d('high_scores_spinner'))
		d('high_scores_spinner').style.right = width/2 - 38 + "px";
	var ui = d("kong_game_ui");
	z = ui.childNodes
	for(i=0;i<z.length;i++){
		if(z[i].tagName == "DIV")
			z[i].style.width = (width - 17) + "px";
	}
	$A(ui.querySelectorAll("textarea.chat_input")).forEach(function(el){
		el.style.width = (width - 21) + "px";
	});
}

function setHeight(height, userListHeight, center){
	if(!userListHeight) userListHeight = 100;

	window._currentChatHeight = height;
	window._currentChatUserlistHeight = userListHeight;

	var quicklinksHeight = d('quicklinks') ? d('quicklinks').parentNode.clientHeight : 26;
	var maintabHeight = d('main_tab_set').clientHeight;

	var tabPaneHeight = height - 16;
	var mainHeight = height + quicklinksHeight + maintabHeight;
	var gameHeight = parseInt(d('game').style.height, 10);

	d("maingame").style.height = mainHeight + "px";
	d("maingamecontent").style.height = mainHeight + "px";
	d("flashframecontent").style.height = mainHeight + "px";
	d("chat_container").style.height = (height + maintabHeight) + "px";
	d("user_mini_profile_container").style.height = (height - 65) + "px";
	d("user_mini_profile").style.height = (height - 65) + "px";

	var messageWindows = c("chat_message_window");
	for(var i = 0; i < messageWindows.length; i++){
		messageWindows[i].style.height = (tabPaneHeight - userListHeight - 93)+"px"; // 93 = roomname, users in room etc.
	}

	var usersInRoom = c("chat_tabpane users_in_room");
	for(i = 0; i < usersInRoom.length; i++){
		usersInRoom[i].style.height = userListHeight + "px";
	}

	var roomsList = c("rooms_list");
	for(i = 0; i < roomsList.length; i++){
		roomsList[i].style.height = (height - 79)+"px";
	}

	z = d("kong_game_ui").childNodes;
	for(i=0;i<z.length;i++){
		if(z[i].nodeName=="DIV"){
			z[i].style.height = tabPaneHeight + "px";
		}
	}
	if(center != -1 && center !== undefined)
		centerGame(center);
}

function centerGame(center){
	window._currentGameCentered = center;
	if(center){
		var gameHeight = parseInt(d('game').style.height, 10);
		var mainHeight = parseInt(d("maingame").style.height, 10);
		d('game').style.top = (mainHeight - gameHeight)/2+"px"
		d('game').style.position = "relative";
	}else{
		d('game').style.bottom = "0px";
		d('game').style.top = "";
		d('game').style.position = "absolute";
	}
}

function initalize_chat_resize(){
	if(!d('maingamecontent')) return;
	var initialOffsetTop = d('maingamecontent').offsetTop + d('chat_tab_pane').offsetTop;
	var initialOffsetLeft = d('maingamecontent').offsetLeft + d('chat_tab_pane').offsetLeft;
	var minimumHeight = parseInt(d("game").style.height, 10) - parseInt(d('main_tab_set').clientHeight, 10) - 16;
	var minimumWidth = 300;

	if(dom.holodeck){
		var holodeck = dom.holodeck;
		holodeck.addChatCommand("size", function(l, n){
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/)

			if(m && m[1] == "reset"){
				l.activeDialogue().kongBotMessage("Resetting size for this game to defaults.");
				window.setTimeout(function(){GM_deleteValue("kong_resize_"+location.pathname)}, 0);
				setWidth(window._defaultChatWidth);
				setHeight(window._defaultChatHeight, window._defaultUserlistHeight, window._currentGameCentered);

				return false;
			} else if(m && m[1] == "show"){
				l.activeDialogue().kongBotMessage("Current chat size: width: " + window._currentChatWidth + "px, height: " + window._currentChatHeight + "px, userlist-height: " + window._currentChatUserlistHeight + "px.");
				return false;
			} else if(!o){
				l.activeDialogue().kongBotMessage("Please specify a width and a height: /size width height. Example: /size 500 500");
				return false;
			}

			var width = parseInt(o[1], 10);
			var height = parseInt(o[2], 10);
			var listHeight = parseInt(o[3]||100, 10);
			var gameHeight = parseInt(d('game').style.height, 10);
			if(width < 300){
				l.activeDialogue().kongBotMessage("Minimum width is 300. Setting width to 300px.");
				width = 300;
			}

			if(height < gameHeight){
				l.activeDialogue().kongBotMessage("Minimum height is the game's height. Setting height to " + gameHeight + "px.");
				height = gameHeight;
			}

			if(listHeight > height - 200){
				l.activeDialogue().kongBotMessage("Userlist height is too large. Setting it to 100px");
				listHeight = 100;
			}

			window.setTimeout(function(){GM_setValue("kong_resize_"+location.pathname, width+"/"+height+"/"+listHeight)}, 0);
			l.activeDialogue().kongBotMessage("Resizing chat to " + width + "px/" + height + "px/" + listHeight + "px");
			setWidth(width);
			setHeight(height, listHeight, window._currentGameCentered);

			return false;
		});

		holodeck.addChatCommand("defaultsize", function(l, n){
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/)
			if(m && m[1] == "reset"){
				l.activeDialogue().kongBotMessage("Resetting default size to 500/600/100");
				window.setTimeout(function(){GM_deleteValue("kong_resize_default")}, 0);

				return false;
			}	else if(m && m[1] == "show"){
				l.activeDialogue().kongBotMessage("Current chat size: width: " + window._defaultChatWidth + "px, height: " + window._defaultChatHeight + "px, userlist-height: " + window._defaultUserlistHeight + "px.");
				return false;
			} else if(!o){
				l.activeDialogue().kongBotMessage("Syntax /defaultsize width height userlist-height. userlist-height is optional. Example: /defaultsize 500 500 100");
			}

			var width = parseInt(o[1], 10);
			var height = parseInt(o[2], 10);
			var listHeight = parseInt(o[3]||100, 10);
			if(width < 300){
				l.activeDialogue().kongBotMessage("Minimum width is 300. Setting width to 300px.");
				width = 300;
			}

			if(listHeight > height){
				l.activeDialogue().kongBotMessage("Userlist height is too large. Setting it to 100px");
				listHeight = 100;
			}

			window.setTimeout(function(){GM_setValue("kong_resize_default", width+"/"+height+"/"+listHeight)}, 0);
			l.activeDialogue().kongBotMessage("Set default values to width: " + width + "px, height: " + height + "px, userlist-height: " + listHeight + "px.");

			return false;
		});

		holodeck.addChatCommand("centergame", function(l, n){
			var center = !window._currentGameCentered;
			if(center){
				l.activeDialogue().kongBotMessage("Now centering the game");
			} else {
				l.activeDialogue().kongBotMessage("Now aligning the game to the chat's bottom");
			}
			window.setTimeout(function(){GM_setValue("kong_resize_center", center?1:0)}, 0);

			centerGame(center);

			return false;
		});

	}

	var getString = "", centerVal = -1, defaults = "";
	getString = GM_getValue("kong_resize_"+location.pathname, "");
	centerVal = GM_getValue("kong_resize_center", -1);
	defaults = GM_getValue("kong_resize_default", "");

	if(defaults){
		var splitArr = defaults.split("/");
		defaultWidth = parseInt(splitArr[0], 10)||defaultWidth;
		defaultHeight = parseInt(splitArr[1], 10)||defaultHeight;
		userListHeight = parseInt(splitArr[2], 10)||userListHeight;
	}

	window._defaultChatWidth = defaultWidth;
	window._defaultChatHeight = defaultHeight;
	window._defaultUserlistHeight = userListHeight;

	var x = defaultWidth, y = defaultHeight, l = userListHeight, cg = center, override = false;

	if(centerVal != -1){
		cg = (centerVal == 1);
	}

	if(getString){
		var splitArr = getString.split("/");
		x = parseInt(splitArr[0], 10)||defaultWidth;
		y = parseInt(splitArr[1], 10)||defaultHeight;
		l = parseInt(splitArr[2], 10)||userListHeight;
		override = true;
	}

	var gameWidth = parseInt(d('game').style.width, 10);
	var gameHeight = parseInt(d('game').style.height, 10);

	if(x > minimumWidth){
		if(override || gameWidth + x < screen.width - spaceLeft){ // enough place to resize to specified width
			setWidth(x);
		}else{ // resize as far as possible
			var chatWidth = screen.width - gameWidth - spaceLeft;
			if(chatWidth > minimumWidth) setWidth(chatWidth);
		}
	}

	if(y > minimumHeight && y > gameHeight){
		setHeight(y, l, cg);
	} else {
		setHeight(gameHeight, l, cg);
	}
}
initalize_chat_resize();
