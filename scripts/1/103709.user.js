// ==UserScript==
// @name          Kongregate Forum Muting
// @namespace     ventero.de
// @include       http://www.kongregate.com/forums/*
// @include       http://www.kongregate.com/accounts/*
// @description   Allows you to mute users in the Kongregate forums. All posts by muted users get hidden.
// @author        Ventero
// @version       1.3
// @date          13.10.2010
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/23/09
// Copyright (c) 2009-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php

/* Changelog
 *
 * 1.0: Initial release
 * 1.1: Mute/Unmute no longer disappears after flagging a post
 * 1.2: Added ability to mute users from their profiles
 * 1.3: Added "Hide post" button to posts by muted users you're manually viewing
 */

var MUTED = "kong_forum_muted_users";
var mutedUsers = [];

function saveMutings(){
	window.setTimeout(function(){
		GM_setValue(MUTED, mutedUsers.join("|"));
	}, 0);
}

function isMuted(user){
	return (mutedUsers.indexOf(user) >= 0);
}

function loadMutings(){
	var saved = GM_getValue(MUTED, "");
	if(!saved) return;
	mutedUsers = saved.split("|");
}

function muteUser(user){
	if(isMuted(user)) return;

	mutedUsers.push(user);
	saveMutings();
}

function unmuteUser(user){
	var idx = mutedUsers.indexOf(user);
	if(idx == -1) return;

	mutedUsers.splice(idx, 1);
	saveMutings();
}

function addButton(postsRow, text, callback){
	var vcard = postsRow.getElementsByClassName("vcard")[0];
	if(!vcard) return;

	removeButton(vcard);
	vcard.innerHTML += '<div class="clear"/><span class="edit"><a class="mutelink" href="#">' + text + '</a></span>'
	vcard.getElementsByClassName("mutelink")[0]
	     .addEventListener("click", callback, false);
}

function removeButton(vcard){
	var button = vcard.getElementsByClassName("mutelink")[0];
	if(button) button.parentNode.removeChild(button);

	var clear = vcard.getElementsByClassName("clear")[0];
	if(clear) clear.parentNode.removeChild(clear);
}

function addMuteButton(postsRow, username){
	addButton(postsRow, "Mute user", function(e){addMuting(username);e.preventDefault();});
}

function addUnmuteButton(postsRow, username){
	addButton(postsRow, "Unmute user", function(e){removeMuting(username);e.preventDefault();});
}

function addViewPostButton(postsRow, username){
	var body = postsRow.getElementsByClassName("body")[0];
	if(!body) return;

	body.innerHTML += '<div class="entry-content muted-content"><a class="view-post" href="#">View post</a></div>';
	body.getElementsByClassName("view-post")[0]
	    .addEventListener("click", function(e){
	    	viewPost(this.parentNode.parentNode.parentNode, username, true);
	    	e.preventDefault();
	    }, false);
}

function addHidePostButton(postsRow, username){
	var body = postsRow.getElementsByClassName("entry-content")[0];
	if(!body) return;

	body.innerHTML = '<a class="hide-post" href="#">Hide post</a></div>' + body.innerHTML;
	body.getElementsByClassName("hide-post")[0]
	    .addEventListener("click", function(e){
	    	hidePost(this.parentNode.parentNode.parentNode, username);
	    	e.preventDefault();
	    }, false);
}

function removeViewPostButton(postsRow){
	var viewPostDiv = postsRow.getElementsByClassName("entry-content muted-content")[0];
	if(viewPostDiv) viewPostDiv.parentNode.removeChild(viewPostDiv);
}

function removeHidePostButton(postsRow){
	var hidePostButton = postsRow.getElementsByClassName("hide-post")[0];
	if(hidePostButton) hidePostButton.parentNode.removeChild(hidePostButton);
}

function addBlankVCard(postsRow, username){
	postsRow.innerHTML = '<td class="author blank"><span class="fn muted">' + '<a href="/accounts/' +
	                     username + '">' + username + '</a>' + '</span></td>' + postsRow.innerHTML;
}

