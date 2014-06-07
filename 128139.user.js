// ==UserScript==
// @name           MeetMe - AskMe Auto Friend Selector
// @namespace      http://www.sirpl.com
// @description    Selects the first 50 friends when automatically when you go to ask multiple friends a question.
// @include        http://feed.meetme.com/askMe/askFriends
// @include        http://*.meetme.com/*
// ==/UserScript==

/**
 * This section is so the script can load and execute the FriendsSelector object
 */
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

/**
 * Load and execute the script
 */

loadAndExecute("//assets.mybcdna.com/JavaScript/apps/Friends/FriendsSelector.js?76022", function() {
	   
	   /**
	    * Do the bad thing.
		*/
	   
	FriendsSelector.selectLimit = 50;
	var friends = document.getElementsByClassName('friend');
	for (x=0; x < 50; x++) {
	friends[x].setAttribute("class", "friend selected");
	fid = friends[x].getAttribute("data-member-id");
	FriendsSelector.selectedMemberIds += fid + ',';
	}
	
	
});