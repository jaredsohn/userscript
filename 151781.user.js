// ==UserScript==
// @name	    Facebook Friends Online Notifiers
// @author      Vishwesh Shetty
// @description Get alert notifications when tagged friends come online
// @include     https://apps.facebook.com/*
// @include     http://apps.facebook.com/*
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @exclude     http://lite.facebook.com/*
// ==/UserScript==
vishflag = 0;
var friends = ['100001024347018','1059317873','791019245'];
function friendOnlineCheck() {
	var divs = document.getElementsByClassName('item active');
	//Check if friend already online
	if (vishflag == 0){
		for(var i=0; i<divs.length; i++) { 
		  currentFriendHTML = divs[i].innerHTML;
		  currentFriend = currentFriendHTML.substring(currentFriendHTML.indexOf("messages") + 9, currentFriendHTML.indexOf("\"",currentFriendHTML.indexOf("messages") ));
		  currentFriendName = currentFriendHTML.substring(currentFriendHTML.indexOf("class=\"name\"") + 13, currentFriendHTML.indexOf("\div>",currentFriendHTML.indexOf("class=\"name\""))-2);
			 for(var j=0; j<friends.length; j++) {
			  if(friends[j] == currentFriend)
			  {
				 friends[j]  = 'ol';
			  }
			}
			vishflag = 1;
		}
	}else{
		//Notify if offline friends comes online
		for(var i=0; i<divs.length; i++) { 
		  currentFriendHTML = divs[i].innerHTML;
		  currentFriend = currentFriendHTML.substring(currentFriendHTML.indexOf("messages") + 9, currentFriendHTML.indexOf("\"",currentFriendHTML.indexOf("messages") ));
		  currentFriendName = currentFriendHTML.substring(currentFriendHTML.indexOf("class=\"name\"") + 13, currentFriendHTML.indexOf("\div>",currentFriendHTML.indexOf("class=\"name\""))-2);
			 for(var j=0; j<friends.length; j++) {
			  if(friends[j] == currentFriend)
			  {
				 alert(currentFriendName + "is online :)");
				 friends[j]  = 'ol';
			  }
			}
		}
	}
		
	window.setTimeout(friendOnlineCheck, 5000);	
}

window.setTimeout(friendOnlineCheck, 2000);