function removeBlankVCard(postsRow){
	var blankVCard = postsRow.getElementsByClassName("author blank")[0];
	if(blankVCard) postsRow.removeChild(blankVCard);
}

function hideVCard(postsRow){
	var vcard = postsRow.getElementsByClassName("vcard")[0];
	if(vcard) vcard.style.display = "none";
}

function showVCard(postsRow){
	var vcard = postsRow.getElementsByClassName("vcard")[0];
	if(vcard) vcard.style.display = "";
}

function hideBody(postsRow){
	var postDiv = postsRow.getElementsByClassName("entry-content")[0]
	if(postDiv) postDiv.style.display = "none";
}

function showBody(postsRow){
	var postDiv = postsRow.getElementsByClassName("entry-content")[0]
	if(postDiv) postDiv.style.display = "";
}

function getUsername(post){
	var avatar = post.getElementsByClassName("user_avatar")[0];
	return avatar && avatar.title;
}

function doWithEveryPost(callback){
	var posts = document.getElementsByClassName("post hentry");

	var current, username
	for(var i = 0, l = posts.length; i < l; i++){
		current = posts[i];
		username = getUsername(current);
		if(username) callback(current, username);
	}
}

function viewPost(postsRow, username, showHide){
	// called as callback from the "View Post" button
	removeBlankVCard(postsRow);
	removeViewPostButton(postsRow);
	removeHidePostButton(postsRow);
	showBody(postsRow);
	showVCard(postsRow);
	if(showHide) addHidePostButton(postsRow, username);
}

function hidePost(postsRow, username){
	// sets up posts by muted users
	removeHidePostButton(postsRow);
	hideVCard(postsRow);
	hideBody(postsRow);
	addBlankVCard(postsRow, username);
	addViewPostButton(postsRow, username);
	addUnmuteButton(postsRow, username);
}

function initialCheck(postsRow, username){
	if(isMuted(username)){
		// user is muted, hide post
		hidePost(postsRow, username);
	} else {
		// show mute user button
		addMuteButton(postsRow, username);
	}
}

function addMuting(username){
	muteUser(username);
	doWithEveryPost(function(post, user){
		if(user == username){
			hidePost(post, username);
		}
	});
}

function removeMuting(username){
	unmuteUser(username);
	doWithEveryPost(function(post, user){
		if(user == username){
			viewPost(post, username);
			addMuteButton(post, user);
		}
	});
}

function addProfileMuteLink(user){
	var li = document.getElementById("forummute");
	if(li) li.parentNode.removeChild(li);
	li = document.createElement("li");
	li.setAttribute("id", "forummute");

	var a = document.createElement("a");
	a.setAttribute("href", "#");

	li.appendChild(a);
	rellinks.appendChild(li);

	var muted = isMuted(user);
	a.innerHTML = (muted ? "forum unmute" : "forum mute");
	a.addEventListener("click", function(e){
		muted ? unmuteUser(user) : muteUser(user);
		addProfileMuteLink(user);
		e.preventDefault();
	}, false);
}

if(typeof GM_setValue !== "function" || /Chrome/i.test(navigator.appVersion)){
	GM_setValue = function(a,b){localStorage.setItem(a,b)}
	GM_getValue = function(a,b){
		return ((a in localStorage) ? localStorage.getItem(a) : b)
	}
}
loadMutings();

if(location.pathname.substring(0, 10) == "/accounts/"){
	var rellinks = document.getElementById("relationship_links");
	if(!rellinks) return;

	var user = location.pathname.split("/")[2];
	if(!user) return;

	addProfileMuteLink(user);
} else {
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.innerHTML = "a.view-post, a.hide-post {font-size: 0.8em;}\n" +
	                  "tr.post span.muted a {font-size: 0.8em; color:#666666;}\n" +
		                "a.mutelink {font-weight: normal;}";
	head.appendChild(style);

	var table = document.querySelector("table.posts");
	if(table) {
		table.addEventListener("DOMNodeInserted", function(a){
			if(a.target.id && a.target.id.indexOf("posts") == 0) {
				initialCheck(a.target, getUsername(a.target));
			}
		}, false);
	}

	doWithEveryPost(initialCheck);
}
