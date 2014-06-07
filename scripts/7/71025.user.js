// ==UserScript==
// @name           PalmDevLogin
// @namespace      http://chofter.com/apps
// @description    Auto logs you in to the Palm developer site
// @include        https://developer.palm.com/*
// @include        http://developer.palm.com/*
// ==/UserScript==

var log = function(str){
	unsafeWindow.console && unsafeWindow.console.log(str);
}

var myUserName = null;
var myPwd = null;

var defaultUrl = "http://developer.palm.com/distribution/search.php?search_id=egosearch";
var loginUrl = "http://developer.palm.com/index.php?option=com_user&view=login";

if(window.location.href.indexOf("index.php?option=com_user&view=login") > -1){
	// In the log in window
	var user = document.querySelectorAll("input[name=username]")[0];
	var pwd = document.querySelectorAll("input[name=passwd]")[0];
	var btn = document.querySelectorAll("form#login input.type_submit")[0];

	log("found user " + user + " pwd " + pwd);
	setTimeout(function(){


	if(user && pwd && user.value && pwd.value) {
	   btn.click();
	} else if(myUserName && myPwd) {
	   user.value = myUserName;
	   pwd.value = myPwd;
	   btn.click();
	} else {
	   log("no user name value");
	}
  }, 200);
} else {
	var contentDesc = document.querySelectorAll(".contentdescription")[0];
	if(contentDesc && contentDesc.innerHTML.indexOf("Welcome to the registered user area of our site") > -1){
		window.location.href = defaultUrl;
	} else {
		var anchors = document.querySelectorAll("div.signup a.account-text");
		var found = false;

		for(var i = 0; i < anchors.length; i++) {
			if(anchors[i].innerHTML == "Sign In") {
				found = true;
				window.location.href = "https://developer.palm.com/index.php?option=com_user&view=login";
				break;
			}
		}
		if(!found) {

			var navList = document.querySelectorAll("div.signup")[0];
			if(navList) {

				var a = document.createElement("a");
				a.innerHTML = "My Posts";
				a.className = "account-text";
				a.style.paddingLeft = "10px";
				a.href = "http://developer.palm.com/distribution/search.php?search_id=egosearch";
				navList.appendChild(a);

				var a = document.createElement("a");
				a.innerHTML = "Latest Posts";
				a.className = "account-text";
				a.style.paddingLeft = "10px";
				a.href = "http://developer.palm.com/distribution/search.php?search_id=newposts";
				navList.appendChild(a);
			}
		}
	}
}
