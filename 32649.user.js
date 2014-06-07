// ==UserScript==
// @name           GLB Add Agent Friend Cookie
// @namespace      Greasemonkey
// @description    Add/Remove a friend from the GLB friends list via cookies
// @include        http://goallineblitz.com/game/home.pl?user_id=*
// ==/UserScript==


//get content div
var container = document.getElementById('my_account_content'); 

//get agent name
var agentname = document.getElementsByClassName("account_value",document);
agentname = (agentname[0].parentNode.childNodes[3].innerHTML);
agentname = agentname.replace(/,/g,".");


//get user ID
var findagent = document.getElementById("user_avatar");


var re = /user_id=(.+)" w/;
var matches = findagent.parentNode.childNodes[1].innerHTML.match(re);
var user_id = matches[1];


//create delimited player string
var playerstring = user_id + "," + agentname

if (readCookie('GLBFriends') == null){
   createCookie('GLBFriends','',9999);
}


//read friends cookie to get current friends list
var glbfriends = readCookie('GLBFriends');


//check to see if the current player id is already a friend
var alreadyfriend = glbfriends.indexOf(user_id);

//if alreadyfriend returns -1 then they are not currently a friend
if (alreadyfriend == -1) {

   //not a friend, add a link for the user to add this friend
   var addfriend = '<tr><td colspan="2" style="font-size:11px;"><a href="javascript:;" id="link">Add to Friends</a></td></tr>';
}
  else{

   //this player is a friend, add a link for the user to remove this friend
   var addfriend = '<tr><td colspan="2" style="font-size:11px;"><a href="javascript:;" id="link">Remove From Friends</a></td></tr>';
}


//insert the add/remove link above the player name
container.innerHTML += addfriend;

//assign the link we just created
var elmLink = document.getElementById('link');

//check again to see if they are a friend
if (alreadyfriend == -1) {

   //if they are a friend add a click event to run the add function
   elmLink.addEventListener("click", addtofriends, true);
}
else{
   
   //if they are not a friend add a click event to run the remove function
   elmLink.addEventListener("click", removefromfriends, true);
}


/////Functions//////////////////////////////////////////////////////////////////////////////////////////////////

//add friend function
function addtofriends() {

   glbfriends = readCookie('GLBFriends');

   var alreadyfriend = glbfriends.indexOf(user_id);

   if (alreadyfriend == -1) {
   //check to see if there are any friends (this decides whether we need to add a comma delimiter
   //to the front of the new string)
   if (glbfriends == undefined) {
      //this is the first friend so it does not need a comma in front,
      //and there is no need to concatenate glbfriends with playerstring
      //create the cookie
      createCookie('GLBFriends',playerstring,9999);
}
   else{
      //this is not the first friend so it does need a comma in front
      //create the cookie
      createCookie('GLBFriends',glbfriends + ',' + playerstring,9999);
}

   //if the first character in the friends string is a comma
   if (glbfriends.substring(0, 1) == ","){

      //drop the first character from the friends string to get rid of the comma
      glbfriends = glbfriends.substring(1, glbfriends.length);
   }

   //if the last character in the friends string is a comma
   if (glbfriends.substring(glbfriends.length - 1, glbfriends.length) == ","){

      //drop the last character from the friends string to get rid of the comma
      glbfriends = glbfriends.substring(0, glbfriends.length - 1);
   }
   }
   //refresh the page
   window.location.reload(true);
};

//remove friend function
function removefromfriends() {

   glbfriends = readCookie('GLBFriends');
   //remove this player from the friends list by replacing their information with a blank string
   glbfriends = glbfriends.replace(playerstring,"");

   //if the first character in the friends string is a comma
   if (glbfriends.substring(0, 1) == ","){

      //drop the first character from the friends string to get rid of the comma
      glbfriends = glbfriends.substring(1, glbfriends.length);
   }

   //if the last character in the friends string is a comma
   if (glbfriends.substring(glbfriends.length - 1, glbfriends.length) == ","){

      //drop the last character from the friends string to get rid of the comma
      glbfriends = glbfriends.substring(0, glbfriends.length - 1);
   }

   glbfriends = glbfriends.replace(",,",",");


   //create the new cookie with the unwanted friend removed
   createCookie('GLBFriends',glbfriends,9999);

   //refresh the page
   window.location.reload(true);
};


//get an element by its class name
function getElementsByClassName(classname, par){
 var a=[];   
 var re = new RegExp('\\b' + classname + '\\b');      
 var els = par.getElementsByTagName("*"); 
 for(var i=0,j=els.length; i<j; i++){       
  if(re.test(els[i].className)){  
   a.push(els[i]);
 }
}
  return a;
};

//create the cookie
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};

//read the cookie
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

