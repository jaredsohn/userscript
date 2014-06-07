// ==UserScript==
// @name           cam4Time
// @description    Highlights Users depending on their broadcasting time  
// @include        http://www.cam4.com/*
// ==/UserScript==


//*************************
//* Thanks to polarfuchs1 *
//************************* 



// USERSCRIPT SETTINGS END

// Highlighting color
                   //ie:   RED,   YELLOW,  L-YELLOW,  YELLOW-WHITE, WHITE
var hlColor = new Array("#FF0000","#FFFF00","#FFFFB2","#FFFFDC","#FFFFFF");

// Highlight Interval 
// ie: < 2min, 2-5min,5-15min, 15-30 min, > 30min
var hlTime = new Array(2,5,15,30);

// USERSCRIPT SETTINGS END


var allUsers, timeUser, userx;
allUsers = document.getElementsByClassName('broadcastingTime');
for (var i = 0; i < allUsers.length; i++) {
	timeUser = allUsers[i].firstChild.nodeValue;
		if (parseInt(timeUser) <= hlTime[0] || isNaN(parseInt(timeUser))){
			userx = getUserBox(allUsers[i]);
			userx.style.backgroundColor = hlColor[0];
		}
		else if ((parseInt(timeUser) > hlTime[0]) && (parseInt(timeUser) <= hlTime[1])){
			userx = getUserBox(allUsers[i]);
			userx.style.backgroundColor = hlColor[1];
		}		
		else if ((parseInt(timeUser) > hlTime[1]) && (parseInt(timeUser) <= hlTime[2])){
			userx = getUserBox(allUsers[i]);
			userx.style.backgroundColor = hlColor[2];
		}
		else if ((parseInt(timeUser) > hlTime[2]) && (parseInt(timeUser) <= hlTime[3])){
			userx = getUserBox(allUsers[i]);
			userx.style.backgroundColor = hlColor[3];
		}
		else {
			userx = getUserBox(allUsers[i]);
			userx.style.backgroundColor = hlColor[4];			
		} 
 };

function getUserBox(user) {
  for (var i = 0; i < 4; i++) {
    user = user.parentNode;
  }
  return user;
}