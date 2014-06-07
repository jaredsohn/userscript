/* IT DOESN'T WORK YET. AND I WON'T MAKE IT WORK */

// ==UserScript==
// @name           Tyrant Fansite, Hide Comments by User
// @description    If you "mute" a user, the script hides his/her comments, but you can choose to view the comment 
// @author         Hunter Hogan
// @namespace 	   http://www.hunterthinks.com/
// @icon	   http://www.hunterthinks.com/solo/images/H32x32.png
// @include        http://tyrant.40in.net/*
// @version        0.1
// @date           1-Oct-2013
// @downloadURL    http://userscripts.org/scripts/show/179025
// ==/UserScript==

/* consider
   @grant none
   @updateURL
 */

// Based on Kongregate Forum Muting by Ventero http://userscripts.org/scripts/show/103709
// Copyright 2013 Hunter Hogan, licensed under MIT/X11 license http://www.opensource.org/licenses/mit-license.php

var MUTED = "fansite_muted_users";
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
	var ainfo = postsRow.getElementsByClassName("ainfo")[0];
	if(!ainfo) return;

	removeButton(ainfo);
	ainfo.innerHTML += '<div class="clear"/><span class="edit"><a class="mutelink" href="#">' + text + '</a></span>'
	ainfo.getElementsByClassName("mutelink")[0]
	     .addEventListener("click", callback, false);
}

function removeButton(ainfo){
	var button = ainfo.getElementsByClassName("mutelink")[0];
	if(button) button.parentNode.removeChild(button);

	var clear = ainfo.getElementsByClassName("clear")[0];
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

	body.innerHTML += '<div class="atext muted-content"><a class="view-post" href="#">View post</a></div>';
	body.getElementsByClassName("view-post")[0]
	    .addEventListener("click", function(e){
	    	viewPost(this.parentNode.parentNode.parentNode, username, true);
	    	e.preventDefault();
	    }, false);
}

function addHidePostButton(postsRow, username){
	var body = postsRow.getElementsByClassName("atext")[0];
	if(!body) return;

	body.innerHTML = '<a class="hide-post" href="#">Hide post</a></div>' + body.innerHTML;
	body.getElementsByClassName("hide-post")[0]
	    .addEventListener("click", function(e){
	    	hidePost(this.parentNode.parentNode.parentNode, username);
	    	e.preventDefault();
	    }, false);
}

function removeViewPostButton(postsRow){
	var viewPostDiv = postsRow.getElementsByClassName("atext muted-content")[0];
	if(viewPostDiv) viewPostDiv.parentNode.removeChild(viewPostDiv);
}

function removeHidePostButton(postsRow){
	var hidePostButton = postsRow.getElementsByClassName("hide-post")[0];
	if(hidePostButton) hidePostButton.parentNode.removeChild(hidePostButton);
}

function addBlankainfo(postsRow, username){
	postsRow.innerHTML = '<td class="author blank"><span class="fn muted">' + '<a href="/accounts/' +
	                     username + '">' + username + '</a>' + '</span></td>' + postsRow.innerHTML;
}

function removeBlankainfo(postsRow){
	var blankainfo = postsRow.getElementsByClassName("author blank")[0];
	if(blankainfo) postsRow.removeChild(blankainfo);
}

function hideainfo(postsRow){
	var ainfo = postsRow.getElementsByClassName("ainfo")[0];
	if(ainfo) ainfo.style.display = "none";
}

function showainfo(postsRow){
	var ainfo = postsRow.getElementsByClassName("ainfo")[0];
	if(ainfo) ainfo.style.display = "";
}

function hideBody(postsRow){
	var postDiv = postsRow.getElementsByClassName("atext")[0]
	if(postDiv) postDiv.style.display = "none";
}

function showBody(postsRow){
	var postDiv = postsRow.getElementsByClassName("atext")[0]
	if(postDiv) postDiv.style.display = "";
}

function getUsername(post){
/* On Kong, the avatar for each user is an img element with a class "user_avatar". 
 * Every "user_avatar" img has a title property and the title is the user name of the Kong player.
 * On the Fansite, it's not as simple. Inside div class=ainfo, there is a link to the user's profile. The link is a random string.
 * The name of the user is in plain text enclosed by the <a> anchor element. I don't know how to grab that plain text.
 * BUT, there might be an easy way out. At the bottom of the Fansite page, there is is a script element that starts with $(document) 
 * and inside this block of text, all of the user profile links are associated with the user's name. Maybe there is a way to parse the HREF
 * and then look up the user name at the bottom. On the other hand, parsing the HREF is probable as easy/difficult as parsing out the plain 
 * text of the user name enclosed in the <a> anchor element. I don't know, and I give up.
 */
	var avatar = post.getElementsByClassName("user_avatar")[0];
	return avatar && avatar.title;
}

function doWithEveryPost(callback){
	var posts = document.getElementsByClassName("post hentry");
/* It gets worse. On Kong every post is in a <tr> with classes "post hentry". It is easy to cycle through all of of the posts.
 * On the Fansite, each comment or subcomment is in a <tr> but the <tr> has an id, not a class. the id can be parsed from the a <td> within the 
 * <tr> and if the player is supposed to be muted, you could then find the id and hide the <tr>, but it's not as simple as on Kong. 
 * It's not even close to as simple. 
 */
	var current, username
	for(var i = 0, l = posts.length; i < l; i++){
		current = posts[i];
		username = getUsername(current);
		if(username) callback(current, username);
	}
}

function viewPost(postsRow, username, showHide){
	// called as callback from the "View Post" button
	removeBlankainfo(postsRow);
	removeViewPostButton(postsRow);
	removeHidePostButton(postsRow);
	showBody(postsRow);
	showainfo(postsRow);
	if(showHide) addHidePostButton(postsRow, username);
}

function hidePost(postsRow, username){
	// sets up posts by muted users
	removeHidePostButton(postsRow);
	hideainfo(postsRow);
	hideBody(postsRow);
	addBlankainfo(postsRow, username);
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