// ==UserScript==
// @name           Youtube - Ignore User
// @namespace      faleij
// @description    Block any users comment from appearing
// @version        0.0.1
// @include        htt*://www.youtube.com/*
// ==/UserScript==
var ignored = GM_getValue("ytIgnoredUsers",";");
var user;

var ignoredAr = ignored.split(";");
for(x = 1; x<ignoredAr.length-1; x++){
	var ignoredUser = new User("",ignoredAr[x]);
	ignoredUser.addUnignore();
}

function save(){
	//gm commands
	if(ignored.length > 1){
		unsafeWindow.console.log("Saving List");
		GM_setValue("ytIgnoredUsers",ignored);
	}
}

function filter(){
	unsafeWindow.console.log("Filtering "+user.length+" users");
	for(x in user){ //x=0;x<user.length;x++
		if(user[x].isIgnored()){
			unsafeWindow.console.log("Filter: ignored user "+user[x].username);
			user[x].hide();
		}else if(!(user[x].hasIgnoreButton())){
			unsafeWindow.console.log("Filter: Adding ignore button for user "+user[x].username);
			user[x].addIgnoreButton();
		}else if(user[x].hidden()){
			user[x].show();
		}
	}
}

function User(elmt,username){
	this.elmt = elmt;
	this.username = username;
	unsafeWindow.console.log("constructed " + this.username);
	this.hide = function(){
		this.elmt.style.display = "none"; //I preferr to hide rather than removing elements
	};
	this.show = function(){
		this.elmt.style.display = "";
	};
	this.hidden = function(){
		return (this.elmt.style.display == "none");
	};
	this.ignore = function(){
		unsafeWindow.console.log("Ignoring "+this.username);
		ignored += this.username + ";";
		save();
		this.addUnignore();
		filter();
	}
	this.addIgnoreButton = function(){
		var a = document.createElement("a");
		a.setAttribute("id","ignoreButton");
		a.appendChild(document.createTextNode("Ignore"));
		var c = this;
		a.addEventListener("click", function(){ var e = c; e.ignore(); }, false);
		this.elmt.querySelector(".channel-name ,.yt-user-name ,a[name='profile-comment-username']").parentNode.appendChild(a);
	};
	this.unignore = function(){
		unsafeWindow.console.log("Unignoring "+this.username);
		ignored = ignored.replace(this.username+";","");
		save();
		filter();
	};
	this.addUnignore = function(){
		unsafeWindow.console.log("addUnignore: " + this.username);
		var c = this;
		GM_registerMenuCommand( this.username, function(){ var e = c; e.unignore(); });
	};
	this.isIgnored = function(){
		return ignored.match(";"+this.username+";");
	}
	this.hasIgnoreButton = function(){
		if(this.elmt.querySelector("#ignoreButton"))
			return true;
		return false;
	};
	
}

function constructUsers(elmt){
	var comment = document.querySelectorAll(".comment-post ,.comment ,#user_comments-body .commentsTableFull");
	if(comment.length < 1){
		unsafeWindow.console.log("Nothing to construct");
		return;
	}
	user = new Array();
	for(i = 0; i < comment.length; i++){
		username = comment[i].querySelector(".channel-name ,.yt-user-name ,a[name='profile-comment-username']").textContent.trim();
		unsafeWindow.console.log("construcing new user " + username);
		user.push(new User(comment[i],username));
	}
	filter();
}
unsafeWindow.console.log("Starting construction");
constructUsers();

var constructTimeout;
function constructTime(){
    console.log("clear construct timer");
	clearTimeout(constructTimeout);
	constructTimeout = setTimeout(constructUsers,500);
}
document.querySelector("#comments-view ,#user_comments-body").addEventListener("DOMNodeInserted", constructTime, false);