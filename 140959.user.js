// ==UserScript==
// @name        MANsViewerList
// @namespace   http://www.twitch.tv/
// @author		Pandaforge (alan.r.araujo@gmail.com)
// @description MANsViewerList
// @include		http://twitch.tv/*
// @include		http://*.twitch.tv/*
// @version     1.0.1
// @require		http://usocheckup.redirectme.net/140959.js
// ==/UserScript==

TheMostMANlyScript = {
	chatIsAvailable : false,
	users : "",
	usersRanks : "",
	init : function(){
		setInterval(TheMostMANlyScript.checkChatStatus, 5000);
		setInterval(TheMostMANlyScript.checkUserCmd, 1000);
	},
	checkUserCmd : function(){
		var cmd = document.getElementById("manCmd");
		if ( cmd != null && cmd != undefined  ) {
			if ( cmd.innerHTML == "pickone" ) {
				cmd.innerHTML = "";
				TheMostMANlyScript.pickOne();
			}
			if ( cmd.innerHTML == "copynames" ) {
				cmd.innerHTML = "";
				TheMostMANlyScript.copyPrompt(TheMostMANlyScript.users);
			}
		}
	},
	checkChatStatus : function(){
		var loading = document.getElementById("chat_loading_spinner");
		if ( loading == null || loading == undefined  ) {
			this.chatIsAvailable = false;
		} else {
			if ( loading.style.display == "" ) this.chatIsAvailable = false;
			else {
				this.chatIsAvailable = true;
				
				var div = document.getElementById("viewers");
				
				var hiddenList = "<span id='manCmd' style=''></span>";
				var link = "<a href=\"#\" onclick=\"document.getElementById('manCmd').innerHTML='pickone';return false;\" " + 
					"style=\"position:absolute;top:3px;right:5px;font-size:9px;\">Pick someone!</a>" + 
					"<a href=\"#\" onclick=\"document.getElementById('manCmd').innerHTML='copynames';return false;\" " + 
					"style=\"position:absolute;top:13px;right:5px;font-size:9px;\">Copy names!</a>";
					
				if ( document.getElementById("manCmd") == null || document.getElementById("manCmd") == undefined )
					div.innerHTML = link + div.innerHTML + hiddenList;
				
				TheMostMANlyScript.getViewersList();
			}
		}
	},
	getViewersList : function(){		
		var tmpUsers = "";
		var tmpUsersRanks = "";
		
		var div = document.getElementById("viewers");
		var divs = div.getElementsByTagName("div");
		
		for (var i = 0; i < divs.length; i++) {
			var ul = divs[i].getElementsByTagName("ul");
			var users = ul[0].getElementsByTagName("li");
			if ( users.length > 0 ) {
				for (var j = 0; j < users.length; j++) {
					var a = users[j].getElementsByTagName("a");
					tmpUsers += a[0].innerHTML + ";";
					if ( i == 0 ) tmpUsersRanks += "staff;";
					if ( i == 1 ) tmpUsersRanks += "admin;";
					if ( i == 2 ) tmpUsersRanks += "mod;";
					if ( i == 3 ) tmpUsersRanks += "mortal;";
				}
			}
		}
		
		TheMostMANlyScript.users = tmpUsers;
		TheMostMANlyScript.usersRanks = tmpUsersRanks;
	},
	copyList : function(){
		//alert("yerd");
	},
	copyPrompt : function(text) {
		window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
	},
	pickOne : function(){
		var users = TheMostMANlyScript.users.split(";");
		var randomnumber = Math.floor(Math.random()* (users.length - 1) );
		alert( "There are " + (users.length - 1) + " users in the chat.\n\n" + 
		 "The random chosen number was " + randomnumber + "\n\n" + 
		 "The user chosen is " + users[randomnumber] );
	}
};

TheMostMANlyScript.init();