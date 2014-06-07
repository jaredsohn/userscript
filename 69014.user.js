// ==UserScript==
// @name          Banned User Warning
// @description	  Warns you that you may be stalking one of your exes on facebook
// @include *.facebook.com*
// ==/UserScript==

/* CONFIG
Put the names of the people that you want 
a warning for below, separated by commas,
I gave you a couple examples
*/
bannedNames = new Array("John Doe","Jane Doe");


/* 
All the boring stuff,don't mess with it
unless you know what you're doing
*/
function findName(){
	if(document.getElementById('profile_name') != null){
		return document.getElementById('profile_name').textContent;
	}
}

Array.prototype.contains = function(str){
	for(var i in this){
		if(this[i] == str){
			return true;
		}
	}return false;
}

function go(){
	if(self != self.top){return;}
	if(bannedNames.contains(findName())){
		var conf = confirm("You are choosing to view your ex's profile. Warning, they are very happy with their new life and viewing this profile will only renew your misery and anguish\n\nDo you wish to continue?");
		if(!conf){
			history.go(-1);
		}else{
			alert("Very well, don't say I didn't warn you...");
		}
	}
}

/*
Make it all happen
*/

go();